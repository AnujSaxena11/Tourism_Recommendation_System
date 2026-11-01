import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'

export const GHUMMAKAD_SLIDES = [
  {
    id: 'himalayas',
    region: 'Himachal & Kashmir Highlands',
    title: 'The Great\nHimalayas',
    subtitle: 'Snow • Adventure • Serenity',
    description:
      'Witness majestic snow-clad peaks, serenity of ancient cedar forests, and thrilling alpine trails in the heart of northern highlands.',
    image: '/images/manali.jpg',
    color: '#0b0d10',
  },
  {
    id: 'goa',
    region: 'Konkan Coast - Western India',
    title: 'Goa\nCoastline',
    subtitle: 'Sun • Beaches • Nightlife',
    description:
      'Sun-kissed golden sand beaches, swaying coconut palms, vibrant coastal shacks, and unforgettable twilight nightlife.',
    image: '/images/goa.jpg',
    color: '#0b0d10',
  },
  {
    id: 'kerala',
    region: "God's Own Country - South India",
    title: 'Kerala\nBackwaters',
    subtitle: 'Nature • Culture • Peace',
    description:
      'Glide through tranquil emerald waterways on traditional houseboats, surrounded by spice plantations and tea-draped hills.',
    image: '/images/kerala.jpg',
    color: '#0b0d10',
  },
  {
    id: 'rajasthan',
    region: 'Thar & Royal Rajputana',
    title: 'Rajasthan\nHeritage',
    subtitle: 'History • Forts • Royalty',
    description:
      'Step into glorious golden fortresses, opulent lakeside royal palaces, vibrant folk bazaars, and endless sand dune safaris.',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1920&q=85',
    color: '#0b0d10',
  },
  {
    id: 'coorg',
    region: 'Western Ghats - Karnataka',
    title: 'Misty\nCoorg',
    subtitle: 'Coffee • Mist • Waterfalls',
    description:
      'Wake up to rolling morning mist over aromatic Arabica coffee estates, cascading waterfalls, and lush rainforest peaks.',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1920&q=85',
    color: '#0b0d10',
  },
  {
    id: 'ladakh',
    region: 'Trans-Himalayan Plateau',
    title: 'Ladakh\nHighlands',
    subtitle: 'Peaks • Lakes • Monasteries',
    description:
      'Cross the highest motorable mountain passes on Earth, ancient Buddhist cliff monasteries, and deep azure glacial lakes.',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1920&q=85',
    color: '#0b0d10',
  },
]

const EASE = 'cubic-bezier(0.76, 0, 0.18, 1)'
const pad2 = (n) => String(n).padStart(2, '0')

