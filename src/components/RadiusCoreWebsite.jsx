import { useState, useEffect, useRef, useCallback } from 'react';
import AutoSlider from './AutoSlider.jsx';

/* ─────────────────────────────────────────────
   Hook: fire once when element enters viewport
───────────────────────────────────────────── */
function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible');
          obs.unobserve(el);
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return ref;
}

/* ─────────────────────────────────────────────
   Logo
   Crops the PNG's built-in white margins with
   precise negative-margin offsets derived from
   the actual image measurements:
     - Top/bottom margin ≈ 16% each
     - Left margin ≈ 7.2%, right ≈ 7.3%
     - Content fills 68% of height, 85.5% of width
     - Image aspect ratio ≈ 1.784 : 1
───────────────────────────────────────────── */
function Logo({ contentHeight = 36 }) {
  const imgH = Math.round(contentHeight / 0.68);
  const imgW = Math.round(imgH * 1.784);
  const mt   = -Math.round(imgH * 0.16);
  // Leave ~6 px white breathing room on each side: back off left crop by 6 px,
  // and widen the container by 12 px so the right gets equal space.
  const ml   = -Math.round(imgW * 0.072) + 6;
  const w    = Math.round(imgW * 0.855) + 12;

  return (
    <div
      className="overflow-hidden rounded-md bg-white flex-shrink-0"
      style={{ width: w, height: contentHeight }}
    >
      <img
        src="/logo.png"
        alt="Radius Core"
        style={{ height: imgH, width: 'auto', maxWidth: 'none', marginTop: mt, marginLeft: ml, display: 'block' }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────
   Data
───────────────────────────────────────────── */
const NAV_LINKS = [
  ['Services',  'services'],
  ['Expertise', 'expertise'],
  ['About',     'about'],
  ['Contact',   'contact'],
];

const SERVICES = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
      </svg>
    ),
    title: 'Protocol Testing',
    desc: 'Deep packet inspection and conformance testing across SS7, Diameter, SIP, and GTP stacks.',
    tags: ['SS7', 'Diameter', 'SIP', 'GTP'],
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'QA Automation',
    desc: 'End-to-end automation frameworks purpose-built for telecom CI/CD pipelines and regression suites.',
    tags: ['CI/CD', 'Regression', 'Scripting'],
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
      </svg>
    ),
    title: '5G / NR Validation',
    desc: 'Production-grade 5G NR, NSA/SA architecture validation for RAN, core, and edge deployments.',
    tags: ['5G NR', 'NSA', 'SA', 'Edge'],
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Network Assurance',
    desc: 'Continuous monitoring, fault detection, and production-grade network assurance across the full stack.',
    tags: ['Monitoring', 'Fault Detection', 'SLA'],
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    title: 'IMS / VoLTE Testing',
    desc: 'Comprehensive IMS stack validation including VoLTE, VoWiFi, and multimedia telephony sessions.',
    tags: ['IMS', 'VoLTE', 'VoWiFi', 'RCS'],
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    title: 'Performance Engineering',
    desc: 'Load testing, capacity planning, and performance benchmarking for telecom infrastructure at scale.',
    tags: ['Load Testing', 'Benchmarking', 'Capacity'],
  },
];

const STATS = [
  { value: '500+',  label: 'Test Cases' },
  { value: '50+',   label: 'Operators' },
  { value: '99.9%', label: 'Detection Rate' },
  { value: '10+',   label: 'Years' },
];

const FEATURES = [
  'Packet core & IMS deep protocol expertise',
  'Automated regression on live network stacks',
  'Zero-defect delivery methodology',
  'Agile & DevOps-native CI/CD workflows',
  'Protocol-level trace debug & analysis',
  'Full MVNO & greenfield operator support',
];

