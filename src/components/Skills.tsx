import { useState } from 'react'
import { CERTS, SKILLS } from '../data/profile'
import SectionHead from './SectionHead'

/* Skills as a clean, scannable board: pick a category on the left, see its tools on the right.
   "All" shows every category as labelled rows. */
export default function Skills() {
  const [active, setActive] = useState<string>('all')
  const shown = active === 'all' ? SKILLS : SKILLS.filter((g) => g.title === active)

  return (
    <section className="section" id="skills">
      <div className="container">
        <SectionHead index="04" eyebrow="toolkit" title="Skills and" accent="tools" sub="Grouped by area so you can find what you are looking for fast." />
        <div className="skills-board card reveal">
          <div className="skills-tabs" role="tablist" aria-label="Skill areas">
            <button role="tab" aria-selected={active === 'all'} className={`skills-tab ${active === 'all' ? 'is-active' : ''}`} onClick={() => setActive('all')}>
              <span className="skills-tab-icon">✦</span> All areas
              <span className="skills-tab-n mono">{SKILLS.reduce((n, g) => n + g.chips.length, 0)}</span>
            </button>
            {SKILLS.map((g) => (
              <button
                key={g.title}
                role="tab"
                aria-selected={active === g.title}
                className={`skills-tab ${active === g.title ? 'is-active' : ''}`}
                style={{ ['--brand' as string]: `var(${g.brand})` }}
                onClick={() => setActive(g.title)}
              >
                <span className="skills-tab-icon">{g.icon}</span> {g.title}
                <span className="skills-tab-n mono">{g.chips.length}</span>
              </button>
            ))}
          </div>
          <div className="skills-panel" role="tabpanel">
            {shown.map((g) => (
              <div className="skills-row" key={g.title} style={{ ['--brand' as string]: `var(${g.brand})` }}>
                <div className="skills-row-head">
                  <span>{g.icon}</span>
                  <h3>{g.title}</h3>
                  <span className="mono muted small">{g.sub}</span>
                </div>
                <div className="chips">
                  {g.chips.map((c) => (
                    <span className="chip chip-brand" key={c}>
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="certs">
          {CERTS.map((c) => (
            <div className="cert card reveal" key={c.name}>
              <span className="cert-ic">{c.icon}</span>
              <div>
                <div className="cert-name">{c.name}</div>
                <div className="muted small">{c.by}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
