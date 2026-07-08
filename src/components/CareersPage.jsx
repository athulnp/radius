import { Link } from 'react-router-dom';
import { useReveal, Tag, ArrowRight, PrimaryBtn, SectionLabel, SiteHeader, SiteFooter } from './siteShared.jsx';

/* ─────────────────────────────────────────────
   Data
───────────────────────────────────────────── */
const WHY_CARDS = [
  {
    title: 'Work on Next-Generation Networks',
    desc: 'Build expertise in 5G Core, IMS, Cloud-Native Networks, Open RAN, AI, Automation, and Telecom Security.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
      </svg>
    ),
    accent: 'border-brand/20 bg-brand/5',
  },
  {
    title: 'Learn from Industry Experts',
    desc: 'Work with engineers having extensive experience delivering solutions for global telecom operators.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422A12.083 12.083 0 0112 21.5a12.083 12.083 0 01-6.16-10.922L12 14z" />
      </svg>
    ),
    accent: 'border-sky-500/20 bg-sky-500/5',
  },
  {
    title: 'Innovation-Driven Culture',
    desc: 'Our Innovation Lab encourages experimentation, research, automation, and product development — not just project delivery.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    accent: 'border-violet-500/20 bg-violet-500/5',
  },
  {
    title: 'Continuous Learning',
    desc: 'Access technical workshops, certification support, mentoring, hackathons, and knowledge-sharing sessions.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    accent: 'border-amber-500/20 bg-amber-500/5',
  },
  {
    title: 'Global Exposure',
    desc: 'Collaborate on international projects supporting telecom operators, MVNOs, technology vendors, and enterprise customers.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.6 9h16.8M3.6 15h16.8M12 3a15 15 0 010 18M12 3a15 15 0 000 18" />
      </svg>
    ),
    accent: 'border-emerald-500/20 bg-emerald-500/5',
  },
  {
    title: 'Grow With the Company',
    desc: "As Radius Core Labs grows, you'll have opportunities to take ownership, lead teams, and contribute to the company's long-term vision.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    accent: 'border-rose-500/20 bg-rose-500/5',
  },
];

const INNOVATION_ITEMS = [
  'Build automation tools',
  'Contribute to open-source projects',
  'Explore AI for telecom',
  'Publish technical articles',
  'Develop new products',
  'Participate in internal hackathons',
];


/* ─────────────────────────────────────────────
   Reusable card
───────────────────────────────────────────── */
function WhyCard({ card, index }) {
  const ref = useReveal(0.08);
  return (
    <article ref={ref}
      className={`reveal card-hover bg-navy-900 border ${card.accent} rounded-2xl p-7 flex flex-col`}
      style={{ transitionDelay: `${index * 60}ms` }}>
      <div className="w-11 h-11 rounded-xl bg-navy-800 border border-[var(--border-light)] flex items-center justify-center text-brand mb-5">
        {card.icon}
      </div>
      <h3 className="text-white font-semibold text-base mb-2">{card.title}</h3>
      <p className="text-[var(--text-muted)] text-sm leading-relaxed">{card.desc}</p>
    </article>
  );
}

/* ─────────────────────────────────────────────
   Page
───────────────────────────────────────────── */
export default function CareersPage() {
  const innovationRef = useReveal(0.1);

  return (
    <div className="bg-navy-950 text-slate-200 min-h-screen">
      <SiteHeader activeNav="careers" />

      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-14 sm:pb-20 px-4 sm:px-6 lg:px-10">
        <div className="absolute inset-0 bg-gradient-to-br from-brand/5 via-navy-950 to-navy-900 pointer-events-none" />
        <div className="absolute top-0 left-1/3 w-96 h-96 rounded-full bg-brand/5 blur-[120px] pointer-events-none" />
        <div className="max-w-4xl mx-auto relative text-center">
          <Tag>Careers at Radius Core Labs</Tag>
          <h1 className="fluid-hero font-bold text-white mb-5">
            Build a Career That <span className="text-gradient">Shapes Networks</span>
          </h1>
          <p className="fluid-lead text-[var(--text-muted)] leading-relaxed max-w-2xl mx-auto">
            Discover what makes Radius Core Labs a place where engineers grow — from next-generation telecom projects to an innovation-first culture.
          </p>
        </div>
      </section>

      {/* Why Radius Core Labs */}
      <section className="py-14 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-navy-900/30 pointer-events-none" />
        <div className="max-w-7xl mx-auto relative">
          <SectionLabel
            tag="Why Us"
            title={<>Why <span className="text-gradient">Radius Core Labs?</span></>}
            desc="What makes working here different — beyond generic benefits."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {WHY_CARDS.map((card, i) => (
              <WhyCard key={card.title} card={card} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Innovation */}
      <section className="py-14 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-900/50 to-navy-950 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand/4 rounded-full blur-[120px] pointer-events-none" />
        <div ref={innovationRef} className="reveal max-w-4xl mx-auto relative text-center">
          <Tag>Innovation</Tag>
          <h2 className="fluid-h2 font-bold text-white mb-4">
            Innovation Starts With <span className="text-gradient">Curious Minds</span>
          </h2>
          <p className="text-[var(--text-muted)] text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl mx-auto mb-10">
            At Radius Core Labs, innovation isn't a department — it's part of our culture. Every engineer is encouraged to:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-w-2xl mx-auto mb-12 text-left">
            {INNOVATION_ITEMS.map((item) => (
              <div key={item}
                className="flex items-center gap-3 bg-navy-900 border border-[var(--border)] rounded-xl px-4 py-3">
                <svg className="w-4 h-4 text-brand flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-slate-200 font-medium">{item}</span>
              </div>
            ))}
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-brand/20 bg-brand/5 px-6 py-8 sm:px-10 sm:py-10 max-w-2xl mx-auto">
            <p className="text-brand text-xs font-semibold uppercase tracking-[0.2em] mb-3">Our Goal Is Simple</p>
            <p className="fluid-h3 font-bold text-white">
              Create engineers who <span className="text-gradient">shape the future</span> — not just support it.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="fluid-h3 font-bold text-white mb-5">Ready to build the future with us?</h2>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <PrimaryBtn href="/#contact" size="lg">
              Get in Touch <ArrowRight />
            </PrimaryBtn>
            <Link to="/"
              className="inline-flex items-center gap-2 px-8 py-4 text-sm rounded-xl bg-navy-800/80 border border-[var(--border-light)] hover:border-brand/40 hover:text-brand text-slate-300 font-semibold transition-all duration-200">
              ← Back to Home
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <SiteFooter />
    </div>
  );
}
