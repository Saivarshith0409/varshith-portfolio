import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Send, MessageSquareCode, CheckCircle2, Inbox, Calendar, Trash2 } from 'lucide-react';
import { PERSONAL_INFO } from '../data';
import { ContactMessage } from '../types';

export default function ContactHub() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', body: '' });
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [formSuccess, setFormSuccess] = useState(false);
  const [activePanel, setActivePanel] = useState<'form' | 'sent-box'>('form');

  // Load and sync messages from LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem('saivarshith_portfolio_messages');
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch (err) {
        console.error('Failed to parse logs.', err);
      }
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.body.trim()) return;

    const newMessage: ContactMessage = {
      id: Math.random().toString(36).substring(2, 9),
      name: formData.name,
      email: formData.email,
      subject: formData.subject || 'Generative Career Prospect',
      body: formData.body,
      timestamp: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updated = [newMessage, ...messages];
    setMessages(updated);
    localStorage.setItem('saivarshith_portfolio_messages', JSON.stringify(updated));

    // Reset Form & Show visual overlay toast
    setFormData({ name: '', email: '', subject: '', body: '' });
    setFormSuccess(true);
    setTimeout(() => {
      setFormSuccess(false);
      setActivePanel('sent-box'); // Auto switch tab to let them witness the message in their logs
    }, 2000);
  };

  const handleDeleteMessage = (msgId: string) => {
    const filtered = messages.filter(m => m.id !== msgId);
    setMessages(filtered);
    localStorage.setItem('saivarshith_portfolio_messages', JSON.stringify(filtered));
  };

  return (
    <section className="py-16 border-t border-slate-900/60 pb-24" id="contact">
      <div className="flex flex-col gap-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto flex flex-col gap-2">
          <span className="text-brand-500 font-mono text-xs font-semibold uppercase tracking-widest bg-brand-500/10 px-3.5 py-1.5 rounded-full border border-brand-500/20 inline-self-center self-center w-fit">
            Let's Collaborate
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white tracking-tight my-0">
            Get In Touch
          </h2>
          <p className="text-slate-400 text-sm m-0">
            Reach out via coordinates or try Sai Varshith's physical message buffer simulation.
          </p>
        </div>

        {/* Form and Contact details grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Details Panel */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-slate-950 border border-slate-900 p-6 rounded-2xl flex flex-col gap-6">
              <h3 className="text-base font-display font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-900 pb-3">
                Contact Details
              </h3>

              <div className="flex flex-col gap-5 text-sm">
                {/* Email address info */}
                <div className="flex items-start gap-4">
                  <span className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-brand-500">
                    <Mail className="w-5 h-5" />
                  </span>
                  <div>
                    <span className="text-[10px] uppercase font-mono text-slate-500 block">Personal Email</span>
                    <a href={`mailto:${PERSONAL_INFO.email}`} className="text-xs md:text-sm font-semibold text-slate-300 hover:text-white transition-colors block mt-0.5 break-all">
                      {PERSONAL_INFO.email}
                    </a>
                  </div>
                </div>

                {/* Telephone handle info */}
                <div className="flex items-start gap-4">
                  <span className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-brand-500">
                    <Phone className="w-5 h-5" />
                  </span>
                  <div>
                    <span className="text-[10px] uppercase font-mono text-slate-500 block">Mobile Phone</span>
                    <a href={`tel:${PERSONAL_INFO.phone}`} className="text-xs md:text-sm font-semibold text-slate-300 hover:text-white transition-colors block mt-0.5">
                      {PERSONAL_INFO.phone}
                    </a>
                  </div>
                </div>

                {/* Geographic coordinates */}
                <div className="flex items-start gap-4">
                  <span className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-brand-500">
                    <MapPin className="w-5 h-5" />
                  </span>
                  <div>
                    <span className="text-[10px] uppercase font-mono text-slate-500 block">Current Location</span>
                    <span className="text-xs md:text-sm font-semibold text-slate-300 block mt-0.5">
                      {PERSONAL_INFO.location}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Resume metadata notification */}
            <div className="bg-slate-950/40 border border-slate-900 p-5 rounded-2xl">
              <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-2">
                <MessageSquareCode className="w-4 h-4 text-brand-500" /> State Engine
              </h4>
              <p className="text-[11px] text-slate-500 leading-normal font-sans">
                Submissions made on this page are stored securely in browser-level sandbox index containers (<code className="text-[10px] text-brand-500 font-mono">localStorage</code>). Try sending a test query and verify its mapping record inside the telemetry sandbox tabs!
              </p>
            </div>
          </div>

          {/* Right Interactive Messaging Pane */}
          <div className="lg:col-span-8 bg-slate-950 border border-slate-900 rounded-3xl overflow-hidden flex flex-col">
            {/* Header selection bars */}
            <div className="bg-slate-900 border-b border-slate-900/40 p-4 flex items-center justify-between">
              <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800/80">
                <button
                  onClick={() => setActivePanel('form')}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold font-display transition-all flex items-center gap-1.5 cursor-pointer ${
                    activePanel === 'form' 
                      ? 'bg-slate-800 text-brand-500 shadow-sm' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                  id="tab-contact-form"
                >
                  <Send className="w-3.5 h-3.5" />
                  Compose Letter
                </button>
                <button
                  onClick={() => setActivePanel('sent-box')}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold font-display transition-all flex items-center gap-1.5 cursor-pointer ${
                    activePanel === 'sent-box' 
                      ? 'bg-slate-800 text-brand-500 shadow-sm' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                  id="tab-contact-logs"
                >
                  <Inbox className="w-3.5 h-3.5" />
                  Sent Console ({messages.length})
                </button>
              </div>

              <span className="flex items-center gap-1 text-slate-500 text-[10px] font-mono select-none uppercase font-bold">
                <MessageSquareCode className="w-3.5 h-3.5 text-emerald-500" /> Msg Buff
              </span>
            </div>

            {/* Inner Content Area */}
            <div className="p-6 md:p-8 min-h-[360px]">
              <AnimatePresence mode="wait">
                {activePanel === 'form' ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleFormSubmit}
                    className="flex flex-col gap-4 text-left"
                    id="contact-form"
                  >
                    {formSuccess ? (
                      <motion.div 
                        initial={{ scale: 0.95 }}
                        animate={{ scale: 1 }}
                        className="bg-brand-500/10 border border-brand-500/30 text-center py-10 px-4 rounded-2xl flex flex-col items-center justify-center gap-3 h-full"
                        id="form-success-toast"
                      >
                        <CheckCircle2 className="w-12 h-12 text-brand-500 animate-bounce" />
                        <h4 className="text-sm font-bold text-white font-display">Message Buffering Initiated</h4>
                        <p className="text-xs text-slate-400 max-w-sm">
                          Your message packet has been mapped to LocalStorage state registry. Transferring view to the Sent Console log...
                        </p>
                      </motion.div>
                    ) : (
                      <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="flex flex-col gap-1.5">
                            <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-semibold pl-1">Your Full Name</label>
                            <input
                              type="text"
                              name="name"
                              required
                              value={formData.name}
                              onChange={handleInputChange}
                              className="bg-slate-900 border border-slate-800/80 rounded-xl px-4 py-3 text-xs text-slate-200 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/30 transition-all font-sans"
                              placeholder="Name/Recruiter..."
                              id="form-input-name"
                            />
                          </div>
                          
                          <div className="flex flex-col gap-1.5">
                            <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-semibold pl-1">Digital Email Address</label>
                            <input
                              type="email"
                              name="email"
                              required
                              value={formData.email}
                              onChange={handleInputChange}
                              className="bg-slate-900 border border-slate-800/80 rounded-xl px-4 py-3 text-xs text-slate-200 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/30 transition-all font-sans"
                              placeholder="recruiter@company.com..."
                              id="form-input-email"
                            />
                          </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-semibold pl-1">Topic/Subject Line</label>
                          <input
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            className="bg-slate-900 border border-slate-800/80 rounded-xl px-4 py-3 text-xs text-slate-200 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/30 transition-all font-sans"
                            placeholder="Engineering Internship / Professional Chat..."
                            id="form-input-subject"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-semibold pl-1">Message Body</label>
                          <textarea
                            name="body"
                            required
                            rows={5}
                            value={formData.body}
                            onChange={handleInputChange}
                            className="bg-slate-900 border border-slate-800/80 rounded-xl p-4 text-xs text-slate-200 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/30 transition-all resize-none font-sans"
                            placeholder="Write your details or internship queries here..."
                            id="form-input-body"
                          />
                        </div>

                        <button
                          type="submit"
                          className="bg-brand-500 hover:bg-brand-600 active:scale-98 text-slate-950 px-6 py-3.5 rounded-xl font-display font-bold text-sm flex items-center justify-center gap-2 transition-all mt-2 cursor-pointer shadow-lg shadow-brand-500/10"
                          id="btn-submit-contact"
                        >
                          <Send className="w-4 h-4" />
                          Transmit Message State
                        </button>
                      </>
                    )}
                  </motion.form>
                ) : (
                  <motion.div
                    key="sent-box"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col gap-4 text-left"
                    id="contact-sent-container"
                  >
                    <div className="flex items-center justify-between border-b border-slate-900 pb-3 mb-1">
                      <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                        Stored Message Packet History
                      </h4>
                      <span className="text-[10px] text-slate-500 font-mono bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                        {messages.length} log records
                      </span>
                    </div>

                    {messages.length > 0 ? (
                      <div className="flex flex-col gap-3 max-h-[300px] overflow-y-auto scrollbar-hide">
                        {messages.map((msg) => (
                          <div 
                            key={msg.id} 
                            className="bg-slate-900/50 border border-slate-800/60 p-4 rounded-xl relative hover:border-slate-700 transition-all group"
                          >
                            <button
                              onClick={() => handleDeleteMessage(msg.id)}
                              className="absolute top-3 right-3 p-1.5 text-slate-500 hover:text-red-400 hover:bg-slate-950 rounded bg-transparent transition-colors cursor-pointer"
                              title="Delete Record"
                              id={`delete-msg-${msg.id}`}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>

                            <div className="flex flex-col gap-1 pr-6">
                              <span className="text-[10px] font-mono text-slate-500 font-semibold flex items-center gap-1">
                                <Calendar className="w-3 h-3 text-brand-500" /> {msg.timestamp}
                              </span>
                              <h5 className="text-sm font-bold text-white font-display mt-1">{msg.subject}</h5>
                              <p className="text-[11px] text-slate-400 mt-1 leading-normal font-sans">
                                {msg.body}
                              </p>
                              
                              <div className="flex flex-wrap gap-2 text-[9px] font-mono text-slate-500 mt-3 border-t border-slate-900 pt-2">
                                <span>Sender: <strong className="text-slate-300 font-normal">{msg.name}</strong></span>
                                <span className="hidden sm:inline">|</span>
                                <span>Email ID: <strong className="text-slate-300 font-normal">{msg.email}</strong></span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center text-center py-12 gap-3 min-h-[220px]">
                        <Inbox className="w-10 h-10 text-slate-700 animate-pulse" />
                        <h4 className="text-xs font-bold text-slate-400 font-display">Telemetry Buffer Empty</h4>
                        <p className="text-[11px] text-slate-500 max-w-xs">
                          Compose and send a message using the editor form. It will be mapped here instantly!
                        </p>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
