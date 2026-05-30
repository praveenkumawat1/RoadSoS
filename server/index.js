import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import { GoogleGenerativeAI } from "@google/generative-ai";
import OpenAI from "openai";
import path from "path";
import fs from "fs";
import twilio from "twilio";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Twilio Client Setup
const twilioClient =
  process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN
    ? twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
    : null;

// Setup Multi-modal AI (Gemini)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
// Standard naming: gemini-1.5-flash
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const modelFallback = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });

// Setup OpenAI (Alternative)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Configure Multer for Image Storage
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });
// Debug logs for Keys (Safe)
console.log(
  "Gemini Key Present:",
  !!process.env.GEMINI_API_KEY && !process.env.GEMINI_API_KEY.includes("your_"),
);
console.log(
  "OpenAI Key Present:",
  !!process.env.OPENAI_API_KEY && !process.env.OPENAI_API_KEY.includes("your_"),
);
// Ensure uploads folder exists
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Mock database for alerts (Use MongoDB/Postgres later)
const alerts = [];

app.get("/", (req, res) => {
  res.send("RoadSOS API is running...");
});

// Get all active alerts
app.get("/api/alerts", (req, res) => {
  res.json(alerts);
});

// Broadcast Real SOS via Twilio
app.post("/api/broadcast-sos", async (req, res) => {
  const { message, contacts, location, senderName } = req.body;

  if (!twilioClient) {
    return res.status(503).json({
      error:
        "Twilio service not configured. Please add TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN to .env",
    });
  }

  const broadcastPromises = contacts.map((contact) => {
    return twilioClient.messages.create({
      body: `🚨 EMERGENCY FROM ${senderName || "ROADSOS USER"}\n\nMessage: ${message}\n\nLocation: ${location || "Unknown"}\n\nLive on: http://roadsos.app/sos-view/${Date.now()}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: contact,
    });
  });

  try {
    await Promise.all(broadcastPromises);
    res.json({ success: true, count: contacts.length });
  } catch (err) {
    console.error("Twilio Broadcast Error:", err);
    res
      .status(500)
      .json({ error: "Failed to send some messages", details: err.message });
  }
});

// Broadcast Multi-Call via Twilio Voice
app.post("/api/broadcast-call", async (req, res) => {
  const { contacts, location, senderName } = req.body;

  if (!twilioClient) {
    return res.status(503).json({ error: "Twilio service not configured." });
  }

  const callPromises = contacts.map((contact) => {
    return twilioClient.calls.create({
      twiml: `<Response><Say voice="alice" language="en-US">Emergency alert from ${senderName || "Road SOS User"}. Immediate assistance required at ${location || "current coordinates"}. Repeating. Emergency at ${location || "current coordinates"}.</Say></Response>`,
      to: contact,
      from: process.env.TWILIO_PHONE_NUMBER,
    });
  });

  try {
    const results = await Promise.allSettled(callPromises);
    const successCount = results.filter((r) => r.status === "fulfilled").length;
    res.json({ success: true, count: successCount });
  } catch (err) {
    console.error("Twilio Voice Error:", err);
    res
      .status(500)
      .json({ error: "Failed to initiate calls", details: err.message });
  }
});

// RESCUE AI: Analyze Injury/Situation
app.post("/api/rescue-ai/analyze", upload.single("image"), async (req, res) => {
  try {
    const { prompt } = req.body;
    const imageFile = req.file;

    // Check if at least one API key is present
    if (!process.env.GEMINI_API_KEY && !process.env.OPENAI_API_KEY) {
      return res.status(400).json({
        text: "Rescue AI Error: No API Key found. Please add GEMINI_API_KEY or OPENAI_API_KEY to your server .env file.",
      });
    }

    let resultText = "";

    // TRY GEMINI FIRST
    const geminiKey = process.env.GEMINI_API_KEY;
    if (geminiKey && !geminiKey.includes("your_")) {
      try {
        let result;
        if (imageFile) {
          const imageData = fs.readFileSync(imageFile.path);
          const imageParts = [
            {
              inlineData: {
                data: Buffer.from(imageData).toString("base64"),
                mimeType: imageFile.mimetype,
              },
            },
          ];
          const fullPrompt = `${prompt}. Analyze any trauma/injury if visible & give immediate first aid. Be extremely concise.`;
          result = await model.generateContent([fullPrompt, ...imageParts]);
        } else {
          try {
            result = await model.generateContent(
              `${prompt}. Provide emergency first aid guidance.`,
            );
          } catch (e) {
            console.log("Gemini Flash failed, trying Pro fallback...");
            result = await modelFallback.generateContent(
              `${prompt}. Provide emergency first aid guidance.`,
            );
          }
        }
        const response = await result.response;
        resultText = response.text();
      } catch (geminiErr) {
        console.error("Gemini failed:", geminiErr.message);
      }
    }

    // FALLBACK TO OPENAI IF GEMINI FAILED OR NO KEY
    const openAIKey = process.env.OPENAI_API_KEY;
    if (!resultText && openAIKey && !openAIKey.includes("your_")) {
      try {
        const messages = [
          { role: "user", content: [{ type: "text", text: prompt }] },
        ];
        if (imageFile) {
          const base64Image = fs
            .readFileSync(imageFile.path)
            .toString("base64");
          messages[0].content.push({
            type: "image_url",
            image_url: {
              url: `data:${imageFile.mimetype};base64,${base64Image}`,
            },
          });
        }
        const response = await openai.chat.completions.create({
          model: "gpt-4o",
          messages: messages,
        });
        resultText = response.choices[0].message.content;
      } catch (oaErr) {
        console.error("OpenAI Fallback Error:", oaErr.message);
      }
    }

    if (imageFile) fs.unlinkSync(imageFile.path);
    res.json({
      text:
        resultText ||
        "I'm sorry, I'm having trouble connecting to my medical intelligence core. If this is an emergency, please call 108/911 immediately.",
    });
  } catch (error) {
    if (req.file) fs.unlinkSync(req.file.path);
    console.error("AI Error:", error);
    res.status(500).json({ error: "System overload. Please try again." });
  }
});

// Socket.IO Connection
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // User triggers SOS
  socket.on("send_sos", (data) => {
    const newAlert = {
      id: Date.now(),
      status: "pending",
      ...data,
      timestamp: new Date(),
    };
    alerts.push(newAlert);
    console.log("New SOS Alert:", newAlert);

    // Broadcast to all connected clients (e.g., dispatcher dashboard)
    io.emit("new_alert", newAlert);

    // Simulate "Real-time" dispatch after 3 seconds
    setTimeout(() => {
      const responders = [
        {
          id: "amb-1",
          type: "Ambulance",
          lat: data.coords.lat + 0.015,
          lng: data.coords.lng + 0.012,
          name: "City Hospital Unit 4",
        },
        {
          id: "pol-1",
          type: "Police",
          lat: data.coords.lat - 0.01,
          lng: data.coords.lng - 0.008,
          name: "Patrol Sector 7",
        },
      ];

      io.emit("alert_updated", {
        id: newAlert.id,
        status: "dispatched",
        responders,
      });

      // Move responders toward user over time
      let steps = 0;
      const moveInterval = setInterval(() => {
        steps++;
        responders.forEach((r) => {
          r.lat += (data.coords.lat - r.lat) * 0.15;
          r.lng += (data.coords.lng - r.lng) * 0.15;
        });

        io.emit("responder_move", {
          alertId: newAlert.id,
          responders,
        });

        if (steps > 20) clearInterval(moveInterval);
      }, 2000);
    }, 4000);
  });

  // Update Alert Status (Simulating response from backend/dispatcher)
  socket.on("update_alert_status", (data) => {
    const index = alerts.findIndex((a) => a.id === data.id);
    if (index !== -1) {
      alerts[index].status = data.status;
      io.emit("alert_updated", alerts[index]);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
