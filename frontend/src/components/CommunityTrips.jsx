import { useState, useEffect, useRef, useCallback } from 'react'

// ── Generated landscape art: shown whenever a photo fails to load (offline, blocked, missing file) ──
const PALETTES = {
  manali: ['#1e3a5f', '#f6b26b', '#3b5b7a', '#1c2b3a', '#0e1a26'],
  goa: ['#0f4c75', '#ffb347', '#1b8aa6', '#0a6c8a', '#06324a'],
  coorg: ['#14532d', '#d9f99d', '#2f7d4a', '#1d5c36', '#0b2e1a'],
  rajasthan: ['#7c2d12', '#fcd34d', '#c2410c', '#9a3412', '#431407'],
  kasol: ['#312e81', '#fda4af', '#4f46e5', '#3730a3', '#1e1b4b'],
  darjeeling: ['#134e4a', '#fde68a', '#2a9d8f', '#1f6f68', '#0b2d2a'],
  lonavala: ['#365314', '#fef08a', '#65a30d', '#4d7c0f', '#1a2e05'],
  pondy: ['#9d174d', '#fed7aa', '#db2777', '#be185d', '#500724'],
}

const makeArt = (key = 'manali') => {
  const [sky, sun, m1, m2, m3] = PALETTES[key] || PALETTES.manali
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 600" preserveAspectRatio="xMidYMid slice">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${sky}"/><stop offset="1" stop-color="${sun}"/></linearGradient>
    </defs>
    <rect width="400" height="600" fill="url(#g)"/>
    <circle cx="290" cy="190" r="48" fill="${sun}" opacity=".9"/>
    <path d="M0 400 L90 270 L160 360 L240 230 L330 360 L400 300 L400 600 L0 600Z" fill="${m1}" opacity=".85"/>
    <path d="M0 470 L110 360 L190 440 L280 340 L400 450 L400 600 L0 600Z" fill="${m2}"/>
    <path d="M0 540 L120 470 L220 530 L320 480 L400 530 L400 600 L0 600Z" fill="${m3}"/>
  </svg>`
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

const makeAvatar = (seed = 'A') => {
  const hues = [12, 200, 150, 280, 40, 340]
  const h = hues[seed.charCodeAt(0) % hues.length]
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><rect width="40" height="40" fill="hsl(${h},60%,45%)"/><text x="20" y="26" font-size="18" font-family="sans-serif" font-weight="700" text-anchor="middle" fill="#fff">${seed}</text></svg>`
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

// onError helpers: swap once to generated art, never loop
const artFallback = (key) => (e) => {
  if (e.currentTarget.dataset.fb) return
  e.currentTarget.dataset.fb = '1'
  e.currentTarget.src = makeArt(key)
}
const avatarFallback = (seed) => (e) => {
  if (e.currentTarget.dataset.fb) return
  e.currentTarget.dataset.fb = '1'
  e.currentTarget.src = makeAvatar(seed)
}

const U = (id, w = 600) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`
const AVATAR_IDS = [
  '1534528741775-53994a69daeb',
  '1507003211169-0a1dd7228f2d',
  '1494790108377-be9c29b29330',
  '1500648767791-00dcc994a43e',
  '1438761681033-6461ffad8d80',
  '1472099645785-5658abf4ff4e',
  '1544005313-94ddf0286df2',
  '1506794778202-cad84cf45f1d',
  '1517841905240-472988babdf9',
  '1519085360753-af0119f7cbe7',
  '1573496359142-b8d87734a5a2',
  '1522075469751-3a6694fb2f61',
]
const avatarsFor = (n) =>
  [0, 1, 2].map((k) => ({
    src: `https://images.unsplash.com/photo-${AVATAR_IDS[(n * 3 + k) % AVATAR_IDS.length]}?auto=format&fit=crop&w=120&q=80`,
    seed: 'ABCDEFGHJKLMNPRSTV'[(n * 3 + k) % 18],
  }))

