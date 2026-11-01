const steps = [
  {
    step: '01',
    icon: '🎯',
    title: 'Tell Us Your Vibe',
    description: 'Answer a quick set of questions — your budget, trip duration, interests, and weather preference.',
    color: 'text-amber-400',
    glow: 'shadow-amber-500/20',
  },
  {
    step: '02',
    icon: '🌍',
    title: 'Get AI Recommendations',
    description: 'Our AI scans real-time weather, travel conditions and alerts to suggest the best destinations for you.',
    color: 'text-teal-400',
    glow: 'shadow-teal-500/20',
  },
  {
    step: '03',
    icon: '📋',
    title: 'Build Your Itinerary',
    description: 'Generate or manually craft a day-by-day plan. Add activities, estimate costs, adjust timing.',
    color: 'text-coral-400',
    glow: 'shadow-coral-500/20',
  },
  {
    step: '04',
    icon: '🚀',
    title: 'Book & Go',
    description: 'Let the AI booking agent find hotels and transport within your budget. Confirm and you\'re done.',
    color: 'text-purple-400',
    glow: 'shadow-purple-500/20',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-night-900 to-night-800" />

      {/* Decorative grid */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="section-tag mb-6 reveal">Simple Process</div>
          <h2 className="font-outfit font-black text-4xl sm:text-5xl lg:text-6xl text-white mb-6 reveal">
            From Idea to{' '}
            <span className="gradient-text">Takeoff</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto reveal">
            Four steps. Zero confusion. Your entire trip sorted in minutes.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-1/2 left-[12%] right-[12%] h-px bg-gradient-to-r from-amber-500/0 via-amber-500/30 to-amber-500/0 -translate-y-1/2 z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center group reveal"
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                {/* Step Number + Icon */}
                <div className={`relative mb-6`}>
                  <div className={`w-20 h-20 rounded-2xl glass-card border border-white/10 flex items-center justify-center text-3xl transition-all duration-500 group-hover:scale-110 group-hover:shadow-2xl ${step.glow} group-hover:border-white/20`}>
                    {step.icon}
                  </div>
                  <div className={`absolute -top-2 -right-2 w-7 h-7 rounded-full bg-night-800 border border-white/10 flex items-center justify-center text-xs font-black font-outfit ${step.color}`}>
                    {step.step}
                  </div>
                </div>

                <h3 className={`font-outfit font-bold text-lg text-white mb-3 group-hover:${step.color.replace('text-', 'text-')} transition-colors duration-300`}>
                  {step.title}
                </h3>
                <p className="text-white/45 text-sm leading-relaxed max-w-[220px]">
                  {step.description}
                </p>

                {/* Arrow connector (mobile) */}
                {i < steps.length - 1 && (
                  <div className="lg:hidden mt-8 text-white/20 text-2xl">↓</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20 reveal">
          <a href="#" className="btn-primary text-base py-4 px-10">
            Start Your Journey →
          </a>
          <p className="text-white/25 text-sm mt-4">No credit card required</p>
        </div>
      </div>
    </section>
  )
}
