import { useEffect, useRef, useState } from "react";
import {
  Bot,
  X,
  Send,
  Phone,
  Ambulance,
} from "lucide-react";

export default function FirstAidWindow({
  open,
  onClose,
}) {
  const [input, setInput] = useState("");

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hello 👋 Describe the emergency.",
    },
  ]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  if (!open) return null;

  const getReply = (msg) => {
    const text = msg.toLowerCase();

    if (text.includes("bleeding")) {
      return "Apply pressure using clean cloth immediately.";
    }

    if (text.includes("burn")) {
      return "Cool the burn under water for 10 minutes.";
    }

    if (text.includes("accident")) {
      return "Call emergency services immediately.";
    }

    if (text.includes("breathing")) {
      return "Breathing issue detected. Call 112 now.";
    }

    return "Stay calm. Help is on the way.";
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = {
      role: "user",
      text: input,
    };

    const botMessage = {
      role: "assistant",
      text: getReply(input),
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
      botMessage,
    ]);

    setInput("");
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">

      <div className="w-full max-w-4xl h-[90vh] bg-white rounded-[30px] shadow-2xl flex flex-col overflow-hidden">

        {/* HEADER */}
        <div className="bg-red-500 text-white p-5 flex items-center justify-between">

          <div className="flex items-center gap-3">
            <Bot size={28} />

            <div>
              <h2 className="text-xl font-bold">
                RoadSoS AI Assistant
              </h2>

              <p className="text-red-100 text-sm">
                Emergency Medical Guidance
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="hover:bg-white/20 p-2 rounded-xl"
          >
            <X />
          </button>
        </div>

        {/* CHAT */}
        <div className="flex-1 overflow-y-auto bg-gray-50 p-6">

          <div className="space-y-5">

            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.role === "assistant"
                    ? "justify-start"
                    : "justify-end"
                }`}
              >
                <div
                  className={`max-w-[80%] px-5 py-4 rounded-3xl ${
                    msg.role === "assistant"
                      ? "bg-white border border-gray-200"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            <div ref={messagesEndRef} />

          </div>
        </div>

        {/* FOOTER */}
        <div className="border-t border-gray-200 bg-white p-5">

          <div className="flex gap-3 mb-4">

            <a
              href="tel:112"
              className="bg-red-500 text-white px-5 py-3 rounded-2xl flex items-center gap-2"
            >
              <Phone size={18} />
              Emergency 112
            </a>

            <a
              href="tel:108"
              className="bg-green-500 text-white px-5 py-3 rounded-2xl flex items-center gap-2"
            >
              <Ambulance size={18} />
              Ambulance 108
            </a>

          </div>

          <div className="flex gap-3">

            <input
              type="text"
              value={input}
              onChange={(e) =>
                setInput(e.target.value)
              }
              onKeyDown={(e) =>
                e.key === "Enter" && sendMessage()
              }
              placeholder="Describe emergency..."
              className="flex-1 border border-gray-300 rounded-2xl px-4 py-3 outline-none"
            />

            <button
              onClick={sendMessage}
              className="bg-red-500 hover:bg-red-600 text-white px-5 rounded-2xl"
            >
              <Send size={20} />
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}