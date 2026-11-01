import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from './Logo'

// Geometric constants for pixel-perfect 5-tab fluid cutout SVG dock
const DOCK_WIDTH = 470
const DOCK_HEIGHT = 64
const DOCK_RADIUS = 32
const NOTCH_WIDTH = 34 // half-width of the curve
const NOTCH_DEPTH = 36 // downward dip depth

// Horizontal center coordinates for the 5 tabs
const ITEM_X_COORDS = [66, 151, 235, 319, 404]
// 4 vertical dividers between the 5 tabs
const DIVIDER_COORDS = [109, 193, 277, 361]

// Mathematical C1 continuous curve generator for the scooped notch
function generateNotchPath(W, H, R, cx, nw, nd) {
  const clampedX = Math.max(R + nw, Math.min(cx, W - R - nw))
  const startX = clampedX - nw
  const endX = clampedX + nw

  const cp1x = clampedX - nw + nw * 0.45
  const cp2x = clampedX - nw * 0.45
  const cp3x = clampedX + nw * 0.45
  const cp4x = clampedX + nw - nw * 0.45

  return [
    `M ${R} 0`,
    `L ${startX} 0`,
    `C ${cp1x} 0, ${cp2x} ${nd}, ${clampedX} ${nd}`,
    `C ${cp3x} ${nd}, ${cp4x} 0, ${endX} 0`,
    `L ${W - R} 0`,
    `A ${R} ${R} 0 0 1 ${W} ${R}`,
    `L ${W} ${H - R}`,
    `A ${R} ${R} 0 0 1 ${W - R} ${H}`,
    `L ${R} ${H}`,
    `A ${R} ${R} 0 0 1 0 ${H - R}`,
    `L 0 ${R}`,
    `A ${R} ${R} 0 0 1 ${R} 0`,
    'Z',
  ].join(' ')
}

