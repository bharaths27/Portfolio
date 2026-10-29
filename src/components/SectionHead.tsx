import { useRef } from 'react'
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { paintGradient } from '../hooks/paintGradient'

gsap.registerPlugin(SplitText)

/* Section eyebrow + title. The title splits into words that rise in on scroll. */
export default function SectionHead({ index, eyebrow, title, accent, sub }: { index: string; eyebrow: string; title: string; accent?: string; sub?: string }) {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      const split = SplitText.create('.section-title', { type: 'words', mask: 'words' })
      const paint = () => paintGradient(split.words)
      paint()
      document.fonts?.ready.then(paint)
      ScrollTrigger.addEventListener('refresh', paint)
      gsap.from(split.words, {
        yPercent: 110,
        duration: 1,
        ease: 'expo.out',
        stagger: 0.06,
        scrollTrigger: { trigger: root.current, start: 'top 85%', once: true },
      })
      gsap.from('.section-eyebrow, .section-sub', {
        opacity: 0,
        y: 16,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: { trigger: root.current, start: 'top 85%', once: true },
      })
      return () => {
        ScrollTrigger.removeEventListener('refresh', paint)
        split.revert()
      }
    },
    { scope: root },
  )

  return (
    <div className="section-head" ref={root}>
      <div className="section-eyebrow mono">
        <span className="eyebrow-idx">{index}</span>
        <span className="eyebrow-line" />
        {eyebrow}
      </div>
      <h2 className="section-title">
        {title} {accent && <span className="grad">{accent}</span>}
      </h2>
      {sub && <p className="section-sub">{sub}</p>}
    </div>
  )
}
