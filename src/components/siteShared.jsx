import { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

/* ─────────────────────────────────────────────
   Hook: fire once when element enters viewport
───────────────────────────────────────────── */
export function useReveal(threshold = 0.1) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { el.classList.add('is-visible'); obs.unobserve(el); }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return ref;
}

/* ─────────────────────────────────────────────
   Nav links (shared between homepage + subpages)
───────────────────────────────────────────── */
export const NAV_LINKS = [
  ['Home',        'hero'],
  ['Services',    'services'],
  ['Industries',  'industries'],
  ['Technologies','technologies'],
  ['About',       'about'],
  ['Careers',     'careers'],
  ['Contact',     'contact'],
];

/* ─────────────────────────────────────────────
   Logo — crops built-in PNG white margins
───────────────────────────────────────────── */
export function Logo({ contentHeight = 36, contentWidth }) {
  // If contentWidth is given, size by width; otherwise size by height.
  const imgW = contentWidth != null
    ? Math.round(contentWidth / 0.855)
    : Math.round((contentHeight / 0.68) * 1.784);
  const imgH = Math.round(imgW / 1.784);
  const mt   = -Math.round(imgH * 0.16);
  const ml   = -Math.round(imgW * 0.072) + 6;
  const w    = Math.round(imgW * 0.975) + 12;
  const h    = Math.round(imgH * 0.60);
  return (
    <div className="overflow-hidden rounded-md bg-white flex-shrink-0" style={{ width: w, height: h }}>
      <img src="/logo.png" alt="Radius Core"
        style={{ height: imgH, width: 'auto', maxWidth: 'none', marginTop: mt, marginLeft: ml, display: 'block' }} />
    </div>
  );
}

/* ─────────────────────────────────────────────
   Reusable primitives
───────────────────────────────────────────── */
export function Tag({ children }) {
  return (
    <div className="inline-flex items-center gap-2 mb-4">
      <span className="w-4 h-px bg-brand" />
      <p className="text-brand text-xs font-semibold uppercase tracking-[0.2em]">{children}</p>
    </div>
  );
}

