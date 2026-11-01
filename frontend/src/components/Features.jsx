import React from 'react'

export default function Features() {
  const tools = [
    {
      id: 'destinations',
      title: 'Destination Recommendations',
      description: 'Find places based on your interests, budget, weather and travel style.',
      iconBg: 'bg-red-50 text-[#C1121F]',
      btnBg: 'bg-[#C1121F]',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
        </svg>
      ),
      link: '#destinations',
    },
    {
      id: 'budget',
      title: 'Budget Estimator',
      description: 'Get a clear breakdown of expected costs before you travel.',
      iconBg: 'bg-sky-50 text-[#0284C7]',
      btnBg: 'bg-[#0284C7]',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <line x1="2" y1="10" x2="22" y2="10" />
          <path d="M6 15h2" />
          <circle cx="16" cy="15" r="1.5" />
        </svg>
      ),
      link: '#how-it-works',
    },
    {
      id: 'itinerary',
      title: 'Itinerary Builder',
      description: 'Create and customize your day-by-day plan with AI.',
      iconBg: 'bg-red-50 text-[#C1121F]',
      btnBg: 'bg-[#C1121F]',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
          <path d="m9 16 2 2 4-4" />
        </svg>
      ),
      link: '#how-it-works',
    },
    {
      id: 'community',
      title: 'Find Travel Companions',
      description: 'Join public trips or create your own and meet like-minded travellers.',
      iconBg: 'bg-red-50 text-[#C1121F]',
      btnBg: 'bg-[#C1121F]',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      link: '#community',
    },
    {
      id: 'booking',
      title: 'AI Booking Agent',
      description: 'Compare and book hotels, flights, trains and more with AI assistance.',
      iconBg: 'bg-orange-50 text-[#EA580C]',
      btnBg: 'bg-[#0284C7]',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
        </svg>
      ),
      link: '#how-it-works',
    },
  ]

  return (
    <section
      id="features"
      className="py-28 lg:py-36 px-6 sm:px-10 lg:px-16 bg-[#003049] text-white relative overflow-hidden"
    >
      {/* Background subtle radial glow */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-[#669BBC]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-[#F5B82E]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* ─── SECTION 03 GRID: LEFT HEADER + RIGHT 5 CARDS ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          
          {/* Left Column: Number + Headline + Description + Hand-drawn Arrow */}
          <div className="lg:col-span-4 flex flex-col justify-between h-full pt-2">
            <div>
              {/* Giant "03" Anchor + Headline in One Row Sequence with Generous Spacing */}
              <div className="flex flex-row items-start gap-4 sm:gap-6 lg:gap-7 mb-6">
                <span className="font-display font-black text-7xl sm:text-8xl md:text-9xl lg:text-[8.2rem] xl:text-[9.2rem] text-white/20 select-none leading-none tracking-tighter shrink-0 pt-1">
                  03
                </span>
                <div className="flex flex-col">
                  <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl lg:text-[4.2rem] xl:text-[4.8rem] uppercase tracking-tight text-white leading-[0.89]">
                    PLAN
                    <br />
                    SMARTER
                    <br />
                    <span className="text-[#F5B82E] drop-shadow-[0_0_30px_rgba(245,184,46,0.3)]">WITH AI</span>
                  </h2>
                </div>
              </div>

              {/* Subtitle */}
              <p className="text-white/85 text-base sm:text-lg leading-relaxed max-w-sm font-sans mt-6 font-normal">
                Get personalized recommendations, budget estimates, detailed itineraries and the best places to stay and travel.
              </p>
            </div>

            {/* Hand-drawn red curved sketch arrow pointing to the cards */}
            <div className="hidden lg:flex items-center gap-2 mt-12 pl-6">
              <svg
                className="w-24 h-16 text-[#C1121F] -rotate-6"
                viewBox="0 0 100 60"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M10,20 C35,10 65,15 85,42" />
                <path d="M72,42 L86,43 L85,30" />
              </svg>
            </div>
          </div>

          {/* Right Column: 5 White Feature Cards */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* Top Row: 3 Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {tools.slice(0, 3).map((tool) => (
                <div
                  key={tool.id}
                  className="bg-white rounded-3xl p-6 text-slate-800 shadow-xl flex flex-col justify-between group hover:-translate-y-1.5 transition-all duration-300 min-h-[220px]"
                >
                  <div>
                    {/* Rounded Icon Emblem */}
                    <div className={`w-12 h-12 rounded-2xl ${tool.iconBg} flex items-center justify-center mb-5 group-hover:scale-105 transition-transform`}>
                      {tool.icon}
                    </div>

                    {/* Title */}
                    <h3 className="font-display font-black text-xl text-slate-900 tracking-wide uppercase leading-tight">
                      {tool.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-slate-600 mt-2.5 leading-relaxed font-sans font-medium">
                      {tool.description}
                    </p>
                  </div>

                  {/* Circular Button with Arrow at Bottom Right */}
                  <div className="flex justify-end mt-4">
                    <a
                      href={tool.link}
                      className={`w-8 h-8 rounded-full ${tool.btnBg} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}
                      aria-label={`Explore ${tool.title}`}
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Row: 2 Wider Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {tools.slice(3, 5).map((tool) => (
                <div
                  key={tool.id}
                  className="bg-white rounded-3xl p-6 text-slate-800 shadow-xl flex flex-col justify-between group hover:-translate-y-1.5 transition-all duration-300 min-h-[200px]"
                >
                  <div>
                    {/* Rounded Icon Emblem */}
                    <div className={`w-12 h-12 rounded-2xl ${tool.iconBg} flex items-center justify-center mb-5 group-hover:scale-105 transition-transform`}>
                      {tool.icon}
                    </div>

                    {/* Title */}
                    <h3 className="font-display font-black text-xl text-slate-900 tracking-wide uppercase leading-tight">
                      {tool.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-slate-600 mt-2.5 leading-relaxed font-sans font-medium">
                      {tool.description}
                    </p>
                  </div>

                  {/* Circular Button with Arrow at Bottom Right */}
                  <div className="flex justify-end mt-4">
                    <a
                      href={tool.link}
                      className={`w-8 h-8 rounded-full ${tool.btnBg} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}
                      aria-label={`Explore ${tool.title}`}
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}
