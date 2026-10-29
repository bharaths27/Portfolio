import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { scrollState } from './scrollState'

gsap.registerPlugin(ScrollTrigger)

let lenis: Lenis | null = null

/* Scroll to a selector or y position, smoothly when Lenis is running. */
export function scrollTo(target: string | number) {
  if (lenis) lenis.scrollTo(target, { offset: typeof target === 'string' ? -70 : 0, duration: 1.4 })
  else if (typeof target === 'string') document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' })
  else window.scrollTo({ top: target, behavior: 'smooth' })
}

export function setScrollLocked(locked: boolean) {
  if (lenis) (locked ? lenis.stop() : lenis.start())
  document.documentElement.style.overflow = locked ? 'hidden' : ''
}

/* Lenis smooth scrolling, driven by the GSAP ticker so ScrollTrigger stays in sync. */
export function useSmoothScroll(reduced: boolean) {
  useEffect(() => {
    const update = () => {
      const vh = window.innerHeight
      const max = document.documentElement.scrollHeight - vh
      scrollState.hero = Math.min(window.scrollY / vh, 1)
      scrollState.page = max > 0 ? window.scrollY / max : 0
    }

    if (reduced) {
      window.addEventListener('scroll', update, { passive: true })
      update()
      return () => window.removeEventListener('scroll', update)
    }

    lenis = new Lenis({ lerp: 0.09, smoothWheel: true })
    lenis.on('scroll', (l: Lenis) => {
      scrollState.velocity = l.velocity
      update()
      ScrollTrigger.update()
    })
    const tick = (time: number) => lenis?.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    update()

    return () => {
      gsap.ticker.remove(tick)
      lenis?.destroy()
      lenis = null
    }
  }, [reduced])
}
