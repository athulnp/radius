import { useEffect, useRef, useState } from 'react';

/* ─────────────────────────────────────────────
   Radius Assistant — free, rule-based chat.
   No external API: answers come from a local
   knowledge base with keyword intent matching.
   Open it from anywhere via:
     window.dispatchEvent(new Event('open-chat'))
───────────────────────────────────────────── */

const CONTACT = {
  email: 'hello@radiuscorelabs.com',
  whatsapp:
    'https://wa.me/919847099911?text=' +
    encodeURIComponent("Hi Radius Core, I'd like to chat about telecom testing."),
};

/* Each intent: keywords matched against the visitor's message (case-insensitive),
   and the reply. First intent whose keywords hit wins; ties go to more hits. */
const INTENTS = [
  {
    keywords: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening'],
    reply:
      "Hello! 👋 I'm the Radius Core assistant. Ask me about our testing services, the industries and technologies we cover, careers, or how to get in touch.",
  },
  {
    keywords: ['service', 'testing', 'test', 'offer', 'what do you do', 'validation', 'qa'],
    reply:
      'We provide end-to-end telecom testing: 5G Core (SA/NSA) validation, EPC testing, IMS & VoLTE, international roaming, network performance and load testing, test automation, compliance & audit, and consulting. Which area are you interested in?',
  },
  {
    keywords: ['5g', 'core', 'sa', 'nsa', 'slice'],
    reply:
      'Our 5G Core practice covers end-to-end SA/NSA core testing, network-slice validation, and performance assurance — from lab validation through pre-production sign-off.',
  },
  {
    keywords: ['ims', 'volte', 'vilte', 'vowifi', 'voice', 'sms', 'call'],
    reply:
      'We do comprehensive IMS and voice-service testing: VoLTE, ViLTE, VoWiFi, SMS, SIP, SRVCC, and emergency calling — interop and regression across vendors.',
  },
  {
    keywords: ['roaming', 'interop', 'plmn', 'steering'],
    reply:
      'We validate international and inter-PLMN roaming: LTE/VoLTE/5G roaming, steering, interworking, and IR testing with partner assurance.',
  },
  {
    keywords: ['automation', 'ci/cd', 'cicd', 'pipeline', 'robot', 'python'],
    reply:
      'We build CI/CD-native telecom test automation using Python, Robot Framework, Jenkins, GitLab, and REST APIs — reducing manual effort and speeding up releases.',
  },
  {
    keywords: ['performance', 'load', 'stress', 'capacity', 'benchmark', 'latency', 'throughput'],
    reply:
      'Our performance practice covers load, stress, and capacity benchmarking at scale — latency, throughput, and KPI validation for optimal network performance.',
  },
  {
    keywords: ['cloud', 'kubernetes', 'docker', 'aws', 'azure', 'openshift', 'helm'],
    reply:
      'We validate cloud-native telecom deployments on Kubernetes, Docker, OpenShift, AWS, and Azure — including Helm-based deployment testing.',
  },
  {
    keywords: ['industr', 'operator', 'mvno', 'mno', 'enterprise', 'vendor', 'who do you work'],
    reply:
      'We work with mobile network operators, MVNOs & MVNEs, equipment vendors, enterprises, cloud providers, telecom startups, and automotive & IoT players — from greenfield MVNOs to tier-1 carriers across 4 continents.',
  },
  {
    keywords: ['career', 'job', 'join', 'hiring', 'vacancy', 'intern', 'graduate', 'work with you', 'apply'],
    reply:
      'We hire both students/graduates and experienced professionals — engineering roles across 4G, 5G, IMS, Packet Core, Cloud, and AI. Visit our Careers page (in the top navigation) or email us at ' +
      CONTACT.email +
      ' with your CV.',
  },
  {
    keywords: ['about', 'company', 'who are you', 'founded', 'mission', 'vision', 'team'],
    reply:
      'Radius Core Labs is a specialized telecom engineering company founded by telecom engineers, with 12+ years of experience and 50+ operators served. Our mission: make telecom testing rigorous, automated, and accessible — eliminating network failures before they reach production.',
  },
  {
    keywords: ['price', 'pricing', 'cost', 'quote', 'rate', 'budget', 'how much'],
    reply:
      'Pricing depends on scope — network type, test coverage, and duration. Email us at ' +
      CONTACT.email +
      ' with a short description of your project and we\'ll get back with a tailored quote.',
  },
  {
    keywords: ['contact', 'email', 'reach', 'talk', 'human', 'phone', 'whatsapp', 'sales'],
    reply:
      'You can reach the team at ' +
      CONTACT.email +
      ', or chat with a human on WhatsApp using the button below. We usually respond within one business day.',
    showHandoff: true,
  },
  {
    keywords: ['thank', 'thanks', 'great', 'awesome', 'bye', 'goodbye'],
    reply: "You're welcome! If anything else comes up, I'm right here. 😊",
  },
];

const FALLBACK = {
  reply:
    "I'm not sure about that one — I can help with our services, industries, technologies, careers, and contact details. For anything else, the team is happy to help directly:",
  showHandoff: true,
};

function matchIntent(text) {
  const q = text.toLowerCase();
  let best = null;
  let bestScore = 0;
  for (const intent of INTENTS) {
    const score = intent.keywords.reduce((n, k) => (q.includes(k) ? n + 1 : n), 0);
    if (score > bestScore) { best = intent; bestScore = score; }
  }
  return best || FALLBACK;
}

const QUICK_QUESTIONS = [
  'What services do you offer?',
  'Which industries do you serve?',
  'Are you hiring?',
  'How do I contact the team?',
];

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