const SLIDE_DATA = [
  {
    label: 'Core Services',
    tag: 'What We Deliver',
    title: 'Telecom Engineering\nExcellence',
    desc: 'Comprehensive testing, automation, and validation for modern telecom networks — from RAN to core.',
    cta: 'Explore Services',
    target: 'services',
    metrics: [
      { v: '500+', l: 'Test Cases' },
      { v: '6',    l: 'Disciplines' },
      { v: '100%', l: 'Coverage' },
    ],
  },
  {
    label: 'Why Radius Core',
    tag: 'Our Expertise',
    title: 'Telecom-Native\nValidation',
    desc: 'Deep expertise in packet core, IMS, 5G, and production-grade network assurance — built for engineers by engineers.',
    cta: 'Our Approach',
    target: 'expertise',
    metrics: [
      { v: '95%',  l: 'Automation' },
      { v: '2×',   l: 'Faster Deploy' },
      { v: '15+',  l: 'Protocol Layers' },
    ],
  },
  {
    label: 'Get In Touch',
    tag: "Let's Build Together",
    title: 'Ready to Transform\nYour Testing?',
    desc: 'Partner with Radius Core for precision engineering and intelligent telecom validation at any scale.',
    cta: 'Contact Us',
    target: 'contact',
    metrics: [
      { v: '50+',   l: 'Operators' },
      { v: '10+',   l: 'Years' },
      { v: '99.9%', l: 'Detection' },
    ],
  },
];

/* ─────────────────────────────────────────────
   Small reusable primitives
───────────────────────────────────────────── */

function Tag({ children }) {
  return (
    <p className="text-brand text-xs font-semibold uppercase tracking-[0.18em] mb-3">
      {children}
    </p>
  );
}

function PrimaryBtn({ onClick, children, href }) {
  const cls =
    'inline-flex items-center gap-2 bg-brand hover:bg-brand-hover text-white font-semibold px-6 py-3 rounded-xl transition-colors duration-200 shadow-brand text-sm leading-none';
  if (href) return <a href={href} className={cls}>{children}</a>;
  return <button onClick={onClick} className={cls}>{children}</button>;
}

function GhostBtn({ onClick, children }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 bg-navy-800 border border-[var(--border-light)] hover:border-brand/40 hover:text-brand text-slate-300 font-semibold px-6 py-3 rounded-xl transition-colors duration-200 text-sm leading-none"
    >
      {children}
    </button>
  );
}

function ArrowRight() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

