import { useState, useEffect, useCallback, useRef } from 'react';

export default function AutoSlider({ slides, currentSlide: externalSlide, onSlideChange }) {
  const [internalSlide, setInternalSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const sliderRef = useRef(null);
  const currentSlide = externalSlide !== undefined ? externalSlide : internalSlide;

  const nextSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    const next = (currentSlide + 1) % slides.length;
    setInternalSlide(next);
    if (onSlideChange) onSlideChange(next);
    setTimeout(() => setIsAnimating(false), 500);
  }, [slides.length, isAnimating, currentSlide, onSlideChange]);

  const prevSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    const prev = (currentSlide - 1 + slides.length) % slides.length;
    setInternalSlide(prev);
    if (onSlideChange) onSlideChange(prev);
    setTimeout(() => setIsAnimating(false), 500);
  }, [slides.length, isAnimating, currentSlide, onSlideChange]);

  const goToSlide = useCallback((index) => {
    if (isAnimating || index === currentSlide) return;
    setIsAnimating(true);
    setInternalSlide(index);
    if (onSlideChange) onSlideChange(index);
    setTimeout(() => setIsAnimating(false), 500);
  }, [currentSlide, isAnimating, onSlideChange]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Auto slide
  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  // Touch/swipe support
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    const diff = touchStart - touchEnd;
    if (diff > 50) nextSlide();
    if (diff < -50) prevSlide();
  };

  return (
    <div 
      className="relative w-full min-h-screen bg-black overflow-hidden" 
      ref={sliderRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides Container */}
      <div className="relative w-full h-screen">
        <div
          className="flex h-full transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={index} className="w-full h-full flex-shrink-0">
              {slide.content}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        disabled={isAnimating}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all hover:scale-110 disabled:opacity-50"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        disabled={isAnimating}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all hover:scale-110 disabled:opacity-50"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Bottom Navigation Tabs */}
      <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/80 to-transparent px-6 md:px-10 py-8 md:py-12">
        <div className="flex items-center gap-4 md:gap-6 overflow-x-auto pb-4">
          {slides.map((slide, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              disabled={isAnimating}
              className={`flex-shrink-0 text-left transition-all duration-300 ${
                currentSlide === index
                  ? 'opacity-100'
                  : 'opacity-60 hover:opacity-80'
              } ${isAnimating ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <div className="text-xs md:text-sm font-semibold text-white uppercase tracking-wider mb-2">
                {slide.label || `Slide ${index + 1}`}
              </div>
              {currentSlide === index && (
                <div className="h-1 w-12 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Keyboard hint */}
      <div className="absolute bottom-4 right-6 text-xs text-white/50 hidden md:block">
        ← → to navigate
      </div>
    </div>
  );
}
