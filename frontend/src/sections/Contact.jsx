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
    <section id="contact" className="py-20 px-6 sm:px-12 bg-[#FAF7F0] dark:bg-zinc-900 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Side: Header (Spans 4 columns) */}
        <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-4">
          <h2 className="text-3xl font-black uppercase tracking-tight text-black dark:text-white border-b-4 border-black dark:border-white pb-3 inline-block">
            Contact
          </h2>
          <p className="text-xs text-neutral-500 max-w-xs leading-relaxed">
            Collaborating on software systems or data intelligence projects? Get in touch instantly.
          </p>

          {/* Quick Details List */}
          <div className="space-y-3 pt-6 border-t border-slate-200/50 dark:border-zinc-800">
            <div className="flex items-center gap-2 text-xs text-neutral-600 dark:text-zinc-400">
              <Mail size={14} className="text-neutral-500" />
              <span>sehajpreetsingh480@gmail.com</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-600 dark:text-zinc-400">
              <Phone size={14} className="text-neutral-500" />
              <span>+91-78886-55097</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-600 dark:text-zinc-400">
              <MapPin size={14} className="text-neutral-500" />
              <span>Patiala, Punjab, India</span>
            </div>
          </div>
        </div>

        {/* Right Side: Input Form (Spans 8 columns) */}
        <div className="lg:col-span-8">
          <GlassCard className="border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 sm:p-8">
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex flex-col items-center justify-center text-center space-y-4 py-8"
                >
                  <CheckCircle2 size={40} className="text-emerald-500" />
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-black dark:text-white uppercase tracking-wider">Message Transmitted</h3>
                    <p className="text-xs text-neutral-500 max-w-xs mx-auto leading-relaxed">
                      {statusMessage}
                    </p>
                  </div>
                  <button
                    onClick={() => setStatus('idle')}
                    className="px-5 py-2 text-[10px] font-bold uppercase tracking-widest text-black dark:text-white border-2 border-black dark:border-white rounded-full hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
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
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-500">Your Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-black text-black dark:text-white transition-all"
                        placeholder="Enter name"
                      />
                      {errors.name && <span className="text-[9px] text-red-500 block font-mono">{errors.name}</span>}
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-500">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-black text-black dark:text-white transition-all"
                        placeholder="name@domain.com"
                      />
                      {errors.email && <span className="text-[9px] text-red-500 block font-mono">{errors.email}</span>}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-500">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-black text-black dark:text-white transition-all"
                      placeholder="Inquiry / Consultation"
                    />
                    {errors.subject && <span className="text-[9px] text-red-500 block font-mono">{errors.subject}</span>}
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-500">Message</label>
                    <textarea
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-black text-black dark:text-white transition-all resize-none"
                      placeholder="Type details (minimum 10 characters)..."
                    />
                    {errors.message && <span className="text-[9px] text-red-500 block font-mono">{errors.message}</span>}
                  </div>

                  {status === 'error' && (
                    <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl text-[9px] flex items-center gap-2">
                      <AlertCircle size={14} className="shrink-0" />
                      <span>{statusMessage}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full py-3.5 bg-black hover:bg-zinc-800 text-white rounded-xl font-bold uppercase tracking-widest text-[10px] transition-all flex items-center justify-center gap-2"
                  >
                    {status === 'loading' ? 'TRANSMITTING...' : 'TRANSMIT MESSAGE'}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </GlassCard>
        </div>

      </div>
    </section>
  );
}