export default function Navbar() {
  const navigate = useNavigate()
  const [activeIndex, setActiveIndex] = useState(0)
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpenManually, setIsOpenManually] = useState(false)
  const [isPullActive, setIsPullActive] = useState(false)
  const [user, setUser] = useState(null)
  const isPullingRef = useRef(false)
  const isAutoScrollingRef = useRef(false)
  const openedAtScrollY = useRef(0)
  const lastScrollY = useRef(0)

  // Check saved user session
  useEffect(() => {
    try {
      const saved = localStorage.getItem('ghummakad_user')
      if (saved) setUser(JSON.parse(saved))
    } catch {}
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('ghummakad_user')
    setUser(null)
  }

  // Scroll listener: vanish on scroll down; reappear when at the very top
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.pageYOffset || document.documentElement.scrollTop
      if (currentY < 70) {
        setIsScrolled(false)
        setIsOpenManually(false)
        openedAtScrollY.current = 0
      } else {
        setIsScrolled(true)
        // Auto-retract if user scrolls significantly away from where they pulled it open
        if (!isAutoScrollingRef.current && openedAtScrollY.current > 0 && Math.abs(currentY - openedAtScrollY.current) > 80) {
          setIsOpenManually(false)
          openedAtScrollY.current = 0
        }
      }
      lastScrollY.current = currentY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isNavbarVisible = !isScrolled || isOpenManually

  // Interactive pull-cord action with spring recoil & transition
  const handlePullCord = (e) => {
    if (e && e.stopPropagation) e.stopPropagation()
    if (isPullingRef.current) return
    isPullingRef.current = true
    setIsPullActive(true)

    openedAtScrollY.current = window.pageYOffset || document.documentElement.scrollTop

    // Tactile pull down + snap-back recoil
    setTimeout(() => {
      setIsPullActive(false)
      setIsOpenManually((prev) => !prev)
      isPullingRef.current = false
    }, 200)
  }

  const currentX = ITEM_X_COORDS[activeIndex]

  // 5 generalized navigation items for the landing page with Sign In in the dock
  const navItems = [
    {
      id: 'home',
      name: 'Home',
      href: '#hero',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
    },
    {
      id: 'destinations',
      name: 'Destinations',
      href: '#destinations',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
    },
    {
      id: 'features',
      name: 'Features',
      href: '#features',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ),
    },
    {
      id: 'how-it-works',
      name: 'How It Works',
      href: '#how-it-works',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="4" y1="6" x2="20" y2="6" />
          <line x1="4" y1="12" x2="14" y2="12" />
          <line x1="4" y1="18" x2="18" y2="18" />
        </svg>
      ),
    },
    {
      id: 'auth',
      name: user ? 'Account' : 'Sign In',
      isAuth: true,
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
    },
  ]

  const notchPath = generateNotchPath(DOCK_WIDTH, DOCK_HEIGHT, DOCK_RADIUS, currentX, NOTCH_WIDTH, NOTCH_DEPTH)

  const handleNavClick = (idx, item) => {
    setActiveIndex(idx)

    if (item?.id === 'auth' || item?.isAuth) {
      navigate('/signin')
      return
    }

    const href = item?.href || (typeof item === 'string' ? item : null)
    isAutoScrollingRef.current = true
    setTimeout(() => {
      isAutoScrollingRef.current = false
    }, 1000)

    if (href === '#hero' || href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    if (href && typeof href === 'string' && href.startsWith('#') && href.length > 1) {
      const targetEl = document.querySelector(href)
      if (targetEl) {
        const top = targetEl.getBoundingClientRect().top + window.pageYOffset - 35
        window.scrollTo({ top, behavior: 'smooth' })
      }
    }
  }

  return (
    <>
      {/* ───────────────── SLIDING MASTER NAVBAR CONTAINER (VANISHES ON SCROLL) ───────────────── */}
      <div
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isNavbarVisible
            ? 'translate-y-0 opacity-100 pointer-events-auto'
            : '-translate-y-32 opacity-0 pointer-events-none'
        }`}
      >
        {/* ───────────────── TOP-LEFT BESPOKE BRAND LOGO ───────────────── */}
        <div className="absolute top-5 left-5 sm:left-8">
          <Logo />
        </div>

        {/* ───────────────── CENTERED FLUID CUTOUT NOTCH NAVBAR ───────────────── */}
        <div className="flex justify-center select-none px-4 pt-5">
          <header
            role="navigation"
            aria-label="Liquid Curved Tab Bar"
            className="pointer-events-auto relative origin-top transition-transform duration-200 max-w-full"
            style={{
              width: `${DOCK_WIDTH}px`,
              height: `${DOCK_HEIGHT}px`,
              transform: 'scale(clamp(0.65, calc(100vw / 640), 1))',
              transformOrigin: 'top center',
            }}
          >
          {/* Dynamic SVG ClipPath & Gradient Definitions */}
          <svg width="0" height="0" className="absolute">
            <defs>
              <clipPath id="dockFluidClip">
                <path d={notchPath} />
              </clipPath>
              <linearGradient id="dockRimGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(255, 255, 255, 0.45)" />
                <stop offset="25%" stopColor="rgba(255, 255, 255, 0.22)" />
                <stop offset="100%" stopColor="rgba(255, 255, 255, 0.08)" />
              </linearGradient>
            </defs>
          </svg>

          {/* ──────── 1. Frosted Glass Body Clipped to the Scooped Notch Shape ──────── */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              clipPath: 'url(#dockFluidClip)',
              background: 'rgba(12, 22, 38, 0.72)',
              backdropFilter: 'blur(28px) saturate(200%)',
              WebkitBackdropFilter: 'blur(28px) saturate(200%)',
              boxShadow: '0 24px 50px -10px rgba(0, 0, 0, 0.7), inset 0 1px 1px rgba(255, 255, 255, 0.25)',
            }}
          />

          {/* ──────── 2. Ambient Warm Amber Glow Radiating into the Scooped Notch ──────── */}
          <div
            className="absolute pointer-events-none rounded-full blur-xl transition-all duration-200 ease-out"
            style={{
              left: `${currentX - 40}px`,
              top: '-6px',
              width: '80px',
              height: '52px',
              background: 'radial-gradient(circle, rgba(245, 184, 46, 0.6) 0%, rgba(245, 184, 46, 0.15) 60%, transparent 100%)',
              opacity: 0.9,
            }}
          />

          {/* ──────── 3. Glowing Specular Border Path Following the Exact Scoop ──────── */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox={`0 0 ${DOCK_WIDTH} ${DOCK_HEIGHT}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d={notchPath}
              stroke="url(#dockRimGradient)"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* ──────── 4. Vertical Translucent Dividers Between Items ──────── */}
          {DIVIDER_COORDS.map((divX, i) => (
            <div
              key={i}
              className="absolute w-[1px] h-[18px] bg-white/[0.12] rounded-full pointer-events-none"
              style={{
                left: `${divX}px`,
                top: '23px',
              }}
            />
          ))}

          {/* ──────── 5. Floating Active Circular Glowing Button in Notch ──────── */}
          <div
            className="absolute z-20 flex items-center justify-center cursor-pointer select-none transition-all duration-200 ease-out"
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              left: `${currentX - 23}px`,
              top: '2px',
              background: 'linear-gradient(135deg, #FFE3A3 0%, #F5B82E 100%)',
              boxShadow: '0 0 24px rgba(245, 184, 46, 0.65), 0 4px 14px rgba(0, 0, 0, 0.35)',
              border: '1.5px solid rgba(255, 255, 255, 0.6)',
            }}
            onMouseEnter={() => setHoveredIndex(activeIndex)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => handleNavClick(activeIndex, navItems[activeIndex])}
          >
            <div
              key={activeIndex}
              className="text-[#1A1816] flex items-center justify-center transition-all duration-150 transform scale-100"
            >
              {navItems[activeIndex].icon}
            </div>
          </div>

          {/* ──────── 6. Navigation Buttons Positioned Horizontally ──────── */}
          {navItems.map((item, idx) => {
            const isActive = idx === activeIndex
            const isHovered = hoveredIndex === idx
            const isTextVisible = isHovered || isActive
            const xPos = ITEM_X_COORDS[idx]

            return (
              <div
                key={item.id}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${xPos}px`,
                  top: '32px',
                  width: '44px',
                  height: '44px',
                }}
              >
                <button
                  type="button"
                  onClick={() => handleNavClick(idx, item)}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="w-full h-full flex items-center justify-center rounded-full outline-none transition-colors duration-150"
                  style={{
                    opacity: isActive ? 0 : 0.7,
                    pointerEvents: isActive ? 'none' : 'auto',
                    color: '#94A3B8',
                  }}
                  aria-label={item.name}
                >
                  <span className="transition-transform duration-150 hover:scale-110 hover:text-white">
                    {item.icon}
                  </span>
                </button>

                {/* Text Label: Stays visible on click (active tab) and also appears on hover */}
                <div
                  className={`absolute top-full mt-3 left-1/2 -translate-x-1/2 pointer-events-none transition-all duration-200 ease-out ${
                    isTextVisible
                      ? 'opacity-100 translate-y-0 scale-100'
                      : 'opacity-0 -translate-y-1 scale-95'
                  }`}
                >
                  <span
                    className={`text-xs tracking-wider whitespace-nowrap transition-colors duration-150 ${
                      isActive
                        ? 'font-bold text-gold drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]'
                        : 'font-semibold text-amber-200/80 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]'
                    }`}
                    style={{
                      textShadow: '0 1px 4px rgba(0,0,0,0.8), 0 2px 10px rgba(0,0,0,0.6)',
                    }}
                  >
                    {item.name}
                  </span>
                </div>
              </div>
            )
          })}
        </header>
      </div>
    </div>

    {/* ───────────────── PULL STRING WITH HANGING BOB (ONLY VISIBLE WHEN SCROLLED DOWN) ───────────────── */}
    {isScrolled && (
      <div
        onClick={handlePullCord}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            handlePullCord(e)
          }
        }}
        aria-label={isNavbarVisible ? 'Pull cord to hide navbar' : 'Pull cord to reveal navbar'}
        className="fixed z-50 left-1/2 -translate-x-1/2 pointer-events-auto select-none flex flex-col items-center cursor-pointer group outline-none px-4 pt-0 pb-3 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] animate-in fade-in slide-in-from-top-4 duration-300"
        style={{
          top: isNavbarVisible ? '84px' : '0px',
        }}
      >
        {/* Top Ceiling / Dock Fixture Mount */}
        <div
          className={`h-2 rounded-b-md border-x border-b border-amber-400/40 shadow-sm transition-all duration-300 pointer-events-none ${
            isNavbarVisible
              ? 'w-6 bg-gradient-to-b from-[#1C2638] to-[#121A26]'
              : 'w-7 bg-gradient-to-b from-[#2A2416] via-[#1A1816] to-[#0D1522]'
          }`}
        />

        {/* Dynamic Hanging String / Cord */}
        <svg
          className="overflow-visible pointer-events-none transition-all duration-200"
          style={{
            width: '28px',
            height: `${isPullActive ? 76 : 42}px`,
          }}
        >
          <defs>
            <linearGradient id="goldCordGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFF2CC" />
              <stop offset="40%" stopColor="#F5B82E" />
              <stop offset="100%" stopColor="#B37C0C" />
            </linearGradient>
            <filter id="cordGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="0" stdDeviation="1.5" floodColor="#F5B82E" floodOpacity="0.7" />
            </filter>
          </defs>

          {/* Braided Golden Line */}
          <line
            x1="14"
            y1="0"
            x2="14"
            y2={isPullActive ? 76 : 42}
            stroke="url(#goldCordGrad)"
            strokeWidth="2.2"
            strokeLinecap="round"
            filter="url(#cordGlow)"
          />

          {/* Golden Spacer Beads */}
          <circle cx="14" cy={(isPullActive ? 76 : 42) * 0.42} r="2.2" fill="#FFE8A3" />
          <circle cx="14" cy={(isPullActive ? 76 : 42) * 0.76} r="2.4" fill="#F5B82E" stroke="#B37C0C" strokeWidth="0.5" />
        </svg>

        {/* The Hanging Bob */}
        <div className="relative group -mt-1 flex flex-col items-center pointer-events-none">
          {/* Ambient Golden Glow Aura */}
          <span className="absolute inset-0 rounded-full bg-[#F5B82E]/40 blur-md group-hover:bg-[#F5B82E]/80 group-hover:blur-lg transition-all duration-300" />

          {/* 3D Metallic Bob Jewel with Glass Highlights */}
          <span
            className={`relative w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-115 active:scale-90 ${
              isPullActive ? 'translate-y-2' : ''
            }`}
            style={{
              background: 'radial-gradient(circle at 35% 30%, #FFFDF5 0%, #FFE299 28%, #F5B82E 65%, #9E6B04 100%)',
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.55), 0 0 16px rgba(245, 184, 46, 0.65), inset 0 1px 2px rgba(255, 255, 255, 0.95), inset 0 -2px 3px rgba(0, 0, 0, 0.45)',
              border: '1.5px solid rgba(255, 255, 255, 0.9)',
              animation: isPullActive ? 'none' : 'dsl-bob-sway 4s ease-in-out infinite',
            }}
          >
            {/* Specular gloss glint */}
            <span className="absolute top-1 left-1.5 w-2 h-1 bg-white/95 rounded-full blur-[0.3px] pointer-events-none" />

            {/* Tiny Directional Arrow */}
            <span className="text-[#3A2603] font-black text-[10px] leading-none select-none transition-transform duration-300 group-hover:scale-110">
              {isNavbarVisible ? '▲' : '▼'}
            </span>
          </span>

          {/* Golden Pulse Shockwave on Pull */}
          {isPullActive && (
            <span className="absolute inset-0 rounded-full border-2 border-amber-300 animate-ping pointer-events-none" />
          )}

          {/* Floating Pill Tooltip Badge */}
          <span className="absolute top-full mt-2 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap z-50">
            <span className="px-2.5 py-1 rounded-full bg-black/90 backdrop-blur-md border border-amber-400/40 text-[10px] font-bold text-amber-200 tracking-wider uppercase shadow-2xl flex items-center gap-1.5">
              <span>{isNavbarVisible ? 'Pull to Hide' : 'Pull for Menu'}</span>
              <span className="text-amber-400 font-extrabold">{isNavbarVisible ? '↑' : '↓'}</span>
            </span>
          </span>
        </div>
      </div>
    )}

    {/* ───────────────── ANIMATION STYLES ───────────────── */}
    <style>{`
      @keyframes dsl-bob-sway {
        0%, 100% { transform: rotate(0deg) translateY(0); }
        25% { transform: rotate(-3.5deg) translateY(1px); }
        75% { transform: rotate(3.5deg) translateY(1px); }
      }
    `}</style>
  </>
)
}
