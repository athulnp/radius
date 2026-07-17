import { useEffect, useRef, useState } from 'react';
import { CONTACT, QUICK_QUESTIONS, matchIntent } from './chatKnowledge.js';

/* ─────────────────────────────────────────────
   Radius Assistant — free, rule-based chat.
   No external API: answers come from a local
   knowledge base with keyword intent matching.
   Open it from anywhere via:
     window.dispatchEvent(new Event('open-chat'))
   To add or edit answers, edit chatKnowledge.js.
───────────────────────────────────────────── */

function Handoff() {
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      <a href={`mailto:${CONTACT.email}`}
        className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-brand hover:bg-brand-hover text-white transition-colors">
        Email us
      </a>
      <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer"
        className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-[var(--border-light)] text-slate-300 hover:text-white hover:border-brand/50 transition-colors">
        WhatsApp
      </a>
    </div>
  );
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      text: "Hi! 👋 I'm the Radius Core assistant. Ask me anything about our telecom testing services, careers, or how to reach the team.",
    },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bodyRef = useRef(null);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener('open-chat', onOpen);
    return () => window.removeEventListener('open-chat', onOpen);
  }, []);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, typing, open]);

  const send = (text) => {
    const trimmed = text.trim();
    if (!trimmed || typing) return;
    setMessages((m) => [...m, { role: 'user', text: trimmed }]);
    setInput('');
    setTyping(true);
    const intent = matchIntent(trimmed);
    // Small delay so replies feel conversational rather than instant.
    setTimeout(() => {
      setMessages((m) => [...m, { role: 'bot', text: intent.reply, handoff: intent.showHandoff }]);
      setTyping(false);
    }, 500 + Math.min(trimmed.length * 8, 700));
  };

  return (
    <>
      {/* Floating launcher */}
      <button onClick={() => setOpen(!open)} aria-label={open ? 'Close chat' : 'Open chat'}
        className="fixed bottom-5 right-5 z-[60] w-14 h-14 rounded-full bg-brand hover:bg-brand-hover text-white shadow-card-lg flex items-center justify-center transition-all duration-200 active:scale-95">
        {open ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>

      {/* Panel */}
      <div className={`fixed z-[60] bottom-24 right-5 left-5 sm:left-auto sm:w-[380px] max-h-[70vh] flex flex-col rounded-2xl border border-[var(--border)] bg-navy-900/95 backdrop-blur-xl shadow-card-lg overflow-hidden transition-all duration-300 origin-bottom-right ${
        open ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'
      }`}>
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--border)] bg-navy-800/60">
          <div className="relative w-9 h-9 rounded-xl bg-brand/15 border border-brand/30 flex items-center justify-center text-brand">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-navy-900" />
          </div>
          <div className="flex-1">
            <p className="text-white text-sm font-semibold leading-tight">Radius Assistant</p>
            <p className="text-[var(--text-subtle)] text-[11px]">Instant answers · no wait</p>
          </div>
          <button onClick={() => setOpen(false)} aria-label="Close chat"
            className="w-8 h-8 flex items-center justify-center rounded-lg text-[var(--text-muted)] hover:text-white hover:bg-navy-800 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div ref={bodyRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-[260px]">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                m.role === 'user'
                  ? 'bg-brand text-white rounded-br-md'
                  : 'bg-navy-800 border border-[var(--border)] text-slate-200 rounded-bl-md'
              }`}>
                {m.text}
                {m.handoff && <Handoff />}
              </div>
            </div>
          ))}
          {typing && (
            <div className="flex justify-start">
              <div className="bg-navy-800 border border-[var(--border)] rounded-2xl rounded-bl-md px-4 py-3 flex gap-1.5">
                {[0, 1, 2].map((d) => (
                  <span key={d} className="w-1.5 h-1.5 rounded-full bg-[var(--text-muted)] animate-bounce"
                    style={{ animationDelay: `${d * 150}ms` }} />
                ))}
              </div>
            </div>
          )}
          {/* Quick questions — shown until the visitor sends something */}
          {messages.length === 1 && !typing && (
            <div className="flex flex-wrap gap-2 pt-1">
              {QUICK_QUESTIONS.map((q) => (
                <button key={q} onClick={() => send(q)}
                  className="text-xs px-3 py-1.5 rounded-full border border-[var(--border-light)] text-slate-300 hover:text-brand hover:border-brand/50 transition-colors">
                  {q}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Input */}
        <form onSubmit={(e) => { e.preventDefault(); send(input); }}
          className="flex items-center gap-2 px-3 py-3 border-t border-[var(--border)] bg-navy-800/40">
          <input value={input} onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question…"
            className="flex-1 bg-navy-800 border border-[var(--border)] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-[var(--text-subtle)] outline-none focus:border-brand/50 transition-colors" />
          <button type="submit" aria-label="Send message" disabled={!input.trim() || typing}
            className="w-10 h-10 rounded-xl bg-brand hover:bg-brand-hover disabled:opacity-40 disabled:hover:bg-brand text-white flex items-center justify-center transition-all active:scale-95">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </form>
      </div>
    </>
  );
}
