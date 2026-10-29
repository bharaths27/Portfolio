import { CERTS, SKILLS } from '../data/profile'
import SectionHead from './SectionHead'
import TiltCard from './TiltCard'

export default function Skills() {
  return (
    <section className="section" id="skills">
      <div className="container">
        <SectionHead index="05" eyebrow="toolkit" title="Skills and" accent="technologies" sub="The stack I reach for across AI, security, robotics and full stack engineering." />
        <div className="skills-grid">
          {SKILLS.map((g) => (
            <div className="reveal" key={g.title}>
              <TiltCard className="skill-card glass" max={5} style={{ ['--brand' as string]: `var(${g.brand})` }}>
                <div className="skill-head">
                  <span className="skill-icon">{g.icon}</span>
                  <div>
                    <h3>{g.title}</h3>
                    <div className="mono muted small">{g.sub}</div>
                  </div>
                </div>
                <div className="chips">
                  {g.chips.map((c) => (
                    <span className="chip" key={c}>
                      {c}
                    </span>
                  ))}
                </div>
              </TiltCard>
            </div>
          ))}
        </div>
        <div className="certs">
          {CERTS.map((c) => (
            <div className="cert glass reveal" key={c.name}>
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