export function ArrowRight({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

export function PrimaryBtn({ onClick, children, href, size = 'md' }) {
  const sz = size === 'lg'
    ? 'px-8 py-4 text-sm rounded-xl gap-2.5'
    : 'px-6 py-3 text-sm rounded-xl gap-2';
  const cls = `glass-hover inline-flex items-center ${sz} bg-brand hover:bg-brand-hover active:scale-95 text-white font-semibold transition-all duration-200 leading-none select-none`;
  if (href) return <a href={href} className={cls}>{children}</a>;
  return <button onClick={onClick} className={cls}>{children}</button>;
}

export function SectionLabel({ tag, title, desc, align = 'center' }) {
  const ref = useReveal();
  const alignCls = align === 'left' ? 'text-left' : 'text-center mx-auto';
  return (
    <div ref={ref} className={`reveal mb-8 sm:mb-10 lg:mb-12 max-w-2xl ${alignCls}`}>
      <Tag>{tag}</Tag>
      <h2 className="fluid-h2 font-bold mb-3 sm:mb-5">{title}</h2>
      {desc && <p className="fluid-lead text-[var(--text-muted)] leading-relaxed">{desc}</p>}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Router-aware section navigation shared by header
   + footer. Scrolls on the homepage; routes to the
   homepage section (or /careers) from other pages.
───────────────────────────────────────────── */
export const SOCIAL_LINKS = [
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

function useSectionNav(onDone) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const onHome = pathname === '/';
  return useCallback((id) => {
    onDone?.();
    if (id === 'careers') { navigate('/careers'); return; }
    if (onHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(id === 'hero' ? '/' : `/#${id}`);
    }
  }, [navigate, onHome, onDone]);
}

/* ─────────────────────────────────────────────
   Shared site header — identical look/behavior on
   every page. Transparent over hero, solid white on
   scroll. Nav links scroll on the homepage and route
   to the homepage section (or /careers) elsewhere.
───────────────────────────────────────────── */
export function SiteHeader({ activeNav = '' }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const go = useSectionNav(() => setMenuOpen(false));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // When the mobile menu is open, force the bar into a solid dark panel so it
  // reads as one piece with the (dark) drawer — regardless of scroll position.
  const barCls = menuOpen
    ? 'bg-navy-900 border-b border-[var(--border)]'
    : (scrolled ? 'bg-white border-b border-slate-200 shadow-card' : 'bg-transparent');
  // White bar on scroll → dark text; transparent over hero → light text.
  const darkText = scrolled && !menuOpen;

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${barCls}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-16 flex items-center justify-between gap-4">
        <button onClick={() => go('hero')} aria-label="Home" className="flex-shrink-0 pr-6 h-full flex items-center">
          <Logo contentWidth={150} />
        </button>

        <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-sm">
          {NAV_LINKS.map(([label, id]) => (
            <button key={id} onClick={() => go(id)}
              className={`relative py-1 transition-colors duration-200 group ${
                darkText
                  ? (activeNav === id ? 'text-navy-950' : 'text-slate-600 hover:text-navy-950')
                  : (activeNav === id ? 'text-white' : 'text-[var(--text-muted)] hover:text-white')
              }`}>
              {label}
              <span className={`absolute bottom-0 inset-x-0 h-px bg-brand transition-transform duration-250 origin-left ${activeNav === id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
            </button>
          ))}
          <PrimaryBtn onClick={() => go('contact')}>Get Started</PrimaryBtn>
        </nav>

        <button onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          className={`lg:hidden w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${
            darkText
              ? 'text-slate-600 hover:text-navy-950 hover:bg-slate-100'
              : 'text-[var(--text-muted)] hover:text-white hover:bg-navy-800'
          }`}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {/* Mobile drawer */}
      <div className={`lg:hidden overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-navy-900/98 backdrop-blur-xl border-b border-[var(--border)] px-4 pb-5 pt-2">
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map(([label, id]) => (
              <button key={id} onClick={() => go(id)}
                className="text-left px-3 py-3 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-navy-800 transition-colors">
                {label}
              </button>
            ))}
            <div className="mt-2 px-1">
              <PrimaryBtn onClick={() => go('contact')}>
                Get Started <ArrowRight />
              </PrimaryBtn>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

/* ─────────────────────────────────────────────
   Shared site footer — identical on every page.
───────────────────────────────────────────── */
export function SiteFooter() {
  const go = useSectionNav();
  return (
    <footer className="border-t border-[var(--border)] bg-navy-900/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-14 sm:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12">

          {/* Brand col */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-5">
              <Logo contentHeight={64} />
            </div>
            <p className="text-[var(--text-subtle)] text-xs">© 2026 Radius Core Labs. All rights reserved.</p>
          </div>

          {/* Services col */}
          <div>
            <h5 className="text-white text-xs font-semibold uppercase tracking-widest mb-5">Services</h5>
            <ul className="space-y-2.5">
              {['Telecom Testing', '5G Core Validation', 'EPC Testing', 'IMS & VoLTE', 'Test Automation', 'Performance Testing', 'Consulting'].map(s => (
                <li key={s}>
                  <button onClick={() => go('services')}
                    className="text-[var(--text-muted)] hover:text-brand transition-colors text-sm">
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company col */}
          <div>
            <h5 className="text-white text-xs font-semibold uppercase tracking-widest mb-5">Company</h5>
            <ul className="space-y-2.5">
              {NAV_LINKS.map(([label, id]) => (
                <li key={id}>
                  <button onClick={() => go(id)}
                    className="text-[var(--text-muted)] hover:text-brand transition-colors text-sm">
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect col */}
          <div>
            <h5 className="text-white text-xs font-semibold uppercase tracking-widest mb-5">Connect</h5>
            <div className="flex gap-2.5 mb-5">
              {SOCIAL_LINKS.map((s) => (
                <a key={s.label} href="#" aria-label={s.label}
                  className="w-9 h-9 rounded-xl bg-navy-800 border border-[var(--border-light)] flex items-center justify-center text-[var(--text-muted)] hover:text-brand hover:border-brand/40 transition-all duration-200">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d={s.d} />
                  </svg>
                </a>
              ))}
            </div>
            <a href="mailto:hello@radiuscorelabs.com"
              className="text-[var(--text-muted)] hover:text-brand transition-colors text-sm break-all">
              hello@radiuscorelabs.com
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
