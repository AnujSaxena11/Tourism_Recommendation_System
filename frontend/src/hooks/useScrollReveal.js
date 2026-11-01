import { useEffect, useRef } from 'react'

export function useScrollReveal() {
  const observer = useRef(null)

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
    )

    const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right')
    elements.forEach((el) => observer.current.observe(el))

    return () => observer.current?.disconnect()
  }, [])
}

export function useParallax() {
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const parallaxEls = document.querySelectorAll('[data-parallax]')
      parallaxEls.forEach((el) => {
        const speed = parseFloat(el.dataset.parallax) || 0.3
        el.style.transform = `translateY(${scrollY * speed}px)`
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
}
