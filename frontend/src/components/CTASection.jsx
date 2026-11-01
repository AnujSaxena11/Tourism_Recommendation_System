import { useState } from 'react'

export default function CTASection() {
  const [isHovered, setIsHovered] = useState(false)

  // Lake Braies / Dolomites alpine lake panorama with wooden rowboat and towering jagged peaks
  const primaryImage = '/images/lago-di-braies.jpg'

  return (
    <section
      className="relative min-h-[760px] lg:min-h-[860px] flex items-center py-20 lg:py-28 px-6 sm:px-10 lg:px-16 overflow-hidden bg-gradient-to-br from-[#001726] via-[#02374c] to-[#012233] text-white select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ─── 1. AMBIENT BACKGROUND GLOWS ─── */}
      <div className="absolute -top-32 -left-32 w-[520px] h-[520px] bg-teal-400/12 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-32 right-1/4 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-amber-400/8 rounded-full blur-[100px] pointer-events-none" />

      {/* ─── 2. VINTAGE PASSPORT / POSTAL STAMP (TOP-LEFT) ─── */}
      <div className="absolute top-8 left-8 sm:left-14 pointer-events-none opacity-35 select-none transform -rotate-12 hidden sm:block z-10">
        <svg className="w-32 h-32 text-teal-300" viewBox="0 0 160 160" fill="none" stroke="currentColor">
          {/* Double concentric ring */}
          <circle cx="65" cy="80" r="56" strokeWidth="1.5" strokeDasharray="4 3" />
          <circle cx="65" cy="80" r="50" strokeWidth="1" />
          <circle cx="65" cy="80" r="34" strokeWidth="0.8" />
          {/* Text inside */}
          <text x="65" y="68" textAnchor="middle" fill="currentColor" stroke="none" className="text-[9px] font-mono tracking-[0.2em] font-black uppercase">
            EXPLORE
          </text>
          <text x="65" y="83" textAnchor="middle" fill="currentColor" stroke="none" className="text-[8.5px] font-mono tracking-[0.16em] font-extrabold uppercase">
            TRAVEL
          </text>
          <text x="65" y="97" textAnchor="middle" fill="currentColor" stroke="none" className="text-[8px] font-mono tracking-[0.2em] font-black uppercase">
            REPEAT
          </text>
          {/* Wavy postal lines */}
          <path d="M125 65 Q138 60 152 65 T180 65" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M125 80 Q138 75 152 80 T180 80" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M125 95 Q138 90 152 95 T180 95" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </div>

      {/* ─── 3. TOP-CENTER GOLDEN COMPASS PENDANT ─── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-20">
        {/* Hanging gold chain */}
        <div className="w-[1.5px] h-12 bg-gradient-to-b from-amber-200/20 via-amber-400 to-amber-300 shadow-[0_0_8px_rgba(245,184,46,0.6)]" />
        {/* Glowing Compass Orb */}
        <div className="relative -mt-1 w-7 h-7 rounded-full bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-200 p-[1.5px] shadow-[0_0_24px_rgba(245,184,46,0.85)] flex items-center justify-center">
          <div className="w-full h-full rounded-full bg-[#001D2E] flex items-center justify-center">
            <span className="text-amber-300 text-[10px] transform transition-transform duration-700">▼</span>
          </div>
          {/* Radiant pulse halo */}
          <div className="absolute inset-0 rounded-full bg-amber-400/40 animate-ping pointer-events-none" />
        </div>
      </div>

      {/* ─── 4. DECORATIVE TEAL DOT MATRIX ─── */}
      <div className="absolute top-14 left-[34%] hidden lg:grid grid-cols-6 gap-2.5 opacity-30 pointer-events-none z-10">
        {Array.from({ length: 24 }).map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 rounded-full bg-teal-300" />
        ))}
      </div>

      {/* ─── 5. DIAGONAL TUBES WITH CONTINUOUS REVEALED IMAGE (SVG OVERLAY) ─── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex justify-end">
        <svg
          viewBox="0 0 1440 860"
          className="w-full h-full object-cover object-right"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            {/* ─── MASK REVEALING SINGLE CONTINUOUS IMAGE THROUGH DIAGONAL TUBES ─── */}
            <mask id="tubeGlimpseMask" maskUnits="userSpaceOnUse" x="0" y="0" width="1440" height="860">
              {/* Black background hides image */}
              <rect x="0" y="0" width="1440" height="860" fill="#000000" />

              {/* White apertures reveal the single landscape image */}
              <g transform="rotate(-36 940 430)">
                {/* Tube 1: Lower-left glimpse (reveals water & shore) */}
                <rect x="500" y="260" width="175" height="740" rx="87.5" fill="#ffffff" />

                {/* Tube 2: Main center tall tube (reveals traveler rowing boat & lake reflections) */}
                <rect x="715" y="-30" width="200" height="1060" rx="100" fill="#ffffff" />

                {/* Tube 3: Right prominent tube (reveals dramatic Dolomites peaks & wooden boat bow) */}
                <rect x="950" y="-80" width="200" height="1060" rx="100" fill="#ffffff" />
              </g>
            </mask>

            {/* Specular border gradient for glowing capsule rims (Electric Teal to Warm Gold) */}
            <linearGradient id="glimpseRimGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="25%" stopColor="#2dd4bf" />
              <stop offset="55%" stopColor="#0ea5e9" />
              <stop offset="85%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#fbbf24" />
            </linearGradient>

            {/* Cylindrical 3D glass highlight running down the tubes */}
            <linearGradient id="tubeGlassSheen" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.4)" />
              <stop offset="25%" stopColor="rgba(255, 255, 255, 0.08)" />
              <stop offset="80%" stopColor="rgba(0, 0, 0, 0.0)" />
              <stop offset="100%" stopColor="rgba(0, 0, 0, 0.35)" />
            </linearGradient>

            {/* Far-right accent stripe gradient */}
            <linearGradient id="accentStripeGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.95)" />
              <stop offset="40%" stopColor="rgba(45, 212, 191, 0.85)" />
              <stop offset="80%" stopColor="rgba(245, 184, 46, 0.6)" />
              <stop offset="100%" stopColor="rgba(255, 255, 255, 0.1)" />
            </linearGradient>

            {/* Ambient drop shadow behind capsules for elevated 3D depth */}
            <filter id="capsuleElevation" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="-14" dy="22" stdDeviation="28" floodColor="#000e17" floodOpacity="0.95" />
            </filter>
          </defs>

          {/* 1. Deep backdrop shadow silhouettes (recessed trench behind tubes) */}
          <g transform="rotate(-36 940 430)" filter="url(#capsuleElevation)">
            <rect x="500" y="260" width="175" height="740" rx="87.5" fill="#001420" stroke="#001f30" strokeWidth="6" />
            <rect x="715" y="-30" width="200" height="1060" rx="100" fill="#001420" stroke="#001f30" strokeWidth="6" />
            <rect x="950" y="-80" width="200" height="1060" rx="100" fill="#001420" stroke="#001f30" strokeWidth="6" />
          </g>

          {/* 2. Single Continuous Large Image Hiding Behind & Visible ONLY Through the Tubes */}
          <g mask="url(#tubeGlimpseMask)">
            <image
              href={primaryImage}
              xlinkHref={primaryImage}
              x="140"
              y="-10"
              width="1520"
              height="940"
              preserveAspectRatio="xMidYMid slice"
              style={{
                transition: 'transform 1.4s cubic-bezier(0.16, 1, 0.3, 1)',
                transform: isHovered ? 'scale(1.04) translate(-6px, -4px)' : 'scale(1)',
                transformOrigin: '940px 430px',
              }}
            />
            {/* Subtle atmospheric tint so the image integrates seamlessly with the dark teal theme */}
            <rect
              x="0"
              y="0"
              width="1440"
              height="860"
              fill="#002233"
              opacity="0.08"
            />
          </g>

          {/* 3. Subtle Cylindrical Glass Sheen Overlay on Each Tube */}
          <g transform="rotate(-36 940 430)" style={{ mixBlendMode: 'screen', pointerEvents: 'none' }}>
            <rect x="500" y="260" width="175" height="740" rx="87.5" fill="url(#tubeGlassSheen)" opacity="0.4" />
            <rect x="715" y="-30" width="200" height="1060" rx="100" fill="url(#tubeGlassSheen)" opacity="0.4" />
            <rect x="950" y="-80" width="200" height="1060" rx="100" fill="url(#tubeGlassSheen)" opacity="0.35" />
          </g>

          {/* 4. Glowing Specular Rims on Each Capsule */}
          <g transform="rotate(-36 940 430)">
            {/* Tube 1 rim */}
            <rect
              x="500"
              y="260"
              width="175"
              height="740"
              rx="87.5"
              fill="none"
              stroke="url(#glimpseRimGrad)"
              strokeWidth="3.2"
              opacity="0.95"
            />
            {/* Tube 2 rim */}
            <rect
              x="715"
              y="-30"
              width="200"
              height="1060"
              rx="100"
              fill="none"
              stroke="url(#glimpseRimGrad)"
              strokeWidth="3.5"
              opacity="1"
            />
            {/* Tube 3 rim */}
            <rect
              x="950"
              y="-80"
              width="200"
              height="1060"
              rx="100"
              fill="none"
              stroke="url(#glimpseRimGrad)"
              strokeWidth="3.5"
              opacity="1"
            />

            {/* 5. Thin Geometric Accent Runner Stripe (as in reference top-right) */}
            <rect
              x="1185"
              y="-30"
              width="20"
              height="680"
              rx="10"
              fill="url(#accentStripeGrad)"
              stroke="rgba(255, 255, 255, 0.9)"
              strokeWidth="1.8"
              opacity="0.85"
            />
          </g>

          {/* 6. Distant Gliding Bird Silhouettes in the Upper Sky */}
          <g opacity="0.75" className="hidden lg:block">
            <path
              d="M 1210 170 Q 1222 160 1234 170 Q 1246 160 1258 170 Q 1246 165 1234 173 Q 1222 165 1210 170 Z"
              fill="#001826"
            />
            <path
              d="M 1275 220 Q 1284 212 1293 220 Q 1302 212 1311 220 Q 1302 216 1293 222 Q 1284 216 1275 220 Z"
              fill="#001826"
            />
          </g>
        </svg>
      </div>

      {/* ─── 6. BILLOWING CLOUDS & MIST COMPOSITING (BOTTOM EDGES) ─── */}
      <img
        src="/images/clouds.jpg"
        alt=""
        className="absolute -bottom-24 -left-20 w-[600px] mix-blend-screen opacity-50 pointer-events-none z-10 filter contrast-125"
      />
      <img
        src="/images/clouds.jpg"
        alt=""
        className="absolute -bottom-28 right-0 w-[780px] mix-blend-screen opacity-60 pointer-events-none z-10 filter contrast-125 scale-x-[-1]"
      />
      {/* Soft gradient bottom fog fader */}
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#001726]/85 via-[#001726]/30 to-transparent pointer-events-none z-10" />

      {/* ─── 7. CURVED DOTTED ARROW (BOTTOM-RIGHT) ─── */}
      <div className="absolute bottom-10 right-10 sm:right-20 pointer-events-none hidden lg:block select-none z-20">
        <svg className="w-32 h-32" viewBox="0 0 120 120" fill="none">
          <path
            d="M 10 110 C 35 110, 75 95, 95 38"
            stroke="rgba(255, 255, 255, 0.85)"
            strokeWidth="2.2"
            strokeDasharray="5 6"
            strokeLinecap="round"
          />
          {/* Gold wireframe arrowhead pointing upwards */}
          <polygon
            points="95,22 84,40 106,36"
            fill="none"
            stroke="#F5B82E"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* ─── 8. FOREGROUND CONTENT LAYER (LEFT COLUMN) ─── */}
      <div className="relative z-30 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Bold Typography & Actions */}
        <div className="lg:col-span-7 xl:col-span-6">
          {/* Subtle Tag + Chevrons */}
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-[2px] bg-teal-400 rounded-full" />
            <span className="text-teal-300 font-extrabold tracking-widest text-xs uppercase drop-shadow">
              Uncharted Destinations
            </span>
            <div className="flex items-center gap-1 text-teal-400/90 text-[10px] pl-1">
              <span>▶</span>
              <span>▶</span>
              <span>▶</span>
            </div>
          </div>

          {/* Cursive Artistic Pre-heading */}
          <div className="flex items-center gap-3 mb-2">
            <span className="font-handwriting text-3xl sm:text-4xl text-[#F5B82E] font-bold -rotate-1 select-none drop-shadow-[0_2px_12px_rgba(245,184,46,0.5)]">
              New Places, Brighter Stories
            </span>
          </div>

          {/* Master Heading with Brush Stroke Underline */}
          <div className="relative inline-block">
            <h2 className="font-display font-black text-6xl sm:text-7xl md:text-8xl lg:text-[5.8rem] xl:text-[6.6rem] uppercase tracking-tight text-white leading-[0.88] drop-shadow-2xl">
              THE WORLD
              <br />
              IS WAITING.
              <br />
              <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-amber-300 to-[#F5B82E] drop-shadow-[0_4px_25px_rgba(245,184,46,0.3)]">
                LET'S GO.
                {/* Authentic Golden Brush Stroke Underline */}
                <svg
                  className="absolute -bottom-3 left-0 w-full h-4 sm:h-5 text-[#F5B82E] pointer-events-none"
                  viewBox="0 0 280 16"
                  fill="currentColor"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M4 12 C 45 4, 120 2, 276 8 C 210 14, 90 15, 4 12 Z M 60 14 C 110 10, 190 9, 260 12 C 180 15, 110 16, 60 14 Z"
                    opacity="0.95"
                  />
                </svg>
              </span>
            </h2>
          </div>

          {/* Narrative Lead Paragraph */}
          <p className="mt-8 text-slate-200/90 text-sm sm:text-base lg:text-lg max-w-xl leading-relaxed font-normal drop-shadow">
            Explore crystal alpine lakes, untamed peaks, and vibrant coastal retreats. Build your custom itinerary with AI or join fellow travellers embarking on unforgettable shared expeditions.
          </p>

          {/* Dual Call To Actions */}
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => {
                const el = document.querySelector('#destinations')
                if (el) el.scrollIntoView({ behavior: 'smooth' })
              }}
              className="btn-gold !py-4 !px-8 sm:!px-9 text-xs sm:text-sm font-display uppercase font-extrabold tracking-wider shadow-[0_0_36px_rgba(245,184,46,0.6)] hover:shadow-[0_0_46px_rgba(245,184,46,0.85)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <span>Explore Destinations</span>
              <span className="text-base ml-1">→</span>
            </button>

            <button
              type="button"
              onClick={() => {
                const el = document.querySelector('#how-it-works')
                if (el) el.scrollIntoView({ behavior: 'smooth' })
              }}
              className="px-7 py-4 rounded-full bg-[#002233]/70 hover:bg-[#002f45] border border-teal-400/40 backdrop-blur-md text-xs sm:text-sm font-bold uppercase tracking-wider text-white hover:text-teal-200 shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              Plan with AI
            </button>
          </div>

          {/* ─── 9. SOCIAL PROOF / COMMUNITY STRIP (REFERENCED FROM DESIGN) ─── */}
          <div className="mt-10 flex items-center gap-4">
            <div className="flex items-center -space-x-2.5">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                alt="Traveler"
                className="w-10 h-10 rounded-full border-2 border-[#001726] object-cover shadow-lg"
              />
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
                alt="Traveler"
                className="w-10 h-10 rounded-full border-2 border-[#001726] object-cover shadow-lg"
              />
              <img
                src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80"
                alt="Traveler"
                className="w-10 h-10 rounded-full border-2 border-[#001726] object-cover shadow-lg"
              />
              <div className="w-10 h-10 rounded-full border-2 border-[#001726] bg-[#024359] flex items-center justify-center text-[11px] font-extrabold text-amber-300 shadow-lg">
                +2K
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-300/95 font-medium leading-tight">
              Join a growing community
              <br />
              of explorers worldwide.
            </p>
          </div>
        </div>

        {/* Right Column: Kept clear so the tubes and landscape are fully revealed */}
        <div className="lg:col-span-5 xl:col-span-6 pointer-events-none" />
      </div>
    </section>
  )
}
