import { useEffect, useRef, useState } from 'react'

function CountUp({ target, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const steps = 60
          const increment = target / steps
          let current = 0
          const timer = setInterval(() => {
            current += increment
            if (current >= target) {
              setCount(target)
              clearInterval(timer)
            } else {
              setCount(Math.floor(current))
            }
          }, duration / steps)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target, duration])

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  )
}

const stats = [
  { value: 500, suffix: '+', label: 'Destinations Covered', icon: '🌍', desc: 'Across India and beyond' },
  { value: 50000, suffix: '+', label: 'Trips Planned', icon: '✈️', desc: 'And counting every day' },
  { value: 98, suffix: '%', label: 'Satisfaction Rate', icon: '⭐', desc: 'From verified travellers' },
  { value: 120, suffix: '+', label: 'Travel Buddies Made', icon: '🤝', desc: 'Through our community' },
]

export default function Stats() {
  return (
    <section className="relative py-28 overflow-hidden">
      {/* Bold gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-night-900 via-night-800 to-night-900" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="section-tag mb-6 reveal">By The Numbers</div>
          <h2 className="font-outfit font-black text-4xl sm:text-5xl text-white reveal">
            Trusted by <span className="gradient-text">Wanderers</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="glass-card border border-white/[0.06] p-7 text-center group hover:border-amber-500/30 hover:bg-white/[0.06] transition-all duration-500 reveal"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="text-3xl mb-4 group-hover:scale-125 transition-transform duration-300 inline-block">
                {stat.icon}
              </div>
              <div className="font-outfit font-black text-4xl lg:text-5xl text-white mb-2 group-hover:text-amber-400 transition-colors duration-300">
                <CountUp target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="font-semibold text-sm text-white/70 mb-1">{stat.label}</div>
              <div className="text-xs text-white/30">{stat.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
