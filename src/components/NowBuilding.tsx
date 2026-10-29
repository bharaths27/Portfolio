import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { PIPELINE } from '../data/profile'
import { EXPERIENCE } from '../data/experience'
import SectionHead from './SectionHead'
import type { ModalContent } from './Modal'
import { experienceModal } from './modalContent'

/* The GPTfy pipeline as a pinned, horizontally scrolling track on desktop.
   On small screens (or reduced motion) it is a simple vertical list. */
export default function NowBuilding({ onOpen, reduced }: { onOpen: (m: ModalContent) => void; reduced: boolean }) {
  const root = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const gptfy = EXPERIENCE.find((e) => e.company === 'GPTfy')!

  useGSAP(
    () => {
      if (reduced) return
      const mm = gsap.matchMedia()
      mm.add('(min-width: 900px)', () => {
        const el = track.current!
        const distance = () => el.scrollWidth - window.innerWidth + 80
        const tween = gsap.to(el, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: '.now-pin',
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        })
        gsap.to('.now-progress-fill', {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: { trigger: '.now-pin', start: 'top top', end: () => `+=${distance()}`, scrub: true },
        })
        // Each stage lights up as it passes the middle of the screen.
        gsap.utils.toArray<HTMLElement>('.stage').forEach((s) => {
          gsap.from(s, {
            opacity: 0.25,
            scale: 0.92,
            duration: 0.5,
            scrollTrigger: { trigger: s, containerAnimation: tween, start: 'left 85%', end: 'left 45%', scrub: true },
          })
        })
      })
      return () => mm.revert()
    },
    { scope: root, dependencies: [reduced] },
  )

  return (
    <section className="section now" id="now" ref={root}>
      <div className="container">
        <SectionHead
          index="02"
          eyebrow="now building"
          title="Finding the weaknesses that"
          accent="actually matter"
          sub="R&D Cybersecurity Consultant (independent) at GPTfy. A product that probes a target from the outside, discovers candidate weaknesses, and decides which ones are really exploitable."
        />
      </div>
      <div className="now-pin">
        <div className="now-track" ref={track}>
          <div className="stage stage-intro glass">
            <div className="stage-k mono">GPTfy · current role</div>
            <h3>Probe. Discover. Triage.</h3>
            <p>
              Scanners are noisy. The machine learning triage step is the real value: it cuts false positives and proves which findings are reachable,
              instead of just counting them. Tested on OWASP Juice Shop as an authorized local practice target.
            </p>
            <button className="btn btn-primary btn-sm" data-cursor="open" onClick={() => onOpen(experienceModal(gptfy))}>
              Full role details →
            </button>
          </div>
          {PIPELINE.map((s, i) => (
            <div className={`stage glass ${i === PIPELINE.length - 1 ? 'stage-next' : ''}`} key={s.k}>
              <div className="stage-top">
                <span className="stage-k mono">{s.k}</span>
                {i < PIPELINE.length - 1 && <span className="stage-arrow" aria-hidden="true">→</span>}
              </div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <div className="chips">
                {s.chips.map((c) => (
                  <span className="chip" key={c}>
                    {c}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="container now-progress">
          <div className="now-progress-fill" />
        </div>
      </div>
    </section>
  )
}
