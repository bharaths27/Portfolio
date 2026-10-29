import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

/* Short counter intro, then the curtain lifts and the hero animates in. */
export default function Preloader({ onDone }: { onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null)
  const num = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      const counter = { v: 0 }
      gsap
        .timeline({ onComplete: () => { if (root.current) root.current.style.display = 'none' } })
        .to(counter, {
          v: 100,
          duration: 1.3,
          ease: 'power2.inOut',
          onUpdate: () => {
            if (num.current) num.current.textContent = String(Math.round(counter.v)).padStart(3, '0')
          },
        })
        .to('.pre-bar-fill', { scaleX: 1, duration: 1.3, ease: 'power2.inOut' }, 0)
        .to('.pre-inner', { y: -40, opacity: 0, duration: 0.5, ease: 'power2.in' })
        .add(onDone)
        .to(root.current, { yPercent: -100, duration: 0.9, ease: 'expo.inOut' }, '<')
    },
    { scope: root },
  )

  return (
    <div className="preloader" ref={root}>
      <div className="pre-inner">
        <div className="pre-name">Bharath Srividhya</div>
        <div className="pre-count mono">
          <span ref={num}>000</span>
        </div>
        <div className="pre-bar">
          <div className="pre-bar-fill" />
        </div>
        <div className="pre-tag mono">initializing secure, intelligent systems</div>
      </div>
    </div>
  )
}
