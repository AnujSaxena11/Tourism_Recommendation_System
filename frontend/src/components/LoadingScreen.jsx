import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function LoadingScreen({ onComplete }) {
  const containerRef = useRef(null)
  const svgRef = useRef(null)
  const canvasRef = useRef(null)
  const [progress, setProgress] = useState(0)

  // Floating ambient background particles
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationFrameId
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const handleResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    // Palette: Goldenrod (#dba12c), Cool Steel (#7d929e), Dust Grey (#dbd4cc)
    const particleColors = ['#dba12c', '#7d929e', '#dbd4cc', '#ebb748']
    const particles = Array.from({ length: 50 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 0.6,
      alpha: Math.random() * 0.45 + 0.15,
      color: particleColors[Math.floor(Math.random() * particleColors.length)],
      speedX: (Math.random() - 0.5) * 0.22,
      speedY: (Math.random() - 0.5) * 0.22,
    }))

    const render = () => {
      ctx.clearRect(0, 0, width, height)
      particles.forEach((p) => {
        p.x += p.speedX
        p.y += p.speedY
        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0
        if (p.y < 0) p.y = height
        if (p.y > height) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.alpha
        ctx.shadowBlur = 8
        ctx.shadowColor = p.color
        ctx.fill()
      })
      ctx.globalAlpha = 1
      animationFrameId = requestAnimationFrame(render)
    }
    render()

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  // 10-Second Master Kinetic Timeline
  useEffect(() => {
    const ctx = gsap.context(() => {
      const shards = svgRef.current ? svgRef.current.querySelectorAll('.shard-piece') : []

      // Disperse shards into expansive 3D-like orbit
      shards.forEach((shard, index) => {
        const angle = (Math.random() - 0.5) * 850
        const distance = 240 + Math.random() * 420
        const rad = Math.random() * Math.PI * 2
        const offsetX = Math.cos(rad) * distance
        const offsetY = Math.sin(rad) * distance

        gsap.set(shard, {
          x: offsetX,
          y: offsetY,
          rotation: angle,
          scale: 0.05,
          opacity: 0,
          transformOrigin: '50% 50%',
        })
      })

      // Master Timeline (Strictly 10 Seconds)
      const masterTL = gsap.timeline({
        onComplete: () => {
          gsap.to(containerRef.current, {
            opacity: 0,
            scale: 1.05,
            filter: 'blur(10px)',
            duration: 0.9,
            ease: 'power3.inOut',
            onComplete: () => {
              if (onComplete) onComplete()
            },
          })
        },
      })

      // 1. Progress count smoothly ticking 0% -> 100% across 9.6 seconds
      const progObj = { val: 0 }
      masterTL.to(
        progObj,
        {
          val: 100,
          duration: 9.6,
          ease: 'power1.inOut',
          onUpdate: () => {
            setProgress(Math.round(progObj.val))
          },
        },
        0
      )

      // 2. Slow kinetic convergence of GHUMMAKAD faceted shards (from t=0.6s to 6.8s)
      masterTL.to(
        shards,
        {
          x: 0,
          y: 0,
          rotation: 0,
          scale: 1,
          opacity: 1,
          duration: 6.0,
          stagger: {
            each: 0.038,
            from: 'center',
          },
          ease: 'power3.inOut',
        },
        0.5
      )

      // 3. Specular Goldenrod crystalline shimmer at full lockup (at 7.2s)
      masterTL.to(
        svgRef.current,
        {
          filter: 'drop-shadow(0 0 35px rgba(219, 161, 44, 0.95)) drop-shadow(0 0 70px rgba(15, 59, 89, 0.6))',
          duration: 0.9,
          yoyo: true,
          repeat: 1,
          ease: 'power2.out',
        },
        7.2
      )

      // 4. Regal sheen sweep across the assembled GHUMMAKAD wordmark (7.5s - 9.0s)
      masterTL.fromTo(
        '.wordmark-sheen',
        { x: '-120%', opacity: 0 },
        { x: '220%', opacity: 1, duration: 1.6, ease: 'power2.inOut' },
        7.5
      )

      // 5. Gentle breathing apex elevation (8.8s to 9.8s)
      masterTL.to(
        svgRef.current,
        {
          scale: 1.025,
          duration: 1.0,
          ease: 'sine.inOut',
        },
        8.8
      )

      // Buffer hold before seamless exit
      masterTL.to({}, { duration: 0.4 })
    }, containerRef)

    return () => ctx.revert()
  }, [onComplete])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center select-none overflow-hidden"
      style={{
        backgroundColor: '#071624', // Deep Yale Blue
      }}
    >
      {/* Background Starfield Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0 opacity-80"
      />

      {/* Atmospheric Radial Lighting in Yale Blue & Goldenrod */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[780px] h-[450px] rounded-full blur-[140px] opacity-25"
          style={{
            background: 'radial-gradient(circle, #dba12c 0%, #0f3b59 60%, transparent 85%)',
          }}
        />
        {/* Subtle geometric overlay */}
        <div
          className="absolute inset-0 opacity-[0.028]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(219,212,204,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(219,212,204,0.4) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      {/* ─── Main Centerpiece: Crystalline Faceted GHUMMAKAD ─── */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-5xl px-6 text-center">
        {/* The Assembling Polygon Shards that form GHUMMAKAD */}
        <div className="relative w-full max-w-[880px] mb-8 overflow-hidden py-3 px-2 flex items-center justify-center">
          <svg
            ref={svgRef}
            viewBox="0 0 920 120"
            className="w-full h-auto max-h-[110px] drop-shadow-[0_4px_35px_rgba(219,161,44,0.45)]"
            style={{
              overflow: 'visible',
            }}
          >
            <defs>
              {/* Luxury Palette Shard Gradients */}
              <linearGradient id="goldShard1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f7ebcf" />
                <stop offset="30%" stopColor="#ebb748" />
                <stop offset="70%" stopColor="#dba12c" />
                <stop offset="100%" stopColor="#b88219" />
              </linearGradient>

              <linearGradient id="goldShard2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ebb748" />
                <stop offset="50%" stopColor="#dba12c" />
                <stop offset="100%" stopColor="#7d929e" />
              </linearGradient>

              <linearGradient id="steelShard" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#dbd4cc" />
                <stop offset="50%" stopColor="#7d929e" />
                <stop offset="100%" stopColor="#0f3b59" />
              </linearGradient>
            </defs>

            {/* ════════════ LETTER G (x: 25 - 105) ════════════ */}
            <g id="letter-G">
              <polygon className="shard-piece" points="55,18 85,18 75,36 50,36" fill="url(#goldShard1)" stroke="#dba12c" strokeWidth="0.8" />
              <polygon className="shard-piece" points="85,18 105,30 92,48 75,36" fill="url(#goldShard2)" stroke="#dba12c" strokeWidth="0.8" />
              <polygon className="shard-piece" points="55,18 50,36 30,55 48,58" fill="url(#goldShard1)" stroke="#dba12c" strokeWidth="0.8" />
              <polygon className="shard-piece" points="30,55 48,58 30,75 48,72" fill="url(#steelShard)" stroke="#7d929e" strokeWidth="0.8" />
              <polygon className="shard-piece" points="30,75 48,72 55,102 70,86" fill="url(#goldShard1)" stroke="#dba12c" strokeWidth="0.8" />
              <polygon className="shard-piece" points="55,102 70,86 95,102 85,86" fill="url(#goldShard2)" stroke="#dba12c" strokeWidth="0.8" />
              <polygon className="shard-piece" points="95,102 85,86 105,74 88,72" fill="url(#goldShard1)" stroke="#dba12c" strokeWidth="0.8" />
              <polygon className="shard-piece" points="105,74 88,72 68,58 68,72 105,58" fill="url(#goldShard2)" stroke="#dba12c" strokeWidth="0.8" />
            </g>

            {/* ════════════ LETTER H (x: 125 - 195) ════════════ */}
            <g id="letter-H">
              <polygon className="shard-piece" points="125,18 145,18 142,60 125,60" fill="url(#goldShard1)" stroke="#dba12c" strokeWidth="0.8" />
              <polygon className="shard-piece" points="125,60 142,60 145,102 125,102" fill="url(#steelShard)" stroke="#7d929e" strokeWidth="0.8" />
              <polygon className="shard-piece" points="142,50 178,50 160,60 142,60" fill="url(#goldShard2)" stroke="#dba12c" strokeWidth="0.8" />
              <polygon className="shard-piece" points="142,60 160,60 178,70 142,70" fill="url(#goldShard1)" stroke="#dba12c" strokeWidth="0.8" />
              <polygon className="shard-piece" points="175,18 195,18 195,60 178,60" fill="url(#goldShard1)" stroke="#dba12c" strokeWidth="0.8" />
              <polygon className="shard-piece" points="178,60 195,60 195,102 175,102" fill="url(#goldShard2)" stroke="#dba12c" strokeWidth="0.8" />
            </g>

            {/* ════════════ LETTER U (x: 215 - 285) ════════════ */}
            <g id="letter-U">
              <polygon className="shard-piece" points="215,18 235,18 235,74 215,74" fill="url(#goldShard1)" stroke="#dba12c" strokeWidth="0.8" />
              <polygon className="shard-piece" points="215,74 235,74 242,102 225,102" fill="url(#steelShard)" stroke="#7d929e" strokeWidth="0.8" />
              <polygon className="shard-piece" points="225,102 242,102 262,102 278,102" fill="url(#goldShard2)" stroke="#dba12c" strokeWidth="0.8" />
              <polygon className="shard-piece" points="262,102 278,102 285,74 265,74" fill="url(#goldShard1)" stroke="#dba12c" strokeWidth="0.8" />
              <polygon className="shard-piece" points="265,18 285,18 285,74 265,74" fill="url(#goldShard2)" stroke="#dba12c" strokeWidth="0.8" />
            </g>

            {/* ════════════ LETTER M (x: 305 - 385) ════════════ */}
            <g id="letter-M1">
              <polygon className="shard-piece" points="305,18 322,18 322,102 305,102" fill="url(#goldShard1)" stroke="#dba12c" strokeWidth="0.8" />
              <polygon className="shard-piece" points="322,18 345,72 335,78 318,32" fill="url(#goldShard2)" stroke="#dba12c" strokeWidth="0.8" />
              <polygon className="shard-piece" points="368,18 345,72 355,78 372,32" fill="url(#steelShard)" stroke="#7d929e" strokeWidth="0.8" />
              <polygon className="shard-piece" points="368,18 385,18 385,102 368,102" fill="url(#goldShard1)" stroke="#dba12c" strokeWidth="0.8" />
            </g>

            {/* ════════════ LETTER M (x: 405 - 485) ════════════ */}
            <g id="letter-M2">
              <polygon className="shard-piece" points="405,18 422,18 422,102 405,102" fill="url(#goldShard2)" stroke="#dba12c" strokeWidth="0.8" />
              <polygon className="shard-piece" points="422,18 445,72 435,78 418,32" fill="url(#goldShard1)" stroke="#dba12c" strokeWidth="0.8" />
              <polygon className="shard-piece" points="468,18 445,72 455,78 472,32" fill="url(#steelShard)" stroke="#7d929e" strokeWidth="0.8" />
              <polygon className="shard-piece" points="468,18 485,18 485,102 468,102" fill="url(#goldShard1)" stroke="#dba12c" strokeWidth="0.8" />
            </g>

            {/* ════════════ LETTER A (x: 505 - 575) ════════════ */}
            <g id="letter-A1">
              <polygon className="shard-piece" points="536,18 548,18 522,102 505,102" fill="url(#goldShard1)" stroke="#dba12c" strokeWidth="0.8" />
              <polygon className="shard-piece" points="536,18 548,18 554,46 530,46" fill="url(#goldShard2)" stroke="#dba12c" strokeWidth="0.8" />
              <polygon className="shard-piece" points="522,66 558,66 560,78 520,78" fill="url(#steelShard)" stroke="#7d929e" strokeWidth="0.8" />
              <polygon className="shard-piece" points="536,18 548,18 575,102 558,102" fill="url(#goldShard1)" stroke="#dba12c" strokeWidth="0.8" />
            </g>

            {/* ════════════ LETTER K (x: 595 - 665) ════════════ */}
            <g id="letter-K">
              <polygon className="shard-piece" points="595,18 615,18 615,102 595,102" fill="url(#goldShard1)" stroke="#dba12c" strokeWidth="0.8" />
              <polygon className="shard-piece" points="615,58 645,18 665,18 628,66" fill="url(#goldShard2)" stroke="#dba12c" strokeWidth="0.8" />
              <polygon className="shard-piece" points="620,56 636,56 665,102 645,102" fill="url(#steelShard)" stroke="#7d929e" strokeWidth="0.8" />
            </g>

            {/* ════════════ LETTER A (x: 685 - 755) ════════════ */}
            <g id="letter-A2">
              <polygon className="shard-piece" points="716,18 728,18 702,102 685,102" fill="url(#goldShard2)" stroke="#dba12c" strokeWidth="0.8" />
              <polygon className="shard-piece" points="716,18 728,18 734,46 710,46" fill="url(#goldShard1)" stroke="#dba12c" strokeWidth="0.8" />
              <polygon className="shard-piece" points="702,66 738,66 740,78 700,78" fill="url(#steelShard)" stroke="#7d929e" strokeWidth="0.8" />
              <polygon className="shard-piece" points="716,18 728,18 755,102 738,102" fill="url(#goldShard1)" stroke="#dba12c" strokeWidth="0.8" />
            </g>

            {/* ════════════ LETTER D (x: 775 - 855) ════════════ */}
            <g id="letter-D">
              <polygon className="shard-piece" points="775,18 795,18 795,102 775,102" fill="url(#goldShard1)" stroke="#dba12c" strokeWidth="0.8" />
              <polygon className="shard-piece" points="795,18 830,18 848,42 825,42" fill="url(#goldShard2)" stroke="#dba12c" strokeWidth="0.8" />
              <polygon className="shard-piece" points="848,42 856,60 848,82 825,60" fill="url(#steelShard)" stroke="#7d929e" strokeWidth="0.8" />
              <polygon className="shard-piece" points="848,82 830,102 795,102 815,86" fill="url(#goldShard1)" stroke="#dba12c" strokeWidth="0.8" />
            </g>
          </svg>

          {/* Sweeping Specular Light Sheen */}
          <div
            className="wordmark-sheen absolute inset-0 pointer-events-none opacity-0"
            style={{
              background:
                'linear-gradient(105deg, transparent 20%, rgba(219, 212, 204, 0.75) 50%, transparent 80%)',
              mixBlendMode: 'overlay',
            }}
          />
        </div>

        {/* ─── Elegant Editorial Mangilio Subtitle ─── */}
        <div className="mb-10 text-center">
          <span className="font-mangilio text-2xl sm:text-3xl md:text-4xl text-dust tracking-wider drop-shadow-md">
            Ghum<span className="text-goldenrod italic font-normal">makad</span>
          </span>
        </div>

        {/* ─── Minimalist Luxury Loading Indicator in Mediterranean Palette ─── */}
        <div className="w-full max-w-xs mx-auto flex flex-col items-center gap-3">
          {/* Subtle "LOADING" label and smooth Percentage in sync */}
          <div className="flex items-center justify-between w-full px-1 text-[11px] font-mono tracking-[0.3em] uppercase text-steel">
            <span className="flex items-center gap-1.5">
              <span>LOADING</span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-goldenrod animate-pulse" />
            </span>
            <span className="font-semibold text-goldenrod">{progress}%</span>
          </div>

          {/* Hairline glowing progress bar in Goldenrod & Yale Blue */}
          <div className="relative w-full h-[2px] rounded-full bg-steel/20 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-100 ease-out"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #dba12c 0%, #ebb748 60%, #7d929e 100%)',
                boxShadow: '0 0 14px rgba(219, 161, 44, 0.95)',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
