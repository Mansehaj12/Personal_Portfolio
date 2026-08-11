import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, Sparkles } from 'lucide-react';

// Lightweight, safe Markdown & Link Renderer
function FormattedMessage({ text }) {
  if (!text) return null;

  const paragraphs = text.split(/\n\n+/);

  return (
    <div className="space-y-2.5 text-xs sm:text-sm leading-relaxed">
      {paragraphs.map((paragraph, pIdx) => {
        const lines = paragraph.split('\n');
        return (
          <div key={pIdx} className="space-y-1.5">
            {lines.map((line, lIdx) => {
              const parsed = parseMarkdownInline(line);
              const isBullet = line.trim().startsWith('•') || line.trim().startsWith('-') || /^\d+\./.test(line.trim());
              return (
                <div key={lIdx} className={isBullet ? 'pl-3 relative' : ''}>
                  <p>{parsed}</p>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

function parseMarkdownInline(text) {
  // Regex to match **bold** and [label](url)
  const regex = /(\*\*(.*?)\*\*|\[(.*?)\]\((.*?)\))/g;
  const result = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      result.push(text.substring(lastIndex, match.index));
    }

    if (match[2] !== undefined) {
      // **bold**
      result.push(
        <strong key={match.index} className="font-semibold text-indigo-700 dark:text-indigo-300">
          {match[2]}
        </strong>
      );
    } else if (match[3] !== undefined && match[4] !== undefined) {
      // [label](url)
      result.push(
        <a
          key={match.index}
          href={match[4]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-600 dark:text-indigo-400 font-semibold underline underline-offset-2 hover:text-indigo-500 transition-colors break-all"
        >
          {match[3]}
        </a>
      );
    }
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    result.push(text.substring(lastIndex));
  }

  return result;
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Hi, I'm Mansehaj's AI assistant! 🤖 Ask me anything about his projects, skills, education, or how to contact him.",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const presets = [
    "Tell me about CareerLens SaaS",
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

    const userMsg = {
      sender: 'user',
      text: msgText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setLoading(true);

    const historyPayload = messages.slice(-4).map(m => ({
      role: m.sender === 'user' ? 'user' : 'assistant',
      content: m.text
    }));

    try {
      let backendUrl = import.meta.env.VITE_API_URL;
      if (!backendUrl) {
        if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
          backendUrl = 'http://localhost:5000';
        } else {
          backendUrl = '';
        }
      }

      const res = await fetch(`${backendUrl}/api/chatbot`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msgText, history: historyPayload })
      });
      const data = await res.json();
      
      setMessages(prev => [...prev, {
        sender: 'bot',
        text: data.reply || "I couldn't query that successfully.",
        poweredBy: data.poweredBy,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } catch (err) {
      console.error('Chatbot error:', err);
      const lower = msgText.toLowerCase();
      let fallbackReply = "I'm having trouble reaching the backend server right now, but I can tell you that Mansehaj Preet Singh is a Computer Engineering student at TIET (graduation 2027) and a Kaggle Expert specializing in Python, Machine Learning, and Web Development!";
      
      if (lower.includes('project') || lower.includes('capstone') || lower.includes('odd') || lower.includes('gameiq') || lower.includes('powermro') || lower.includes('medismart') || lower.includes('careerlens')) {
        fallbackReply = "Mansehaj's projects include:\n• **Capstone Project: Scenario-Based ODD Safety Framework for Automation in Indian Road Environments** (Perception-to-action safety pipeline using PyTorch SegNet, YOLOv8, GPU weather perturbation simulations, and Leaflet.js ODD engine)\n• **CareerLens** (AI-powered Job Market Intelligence & Placement Analytics SaaS utilizing Ridge Regression and Decision Tree models)\n• **MediSmart** (AI-assisted e-pharmacy platform & generic medicine swap portal using Tesseract.js OCR and Recharts)\n• **PowerMRO** (Industrial equipment health dashboard with Next.js & TypeScript calculating engine RUL)\n• **GameIQ** (ML-powered player analytics predicting churn for 90k+ users with 86.8% accuracy).";
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
    <div className="fixed bottom-3 right-3 sm:bottom-6 sm:right-6 z-[9999] font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.94 }}
            transition={{ type: 'spring', damping: 26, stiffness: 220 }}
            className="w-[calc(100vw-1.5rem)] sm:w-[440px] md:w-[480px] h-[calc(100vh-6.5rem)] sm:h-[620px] max-h-[640px] rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] flex flex-col overflow-hidden mb-2 sm:mb-4"
          >
            {/* Header */}
            <div className="px-5 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white flex items-center justify-between shadow-md">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/15 backdrop-blur-md rounded-2xl border border-white/20">
                  <Sparkles size={20} className="animate-pulse text-amber-200" />
                </div>
                <div>
                  <h3 className="font-bold text-base leading-tight tracking-wide">AI Portfolio Assistant</h3>
                  <span className="text-xs text-indigo-100 flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Real-Time Prompt Synthesis
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/15 rounded-full"
                title="Close Chat"
              >
                <X size={20} />
              </button>
            </div>

            {/* Message Scroll Area */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4.5 bg-slate-50/80 dark:bg-zinc-950/50">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.sender === 'bot' && (
                    <div className="w-8 h-8 rounded-2xl bg-indigo-600/15 border border-indigo-500/30 flex items-center justify-center shrink-0 mt-0.5">
                      <Bot size={16} className="text-indigo-600 dark:text-indigo-400" />
                    </div>
                  )}

                  <div className={`max-w-[85%] sm:max-w-[82%] rounded-2xl p-4 shadow-sm ${
                    msg.sender === 'user' 
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-tr-sm font-medium' 
                      : 'bg-white dark:bg-zinc-800/90 border border-slate-200/80 dark:border-zinc-700/70 text-slate-900 dark:text-slate-100 rounded-tl-sm'
                  }`}>
                    <FormattedMessage text={msg.text} />
                    <div className="flex items-center justify-between text-[10px] mt-2 pt-1.5 border-t border-black/5 dark:border-white/5 opacity-70 gap-2">
                      <span>{msg.poweredBy ? `✨ ${msg.poweredBy}` : ''}</span>
                      <span>{msg.time}</span>
                    </div>
                  </div>

                  {msg.sender === 'user' && (
                    <div className="w-8 h-8 rounded-2xl bg-purple-600/15 border border-purple-500/30 flex items-center justify-center shrink-0 mt-0.5">
                      <User size={16} className="text-purple-600 dark:text-purple-400" />
                    </div>
                  )}
                </div>
              ))}

              {loading && (
                <div className="flex gap-3 justify-start items-center">
                  <div className="w-8 h-8 rounded-2xl bg-indigo-600/15 border border-indigo-500/30 flex items-center justify-center shrink-0">
                    <Bot size={16} className="text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div className="bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-2 shadow-sm">
                    <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" />
                    <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-2 h-2 bg-pink-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Preset Suggestions */}
            {messages.length === 1 && (
              <div className="px-5 py-3 border-t border-slate-200/80 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 space-y-2">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 tracking-wide uppercase">Quick Suggestions:</span>
                <div className="flex flex-wrap gap-2">
                  {presets.map((preset, i) => (
                    <button
                      key={i}
                      onClick={() => handleSend(preset)}
                      className="text-xs font-medium border border-indigo-200 dark:border-zinc-700 bg-indigo-50/50 dark:bg-zinc-800 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white px-3 py-1.5 rounded-full text-indigo-700 dark:text-indigo-300 transition-all duration-200 shadow-sm"
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Form */}
            <div className="p-4 border-t border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex gap-2.5 items-center">
              <input
                type="text"
                placeholder="Ask me something about Mansehaj..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                className="flex-1 bg-slate-100 dark:bg-zinc-800/80 border border-slate-300 dark:border-zinc-700 rounded-2xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white placeholder:text-slate-400"
              />
              <button
                onClick={() => handleSend()}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white p-3 rounded-2xl flex items-center justify-center transition-all shadow-md hover:shadow-indigo-500/25 shrink-0"
                title="Send Message"
              >
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Launcher Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="w-14 h-14 rounded-full bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-600 text-white flex items-center justify-center shadow-2xl shadow-indigo-600/40 border-2 border-white/30 relative"
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
        {!isOpen && (
          <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-white dark:border-zinc-950 animate-ping" />
        )}
      </motion.button>
    </div>
  );
}
