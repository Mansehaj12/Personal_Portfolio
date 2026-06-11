import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, CornerDownLeft } from 'lucide-react';

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Hi, I'm Mansehaj's portfolio assistant! 🤖 Ask me anything about his projects, skills, education, or how to contact him.",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const presets = [
    "Tell me about GameIQ",
    "What are your core ML skills?",
    "Are you open to internships?",
    "How do I contact you?"
  ];

  // Auto-scroll to latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (textToSend) => {
    const msgText = textToSend || input;
    if (!msgText.trim()) return;

    // Add user message
    const userMsg = {
      sender: 'user',
      text: msgText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const backendUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const res = await fetch(`${backendUrl}/api/chatbot`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msgText })
      });
      const data = await res.json();
      
      setMessages(prev => [...prev, {
        sender: 'bot',
        text: data.reply || "I couldn't query that successfully.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } catch (err) {
      console.error('Chatbot error:', err);
      // Fallback answers in case backend is loading/unavailable
      let fallbackReply = "I'm having trouble reaching the backend server right now, but I can tell you that Mansehaj Preet Singh is a Computer Engineering student at TIET (graduation 2027) and a Kaggle Expert specializing in Python, Machine Learning, and Web Development!";
      
      if (lower.includes('project') || lower.includes('gameiq') || lower.includes('powermro') || lower.includes('medismart')) {
        fallbackReply = "Mansehaj's projects include:\n• **MediSmart** (AI-assisted e-pharmacy platform & generic medicine swap portal using Tesseract.js OCR and Recharts)\n• **PowerMRO** (Industrial equipment health dashboard with Next.js & TypeScript calculating engine RUL)\n• **GameIQ** (ML-powered player analytics predicting churn for 90k+ users with 86.8% accuracy).";
      } else if (lower.includes('contact') || lower.includes('email') || lower.includes('phone')) {
        fallbackReply = "You can contact Mansehaj Preet Singh at **sehajpreetsingh480@gmail.com** or call **+91-78886-55097**.";
      } else if (lower.includes('skill') || lower.includes('python') || lower.includes('javascript')) {
        fallbackReply = "His technical skills span Python, JavaScript, C/C++, SQL, Flask, Node.js, Next.js, and ML libraries like Pandas, NumPy, Scikit-learn, and PyTorch.";
      }

      setMessages(prev => [...prev, {
        sender: 'bot',
        text: fallbackReply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="w-[360px] sm:w-[400px] h-[500px] rounded-2xl border border-slate-200/50 dark:border-white/10 glassmorphism dark:glassmorphism shadow-2xl flex flex-col overflow-hidden mb-4"
          >
            {/* Header */}
            <div className="px-4 py-3 bg-gradient-to-r from-indigo-600/80 via-purple-600/80 to-pink-600/80 backdrop-blur-md flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-2 text-white">
                <div className="p-1.5 bg-white/10 rounded-lg">
                  <Bot size={18} className="animate-pulse" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm leading-none">AI Recruiter Assistant</h3>
                  <span className="text-[10px] text-cyan-200">Online & responsive</span>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="text-white/80 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-full"
              >
                <X size={18} />
              </button>
            </div>

            {/* Message Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900/10 dark:bg-slate-950/20">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.sender === 'bot' && (
                    <div className="w-7 h-7 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center shrink-0">
                      <Bot size={14} className="text-indigo-400" />
                    </div>
                  )}
                  <div className={`max-w-[75%] rounded-2xl px-3.5 py-2 text-xs leading-relaxed ${
                    msg.sender === 'user' 
                      ? 'bg-indigo-600 text-white rounded-tr-none' 
                      : 'bg-white/10 dark:bg-white/5 border border-slate-200/20 dark:border-white/5 text-slate-800 dark:text-slate-100 rounded-tl-none'
                  }`}>
                    <p className="whitespace-pre-line">{msg.text}</p>
                    <span className="block text-[8px] text-right mt-1 opacity-60">{msg.time}</span>
                  </div>
                  {msg.sender === 'user' && (
                    <div className="w-7 h-7 rounded-full bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center shrink-0">
                      <User size={14} className="text-cyan-400" />
                    </div>
                  )}
                </div>
              ))}

              {loading && (
                <div className="flex gap-2.5 justify-start">
                  <div className="w-7 h-7 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center shrink-0">
                    <Bot size={14} className="text-indigo-400" />
                  </div>
                  <div className="bg-white/10 dark:bg-white/5 border border-slate-200/20 dark:border-white/5 rounded-2xl rounded-tl-none px-3.5 py-2.5 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Presets Grid */}
            {messages.length === 1 && (
              <div className="px-4 py-2 border-t border-slate-200/20 dark:border-white/5 bg-slate-900/5 dark:bg-slate-950/10 space-y-1">
                <span className="text-[10px] text-slate-500 dark:text-slate-400">Suggest questions:</span>
                <div className="grid grid-cols-2 gap-1.5">
                  {presets.map((preset, i) => (
                    <button
                      key={i}
                      onClick={() => handleSend(preset)}
                      className="text-[10px] text-left border border-slate-300/40 dark:border-white/5 hover:border-indigo-500/40 bg-white/20 dark:bg-white/5 hover:bg-indigo-600/10 hover:text-indigo-400 p-2 rounded-xl text-slate-700 dark:text-slate-300 transition-all duration-300"
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Box */}
            <div className="p-3 border-t border-slate-200/20 dark:border-white/5 bg-slate-900/10 dark:bg-slate-950/20 flex gap-2">
              <input
                type="text"
                placeholder="Ask me something..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                className="flex-1 bg-white/10 dark:bg-white/5 border border-slate-300/40 dark:border-white/10 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-indigo-500 text-slate-800 dark:text-white"
              />
              <button
                onClick={() => handleSend()}
                className="bg-indigo-600 hover:bg-indigo-500 text-white p-2 rounded-xl flex items-center justify-center transition-colors shadow-lg shadow-indigo-600/25"
              >
                <Send size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Launcher Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-600 text-white flex items-center justify-center shadow-xl shadow-indigo-600/30 border border-white/20 relative"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <MessageSquare size={24} />
            </motion.div>
          )}
        </AnimatePresence>
        {/* Pulse indicator */}
        {!isOpen && (
          <span className="absolute top-0 right-0 w-3 h-3 bg-cyan-400 rounded-full border border-white dark:border-[#09090b] animate-ping" />
        )}
      </motion.button>
    </div>
  );
}
