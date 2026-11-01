import React from 'react'

export default function Logo({ size = 'default', showTagline = true, className = '' }) {
  const isLarge = size === 'large'
  const isSmall = size === 'small'

  return (
    <a
      href="#hero"
      className={`group flex items-center gap-3.5 select-none outline-none transition-transform duration-300 hover:scale-[1.02] ${className}`}
      aria-label="Ghummakad Home"
      style={{ textDecoration: 'none' }}
    >
      {/* ─── BESPOKE COMPASS ROSE MARITIME EMBLEM ─── */}
      <div
        className={`relative shrink-0 flex items-center justify-center ${
          isLarge ? 'w-14 h-14' : isSmall ? 'w-9 h-9' : 'w-11 h-11'
        }`}
      >
        {/* Soft Ambient Radial Warm Glow */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#b3824c]/40 via-[#F5B82E]/30 to-[#0d2735]/40 rounded-full blur-md group-hover:blur-lg transition-all duration-300 opacity-90" />

        {/* Detailed 12-Point Maritime Compass Rose Emblem */}
        <svg
          className="w-full h-full relative z-10 drop-shadow-xl transition-transform duration-700 ease-out group-hover:rotate-[15deg]"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Deep Navy Center Medallion Gradient */}
            <radialGradient id="ghCompassMedallion" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#1a4055" />
              <stop offset="65%" stopColor="#0f2937" />
              <stop offset="100%" stopColor="#081b25" />
            </radialGradient>

            {/* Antique Bronze Sunlit Facet */}
            <linearGradient id="ghBronzeFacetLight" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#d8a368" />
              <stop offset="100%" stopColor="#b6844b" />
            </linearGradient>

            {/* Antique Bronze Shaded Facet */}
            <linearGradient id="ghBronzeFacetDark" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#a3713b" />
              <stop offset="100%" stopColor="#86592a" />
            </linearGradient>

            {/* Inner Metallic Bronze Ring */}
            <linearGradient id="ghBronzeRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#cca26a" />
              <stop offset="45%" stopColor="#b3824c" />
              <stop offset="85%" stopColor="#996935" />
              <stop offset="100%" stopColor="#b88851" />
            </linearGradient>

            {/* Single 3D Faceted Compass Star Ray at 0 degrees */}
            <g id="ghStarRay">
              {/* Left Facet (Light) */}
              <polygon points="100,18 87.06,51.7 100,50" fill="url(#ghBronzeFacetLight)" />
              {/* Right Facet (Dark) */}
              <polygon points="100,18 100,50 112.94,51.7" fill="url(#ghBronzeFacetDark)" />
              {/* Center Crease */}
              <line x1="100" y1="18" x2="100" y2="50" stroke="#7e532b" strokeWidth="0.75" />
            </g>

            {/* Single Dial Radial Needle and Winged Chevron Notch at 0 degrees */}
            <g id="ghDialRay">
              {/* Fine Silver/White Needle */}
              <line x1="100" y1="94" x2="100" y2="53" stroke="#ffffff" strokeWidth="0.9" opacity="0.9" />
              {/* Winged Chevron Notch at Perimeter */}
              <path
                d="M 94.5 56.5 Q 98 58 100 62.5 Q 102 58 105.5 56.5 Q 102 59.5 100 64 Q 98 59.5 94.5 56.5 Z"
                fill="#ffffff"
                opacity="0.95"
              />
            </g>
          </defs>

          {/* 1. Pure White / Ivory Outer Base Disk */}
          <circle cx="100" cy="100" r="95" fill="#ffffff" />

          {/* 2. Thick Outer Dark Navy/Petrol Ring */}
          <circle cx="100" cy="100" r="93" fill="none" stroke="#0d2735" strokeWidth="6.5" />

          {/* 3. Inner Antique Bronze Ring */}
          <circle cx="100" cy="100" r="82" fill="none" stroke="url(#ghBronzeRingGrad)" strokeWidth="4.2" />

          {/* 4. 12-Point 3D Faceted Compass Star Points (touching the bronze ring at r=82) */}
          <use href="#ghStarRay" transform="rotate(0 100 100)" />
          <use href="#ghStarRay" transform="rotate(30 100 100)" />
          <use href="#ghStarRay" transform="rotate(60 100 100)" />
          <use href="#ghStarRay" transform="rotate(90 100 100)" />
          <use href="#ghStarRay" transform="rotate(120 100 100)" />
          <use href="#ghStarRay" transform="rotate(150 100 100)" />
          <use href="#ghStarRay" transform="rotate(180 100 100)" />
          <use href="#ghStarRay" transform="rotate(210 100 100)" />
          <use href="#ghStarRay" transform="rotate(240 100 100)" />
          <use href="#ghStarRay" transform="rotate(270 100 100)" />
          <use href="#ghStarRay" transform="rotate(300 100 100)" />
          <use href="#ghStarRay" transform="rotate(330 100 100)" />

          {/* 5. Center Midnight Navy Medallion Disk */}
          <circle cx="100" cy="100" r="50" fill="url(#ghCompassMedallion)" stroke="#091b26" strokeWidth="1.2" />

          {/* 6. 12 Precision Radial Needles + Chevron Feather Glyphs */}
          <use href="#ghDialRay" transform="rotate(0 100 100)" />
          <use href="#ghDialRay" transform="rotate(30 100 100)" />
          <use href="#ghDialRay" transform="rotate(60 100 100)" />
          <use href="#ghDialRay" transform="rotate(90 100 100)" />
          <use href="#ghDialRay" transform="rotate(120 100 100)" />
          <use href="#ghDialRay" transform="rotate(150 100 100)" />
          <use href="#ghDialRay" transform="rotate(180 100 100)" />
          <use href="#ghDialRay" transform="rotate(210 100 100)" />
          <use href="#ghDialRay" transform="rotate(240 100 100)" />
          <use href="#ghDialRay" transform="rotate(270 100 100)" />
          <use href="#ghDialRay" transform="rotate(300 100 100)" />
          <use href="#ghDialRay" transform="rotate(330 100 100)" />

          {/* 7. Center Brass & Silver Pivot Pin */}
          <circle cx="100" cy="100" r="4.2" fill="#0d2735" stroke="#ffffff" strokeWidth="1.2" />
          <circle cx="100" cy="100" r="1.8" fill="#d49f63" />
        </svg>
      </div>

      {/* ─── TYPOGRAPHIC WORDMARK ─── */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 leading-none">
          <span
            className={`font-display font-black tracking-[0.06em] text-white uppercase leading-none drop-shadow-md ${
              isLarge ? 'text-3xl sm:text-4xl' : isSmall ? 'text-xl' : 'text-2xl sm:text-3xl'
            }`}
          >
            GHUMAKKAD
          </span>
          <span className="text-[#b3824c] text-xs font-bold leading-none -mt-3.5 group-hover:scale-125 transition-transform">
            ✦
          </span>
        </div>

        {showTagline && (
          <div className="flex items-center gap-1.5 mt-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#b3824c] animate-pulse" />
            <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.28em] text-slate-300 uppercase leading-none font-sans opacity-95">
              AI TRAVEL COMPANION
            </span>
          </div>
        )}
      </div>
    </a>
  )
}