function SectionLabel({ tag, title, desc, align = 'center' }) {
  const ref = useReveal();
  const alignCls = align === 'left' ? 'text-left' : 'text-center mx-auto';
  return (
    <div ref={ref} className={`reveal mb-12 md:mb-16 max-w-2xl ${alignCls}`}>
      <Tag>{tag}</Tag>
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">{title}</h2>
      {desc && <p className="text-[var(--text-muted)] text-base md:text-lg leading-relaxed">{desc}</p>}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Hero — right-column visual
───────────────────────────────────────────── */
function HeroVisual() {
  // logo-icon.png is square with ~10% white margin on all sides.
  // Render the PNG at iconFull px then crop equally on all sides so the
  // visible container shows only the orange icon with no white margin.
  const iconFull = 96;          // rendered PNG size (square)
  const margin   = Math.round(iconFull * 0.10);  // 10% white border
  const iconSize = iconFull - margin * 2;        // visible content area

  return (
    <div className="relative flex items-center justify-center select-none min-h-[340px] sm:min-h-[400px] lg:min-h-[460px]">
      {/* Pulsing rings */}
      {[320, 240, 160].map((size, i) => (
        <div
          key={size}
          className="absolute rounded-full border border-brand/10"
          style={{
            width: size,
            height: size,
            animation: `pulse-glow 3s ease-in-out ${i * 0.9}s infinite`,
          }}
        />
      ))}

      {/* Floating metric chips — corners */}
      {[
        { v: '500+', l: 'Test Cases',  pos: 'top-6 right-4 sm:top-10 sm:right-8',   delay: '0.5s' },
        { v: '99.9%', l: 'Accuracy',   pos: 'bottom-6 right-4 sm:bottom-10 sm:right-8', delay: '2s'   },
        { v: '50+',  l: 'Operators',   pos: 'bottom-6 left-4 sm:bottom-10 sm:left-8',  delay: '3.5s' },
      ].map(({ v, l, pos, delay }) => (
        <div
          key={l}
          className={`absolute ${pos} bg-navy-900 border border-[var(--border)] rounded-xl px-3 py-2.5 animate-float-alt shadow-card z-10`}
          style={{ animationDelay: delay }}
        >
          <p className="text-brand font-bold text-base leading-none">{v}</p>
          <p className="text-[var(--text-muted)] text-[11px] mt-0.5 leading-none">{l}</p>
        </div>
      ))}

      {/* Central card */}
      <div className="relative z-20 bg-navy-900/95 backdrop-blur-xl border border-[var(--border)] rounded-2xl p-6 sm:p-8 shadow-card-lg animate-float">
        {/* Icon — crop the built-in white margin from the PNG */}
        <div className="overflow-hidden rounded-2xl mx-auto" style={{ width: iconSize, height: iconSize }}>
          <img
            src="/logo-icon.png"
            alt="Radius Core"
            loading="lazy"
            style={{ width: iconFull, height: iconFull, maxWidth: 'none', marginTop: -margin, marginLeft: -margin, display: 'block' }}
          />
        </div>

        {/* Status row */}
        <div className="mt-5 flex items-center justify-center gap-4 text-xs text-[var(--text-muted)]">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" style={{ animation: 'pulse-glow 2s ease-in-out infinite' }} />
            Systems live
          </span>
          <span className="w-px h-3 bg-[var(--border)]" />
          <span>Global coverage</span>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Service card
───────────────────────────────────────────── */
function ServiceCard({ service, index, delay = 0 }) {
  const ref = useReveal(0.1);
  return (
    <article
      ref={ref}
      className="reveal card-hover group relative bg-navy-900 border border-[var(--border)] rounded-2xl p-6 flex flex-col"
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Number */}
      <span className="absolute top-5 right-5 text-xs font-mono text-[var(--text-subtle)] select-none">
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* Icon */}
      <div className="w-11 h-11 rounded-xl bg-navy-800 border border-[var(--border-light)] flex items-center justify-center text-brand mb-5 group-hover:border-brand/40 group-hover:bg-navy-700 transition-colors duration-200 flex-shrink-0">
        {service.icon}
      </div>

      <h3 className="text-white font-semibold text-base mb-2">{service.title}</h3>
      <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-4 flex-1">{service.desc}</p>

      <div className="flex flex-wrap gap-1.5">
        {service.tags.map(tag => (
          <span
            key={tag}
            className="text-[10px] px-2 py-0.5 rounded-full bg-navy-800 border border-[var(--border-light)] text-[var(--text-muted)] font-medium tracking-wide"
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}

/* ─────────────────────────────────────────────
   Main component
───────────────────────────────────────────── */
export default function RadiusCoreWebsite() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  }, []);

  // Build slides (defined inside to access scrollTo)
  const slides = SLIDE_DATA.map((s) => ({
    label: s.label,
    content: (
      <div className="w-full h-full relative flex items-center bg-navy-950 overflow-hidden">
        {/* Gradient left-to-right */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/95 to-navy-800/60 pointer-events-none" />
        {/* Faint grid */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.035] pointer-events-none" preserveAspectRatio="none">
          <defs>
            <pattern id={`sg-${s.label}`} width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M 32 0 L 0 0 0 32" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#sg-${s.label})`} />
        </svg>
        {/* Orange left accent line */}
        <div className="absolute left-0 inset-y-0 w-[3px] bg-gradient-to-b from-transparent via-brand to-transparent opacity-70" />

        {/* Content */}
        <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-stretch w-full h-full px-8 sm:px-12 lg:px-20 gap-10 py-10">
          {/* Text */}
          <div className="flex flex-col justify-center max-w-lg flex-1">
            <Tag>{s.tag}</Tag>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 whitespace-pre-line leading-tight">{s.title}</h2>
            <p className="text-[var(--text-muted)] text-sm sm:text-base leading-relaxed mb-7 max-w-md">{s.desc}</p>
            <div>
              <PrimaryBtn onClick={() => scrollTo(s.target)}>
                {s.cta} <ArrowRight />
              </PrimaryBtn>
            </div>
          </div>

          {/* Metrics panel — hidden on small screens */}
          <div className="hidden lg:flex flex-col justify-center gap-4 w-48 flex-shrink-0">
            {s.metrics.map(({ v, l }) => (
              <div key={l} className="bg-navy-900/80 border border-[var(--border)] rounded-xl px-4 py-3 backdrop-blur-sm">
                <p className="text-2xl font-bold text-gradient leading-none">{v}</p>
                <p className="text-[var(--text-muted)] text-xs mt-1">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  }));

  const heroRef = useReveal(0.04);
  const statsRef = useReveal(0.1);
  const expertiseRef = useReveal(0.08);

  return (
    <div className="bg-navy-950 text-white min-h-screen font-sans site-content">

      {/* ══════════════════════════ NAV ══════════════════════════ */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-navy-900/95 backdrop-blur-xl border-b border-[var(--border)] shadow-card'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <button
            onClick={() => scrollTo('hero')}
            aria-label="Home"
            className="flex-shrink-0"
          >
            <Logo contentHeight={36} />
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm">
            {NAV_LINKS.map(([label, id]) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="relative text-[var(--text-muted)] hover:text-white transition-colors duration-200 group py-1"
              >
                {label}
                <span className="absolute bottom-0 inset-x-0 h-px bg-brand scale-x-0 group-hover:scale-x-100 transition-transform duration-250 origin-left" />
              </button>
            ))}
            <PrimaryBtn onClick={() => scrollTo('contact')}>Get Started</PrimaryBtn>
          </nav>

          {/* Mobile burger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg text-[var(--text-muted)] hover:text-white hover:bg-navy-800 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>

        {/* Mobile drawer */}
        {menuOpen && (
          <div className="md:hidden bg-navy-900/98 backdrop-blur-xl border-b border-[var(--border)] px-4 pb-4 pt-2">
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map(([label, id]) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className="text-left px-3 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-navy-800 transition-colors"
                >
                  {label}
                </button>
              ))}
              <div className="mt-2 px-1">
                <PrimaryBtn onClick={() => scrollTo('contact')}>
                  Get Started <ArrowRight />
                </PrimaryBtn>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* ══════════════════════════ HERO ══════════════════════════ */}
      <section id="hero" className="relative min-h-screen flex flex-col overflow-hidden pt-16">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand/7 via-navy-950 to-navy-900 pointer-events-none" />
        <svg className="absolute inset-0 w-full h-full opacity-[0.025] pointer-events-none" preserveAspectRatio="none">
          <defs>
            <pattern id="hero-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>

        {/* Main content */}
        <div
          ref={heroRef}
          className="reveal relative z-10 flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-10 pt-12 pb-10 sm:pt-16 sm:pb-12 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
        >
          {/* Left — copy */}
          <div>
            <div className="inline-flex items-center gap-2 bg-navy-900 border border-[var(--border)] rounded-full px-3.5 py-1.5 text-xs text-brand font-medium mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-brand" style={{ animation: 'pulse-glow 2s ease-in-out infinite' }} />
              Telecom Engineering · QA Automation · 5G Validation
            </div>

            <h1 className="text-4xl xs:text-5xl sm:text-5xl lg:text-6xl xl:text-[4.25rem] font-bold leading-[1.1] tracking-tight mb-5">
              Engineering the{' '}
              <span className="text-gradient">Future</span>{' '}
              of Telecom Validation
            </h1>

            <p className="text-[var(--text-muted)] text-base sm:text-lg leading-relaxed mb-8 max-w-lg">
              Radius Core delivers telecom-native testing, packet core validation,
              and production-grade network assurance for modern operators, MVNOs,
              and digital telecom ecosystems.
            </p>

            <div className="flex flex-wrap gap-3">
              <PrimaryBtn onClick={() => scrollTo('services')}>
                Explore Services <ArrowRight />
              </PrimaryBtn>
              <GhostBtn onClick={() => scrollTo('contact')}>
                Contact Us
              </GhostBtn>
            </div>
          </div>

          {/* Right — visual */}
          <HeroVisual />
        </div>

        {/* Stats bar */}
        <div
          ref={statsRef}
          className="reveal relative z-10 border-t border-[var(--border)] bg-navy-900/50 backdrop-blur-sm"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-4 grid grid-cols-2 sm:grid-cols-4">
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                className={`text-center py-3 ${i < STATS.length - 1 ? 'sm:border-r border-[var(--border)]' : ''} ${i === 1 ? 'border-r border-[var(--border)] sm:border-r' : ''} ${i < 2 ? 'border-b sm:border-b-0 border-[var(--border)]' : ''}`}
              >
                <p className="text-xl sm:text-2xl font-bold text-gradient">{stat.value}</p>
                <p className="text-[var(--text-muted)] text-xs mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════ SERVICES ══════════════════════════ */}
      <section id="services" className="py-20 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <SectionLabel
            tag="What We Do"
            title={<>End-to-End <span className="text-gradient">Telecom</span> Testing</>}
            desc="From protocol conformance to 5G NR validation, we cover every layer of your network stack with precision and depth."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {SERVICES.map((svc, i) => (
              <ServiceCard key={svc.title} service={svc} index={i} delay={i * 50} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════ SLIDER ══════════════════════════ */}
      <section data-slider className="border-y border-[var(--border)]">
        <AutoSlider slides={slides} currentSlide={slide} onSlideChange={setSlide} />
      </section>

      {/* ══════════════════════════ EXPERTISE ══════════════════════════ */}
      <section id="expertise" className="py-20 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-10 bg-navy-900/30">
        <div
          ref={expertiseRef}
          className="reveal max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          {/* Left */}
          <div>
            <Tag>Why Radius Core</Tag>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-5">
              Telecom-Native <span className="text-gradient">Expertise</span> You Can Trust
            </h2>
            <p className="text-[var(--text-muted)] text-base sm:text-lg leading-relaxed mb-8 max-w-lg">
              Unlike generic QA firms, we are built from the ground up for telecom.
              Our engineers understand the protocols, the edge cases, and the stakes
              of production networks.
            </p>
            <ul className="space-y-3 mb-8">
              {FEATURES.map((feat) => (
                <li key={feat} className="flex items-start gap-3 text-slate-300 text-sm sm:text-base">
                  <svg className="w-4 h-4 text-brand mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {feat}
                </li>
              ))}
            </ul>
            <PrimaryBtn onClick={() => scrollTo('contact')}>
              Work With Us <ArrowRight />
            </PrimaryBtn>
          </div>

          {/* Right — metric cards */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {[
              { label: 'Protocol Layers', value: '15+',   desc: 'Deep stack coverage' },
              { label: 'Automation Rate', value: '95%',   desc: 'Of regression suites' },
              { label: 'Time to Deploy',  value: '2×',    desc: 'Faster than avg.' },
              { label: 'Network Uptime',  value: '99.9%', desc: 'Post-validation' },
            ].map((item, i) => {
              const ref = useReveal();
              return (
                <div
                  key={item.label}
                  ref={ref}
                  className="reveal card-hover bg-navy-900 border border-[var(--border)] rounded-2xl p-5"
                  style={{ transitionDelay: `${160 + i * 80}ms` }}
                >
                  <p className="text-2xl sm:text-3xl font-bold text-gradient mb-1">{item.value}</p>
                  <p className="text-white text-sm font-medium mb-0.5">{item.label}</p>
                  <p className="text-[var(--text-muted)] text-xs">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════ ABOUT ══════════════════════════ */}
      <section id="about" className="py-20 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <SectionLabel
            tag="About Us"
            title={<>Built by Telecom <span className="text-gradient">Engineers</span></>}
            desc="Radius Core was founded with a singular mission — to bring engineering-first testing discipline to the telecom industry."
          />
          <div className="grid sm:grid-cols-3 gap-4 sm:gap-5">
            {[
              {
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                ),
                title: 'Mission',
                desc: 'Making telecom testing rigorous, automated, and accessible — eliminating network failures before they reach production.',
              },
              {
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                ),
                title: 'Vision',
                desc: 'A world where every packet is trusted — telecom networks that are continuously validated and self-assuring.',
              },
              {
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
                title: 'Our People',
                desc: 'Seasoned telecom engineers with hands-on experience across major operators, equipment vendors, and standards bodies.',
              },
            ].map((item, i) => {
              const ref = useReveal();
              return (
                <div
                  key={item.title}
                  ref={ref}
                  className="reveal card-hover bg-navy-900 border border-[var(--border)] rounded-2xl p-6"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className="w-10 h-10 rounded-xl bg-navy-800 border border-[var(--border-light)] flex items-center justify-center text-brand mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-white font-semibold text-base mb-2">{item.title}</h3>
                  <p className="text-[var(--text-muted)] text-sm leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════ CONTACT ══════════════════════════ */}
      <section id="contact" className="py-20 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-10 bg-navy-900/30">
        <ContactSection scrollTo={scrollTo} />
      </section>

      {/* ══════════════════════════ FOOTER ══════════════════════════ */}
      <footer className="border-t border-[var(--border)] bg-navy-900/60 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12 sm:py-14">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 mb-10">
            {/* Brand */}
            <div>
              <div className="mb-4">
                <Logo contentHeight={38} />
              </div>
              <p className="text-[var(--text-muted)] text-sm leading-relaxed max-w-xs">
                Telecom-native testing, automation, and validation for modern operators and MVNOs.
              </p>
            </div>

            {/* Links */}
            <div>
              <h5 className="text-white text-xs font-semibold uppercase tracking-widest mb-4">Quick Links</h5>
              <ul className="space-y-2">
                {NAV_LINKS.map(([label, id]) => (
                  <li key={id}>
                    <button
                      onClick={() => scrollTo(id)}
                      className="text-[var(--text-muted)] hover:text-brand transition-colors text-sm"
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social */}
            <div>
              <h5 className="text-white text-xs font-semibold uppercase tracking-widest mb-4">Connect</h5>
              <div className="flex gap-2.5">
                {SOCIAL_LINKS.map((s) => (
                  <a
                    key={s.label}
                    href="#"
                    aria-label={s.label}
                    className="w-9 h-9 rounded-lg bg-navy-800 border border-[var(--border-light)] flex items-center justify-center text-[var(--text-muted)] hover:text-brand hover:border-brand/40 transition-colors duration-200"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d={s.d} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-[var(--border)] pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[var(--text-subtle)]">
            <p>© 2026 Radius Core. All rights reserved.</p>
            <p>Testing The Future</p>
          </div>
        </div>
      </footer>

    </div>
  );
}

/* ─────────────────────────────────────────────
   Contact section (separate to keep main lean)
───────────────────────────────────────────── */
function ContactSection({ scrollTo }) {
  const ref = useReveal();
  return (
    <div ref={ref} className="reveal max-w-3xl mx-auto text-center">
      <div className="relative bg-gradient-to-br from-navy-900 to-navy-950 border border-[var(--border)] rounded-3xl px-6 sm:px-12 lg:px-16 py-14 sm:py-20 overflow-hidden">
        {/* Decorative top accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-brand to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-12 bg-gradient-to-b from-brand/50 to-transparent" />
        {/* Corner glow */}
        <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-brand/4 blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <Tag>Get In Touch</Tag>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Ready to Transform<br />
            <span className="text-gradient">Your Testing?</span>
          </h2>
          <p className="text-[var(--text-muted)] text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-8">
            Partner with Radius Core for precision engineering and intelligent
            telecom validation. Let's build reliable networks together.
          </p>
          <div className="flex flex-col xs:flex-row gap-3 justify-center">
            <PrimaryBtn href="mailto:hello@radiuscore.io">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Send Us a Message
            </PrimaryBtn>
            <GhostBtn onClick={() => scrollTo('services')}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              View Services
            </GhostBtn>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Social links data
───────────────────────────────────────────── */
const SOCIAL_LINKS = [
  {
    label: 'LinkedIn',
    d: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z',
  },
  {
    label: 'Twitter/X',
    d: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
  },
  {
    label: 'GitHub',
    d: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z',
  },
];
