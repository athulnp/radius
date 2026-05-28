export default function RadiusCoreWebsite() {
  return (
    <div className="bg-black text-white min-h-screen font-sans">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-black to-black"></div>

        <nav className="relative z-10 flex items-center justify-between px-10 py-6 border-b border-zinc-800">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-2xl shadow-orange-500/30">
              <span className="text-white font-bold text-2xl">RC</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-wide">Radius <span className="text-orange-500">Core</span></h1>
              <p className="text-xs tracking-[0.35em] text-zinc-400">TESTING THE FUTURE</p>
            </div>
          </div>

          <div className="hidden md:flex gap-8 text-sm text-zinc-300">
            <a href="#services" className="hover:text-orange-400 transition">Services</a>
            <a href="#expertise" className="hover:text-orange-400 transition">Expertise</a>
            <a href="#about" className="hover:text-orange-400 transition">About</a>
            <a href="#contact" className="hover:text-orange-400 transition">Contact</a>
          </div>
        </nav>

        <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center px-10 py-24 max-w-7xl mx-auto">
          <div>
            <div className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-full px-4 py-2 text-sm text-orange-400 mb-6">
              Telecom Engineering • QA Automation • 5G Validation
            </div>

            <h2 className="text-5xl lg:text-7xl font-bold leading-tight mb-6">
              Engineering the <span className="text-orange-500">Future</span> of Telecom Validation
            </h2>

            <p className="text-zinc-400 text-lg leading-relaxed mb-8 max-w-xl">
              Radius Core delivers telecom-native testing, automation, packet core validation, and production-grade network assurance for modern operators, MVNOs, and digital telecom ecosystems.
            </p>

            <div className="flex flex-wrap gap-4">
              <button className="bg-orange-500 hover:bg-orange-600 transition px-8 py-4 rounded-2xl font-semibold shadow-lg shadow-orange-500/30">
                Explore Services
              </button>

              <button className="border border-zinc-700 hover:border-orange-500 hover:text-orange-400 transition px-8 py-4 rounded-2xl font-semibold">
                Contact Us
              </button>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="absolute w-[500px] h-[500px] rounded-full border border-orange-500/20"></div>
            <div className="absolute w-[380px] h-[380px] rounded-full border border-orange-500/30"></div>
            <div className="absolute w-[260px] h-[260px] rounded-full border border-orange-500/40"></div>

            <div className="relative bg-zinc-950 border border-zinc-800 rounded-[32px] p-10 shadow-2xl shadow-orange-500/10 backdrop-blur-xl">
              <div className="w-44 h-44 rounded-[36px] bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-2xl shadow-orange-500/40 mx-auto mb-6">
                <span className="text-6xl font-bold">RC</span>
              </div>

              <div className="text-center">
                <h3 className="text-3xl font-bold">Radius Core</h3>
                <p className="text-orange-400 tracking-[0.25em] mt-2 text-sm">TESTING THE FUTURE</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="px-10 py-24 max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <p className="text-orange-500 uppercase tracking-[0.35em] text-sm mb-4">Core Services</p>
          <h3 className="text-5xl font-bold">Telecom Engineering Excellence</h3>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: 'Packet Core Validation',
              desc: 'EPC & 5GC testing, interoperability validation, and production-grade assurance.'
            },
            {
              title: 'IMS / VoLTE Testing',
              desc: 'Advanced VoLTE, VoWiFi, IR.92/94 and IMS interoperability testing.'
            },
            {
              title: '5G Standalone Validation',
              desc: 'Cloud-native telecom validation for modern 5G architectures.'
            },
            {
              title: 'Roaming & MVNO Testing',
              desc: 'International roaming validation, steering, TAP/RAP and multi-network testing.'
            },
            {
              title: 'QA Automation',
              desc: 'Automation frameworks, API validation, CI/CD telecom testing pipelines.'
            },
            {
              title: 'Production Assurance',
              desc: 'Live-network validation, KPI monitoring, and release confidence engineering.'
            }
          ].map((service, index) => (
            <div
              key={index}
              className="bg-zinc-950 border border-zinc-800 hover:border-orange-500/50 transition rounded-3xl p-8 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-6 group-hover:bg-orange-500/20 transition">
                <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
              </div>

              <h4 className="text-2xl font-bold mb-4">{service.title}</h4>
              <p className="text-zinc-400 leading-relaxed">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Expertise */}
      <section id="expertise" className="bg-zinc-950 border-y border-zinc-800 px-10 py-24">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-orange-500 uppercase tracking-[0.35em] text-sm mb-4">Why Radius Core</p>
            <h3 className="text-5xl font-bold leading-tight mb-8">
              Telecom-Native Validation.
              <br />
              Automation-First Delivery.
            </h3>

            <div className="space-y-6">
              {[
                'Deep Packet Core & IMS expertise',
                'Modern automation frameworks',
                'Production-grade validation approach',
                'Global telecom interoperability experience',
                'Cloud-native & 5G-ready testing'
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <p className="text-lg text-zinc-300">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {[
              ['4G/5G', 'Next-gen network validation'],
              ['IMS', 'VoLTE & VoWiFi expertise'],
              ['Automation', 'CI/CD & API testing'],
              ['Roaming', 'Global interoperability']
            ].map(([title, desc], idx) => (
              <div
                key={idx}
                className="bg-black border border-zinc-800 rounded-3xl p-8"
              >
                <h4 className="text-4xl font-bold text-orange-500 mb-4">{title}</h4>
                <p className="text-zinc-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="px-10 py-24 max-w-5xl mx-auto text-center">
        <div className="bg-gradient-to-br from-orange-500/10 to-black border border-orange-500/20 rounded-[40px] p-16 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 border border-orange-500 rounded-full"></div>
          </div>

          <div className="relative z-10">
            <p className="text-orange-500 uppercase tracking-[0.35em] text-sm mb-4">Let's Build The Future</p>
            <h3 className="text-5xl font-bold mb-6">
              Ready to modernize your telecom validation strategy?
            </h3>

            <p className="text-zinc-400 text-lg max-w-2xl mx-auto mb-10">
              Radius Core partners with telecom operators, MVNOs, and technology providers to accelerate innovation through precision engineering and intelligent testing.
            </p>

            <button className="bg-orange-500 hover:bg-orange-600 transition px-10 py-5 rounded-2xl font-bold text-lg shadow-xl shadow-orange-500/30">
              Get In Touch
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 px-10 py-10 text-center text-zinc-500">
        <p>© 2026 Radius Core • Testing The Future</p>
      </footer>
    </div>
  )
}
