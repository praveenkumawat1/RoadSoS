import { useEffect, useRef, useState } from "react";
import {
  Bot,
  X,
  Send,
  Phone,
  Ambulance,
  Camera,
  Image as ImageIcon,
  Loader2,
} from "lucide-react";

export default function FirstAidWindow({ open, onClose }) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hello I'm Rescue AI. Describe the emergency or upload a photo of the injury for immediate guidance.",
    },
  ]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  if (!open) return null;

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() && !selectedImage) return;

    const currentInput = input;
    const currentImagePreview = imagePreview;

    const userMessage = {
      role: "user",
      text: currentInput,
      image: currentImagePreview,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setSelectedImage(null);
    setImagePreview(null);
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("prompt", currentInput || "Analyze this situation.");
      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      const res = await fetch("http://localhost:5000/api/rescue-ai/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: data.text || "I'm having trouble analyzing this right now.",
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Error connecting to Rescue AI. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-4 md:p-6 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-lg h-[80vh] md:h-[650px] rounded-[2rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden border border-white/20 animate-in slide-in-from-bottom-12 duration-500">
        {/* HEADER: Professional Design */}
        <div className="bg-slate-900 text-white p-6 flex items-center justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 rounded-full blur-3xl -mr-16 -mt-16" />
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center shadow-lg">
              <Bot size={28} className="text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg tracking-tight">Rescue AI</h3>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                  Protocol Active
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center transition-all active:scale-95 border border-white/10"
          >
            <X size={20} />
          </button>
        </div>

        {/* MESSAGES */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar bg-slate-50/50">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] px-5 py-3 rounded-2xl font-medium text-sm leading-relaxed shadow-sm ${
                  m.role === "user"
                    ? "bg-red-600 text-white rounded-tr-none"
                    : "bg-white text-slate-800 rounded-tl-none border border-slate-100"
                }`}
              >
                {m.image && (
                  <img
                    src={m.image}
                    alt="Upload"
                    className="w-full h-auto rounded-lg mb-2 border border-white/20"
                  />
                )}
                {m.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white text-slate-800 rounded-2xl rounded-tl-none border border-slate-100 px-5 py-3 shadow-sm flex items-center gap-3">
                <Loader2 className="animate-spin text-red-600" size={18} />
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  Rescue AI is analyzing...
                </span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* INPUT */}
        <div className="p-6 bg-white border-t border-slate-100">
          {imagePreview && (
            <div className="mb-4 relative w-20 h-20">
              <img
                src={imagePreview}
                className="w-20 h-20 object-cover rounded-xl border-2 border-red-500"
                alt="Preview"
              />
              <button
                onClick={() => {
                  setSelectedImage(null);
                  setImagePreview(null);
                }}
                className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 shadow-lg"
              >
                <X size={12} />
              </button>
            </div>
          )}
          <div className="relative flex items-center gap-3">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleImageSelect}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-4 bg-slate-50 border border-slate-200 text-slate-400 rounded-2xl hover:text-red-600 transition-all"
            >
              <Camera size={24} />
            </button>
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Ask Rescue AI..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                disabled={loading}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-6 pr-14 py-4 outline-none focus:ring-4 focus:ring-red-500/10 focus:border-red-500 transition-all font-medium text-slate-700"
              />
              <button
                onClick={sendMessage}
                disabled={loading}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all shadow-lg shadow-red-200 disabled:opacity-50"
              >
                <Send size={20} />
              </button>
            </div>
          </div>

          <div className="flex gap-2 mt-4 overflow-x-auto no-scrollbar pb-2">
            {["Bleeding", "Burn", "Fracture", "CPR"].map((label) => (
              <button
                key={label}
                onClick={() => setInput(`How to treat ${label.toLowerCase()}?`)}
                className="shrink-0 bg-white border border-slate-200 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-500 hover:border-red-500 hover:text-red-500 transition-all shadow-sm"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
