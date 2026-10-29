import { EXPERIENCE, type Experience as Exp, type Scope } from '../data/experience'
import SectionHead from './SectionHead'
import type { ModalContent } from './Modal'
import { experienceModal } from './modalContent'

const GROUPS: { scope: Scope; title: string; icon: string; brand: string; blurb: string }[] = [
  { scope: 'industry', title: 'Work experience', icon: '💼', brand: '--c-cognizant', blurb: 'Industry roles in AI, security and software.' },
  { scope: 'research', title: 'Research', icon: '🔬', brand: '--c-bu', blurb: 'Labs and fellowships at Boston University.' },
  { scope: 'leadership', title: 'Leadership', icon: '🚀', brand: '--c-bu', blurb: 'Leading the BU security community.' },
]

function Row({ e, onOpen }: { e: Exp; onOpen: (m: ModalContent) => void }) {
  return (
    <li>
      <button className="exp-row" style={{ ['--brand' as string]: `var(${e.brand})` }} onClick={() => onOpen(experienceModal(e))} data-cursor="details">
        <span className="logo-badge">{e.mono}</span>
        <span className="exp-row-main">
          <span className="exp-row-role">
            {e.role}
            {e.current && <span className="now-tag mono">now</span>}
          </span>
          <span className="exp-row-co">{e.company}</span>
          <span className="exp-row-tag">{e.tagline.replace(/^\/\/\s*/, '')}</span>
        </span>
        <span className="exp-row-date mono">{e.date}</span>
        <span className="exp-row-go" aria-hidden="true">
          →
        </span>
      </button>
    </li>
  )
}

export default function Experience({ onOpen }: { onOpen: (m: ModalContent) => void }) {
  return (
    <section className="section" id="experience">
      <div className="container">
        <SectionHead index="02" eyebrow="the journey" title="Where I have" accent="worked" sub="Grouped by type, newest first. Click any role to see what I did." />
        <div className="exp-grid">
          {GROUPS.map((g) => {
            const items = EXPERIENCE.filter((e) => e.scope === g.scope)
            return (
              <div className={`exp-box card reveal exp-${g.scope}`} key={g.scope} style={{ ['--brand' as string]: `var(${g.brand})` }}>
                <div className="exp-box-head">
                  <span className="exp-box-icon">{g.icon}</span>
                  <div>
                    <h3>{g.title}</h3>
                    <p>{g.blurb}</p>
                  </div>
                  <span className="exp-count mono">
                    {items.length} {items.length === 1 ? 'role' : 'roles'}
                  </span>
                </div>
                <ul className="exp-list">
                  {items.map((e) => (
                    <Row key={e.company + e.role} e={e} onOpen={onOpen} />
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