export default function CommunityTrips() {
  const [requestedTrips, setRequestedTrips] = useState({})
  const [modalTrip, setModalTrip] = useState(null)
  const [active, setActive] = useState(4) // Start on Kasol as in reference
  const [paused, setPaused] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const dragStart = useRef(null)

  const trips = [
    {
      id: 1,
      art: 'manali',
      route: 'Delhi ➔ Manali',
      tagline: 'Snow, bonfires & zero signal',
      duration: '4 days • 5 people',
      spotsLeft: 2,
      image: '/images/manali.jpg',
      extraCount: 2,
    },
    {
      id: 2,
      art: 'goa',
      route: 'Mumbai ➔ Goa',
      tagline: 'Beach shacks & sunset rides',
      duration: '3 days • 8 people',
      spotsLeft: 3,
      image: '/images/goa.jpg',
      extraCount: 5,
    },
    {
      id: 3,
      art: 'coorg',
      route: 'Bengaluru ➔ Coorg',
      tagline: 'Coffee estates in the mist',
      duration: '2 days • 6 people',
      spotsLeft: 1,
      image: U('1600857544200-b2f666a9a2ec', 600),
      extraCount: 3,
    },
    {
      id: 4,
      art: 'rajasthan',
      route: 'Delhi ➔ Rajasthan',
      tagline: 'Forts, deserts & camel trails',
      duration: '5 days • 7 people',
      spotsLeft: 2,
      image: U('1599661046289-e31897846e41', 600),
      extraCount: 4,
    },
    {
      id: 5,
      art: 'kasol',
      route: 'Chandigarh ➔ Kasol',
      tagline: 'Parvati valley, slow mornings',
      duration: '5 days • 6 people',
      spotsLeft: 4,
      image: U('1626621341517-bbf3d9990a23', 600),
      extraCount: 3,
    },
    {
      id: 6,
      art: 'darjeeling',
      route: 'Kolkata ➔ Darjeeling',
      tagline: 'Toy train & tea gardens',
      duration: '4 days • 9 people',
      spotsLeft: 2,
      image: U('1544735716-392fe2489ffa', 600),
      extraCount: 6,
    },
    {
      id: 7,
      art: 'lonavala',
      route: 'Pune ➔ Lonavala',
      tagline: 'Monsoon trek & hot chai',
      duration: '2 days • 10 people',
      spotsLeft: 5,
      image: U('1507525428034-b723cf961d3e', 600),
      extraCount: 7,
    },
    {
      id: 8,
      art: 'pondy',
      route: 'Chennai ➔ Pondicherry',
      tagline: 'French streets, cycles & cafes',
      duration: '3 days • 4 people',
      spotsLeft: 1,
      image: U('1582510003544-4d00b7f74220', 600),
      extraCount: 1,
    },
  ].map((t, i) => ({ ...t, avatars: avatarsFor(i) }))

  const total = trips.length

  const handleJoinClick = (trip, e) => {
    if (e) e.stopPropagation()
    setRequestedTrips((prev) => ({
      ...prev,
      [trip.id]: true,
    }))
    setModalTrip(trip)
  }

  const go = useCallback(
    (dir) => setActive((a) => (a + dir + total) % total),
    [total]
  )

  // Responsive sizing
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  // Autoplay (pauses on hover and while the modal is open)
  useEffect(() => {
    if (paused || modalTrip) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    const t = setInterval(() => go(1), 5200)
    return () => clearInterval(t)
  }, [paused, modalTrip, go])

  // Keyboard navigation
  const onKeyDown = (e) => {
    if (e.key === 'ArrowLeft') go(-1)
    if (e.key === 'ArrowRight') go(1)
  }

  // Swipe handling
  const onPointerDown = (e) => {
    dragStart.current = e.clientX
  }
  const onPointerUp = (e) => {
    if (dragStart.current === null) return
    const dx = e.clientX - dragStart.current
    dragStart.current = null
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1)
  }

  // Card geometry matching reference screenshot
  const cardW = isMobile ? 220 : 285
  const cardH = isMobile ? 350 : 440
  const spacing = isMobile ? 115 : 160

  const getOffset = (i) => {
    let off = (i - active + total) % total
    if (off > total / 2) off -= total
    return off
  }

  const cardStyle = (off) => {
    const a = Math.abs(off)
    const rotate = off === 0 ? 0 : off < 0 ? 22 : -22
    const scale = off === 0 ? 1.06 : Math.max(0.72, 1 - a * 0.09)
    const z = off === 0 ? 30 : 20 - a
    return {
      width: cardW,
      height: cardH,
      marginLeft: -cardW / 2,
      marginTop: -cardH / 2,
      transform: `translateX(${off * spacing}px) translateZ(${off === 0 ? 60 : -a * 65}px) rotateY(${rotate}deg) scale(${scale})`,
      opacity: a > 2 ? 0 : a === 2 ? 0.7 : 1,
      zIndex: z,
      filter: off === 0 ? 'brightness(1)' : 'brightness(0.62) saturate(0.9)',
      pointerEvents: a > 2 ? 'none' : 'auto',
    }
  }

  return (
    <section
      id="community"
      className="relative pt-20 lg:pt-28 pb-48 lg:pb-56 px-6 sm:px-10 lg:px-16 bg-[#001726] text-white overflow-hidden select-none"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-teal-400/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-cyan-500/8 rounded-full blur-[150px] pointer-events-none" />

      {/* ─── SWEEPING CURVED GREENERY & ROCKY MOUNTAIN PANORAMA WAVE AT BOTTOM ─── */}
      <div className="absolute inset-x-0 bottom-0 h-[170px] sm:h-[200px] lg:h-[230px] pointer-events-none z-0 overflow-hidden">
        <svg
          viewBox="0 0 1440 380"
          className="w-full h-full object-cover"
          preserveAspectRatio="none"
        >
          <defs>
            {/* Main undulating mountain wave clip */}
            <clipPath id="communityMountainWave">
              <path d="M 0 215 C 130 165, 250 165, 370 215 C 490 265, 630 265, 760 205 C 890 155, 1010 155, 1130 215 C 1240 260, 1350 245, 1440 195 L 1440 380 L 0 380 Z" />
            </clipPath>
            {/* Atmospheric gradient blend into bottom */}
            <linearGradient id="mountainBottomBlend" x1="0" y1="0" x2="0" y2="1">
              <stop offset="45%" stopColor="#001726" stopOpacity="0" />
              <stop offset="100%" stopColor="#001726" stopOpacity="0.75" />
            </linearGradient>
            {/* Glow filter for wavy border lines */}
            <filter id="tealGlow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#2dd4bf" floodOpacity="0.7" />
            </filter>
          </defs>

          {/* Layer 1: Subtle translucent backdrop wave for layered depth */}
          <path
            d="M 0 200 C 130 150, 250 150, 370 200 C 490 250, 630 250, 760 190 C 890 140, 1010 140, 1130 200 C 1240 245, 1350 230, 1440 180 L 1440 380 L 0 380 Z"
            fill="rgba(13, 148, 136, 0.20)"
          />

          {/* Layer 2: Main Rocky Mountain Landscape clipped to undulating wave */}
          <g clipPath="url(#communityMountainWave)">
            <image
              href="/images/green-mountain-wave.jpg"
              x="0"
              y="-10"
              width="1440"
              height="450"
              preserveAspectRatio="xMidYMid slice"
            />
            {/* Subtle atmospheric tint */}
            <rect width="1440" height="380" fill="#001726" opacity="0.08" />
            {/* Seamless blend into bottom section */}
            <rect width="1440" height="380" fill="url(#mountainBottomBlend)" />
          </g>

          {/* Layer 3: Secondary Delicate Dashed Cyan Contour Line (Echo Wave) */}
          <path
            d="M 0 205 C 130 155, 250 155, 370 205 C 490 255, 630 255, 760 195 C 890 145, 1010 145, 1130 205 C 1240 250, 1350 235, 1440 185"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="1.5"
            strokeDasharray="6 6"
            opacity="0.65"
          />

          {/* Layer 4: Primary Vibrant Glowing Teal Ridge Crest */}
          <path
            d="M 0 215 C 130 165, 250 165, 370 215 C 490 265, 630 265, 760 205 C 890 155, 1010 155, 1130 215 C 1240 260, 1350 245, 1440 195"
            fill="none"
            stroke="#2dd4bf"
            strokeWidth="2.8"
            opacity="0.95"
            filter="url(#tealGlow)"
          />

          {/* Layer 5: Accent Gold Filament Wave on Crest */}
          <path
            d="M 100 185 C 200 160, 300 185, 420 230 C 540 270, 680 250, 800 185 C 920 145, 1050 170, 1200 230"
            fill="none"
            stroke="#F5B82E"
            strokeWidth="1.2"
            opacity="0.35"
          />
        </svg>
      </div>

      {/* ─── 3. MAIN SECTION CONTENT GRID ─── */}
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Heading + Tagline + Button + 3 Trust Badges */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          {/* Pre-tag: — TRAVEL TOGETHER */}
          <div className="flex items-center gap-3 mb-4">
            <span className="w-9 h-[2px] bg-teal-400 rounded-full" />
            <span className="text-teal-300 font-extrabold tracking-[0.24em] text-xs uppercase drop-shadow">
              Travel Together
            </span>
          </div>

          {/* Master 05 + Heading in perfect horizontal lockup */}
          <div className="flex flex-row items-start gap-4 sm:gap-6 lg:gap-7">
            {/* Giant 05 - Exactly aligned with the text cap-height & baseline */}
            <span className="font-display font-black text-6xl sm:text-7xl md:text-8xl lg:text-[7.2rem] xl:text-[8rem] text-white/20 select-none leading-[0.88] tracking-tighter shrink-0 pt-0.5">
              05
            </span>

            {/* Title with two-tone split */}
            <div className="flex flex-col">
              <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl lg:text-[3.8rem] xl:text-[4.4rem] uppercase tracking-tight text-white leading-[0.88] drop-shadow-2xl">
                TRAVEL
                <br />
                TOGETHER.
                <br />
                <span className="text-[#F5B82E] drop-shadow-[0_0_28px_rgba(245,184,46,0.45)]">
                  MAKE BETTER
                  <br />
                  STORIES.
                </span>
              </h2>
            </div>
          </div>

          {/* Subtext */}
          <p className="mt-6 text-slate-200/90 text-sm sm:text-base leading-relaxed max-w-md font-normal drop-shadow">
            Join public trips, meet like-minded travellers and explore the world together.
          </p>

          {/* Golden Button */}
          <div className="mt-8">
            <button
              type="button"
              onClick={() => {
                const el = document.querySelector('#community')
                if (el) el.scrollIntoView({ behavior: 'smooth' })
              }}
              className="bg-[#F5B82E] hover:bg-[#E0A31D] text-slate-950 font-display font-extrabold px-8 py-4 rounded-full text-xs sm:text-sm uppercase tracking-wider inline-flex items-center gap-2.5 shadow-[0_0_28px_rgba(245,184,46,0.5)] hover:shadow-[0_0_38px_rgba(245,184,46,0.7)] transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>Explore Community Trips</span>
              <span className="text-base font-bold">→</span>
            </button>
          </div>

          {/* 3 Trust Features Strip */}
          <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-6 sm:gap-7 pt-5 border-t border-white/10">
            {/* Real Travellers */}
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-teal-400/10 border border-teal-400/25 flex items-center justify-center text-teal-300">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <div className="leading-tight">
                <div className="text-[11px] font-black uppercase tracking-wider text-white">REAL</div>
                <div className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider">TRAVELLERS</div>
              </div>
            </div>

            {/* Curated Trips */}
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-teal-400/10 border border-teal-400/25 flex items-center justify-center text-teal-300">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
                </svg>
              </div>
              <div className="leading-tight">
                <div className="text-[11px] font-black uppercase tracking-wider text-white">CURATED</div>
                <div className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider">TRIPS</div>
              </div>
            </div>

            {/* Amazing Destinations */}
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-teal-400/10 border border-teal-400/25 flex items-center justify-center text-teal-300">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
                </svg>
              </div>
              <div className="leading-tight">
                <div className="text-[11px] font-black uppercase tracking-wider text-white">AMAZING</div>
                <div className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider">DESTINATIONS</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Coverflow Carousel Stage */}
        <div className="lg:col-span-7 relative flex flex-col items-center">
          {/* Top-Right Cursive Note with Paper Airplane Flight Trail */}
          <div className="absolute -top-14 right-4 sm:right-10 hidden lg:flex items-center gap-2 pointer-events-none select-none z-30">
            <div className="text-right">
              <span className="font-handwriting text-2xl lg:text-[1.7rem] text-[#F5B82E] font-bold leading-tight inline-block transform -rotate-3 drop-shadow-[0_2px_10px_rgba(245,184,46,0.4)]">
                Some Roads
                <br />
                Trigger Stories
              </span>
            </div>
            {/* Curved flight trail with paper airplane */}
            <svg className="w-24 h-16 text-[#F5B82E]" viewBox="0 0 100 60" fill="none">
              <path
                d="M 10 45 Q 40 55 60 30 Q 75 10 50 15 Q 35 20 55 35 Q 75 45 90 20"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeDasharray="3 4"
                strokeLinecap="round"
              />
              <polygon
                points="90,12 85,25 96,20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* 3D Perspective Stage */}
          <div
            className="relative w-full h-[470px] sm:h-[510px] lg:h-[540px] flex items-center justify-center outline-none select-none"
            tabIndex={0}
            onKeyDown={onKeyDown}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerCancel={() => (dragStart.current = null)}
            style={{ perspective: '1200px' }}
          >
            {/* 3D Cards Track */}
            <div
              className="absolute left-1/2 top-1/2"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {trips.map((trip, i) => {
                const off = getOffset(i)
                const isCenter = off === 0
                const [from, to] = trip.route.split('➔').map((s) => s.trim())
                const hasRequested = requestedTrips[trip.id]

                return (
                  <div
                    key={trip.id}
                    onClick={() => !isCenter && setActive(i)}
                    className={`absolute left-0 top-0 rounded-3xl overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.85)] cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isCenter
                        ? 'border border-white/25 shadow-[0_30px_70px_rgba(0,0,0,0.95)]'
                        : 'border border-white/10'
                    }`}
                    style={cardStyle(off)}
                  >
                    {/* Card Photograph */}
                    <img
                      src={trip.image || makeArt(trip.art)}
                      alt={trip.route}
                      draggable={false}
                      className="w-full h-full object-cover"
                      onError={artFallback(trip.art)}
                    />

                    {/* Vignette Gradients */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/15 pointer-events-none" />

                    {/* Top-Right Red Pill: X SPOTS LEFT */}
                    <span className="absolute top-3.5 right-3.5 bg-[#C1121F] text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-md pointer-events-none">
                      {trip.spotsLeft} {trip.spotsLeft === 1 ? 'SPOT LEFT' : 'SPOTS LEFT'}
                    </span>

                    {/* Active Center Card: Comprehensive Info & Join Action inside Card */}
                    {isCenter && (
                      <div className="absolute inset-x-0 bottom-0 p-5 pt-8 bg-gradient-to-t from-[#000d14] via-[#000d14]/85 to-transparent flex flex-col justify-end">
                        {/* Route Title */}
                        <h3 className="font-display font-black text-2xl sm:text-[1.7rem] uppercase tracking-wide text-white leading-tight drop-shadow-md">
                          {from}
                          <br />
                          <span className="text-[#F5B82E]">➔ {to}</span>
                        </h3>

                        {/* Tagline & Duration */}
                        <p className="text-white text-xs font-semibold mt-1.5 drop-shadow leading-snug">
                          {trip.tagline}
                        </p>
                        <p className="text-slate-300 text-[11px] font-medium mt-0.5">
                          {trip.duration}
                        </p>

                        {/* Action Row: Avatars + Request to Join Button */}
                        <div className="mt-3.5 pt-3 border-t border-white/15 flex items-center justify-between gap-2.5">
                          {/* Traveler Avatars */}
                          <div className="flex items-center gap-1.5">
                            <div className="flex -space-x-2">
                              {trip.avatars.map((av, idx) => (
                                <img
                                  key={idx}
                                  src={av.src}
                                  alt="Traveler"
                                  className="w-7 h-7 rounded-full border border-white/80 object-cover"
                                  onError={avatarFallback(av.seed)}
                                />
                              ))}
                            </div>
                            <span className="text-[10px] font-bold text-white/90">
                              +{trip.extraCount}
                            </span>
                          </div>

                          {/* Request to Join Button */}
                          <button
                            type="button"
                            onClick={(e) => handleJoinClick(trip, e)}
                            disabled={hasRequested}
                            className={`py-2 px-4 rounded-xl text-[11px] font-bold transition-all shadow-md flex items-center justify-center gap-1 cursor-pointer ${
                              hasRequested
                                ? 'bg-emerald-600 text-white cursor-default'
                                : 'bg-[#C1121F] hover:bg-[#A30F1A] text-white active:scale-95 shadow-[0_0_15px_rgba(193,18,31,0.5)]'
                            }`}
                          >
                            {hasRequested ? (
                              <>
                                <span>Request Sent</span>
                                <span>✓</span>
                              </>
                            ) : (
                              <span>Request to Join</span>
                            )}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Circular Navigation Buttons */}
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous trip"
              className="absolute z-40 left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-white flex items-center justify-center shadow-2xl transition-all hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-md"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next trip"
              className="absolute z-40 right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-white flex items-center justify-center shadow-2xl transition-all hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-md"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>

          {/* Indicator Dots directly below active card */}
          <div className="flex items-center gap-2 mt-4 z-20">
            {trips.map((trip, i) => (
              <button
                key={trip.id}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Go to ${trip.route}`}
                className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${
                  i === active ? 'w-8 bg-[#F5B82E]' : 'w-2 bg-white/30 hover:bg-white/60'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {modalTrip && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white text-slate-900 rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl border border-stone-200 text-center animate-scale-up">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center text-xl font-bold mb-4">
              ✓
            </div>
            <h4 className="font-display font-black text-xl text-slate-900 uppercase">
              Join Request Sent!
            </h4>
            <p className="text-xs text-slate-600 mt-2 font-sans leading-relaxed">
              You requested to join <strong className="text-slate-900">{modalTrip.route}</strong>.
              The trip host has been notified and you will receive an update once approved.
            </p>
            <button
              type="button"
              onClick={() => setModalTrip(null)}
              className="mt-6 w-full bg-[#001726] hover:bg-[#002842] text-white text-xs font-bold py-2.5 rounded-xl transition-all cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
