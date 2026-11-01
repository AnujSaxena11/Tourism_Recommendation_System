import { useState } from 'react'

export default function Hero() {
  const [videoModalOpen, setVideoModalOpen] = useState(false)

  const floatingDestinations = [
    {
      city: 'Manali',
      state: 'Himachal Pradesh',
      temp: '12°C',
      tag: 'Snowy Peaks',
      icon: (
        <svg className="w-5 h-5 text-sky-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
        </svg>
      ),
      img: '/images/manali.jpg',
    },
    {
      city: 'Goa',
      state: 'Goa',
      temp: '28°C',
      tag: 'Sunny Beaches',
      icon: (
        <svg className="w-5 h-5 text-amber-400" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="5" />
          <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      ),
      img: '/images/goa.jpg',
    },
    {
      city: 'Kerala',
      state: 'Backwaters',
      temp: '24°C',
      tag: 'Lush Greens',
      icon: (
        <svg className="w-5 h-5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
          <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
        </svg>
      ),
      img: '/images/kerala.jpg',
    },
  ]

  return (
    <section id="hero" className="relative min-h-[95vh] lg:min-h-screen flex flex-col justify-between pt-28 pb-10 px-6 sm:px-10 lg:px-16 overflow-hidden bg-cosmos-950">
      {/* ─── FULL-BLEED MOUNTAIN CINEMATIC BACKGROUND ─── */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/ghummakad-hero.png"
          alt="Himalayan mountain peak adventure"
          className="w-full h-full object-cover object-center lg:object-[center_35%]"
          onError={(e) => {
            // Fallback to hero.jpg if ghummakad-hero isn't loaded
            e.currentTarget.src = '/images/hero.jpg'
          }}
        />
        {/* Cinematic dark gradients to guarantee text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-cosmos-950 via-cosmos-950/40 to-cosmos-950/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-cosmos-950/85 via-cosmos-950/45 to-transparent" />
      </div>

      {/* ─── MAIN HERO CONTENT GRID ─── */}
      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center my-auto py-8 lg:py-12">
        {/* Left Column: Heading and CTAs */}
        <div className="lg:col-span-7 flex flex-col pt-8 lg:pt-0">
          
          {/* 01 Anchor and Heading in One Row Sequence with Generous Spacing */}
          <div className="flex flex-row items-start gap-5 sm:gap-7 lg:gap-9">
            <span className="font-display font-black text-7xl sm:text-8xl md:text-9xl lg:text-[9.2rem] xl:text-[10.5rem] text-white/20 select-none leading-none tracking-tighter shrink-0 pt-1">
              01
            </span>
            <div className="flex flex-col">
              <h1 className="font-display font-black text-5xl sm:text-6xl md:text-7xl lg:text-[4.6rem] xl:text-[5.4rem] uppercase tracking-tight text-white leading-[0.89] drop-shadow-2xl">
                YOUR NEXT<br />
                <span className="text-gold drop-shadow-[0_0_35px_rgba(245,184,46,0.35)]">ADVENTURE</span><br />
                STARTS HERE.
              </h1>
            </div>
          </div>

          {/* Italicized Rhythm Subline */}
          <div className="flex items-center gap-2.5 mt-6 text-sm sm:text-base lg:text-lg font-semibold tracking-wider text-slate-200/95 italic">
            <span>Plan</span>
            <span className="text-gold">•</span>
            <span>Explore</span>
            <span className="text-gold">•</span>
            <span>Connect</span>
            <span className="text-gold">•</span>
            <span>Book</span>
          </div>

          {/* Description Copy */}
          <p className="mt-5 text-sm sm:text-base lg:text-lg text-slate-200/90 leading-relaxed max-w-xl font-normal drop-shadow">
            AI-powered travel planning with real-time recommendations, smart itineraries,
            travel companions and hassle-free bookings — all in one place.
          </p>

          {/* Dual Call To Actions - Show-Quality Presentation */}
          <div className="mt-10 flex flex-wrap items-center gap-5">
            <button
              type="button"
              onClick={() => {
                const el = document.querySelector('#how-it-works')
                if (el) el.scrollIntoView({ behavior: 'smooth' })
              }}
              className="btn-gold !py-4 !px-9 text-sm sm:text-base font-display uppercase font-extrabold tracking-wider shadow-[0_0_28px_rgba(245,184,46,0.45)] hover:shadow-[0_0_38px_rgba(245,184,46,0.65)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              PLAN MY TRIP →
            </button>

            <button
              type="button"
              onClick={() => setVideoModalOpen(true)}
              className="btn-glass !py-4 !px-7 text-xs sm:text-sm font-semibold tracking-wider flex items-center gap-3 hover:scale-105 active:scale-95 transition-all cursor-pointer border border-white/25 shadow-lg"
            >
              <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-[10px] text-white">
                ▶
              </span>
              <span>WATCH HOW IT WORKS</span>
            </button>
          </div>
        </div>

        {/* Right Column: Floating Destination Cards & Red Handwritten Annotation */}
        <div className="lg:col-span-5 flex flex-col items-end relative mt-6 lg:mt-0">
          {/* Handwritten Annotation & Curved Red Arrow */}
          <div className="relative mb-3 mr-4 sm:mr-8 text-right hidden sm:block">
            <span className="font-handwriting text-2xl sm:text-3xl font-bold text-crimson drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] inline-block transform -rotate-3">
              Discover<br />Breathtaking<br />Destinations
            </span>
            {/* Curved red arrow sketching down to the cards */}
            <svg
              className="w-12 h-12 text-crimson absolute -bottom-6 -left-6 transform rotate-12 pointer-events-none drop-shadow"
              viewBox="0 0 60 60"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <path d="M10 10 C 25 35, 45 35, 48 50 M40 45 L48 50 L48 40" />
            </svg>
          </div>

          {/* 3 Floating Glass Destination Cards */}
          <div className="flex flex-col gap-3.5 w-full max-w-xs sm:max-w-sm">
            {floatingDestinations.map((dest, i) => (
              <a
                key={dest.city}
                href="#destinations"
                className="group flex items-center justify-between p-3 rounded-2xl bg-slate-900/65 hover:bg-slate-900/85 backdrop-blur-xl border border-white/15 hover:border-gold/50 shadow-2xl transition-all duration-300 hover:scale-[1.03]"
                style={{ textDecoration: 'none' }}
              >
                <div className="flex items-center gap-3">
                  {/* Destination Thumbnail Photo */}
                  <img
                    src={dest.img}
                    alt={dest.city}
                    className="w-12 h-12 rounded-xl object-cover border border-white/20 shadow-md group-hover:scale-105 transition-transform"
                  />
                  <div>
                    <h2 className="text-sm font-bold text-white group-hover:text-gold transition-colors leading-tight">
                      {dest.city}
                    </h2>
                    <p className="text-[11px] text-slate-300 leading-tight">
                      {dest.state}
                    </p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-xs font-extrabold text-gold">
                        {dest.temp}
                      </span>
                      <span className="text-[10px] text-slate-300">
                        {dest.tag}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Weather / category icon */}
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/10">
                  {dest.icon}
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ─── BOTTOM STATS CAPSULE STRIP ─── */}
      <div className="relative z-10 max-w-5xl mx-auto w-full mt-10">
        <div className="glass-dock py-4 px-6 sm:px-10 rounded-full flex flex-wrap items-center justify-between gap-6 border border-white/15 shadow-2xl">
          {/* Stat 1: Destinations */}
          <div className="flex items-center gap-3">
            <span className="text-2xl text-gold">🏔️</span>
            <div>
              <div className="font-display font-black text-xl sm:text-2xl text-white leading-none">
                500+
              </div>
              <div className="text-[11px] font-medium text-slate-300 tracking-wide uppercase mt-0.5">
                Destinations
              </div>
            </div>
          </div>

          <div className="hidden sm:block w-[1px] h-8 bg-white/15" />

          {/* Stat 2: Trips Planned */}
          <div className="flex items-center gap-3">
            <span className="text-2xl text-gold">📅</span>
            <div>
              <div className="font-display font-black text-xl sm:text-2xl text-white leading-none">
                50K+
              </div>
              <div className="text-[11px] font-medium text-slate-300 tracking-wide uppercase mt-0.5">
                Trips Planned
              </div>
            </div>
          </div>

          <div className="hidden sm:block w-[1px] h-8 bg-white/15" />

          {/* Stat 3: Traveller Rating */}
          <div className="flex items-center gap-3">
            <span className="text-2xl text-gold">⭐</span>
            <div>
              <div className="font-display font-black text-xl sm:text-2xl text-white leading-none">
                4.9/5
              </div>
              <div className="text-[11px] font-medium text-slate-300 tracking-wide uppercase mt-0.5">
                Traveller Rating
              </div>
            </div>
          </div>

          <div className="hidden md:block w-[1px] h-8 bg-white/15" />

          {/* Stat 4: Community Avatars */}
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                alt="Traveller avatar"
                className="w-8 h-8 rounded-full border-2 border-cosmos-900 object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
                alt="Traveller avatar"
                className="w-8 h-8 rounded-full border-2 border-cosmos-900 object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80"
                alt="Traveller avatar"
                className="w-8 h-8 rounded-full border-2 border-cosmos-900 object-cover"
              />
            </div>
            <span className="text-[11px] text-slate-300 font-medium max-w-[130px] leading-tight">
              Join a growing community of travellers
            </span>
          </div>
        </div>
      </div>

      {/* ─── VIDEO MODAL (Interactive Demo) ─── */}
      {videoModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          onClick={() => setVideoModalOpen(false)}
        >
          <div
            className="relative w-full max-w-2xl bg-cosmos-900 border border-white/20 rounded-3xl p-6 shadow-2xl text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <h3 className="font-display font-black text-2xl uppercase tracking-wider text-gold">
                How Ghummakad Works
              </h3>
              <button
                type="button"
                onClick={() => setVideoModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-sm"
              >
                ✕
              </button>
            </div>
            <div className="aspect-video w-full mt-4 rounded-2xl bg-cosmos-950 flex flex-col items-center justify-center p-6 text-center border border-white/10">
              <span className="text-4xl mb-3">🎬</span>
              <p className="font-display text-xl uppercase tracking-wide text-white">
                Experience Instant Travel Magic
              </p>
              <p className="text-xs text-slate-300 max-w-md mt-1">
                Tell Ghummakad your budget, dates, and vibe. Our AI crafts day-by-day itineraries, matches you with fellow wanderers, and assists your bookings.
              </p>
              <a
                href="#planner"
                onClick={() => setVideoModalOpen(false)}
                className="btn-gold !py-2.5 !px-6 text-xs uppercase font-extrabold mt-5"
              >
                Try The Trip Planner →
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
