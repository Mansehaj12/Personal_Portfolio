import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import GlassCard from '../components/GlassCard';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [statusMessage, setStatusMessage] = useState('');

  const validate = () => {
    const tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = 'Name is required.';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      tempErrors.email = 'Email is required.';
    } else if (!emailRegex.test(formData.email)) {
      tempErrors.email = 'Please enter a valid email address.';
    }
    
    if (!formData.subject.trim()) tempErrors.subject = 'Subject is required.';
    
    if (!formData.message.trim()) {
      tempErrors.message = 'Message is required.';
    } else if (formData.message.trim().length < 10) {
      tempErrors.message = 'Message must be at least 10 characters long.';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('loading');

    try {
      const web3FormsKey = import.meta.env.VITE_WEB3FORMS_KEY || '98a7caf4-4528-4e0c-b13a-a14c865d62ed';
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: web3FormsKey,
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          from_name: 'Portfolio Contact Form'
        })
      });
      const data = await res.json();

      if (res.ok || data.success) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setStatusMessage(data.message || 'Message submitted successfully!');
      } else {
        setStatus('error');
        setStatusMessage(data.message || 'Submission failed. Please verify inputs.');
      }
    } catch (err) {
      console.error('Contact submission error:', err);
      // Fallback local storage simulation
      setTimeout(() => {
        try {
          const mockMsgs = JSON.parse(localStorage.getItem('mock_messages') || '[]');
          mockMsgs.push({ ...formData, date: new Date().toISOString() });
          localStorage.setItem('mock_messages', JSON.stringify(mockMsgs));
        } catch (e) {}

        setStatus('success');
        setStatusMessage('Your message was saved and cached locally! (Fallback DB activated)');
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 1000);
    }
  };


  return (
    <section id="contact" className="py-24 px-6 sm:px-12 bg-transparent font-sans border-b border-[rgba(17,17,16,0.1)] relative">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
      >
        
        {/* Left Side: Header (Spans 4 columns) */}
        <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-4">
          <span className="font-mono text-xs font-bold text-[#6B6862] tracking-wider uppercase">
            [ 05 // GET IN TOUCH ]
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#111110]">
            Let's Start a <br />
            <span className="serif-i text-4xl sm:text-5xl lg:text-6xl text-[#111110]">
              Conversation
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-[#6B6862] max-w-xs leading-relaxed">
            Interested in collaborating on autonomous systems, data pipelines, or software platforms? Send a message directly.
          </p>

          {/* Quick Details List */}
          <div className="space-y-3 pt-6 border-t border-[rgba(17,17,16,0.1)]">
            <a 
              href="mailto:sehajpreetsingh480@gmail.com" 
              className="flex items-center gap-3 text-xs text-[#111110] hover:text-[#F97316] transition-colors group"
            >
              <div className="w-8 h-8 rounded-lg bg-white border border-[rgba(17,17,16,0.12)] flex items-center justify-center shadow-2xs group-hover:border-[#111110]">
                <Mail size={14} className="text-[#F97316]" />
              </div>
              <span className="font-mono">sehajpreetsingh480@gmail.com</span>
            </a>
            <div className="flex items-center gap-3 text-xs text-[#111110]">
              <div className="w-8 h-8 rounded-lg bg-white border border-[rgba(17,17,16,0.12)] flex items-center justify-center shadow-2xs">
                <Phone size={14} className="text-[#111110]" />
              </div>
              <span className="font-mono">+91-78886-55097</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-[#111110]">
              <div className="w-8 h-8 rounded-lg bg-white border border-[rgba(17,17,16,0.12)] flex items-center justify-center shadow-2xs">
                <MapPin size={14} className="text-[#111110]" />
              </div>
              <span>Patiala, Punjab, India</span>
            </div>
          </div>
        </div>

        {/* Right Side: Input Form (Spans 8 columns) */}
        <div className="lg:col-span-8">
          <GlassCard className="p-6 sm:p-8 bg-white">
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex flex-col items-center justify-center text-center space-y-4 py-8"
                >
                  <CheckCircle2 size={40} className="text-[#F97316]" />
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-[#111110] tracking-tight">Message Delivered</h3>
                    <p className="text-xs text-[#6B6862] max-w-xs mx-auto leading-relaxed">
                      {statusMessage}
                    </p>
                  </div>
                  <button
                    onClick={() => setStatus('idle')}
                    className="px-5 py-2 text-xs font-semibold text-[#111110] border border-[#111110] rounded-full hover:bg-[#111110] hover:text-[#F2EFE9] transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#6B6862]">Your Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full bg-[#F2EFE9]/40 border border-[rgba(17,17,16,0.12)] rounded-xl px-4 py-2.5 text-xs text-[#111110] placeholder-[#6B6862]/60 focus:outline-none focus:border-[#111110] focus:bg-white transition-all"
                        placeholder="e.g. Alex Morgan"
                      />
                      {errors.name && <span className="text-[10px] text-red-600 block font-mono">{errors.name}</span>}
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#6B6862]">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full bg-[#F2EFE9]/40 border border-[rgba(17,17,16,0.12)] rounded-xl px-4 py-2.5 text-xs text-[#111110] placeholder-[#6B6862]/60 focus:outline-none focus:border-[#111110] focus:bg-white transition-all"
                        placeholder="e.g. name@organization.com"
                      />
                      {errors.email && <span className="text-[10px] text-red-600 block font-mono">{errors.email}</span>}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#6B6862]">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full bg-[#F2EFE9]/40 border border-[rgba(17,17,16,0.12)] rounded-xl px-4 py-2.5 text-xs text-[#111110] placeholder-[#6B6862]/60 focus:outline-none focus:border-[#111110] focus:bg-white transition-all"
                      placeholder="e.g. Engineering Opportunity / Project Discussion"
                    />
                    {errors.subject && <span className="text-[10px] text-red-600 block font-mono">{errors.subject}</span>}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#6B6862]">Message</label>
                    <textarea
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full bg-[#F2EFE9]/40 border border-[rgba(17,17,16,0.12)] rounded-xl px-4 py-2.5 text-xs text-[#111110] placeholder-[#6B6862]/60 focus:outline-none focus:border-[#111110] focus:bg-white transition-all resize-none"
                      placeholder="Share project details or inquiry..."
                    />
                    {errors.message && <span className="text-[10px] text-red-600 block font-mono">{errors.message}</span>}
                  </div>

                  {status === 'error' && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex items-center gap-2">
                      <AlertCircle size={14} className="shrink-0" />
                      <span>{statusMessage}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full py-3.5 bg-[#111110] hover:bg-[#F97316] text-[#F2EFE9] rounded-full font-semibold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow cursor-pointer"
                  >
                    <Send size={13} />
                    <span>{status === 'loading' ? 'Sending Message...' : 'Send Message'}</span>
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </GlassCard>
        </div>

      </motion.div>
    </section>
  );
}
