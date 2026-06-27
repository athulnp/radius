import { useState, useEffect, useCallback, useRef } from 'react';

export default function AutoSlider({ slides, currentSlide: controlled, onSlideChange }) {
  const [internal, setInternal] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  const current = controlled !== undefined ? controlled : internal;

  const goTo = useCallback((index) => {
    if (animating || index === current) return;
    setAnimating(true);
    setInternal(index);
    onSlideChange?.(index);
    setTimeout(() => setAnimating(false), 550);
  }, [animating, current, onSlideChange]);

  const next = useCallback(() => goTo((current + 1) % slides.length), [current, slides.length, goTo]);
  const prev = useCallback(() => goTo((current - 1 + slides.length) % slides.length), [current, slides.length, goTo]);

  // Auto-advance
  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(next, 6000);
    return () => clearInterval(timerRef.current);
  }, [next, paused]);

  // Keyboard
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft')  prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev]);

  // Touch swipe
  const touchX = useRef(null);
  const onTouchStart = (e) => { touchX.current = e.targetTouches[0].clientX; };
  const onTouchEnd   = (e) => {
    if (touchX.current === null) return;
    const diff = touchX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 44) diff > 0 ? next() : prev();
    touchX.current = null;
  };

  return (
    <div
      className="relative w-full bg-navy-950 overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Slides */}
      <div className="relative w-full h-[65vh] min-h-[440px] max-h-[680px]">
        <div
          className="flex h-full"
          style={{
            transform: `translateX(-${current * 100}%)`,
            transition: 'transform 550ms cubic-bezier(0.77, 0, 0.175, 1)',
          }}
        >
          {slides.map((slide, i) => (
            <div key={i} className="w-full h-full flex-shrink-0">
              {slide.content}
            </div>
          ))}
        </div>

        {/* Slide counter — top right */}
        <div className="absolute top-5 right-5 z-20 flex items-center gap-1.5 text-[11px] font-mono text-[var(--text-subtle)] select-none">
          <span className="text-white font-semibold">{String(current + 1).padStart(2, '0')}</span>
          <span>/</span>
          <span>{String(slides.length).padStart(2, '0')}</span>
        </div>

        {/* Arrow buttons */}
        <button
          onClick={prev}
          disabled={animating}
          aria-label="Previous slide"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full border border-[var(--border-light)] bg-navy-900/80 backdrop-blur-sm text-[var(--text-muted)] hover:text-white hover:border-brand/50 transition-colors duration-200 flex items-center justify-center disabled:opacity-30"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={next}
          disabled={animating}
          aria-label="Next slide"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full border border-[var(--border-light)] bg-navy-900/80 backdrop-blur-sm text-[var(--text-muted)] hover:text-white hover:border-brand/50 transition-colors duration-200 flex items-center justify-center disabled:opacity-30"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Tab strip */}
      <div className="bg-navy-900/95 border-t border-[var(--border)] backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex items-stretch no-scrollbar overflow-x-auto">
          {slides.map((slide, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              disabled={animating}
              className={`relative flex-shrink-0 px-5 sm:px-7 py-4 text-left transition-colors duration-200 ${
                current === i ? 'text-white' : 'text-[var(--text-subtle)] hover:text-[var(--text-muted)]'
              }`}
            >
              <span className="text-xs font-semibold uppercase tracking-widest">
                {slide.label}
              </span>
              {/* Progress underline */}
              <span
                className={`absolute bottom-0 inset-x-0 h-[2px] ${current === i ? 'bg-brand' : 'bg-transparent'}`}
              >
                {current === i && (
                  <span
                    key={`${current}-${paused}`}
                    className="block h-full bg-brand animate-progress-fill"
                    style={{
                      animationDuration: '6000ms',
                      animationPlayState: paused ? 'paused' : 'running',
                    }}
                  />
                )}
              </span>
            </button>
          ))}

          {/* Keyboard hint — right-aligned */}
          <div className="ml-auto hidden md:flex items-center pr-2 text-[11px] text-[var(--text-subtle)] select-none">
            ← → navigate
          </div>
        </div>
      </div>
    </div>
  );
}