export default function Destinations({
  slides = GHUMMAKAD_SLIDES,
  autoPlay = true,
  interval = 7000,
  duration = 850,
}) {
  const n = slides.length
  const [active, setActive] = useState(0)
  const [overlay, setOverlay] = useState(null)
  const [hovered, setHovered] = useState(false)

  const sectionRef = useRef(null)
  const cardRefs = useRef(new Map())
  const prevRects = useRef(null)
  const busy = useRef(false)
  const timers = useRef([])
  const reduced = useRef(false)

  // Preload images + reduced motion handling
  useEffect(() => {
    reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    slides.forEach((s) => {
      const img = new Image()
      img.src = s.image
    })
    const t = timers.current
    return () => t.forEach(clearTimeout)
  }, [slides])

  const slide = slides[active]
  const cards = Array.from({ length: Math.max(n - 1, 0) }, (_, i) => slides[(active + 1 + i) % n])

  /* ---- Go to a slide with card-to-fullscreen expansion translation ---- */
  const goTo = useCallback(
    (target, direction = 'next') => {
      if (busy.current || n < 2 || target === active) return
      const section = sectionRef.current
      if (!section) return
      busy.current = true

      const sRect = section.getBoundingClientRect()

      // Snapshot card positions for the FLIP translation shift afterwards
      const snap = new Map()
      cardRefs.current.forEach((el, key) => el && snap.set(key, el.getBoundingClientRect()))
      prevRects.current = snap

      const el = cardRefs.current.get(slides[target].id)
      const r = direction === 'next' && el ? el.getBoundingClientRect() : null
      const from = r
        ? { top: r.top - sRect.top, left: r.left - sRect.left, width: r.width, height: r.height, radius: 20 }
        : { top: 0, left: 0, width: 0, height: sRect.height, radius: 0 }

      const ms = reduced.current ? 1 : duration
      setOverlay({ slide: slides[target], from, expanded: false, ms })
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setOverlay((o) => (o ? { ...o, expanded: true } : o)))
      )

      timers.current.push(
        setTimeout(() => {
          setActive(target)
          setOverlay(null)
          busy.current = false
        }, ms + 60)
      )
    },
    [active, n, slides, duration]
  )

  const next = useCallback(() => goTo((active + 1) % n, 'next'), [goTo, active, n])
  const prev = useCallback(() => goTo((active - 1 + n) % n, 'prev'), [goTo, active, n])

  /* ---- FLIP: slide remaining cards smoothly into their new slots ---- */
  useLayoutEffect(() => {
    const before = prevRects.current
    if (!before) return
    prevRects.current = null
    if (reduced.current) return
    cardRefs.current.forEach((el, key) => {
      if (!el) return
      const now = el.getBoundingClientRect()
      const was = before.get(key)
      if (was) {
        const dx = was.left - now.left
        if (Math.abs(dx) > 1) {
          el.animate([{ transform: `translateX(${dx}px)` }, { transform: 'none' }], {
            duration: 700,
            easing: EASE,
          })
        }
      } else {
        el.animate(
          [
            { opacity: 0, transform: 'translateX(70px)' },
            { opacity: 1, transform: 'none' },
          ],
          { duration: 700, easing: EASE, delay: 100, fill: 'backwards' }
        )
      }
    })
  }, [active])

  const paused = hovered || !!overlay
  const lines = slide.title.split('\n')

  let overlayStyle = null
  if (overlay) {
    const f = overlay.from
    const geo = overlay.expanded
      ? { top: 0, left: 0, width: '100%', height: '100%', borderRadius: 0 }
      : { top: f.top, left: f.left, width: f.width, height: f.height, borderRadius: f.radius }
    overlayStyle = {
      ...geo,
      backgroundImage: `url(${overlay.slide.image})`,
      transition: `top ${overlay.ms}ms ${EASE}, left ${overlay.ms}ms ${EASE}, width ${overlay.ms}ms ${EASE}, height ${overlay.ms}ms ${EASE}, border-radius ${overlay.ms}ms ${EASE}`,
    }
  }

  return (
    <section
      ref={sectionRef}
      id="destinations"
      className="dsl relative isolation-isolate overflow-hidden select-none bg-[#0b0d10] text-white"
      aria-roledescription="carousel"
      aria-label="Explore Destinations"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <style>{CSS}</style>

      {/* ─── FULL-BLEED ACTIVE DESTINATION BACKGROUND ─── */}
      <div
        className="dsl-bg"
        style={{ backgroundImage: `url(${slide.image})` }}
        aria-hidden="true"
      />

      {/* ─── EXPANDING FLIP CARD OVERLAY LAYER ─── */}
      {overlay && <div className="dsl-overlay" style={overlayStyle} aria-hidden="true" />}

      {/* ─── CINEMATIC GRADIENT SHADING ─── */}
      <div className="dsl-shade" aria-hidden="true" />

      {/* ─── TOP SECTION 02 HEADER OVERLAY IN ONE ROW SEQUENCE ─── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-16 sm:pt-20">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-4">
          
          {/* 02 Anchor and Heading in One Row Sequence with Spacing */}
          <div className="flex flex-row items-start gap-5 sm:gap-7 lg:gap-9">
            <span className="font-display font-black text-7xl sm:text-8xl md:text-9xl lg:text-[9.2rem] text-white/20 select-none leading-none tracking-tighter shrink-0 pt-1">
              02
            </span>
            <div className="flex flex-col">
              <h2 className="font-display font-black text-5xl sm:text-6xl md:text-7xl lg:text-[4.6rem] uppercase tracking-tight text-white leading-[0.89] drop-shadow-2xl">
                EXPLORE<br />
                <span className="text-[#F5B82E] drop-shadow-[0_0_35px_rgba(245,184,46,0.35)]">
                  DESTINATIONS
                </span>
              </h2>
            </div>
          </div>

          {/* Right Cursive Handwritten Annotation */}
          <div className="hidden lg:flex items-center gap-4 max-w-md pt-2">
            <p className="font-handwriting text-2xl sm:text-3xl text-[#FF6B6B] font-bold leading-tight drop-shadow -rotate-1">
              From mountains to beaches, from heritage to hidden gems — find places that match your vibe.
            </p>
          </div>

        </div>
      </div>

      {/* ─── ACTIVE DESTINATION TEXT SWAP ─── */}
      <div className={`dsl-text ${overlay ? 'is-leaving' : ''}`}>
        <div key={slide.id} className="dsl-text-in" aria-live="polite">
          <span className="dsl-dash" />
          <p className="dsl-kicker">{slide.region}</p>
          <h3 className="dsl-title font-display">
            {lines.map((l, i) => (
              <span key={i} style={{ animationDelay: `${120 + i * 90}ms` }}>
                {l}
              </span>
            ))}
          </h3>
          <p className="dsl-desc">{slide.description}</p>
          <button
            type="button"
            className="dsl-cta"
            onClick={() => {
              const el = document.querySelector('#how-it-works')
              if (el) el.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            <span className="dsl-cta-dot">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
            <span>Plan This Trip</span>
          </button>
        </div>
      </div>

      {/* ─── CAROUSEL CONTROLS (ARROWS, PROGRESS BAR, COUNTER) ─── */}
      <div className="dsl-controls">
        <button type="button" className="dsl-arrow" onClick={prev} aria-label="Previous destination">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 5l-7 7 7 7" />
          </svg>
        </button>
        <button type="button" className="dsl-arrow" onClick={next} aria-label="Next destination">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <span className="dsl-track" aria-hidden="true">
          <span
            key={active}
            className={`dsl-fill ${autoPlay ? 'is-auto' : ''} ${paused ? 'is-paused' : ''}`}
            style={
              autoPlay
                ? { animationDuration: `${interval}ms` }
                : { transform: `scaleX(${(active + 1) / n})` }
            }
            onAnimationEnd={autoPlay ? next : undefined}
          />
        </span>

        <span className="dsl-count font-display" key={`c-${active}`}>
          {pad2(active + 1)}
        </span>
      </div>

      {/* ─── INTERACTIVE DESTINATION CARDS ROW (CLICK EXPANDS WITH FLIP TRANSLATION) ─── */}
      <ul className="dsl-cards">
        {cards.map((c) => (
          <li
            key={c.id}
            ref={(el) => {
              if (el) cardRefs.current.set(c.id, el)
              else cardRefs.current.delete(c.id)
            }}
            className="dsl-card-wrap"
            style={{ opacity: overlay && overlay.slide.id === c.id ? 0 : 1 }}
          >
            <button
              type="button"
              className="dsl-card group"
              onClick={() => goTo(slides.findIndex((s) => s.id === c.id), 'next')}
              aria-label={`Explore ${c.title.replace('\n', ' ')}`}
            >
              <span
                className="dsl-card-img"
                style={{ backgroundImage: `url(${c.image})` }}
              />
              <span className="dsl-card-info">
                <span className="dsl-card-kicker">
                  <i />
                  {c.region}
                </span>
                <span className="dsl-card-title font-display">{c.title.replace('\n', ' ')}</span>
                <span className="text-[11px] text-amber-300 font-sans font-medium mt-0.5 line-clamp-1">
                  {c.subtitle}
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}

/* ─── SCOPED DESTINATION SLIDER STYLES WITH CARD-TO-FULLSCREEN FLIP TRANSLATION ─── */
const CSS = `
.dsl {
  --dsl-pad: clamp(24px, 6vw, 96px);
  --dsl-accent: #F5B82E;
  --dsl-card-w: clamp(160px, 16vw, 240px);
  position: relative; isolation: isolate; overflow: hidden;
  width: 100%; height: 100vh; height: 100svh; min-height: 720px; max-height: 1200px;
  background: #0b0d10; color: #fff;
  font-family: inherit;
}
.dsl *, .dsl *::before, .dsl *::after { box-sizing: border-box; }
.dsl button { font: inherit; color: inherit; cursor: pointer; border: 0; background: none; padding: 0; }
.dsl button:focus-visible { outline: 2px solid var(--dsl-accent); outline-offset: 3px; }

.dsl-bg, .dsl-overlay { position: absolute; background-size: cover; background-position: center; }
.dsl-bg { inset: 0; z-index: 0; }
.dsl-overlay { z-index: 2; overflow: hidden; will-change: top, left, width, height; }
.dsl-shade {
  position: absolute; inset: 0; z-index: 1; pointer-events: none;
  background:
    linear-gradient(90deg, rgba(0, 0, 0, 0.75) 0%, rgba(0, 0, 0, 0.28) 45%, rgba(0, 0, 0, 0) 72%),
    linear-gradient(0deg, rgba(0, 0, 0, 0.65) 0%, rgba(0, 0, 0, 0) 40%);
}

/* text */
.dsl-text { position: absolute; z-index: 4; left: var(--dsl-pad); bottom: 150px; max-width: min(48vw, 650px); }
.dsl-text.is-leaving { opacity: 0; transform: translateY(-10px); transition: opacity .4s ease, transform .4s ease; }
.dsl-text-in > * { animation: dsl-rise .8s cubic-bezier(.2,.7,.2,1) both; }
.dsl-text-in > .dsl-title { animation: none; }
.dsl-dash { display: block; width: 32px; height: 3px; background: var(--dsl-accent); margin-bottom: 14px; border-radius: 2px; }
.dsl-kicker { margin: 0 0 8px; font-size: 13px; font-weight: 600; letter-spacing: .08em; text-transform: uppercase; color: var(--dsl-accent); }
.dsl-title {
  margin: 0 0 16px;
  font-weight: 900; text-transform: uppercase; letter-spacing: .02em;
  font-size: clamp(3.2rem, 8.5vw, 6.8rem); line-height: .88;
}
.dsl-title span { display: block; animation: dsl-rise .85s cubic-bezier(.2,.7,.2,1) both; }
.dsl-desc { margin: 0 0 24px; max-width: 440px; font-size: 14px; sm:font-size: 15px; line-height: 1.6; color: rgba(255,255,255,.86); animation-delay: .3s !important; }
.dsl-cta { display: inline-flex; align-items: center; gap: 12px; font-size: 12px; font-weight: 700; letter-spacing: .16em; text-transform: uppercase; animation-delay: .4s !important; }
.dsl-cta-dot { display: grid; place-items: center; width: 34px; height: 34px; border-radius: 50%; background: var(--dsl-accent); color: #0b0d10; transition: transform .3s ease, box-shadow .3s ease; box-shadow: 0 0 16px rgba(245, 184, 46, 0.45); }
.dsl-cta:hover .dsl-cta-dot { transform: translateX(5px) scale(1.08); box-shadow: 0 0 24px rgba(245, 184, 46, 0.7); }

/* controls */
.dsl-controls {
  position: absolute; z-index: 4; left: var(--dsl-pad); bottom: 54px;
  width: calc(48% - var(--dsl-pad) - 20px);
  display: flex; align-items: center; gap: 14px;
}
.dsl-arrow {
  display: grid; place-items: center; flex: none; width: 44px; height: 44px; border-radius: 50%;
  border: 1px solid rgba(255,255,255,.35) !important; background: rgba(0, 0, 0, 0.5) !important;
  backdrop-filter: blur(8px); transition: background .25s, border-color .25s, transform .25s, box-shadow .25s;
}
.dsl-arrow:hover { background: rgba(245, 184, 46, 0.3) !important; border-color: var(--dsl-accent) !important; box-shadow: 0 0 16px rgba(245, 184, 46, 0.4); }
.dsl-arrow:active { transform: scale(.92); }
.dsl-track { position: relative; flex: 1; height: 3px; margin: 0 8px; background: rgba(255,255,255,.2); overflow: hidden; border-radius: 2px; }
.dsl-fill { position: absolute; inset: 0; background: var(--dsl-accent); transform-origin: left center; transform: scaleX(0); transition: transform .6s ease; }
.dsl-fill.is-auto { animation: dsl-progress linear forwards; transition: none; }
.dsl-fill.is-paused { animation-play-state: paused; }
.dsl-count { flex: none; min-width: 2ch; text-align: right; font-size: 2.2rem; line-height: 1; letter-spacing: .04em; color: var(--dsl-accent); animation: dsl-rise .6s cubic-bezier(.2,.7,.2,1) both; }

/* cards row */
.dsl-cards { position: absolute; z-index: 4; left: 48%; bottom: 54px; display: flex; gap: 20px; margin: 0; padding: 0; list-style: none; }
.dsl-card-wrap { flex: none; width: var(--dsl-card-w); will-change: transform; }
.dsl-card {
  position: relative; display: block; width: 100%; aspect-ratio: 0.68; overflow: hidden; border-radius: 20px; text-align: left;
  box-shadow: 0 20px 45px rgba(0,0,0,.5); border: 1.5px solid rgba(255,255,255,.15); transition: box-shadow .35s ease, transform .35s ease, border-color .35s ease;
}
.dsl-card:hover { transform: translateY(-8px); box-shadow: 0 28px 55px rgba(0,0,0,.65); border-color: rgba(245, 184, 46, 0.6); }
.dsl-card-img { position: absolute; inset: 0; background-size: cover; background-position: center; transition: transform .8s cubic-bezier(.2,.7,.2,1); }
.dsl-card:hover .dsl-card-img { transform: scale(1.08); }
.dsl-card::after { content: ""; position: absolute; inset: 0; background: linear-gradient(0deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.15) 55%, transparent 100%); }
.dsl-card-info { position: absolute; z-index: 1; left: 16px; right: 16px; bottom: 16px; display: flex; flex-direction: column; gap: 3px; }
.dsl-card-kicker { display: flex; align-items: center; gap: 6px; font-size: 10px; font-weight: 600; text-transform: uppercase; color: var(--dsl-accent); }
.dsl-card-kicker i { display: block; width: 14px; height: 2px; background: var(--dsl-accent); flex: none; border-radius: 1px; }
.dsl-card-title { font-size: clamp(1.2rem, 1.8vw, 1.8rem); line-height: .95; text-transform: uppercase; letter-spacing: .02em; font-weight: 800; color: #fff; }

@keyframes dsl-rise { from { opacity: 0; transform: translateY(26px); } to { opacity: 1; transform: none; } }
@keyframes dsl-progress { from { transform: scaleX(0); } to { transform: scaleX(1); } }

/* tablet / mobile adjustments */
@media (max-width: 900px) {
  .dsl { --dsl-card-w: 135px; min-height: 800px; }
  .dsl-text { max-width: calc(100% - 2 * var(--dsl-pad)); bottom: 330px; }
  .dsl-title { font-size: clamp(3rem, 14vw, 5.2rem); }
  .dsl-desc { font-size: 13px; }
  .dsl-cards { left: var(--dsl-pad); right: 0; bottom: 120px; gap: 14px; overflow-x: auto; padding-right: var(--dsl-pad); }
  .dsl-controls { width: calc(100% - 2 * var(--dsl-pad)); bottom: 40px; }
}

@media (prefers-reduced-motion: reduce) {
  .dsl *:not(.dsl-fill), .dsl *:not(.dsl-fill)::before, .dsl *:not(.dsl-fill)::after { animation-duration: .01ms !important; animation-delay: 0s !important; transition-duration: .01ms !important; }
}
`
