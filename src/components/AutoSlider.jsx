import { useState, useEffect, useCallback, useRef } from 'react';

/*
  Infinite one-direction slider (always left → right).

  Strategy: render [slide0, slide1, ..., slideN, *clone of slide0*].
  The track width = (N+1) slides × 100%.
  When we reach the clone (index N+1), we play the transition into it
  normally, then — after the animation completes — silently disable
  the transition and jump the track back to index 0. The user never
  sees the jump because the clone and slide0 are visually identical.
*/
export default function AutoSlider({ slides, currentSlide: controlled, onSlideChange }) {
  const n = slides.length;

  // `pos` is the raw track position (0 … n). Index n = clone of slide 0.
  const [pos, setPos] = useState(0);
  const [transitioning, setTransitioning] = useState(true);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  // The "real" logical slide (0 … n-1) shown in the tab strip / counter
  const logical = pos === n ? 0 : pos;

  // Push the controlled prop outward so parent state stays in sync
  useEffect(() => {
    onSlideChange?.(logical);
  }, [logical]); // eslint-disable-line react-hooks/exhaustive-deps

  // Advance one step forward (always)
  const advance = useCallback(() => {
    setTransitioning(true);
    setPos((p) => p + 1);
  }, []);

  // Jump to a specific logical index from the tab strip
  const goTo = useCallback((index) => {
    if (index === logical) return;
    setTransitioning(true);
    setPos(index);
  }, [logical]);

  // After transitioning INTO the clone (pos === n), silently reset to 0
  useEffect(() => {
    if (pos !== n) return;
    const id = setTimeout(() => {
      setTransitioning(false);      // disable CSS transition
      setPos(0);                    // jump to real slide 0
    }, 570);                        // just after the 550ms animation
    return () => clearTimeout(id);
  }, [pos, n]);

  // Re-enable transition one frame after the silent jump
  useEffect(() => {
    if (transitioning) return;
    const id = requestAnimationFrame(() => setTransitioning(true));
    return () => cancelAnimationFrame(id);
  }, [transitioning]);

  // Auto-advance
  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(advance, 6000);
    return () => clearInterval(timerRef.current);
  }, [advance, paused]);

  // Keyboard — right arrow / left arrow both go forward (per spec: always one direction)
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') advance();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [advance]);

  // Touch swipe — swipe left → advance (content moves left = forward)
  const touchX = useRef(null);
  const onTouchStart = (e) => { touchX.current = e.targetTouches[0].clientX; };
  const onTouchEnd   = (e) => {
    if (touchX.current === null) return;
    const diff = touchX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 44) advance();
    touchX.current = null;
  };

  // Track: slides + clone of slide[0]
  const track = [...slides, slides[0]];

  return (
    <div
      className="relative w-full bg-navy-950 overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Slide viewport */}
      <div className="relative w-full h-[65vh] min-h-[440px] max-h-[680px]">
        <div
          className="flex h-full"
          style={{
            width: `${track.length * 100}%`,
            transform: `translateX(-${(pos / track.length) * 100}%)`,
            transition: transitioning ? 'transform 550ms cubic-bezier(0.77, 0, 0.175, 1)' : 'none',
          }}
        >
          {track.map((slide, i) => (
            <div key={i} style={{ width: `${100 / track.length}%` }} className="h-full flex-shrink-0">
              {slide.content}
            </div>
          ))}
        </div>

        {/* Counter */}
        <div className="absolute top-5 right-5 z-20 flex items-center gap-1.5 text-[11px] font-mono text-[var(--text-subtle)] select-none">
          <span className="text-white font-semibold">{String(logical + 1).padStart(2, '0')}</span>
          <span>/</span>
          <span>{String(n).padStart(2, '0')}</span>
        </div>

        {/* Next arrow only — always advances */}
        <button
          onClick={advance}
          aria-label="Next slide"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full border border-[var(--border-light)] bg-navy-900/80 backdrop-blur-sm text-[var(--text-muted)] hover:text-white hover:border-brand/50 transition-colors duration-200 flex items-center justify-center"
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
              className={`relative flex-shrink-0 px-5 sm:px-7 py-4 text-left transition-colors duration-200 ${
                logical === i ? 'text-white' : 'text-[var(--text-subtle)] hover:text-[var(--text-muted)]'
              }`}
            >
              <span className="text-xs font-semibold uppercase tracking-widest">{slide.label}</span>
              <span className={`absolute bottom-0 inset-x-0 h-[2px] ${logical === i ? 'bg-brand' : 'bg-transparent'}`}>
                {logical === i && (
                  <span
                    key={`${logical}-${paused}`}
                    className="block h-full bg-brand animate-progress-fill"
                    style={{ animationDuration: '6000ms', animationPlayState: paused ? 'paused' : 'running' }}
                  />
                )}
              </span>
            </button>
          ))}

          {/* Dot indicators */}
          <div className="ml-auto hidden md:flex items-center gap-2 pr-4">
            {slides.map((_, i) => (
              <button key={i} onClick={() => goTo(i)} aria-label={`Go to slide ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${logical === i ? 'w-5 h-1.5 bg-brand' : 'w-1.5 h-1.5 bg-[var(--border-light)] hover:bg-[var(--text-subtle)]'}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
