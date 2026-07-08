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
    <div ref={ref} className={`reveal mb-8 sm:mb-12 lg:mb-16 max-w-2xl ${alignCls}`}>
      <Tag>{tag}</Tag>
      <h2 className="fluid-h2 font-bold mb-3 sm:mb-5">{title}</h2>
      {desc && <p className="fluid-lead text-[var(--text-muted)] leading-relaxed">{desc}</p>}
    </div>
  );
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
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const onHome = pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = useCallback((id) => {
    setMenuOpen(false);
    // Careers has its own dedicated page.
    if (id === 'careers') { navigate('/careers'); return; }
    if (onHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      // From a subpage: go home, then scroll to the section.
      navigate(id === 'hero' ? '/' : `/#${id}`);
    }
  }, [navigate, onHome]);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white border-b border-slate-200 shadow-card' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-16 flex items-center justify-between gap-4">
        <button onClick={() => go('hero')} aria-label="Home" className="flex-shrink-0 pr-6 h-full flex items-center">
          <Logo contentWidth={150} />
        </button>

        <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-sm">
          {NAV_LINKS.map(([label, id]) => (
            <button key={id} onClick={() => go(id)}
              className={`relative py-1 transition-colors duration-200 group ${
                scrolled
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
            scrolled
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
