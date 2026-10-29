import { useRef, useState } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { EXPERIENCE, type Scope } from '../data/experience'
import SectionHead from './SectionHead'
import type { ModalContent } from './Modal'
import { Chips, MetricPills, experienceModal } from './modalContent'

const FILTERS: { id: Scope | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'industry', label: 'Work' },
  { id: 'research', label: 'Research' },
  { id: 'leadership', label: 'Leadership' },
]

export default function Experience({ onOpen }: { onOpen: (m: ModalContent) => void }) {
  const root = useRef<HTMLElement>(null)
  const [filter, setFilter] = useState<Scope | 'all'>('all')
  const items = EXPERIENCE.filter((e) => filter === 'all' || e.scope === filter)

  // The timeline spine fills as you scroll through the section.
  useGSAP(
    () => {
      gsap.fromTo(
        '.tl-spine-fill',
        { scaleY: 0 },
        { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '.timeline', start: 'top 70%', end: 'bottom 70%', scrub: true } },
      )
      gsap.fromTo('.tl-item', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.06, ease: 'power3.out' })
      ScrollTrigger.refresh()
    },
    { scope: root, dependencies: [filter], revertOnUpdate: true },
  )

  return (
    <section className="section" id="experience" ref={root}>
      <div className="container">
        <SectionHead index="03" eyebrow="the journey" title="Where I have" accent="worked" sub="Industry roles, university research and leadership. Click any card for the full story." />
        <div className="filter-bar reveal" role="tablist">
          {FILTERS.map((f) => (
            <button key={f.id} role="tab" aria-selected={filter === f.id} className={`filter-btn ${filter === f.id ? 'is-active' : ''}`} onClick={() => setFilter(f.id)}>
              {f.label}
            </button>
          ))}
        </div>
        <div className="timeline">
          <div className="tl-spine">
            <div className="tl-spine-fill" />
          </div>
          {items.map((e) => (
            <div className="tl-item" key={e.company + e.role} style={{ ['--brand' as string]: `var(${e.brand})` }}>
              <div className="tl-dot" />
              <div className="tl-date mono">{e.date}</div>
              <article
                className="tl-card glass"
                tabIndex={0}
                role="button"
                data-cursor="details"
                aria-label={`${e.role} at ${e.company}, view details`}
                onClick={() => onOpen(experienceModal(e))}
                onKeyDown={(ev) => {
                  if (ev.key === 'Enter' || ev.key === ' ') {
                    ev.preventDefault()
                    onOpen(experienceModal(e))
                  }
                }}
              >
                <div className="tl-head">
                  <span className="logo-badge">{e.mono}</span>
                  <div>
                    <div className="tl-role">
                      {e.role}
                      {e.current && <span className="now-tag mono">now</span>}
                    </div>
                    <div className="tl-company">
                      {e.company} <span className="muted">· {e.type}</span>
                    </div>
                  </div>
                </div>
                <div className="tagline mono">{e.tagline}</div>
                <ul className="tl-points">
                  {e.points.slice(0, 2).map((p, i) => (
                    <li key={i} dangerouslySetInnerHTML={{ __html: p }} />
                  ))}
                </ul>
                <MetricPills metrics={e.metrics} />
                <div className="tl-foot">
                  <Chips items={e.tags} max={5} />
                  <span className="more mono">details →</span>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
