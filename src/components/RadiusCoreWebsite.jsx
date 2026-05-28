import { useState } from 'react';
import AutoSlider from './AutoSlider.jsx';

export default function RadiusCoreWebsite() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const scrollToSlider = (slideIndex) => {
    const sliderSection = document.querySelector('[data-slider="true"]');
    if (sliderSection) {
      sliderSection.scrollIntoView({ behavior: 'smooth' });
      setCurrentSlide(slideIndex);
    }
  };

  const slides = [
    {
      label: 'Core Services',
      content: (
        <div className="w-full h-full bg-gradient-to-r from-black via-black/80 to-transparent flex items-center px-6 md:px-10 lg:px-16">
          <div className="max-w-2xl">
            <p className="text-orange-500 text-xs md:text-sm uppercase tracking-widest mb-4">Radius Core Services</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Telecom Engineering Excellence
            </h2>
            <p className="text-zinc-300 text-base md:text-lg mb-8 max-w-xl leading-relaxed">
              Comprehensive testing, automation, and validation solutions for modern telecom networks.
            </p>
            <button className="bg-orange-500 hover:bg-orange-600 transition-all px-8 py-3 rounded-full font-semibold text-white shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transform hover:scale-105 active:scale-95">
              Explore Services
            </button>
          </div>
        </div>
      )
    },
    {
      label: 'Why Radius Core',
      content: (
        <div className="w-full h-full bg-gradient-to-r from-black via-black/80 to-transparent flex items-center px-6 md:px-10 lg:px-16">
          <div className="max-w-2xl">
            <p className="text-orange-500 text-xs md:text-sm uppercase tracking-widest mb-4">Our Expertise</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Telecom-Native Validation
            </h2>
            <p className="text-zinc-300 text-base md:text-lg mb-8 max-w-xl leading-relaxed">
              Deep expertise in packet core, IMS, 5G, and production-grade network assurance.
            </p>
            <button className="bg-orange-500 hover:bg-orange-600 transition-all px-8 py-3 rounded-full font-semibold text-white shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transform hover:scale-105 active:scale-95">
              Learn More
            </button>
          </div>
        </div>
      )
    },
    {
      label: 'Get In Touch',
      content: (
        <div className="w-full h-full bg-gradient-to-r from-black via-black/80 to-transparent flex items-center px-6 md:px-10 lg:px-16">
          <div className="max-w-2xl">
            <p className="text-orange-500 text-xs md:text-sm uppercase tracking-widest mb-4">Let's Build The Future</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Ready to Transform Your Testing?
            </h2>
            <p className="text-zinc-300 text-base md:text-lg mb-8 max-w-xl leading-relaxed">
              Partner with Radius Core for precision engineering and intelligent telecom validation.
            </p>
            <button className="bg-orange-500 hover:bg-orange-600 transition-all px-8 py-3 rounded-full font-semibold text-white shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transform hover:scale-105 active:scale-95">
              Contact Us
            </button>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="bg-black text-white min-h-screen font-sans">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-black to-black"></div>
        <div className="absolute inset-0 opacity-10">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.1"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>

        <nav className="relative z-10 flex items-center justify-between px-6 lg:px-12 py-4 border-b border-zinc-800/50 backdrop-blur-xl bg-black/50 sticky top-0">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-2xl shadow-orange-500/30 hover:shadow-orange-500/50 transition-shadow">
              <span className="text-white font-bold text-xl lg:text-2xl">RC</span>
            </div>
            <div>
              <h1 className="text-xl lg:text-2xl font-bold tracking-wide">Radius <span className="text-orange-500">Core</span></h1>
              <p className="text-[10px] lg:text-xs tracking-[0.35em] text-zinc-400">TESTING THE FUTURE</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 text-sm text-zinc-300">
            <button onClick={() => scrollToSlider(0)} className="hover:text-orange-400 transition-colors relative group">
              Services
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all"></span>
            </button>
            <button onClick={() => scrollToSlider(1)} className="hover:text-orange-400 transition-colors relative group">
              Expertise
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all"></span>
            </button>
            <button onClick={() => scrollToSlider(1)} className="hover:text-orange-400 transition-colors relative group">
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all"></span>
            </button>
            <button onClick={() => scrollToSlider(2)} className="hover:text-orange-400 transition-colors relative group">
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all"></span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-zinc-800 transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-zinc-900/95 backdrop-blur-xl border-b border-zinc-800">
            <div className="px-6 py-4 space-y-4">
              <button onClick={() => {scrollToSlider(0); setMobileMenuOpen(false);}} className="block text-zinc-300 hover:text-orange-400 transition-colors py-2 text-left w-full">Services</button>
              <button onClick={() => {scrollToSlider(1); setMobileMenuOpen(false);}} className="block text-zinc-300 hover:text-orange-400 transition-colors py-2 text-left w-full">Expertise</button>
              <button onClick={() => {scrollToSlider(1); setMobileMenuOpen(false);}} className="block text-zinc-300 hover:text-orange-400 transition-colors py-2 text-left w-full">About</button>
              <button onClick={() => {scrollToSlider(2); setMobileMenuOpen(false);}} className="block text-zinc-300 hover:text-orange-400 transition-colors py-2 text-left w-full">Contact</button>
            </div>
          </div>
        )}

        <div className="relative z-10 grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center px-4 md:px-6 lg:px-10 py-12 md:py-16 lg:py-20 max-w-7xl mx-auto">
          <div>
            <div className="inline-flex items-center gap-2 bg-zinc-900/80 backdrop-blur-sm border border-zinc-800/50 rounded-full px-3 md:px-4 py-1.5 md:py-2 text-[10px] md:text-sm text-orange-400 mb-4 md:mb-6 shadow-lg">
              <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Telecom Engineering • QA Automation • 5G Validation
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-4 md:mb-6">
              Engineering the <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">Future</span> of Telecom Validation
            </h2>

            <p className="text-zinc-400 text-sm md:text-base lg:text-lg leading-relaxed mb-6 md:mb-8 max-w-xl">
              Radius Core delivers telecom-native testing, automation, packet core validation, and production-grade network assurance for modern operators, MVNOs, and digital telecom ecosystems.
            </p>

            <div className="flex flex-wrap gap-3 md:gap-4">
              <button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transition-all px-5 md:px-6 lg:px-8 py-2.5 md:py-3 lg:py-4 rounded-xl md:rounded-2xl font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 flex items-center gap-2 group transform hover:scale-105 active:scale-95 text-sm md:text-base">
                Explore Services
                <svg className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>

              <button className="bg-zinc-900/80 backdrop-blur-sm border border-zinc-700/50 hover:border-orange-500/50 hover:text-orange-400 hover:bg-zinc-800/80 transition-all px-5 md:px-6 lg:px-8 py-2.5 md:py-3 lg:py-4 rounded-xl md:rounded-2xl font-semibold flex items-center gap-2 transform hover:scale-105 active:scale-95 text-sm md:text-base">
                Contact Us
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="absolute w-[200px] md:w-[300px] lg:w-[400px] h-[200px] md:h-[300px] lg:h-[400px] rounded-full border border-orange-500/20 animate-pulse"></div>
            <div className="absolute w-[160px] md:w-[240px] lg:w-[320px] h-[160px] md:h-[240px] lg:h-[320px] rounded-full border border-orange-500/30 animate-pulse" style={{animationDelay: '0.5s'}}></div>
            <div className="absolute w-[120px] md:w-[180px] lg:w-[260px] h-[120px] md:h-[180px] lg:h-[260px] rounded-full border border-orange-500/40 animate-pulse" style={{animationDelay: '1s'}}></div>
            
            {/* Floating network nodes */}
            <div className="absolute top-6 md:top-10 left-12 md:left-20 w-3 h-3 md:w-4 md:h-4 bg-orange-500 rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
            <div className="absolute top-12 md:top-20 right-10 md:right-16 w-2 h-2 md:w-3 md:h-3 bg-orange-400 rounded-full animate-bounce" style={{animationDelay: '0.3s'}}></div>
            <div className="absolute bottom-10 md:bottom-16 left-14 md:left-24 w-2 h-2 md:w-3 md:h-3 bg-orange-400 rounded-full animate-bounce" style={{animationDelay: '0.6s'}}></div>
            <div className="absolute bottom-12 md:bottom-20 right-12 md:right-20 w-3 h-3 md:w-4 md:h-4 bg-orange-500 rounded-full animate-bounce" style={{animationDelay: '0.9s'}}></div>

            <div className="relative bg-zinc-950/80 backdrop-blur-xl border border-zinc-800/50 rounded-2xl md:rounded-[32px] p-6 md:p-8 lg:p-10 shadow-2xl shadow-orange-500/10 animate-float">
              <div className="flex items-center justify-center mb-4 md:mb-6">
                <img src="/logo.png" alt="Radius Core" className="w-40 h-auto md:w-48 lg:w-56 object-contain" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Auto Slider */}
      <section data-slider="true" className="py-6 md:py-8">
        <AutoSlider slides={slides} currentSlide={currentSlide} onSlideChange={setCurrentSlide} />
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800/50 px-4 md:px-6 lg:px-10 py-8 md:py-12 lg:py-16 bg-zinc-950/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 lg:gap-12 mb-8 md:mb-12">
            <div>
              <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/30">
                  <span className="text-white font-bold text-base md:text-xl">RC</span>
                </div>
                <div>
                  <h4 className="text-lg md:text-xl font-bold">Radius Core</h4>
                  <p className="text-[10px] md:text-xs tracking-[0.35em] text-zinc-400">TESTING THE FUTURE</p>
                </div>
              </div>
              <p className="text-zinc-400 text-xs md:text-sm leading-relaxed">
                Telecom-native testing, automation, and validation for modern operators and MVNOs.
              </p>
            </div>

            <div>
              <h5 className="text-white font-semibold mb-3 md:mb-4 text-sm md:text-base">Quick Links</h5>
              <ul className="space-y-1.5 md:space-y-2">
                <li><a href="#services" className="text-zinc-400 hover:text-orange-400 transition-colors text-xs md:text-sm">Services</a></li>
                <li><a href="#expertise" className="text-zinc-400 hover:text-orange-400 transition-colors text-xs md:text-sm">Expertise</a></li>
                <li><a href="#about" className="text-zinc-400 hover:text-orange-400 transition-colors text-xs md:text-sm">About</a></li>
                <li><a href="#contact" className="text-zinc-400 hover:text-orange-400 transition-colors text-xs md:text-sm">Contact</a></li>
              </ul>
            </div>

            <div>
              <h5 className="text-white font-semibold mb-3 md:mb-4 text-sm md:text-base">Connect</h5>
              <div className="flex gap-3 md:gap-4">
                <a href="#" className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-orange-400 hover:border-orange-500/50 transition-all hover:scale-110">
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-orange-400 hover:border-orange-500/50 transition-all hover:scale-110">
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                <a href="#" className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-orange-400 hover:border-orange-500/50 transition-all hover:scale-110">
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-zinc-800/50 pt-6 md:pt-8 text-center">
            <p className="text-zinc-500 text-xs md:text-sm">© 2026 Radius Core • Testing The Future</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
