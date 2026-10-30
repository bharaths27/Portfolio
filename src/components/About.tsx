import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { STATS } from '../data/profile'
import SectionHead from './SectionHead'

const FACTS = [
  { k: 'Studying', v: 'B.S. Computer Engineering, Machine Learning concentration', sub: 'Boston University · Sept 2023 to May 2027', brand: '--c-bu' },
  { k: 'Working on', v: 'R&D Cybersecurity Consultant at GPTfy', sub: 'Automated scanning with ML exploitability triage', brand: '--c-gptfy' },
  { k: 'Running', v: 'Boundline', sub: 'Security reviews for AI agents and MCP servers', brand: '--c-boundline' },
  { k: 'Leading', v: 'President, BU Cybersecurity Association', sub: 'Workshops, hackathons and speakers', brand: '--c-bu' },
  { k: 'Open to', v: 'AI and security roles', sub: 'Graduating May 2027 · US work authorized', brand: '--green' },
]

const FOCUS = [
  { icon: '🤖', title: 'AI systems', text: 'Multi agent systems, LLM pipelines, vision language models.' },
  { icon: '🛡️', title: 'Security', text: 'Automated scanning, AI agent and MCP security, identity.' },
  { icon: '🦾', title: 'Robotics', text: 'Voice and gesture controlled robots on a Raspberry Pi.' },
]

export default function About({ ready }: { ready: boolean }) {
  const root = useRef<HTMLElement>(null)

  // Count each stat up once it scrolls into view.
  useGSAP(
    () => {
      if (!ready) return
      gsap.utils.toArray<HTMLElement>('.stat-num').forEach((el) => {
        const end = Number(el.dataset.value)
        const suffix = el.dataset.suffix ?? ''
        const obj = { v: 0 }
        gsap.to(obj, {
          v: end,
          duration: 1.6,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 92%', once: true },
          onUpdate: () => (el.textContent = Math.round(obj.v).toLocaleString() + suffix),
        })
      })
    },
    { scope: root, dependencies: [ready] },
  )

  return (
    <section className="section" id="about" ref={root}>
      <div className="container">
        <SectionHead index="01" eyebrow="who I am" title="About" accent="me" />
        <div className="about-grid">
          <div className="about-body">
            <p className="about-lead reveal">
              I like building things where <span className="hl">intelligent systems</span> meet <span className="hl">security</span>, and lately, where
              they meet the real world through robots.
            </p>
            <p className="reveal">
              Right now I am an <strong>R&amp;D Cybersecurity Consultant at GPTfy</strong>, building a product that scans a website from the outside and
              uses machine learning to decide which weaknesses are actually exploitable. I also started <strong>Boundline</strong>, a business that does
              security reviews for startups building AI agents and MCP servers.
            </p>
            <p className="reveal">
              Before that, at <strong>Cognizant</strong>, I architected <strong>Aerotrace</strong>, a Pydantic AI multi agent system that cut airline
              compliance reporting from <strong>3 days to under 30 seconds</strong>. I did research at BU's <strong>H2X Lab</strong>, was a{' '}
              <strong>Technical AI Safety Fellow</strong>, and most recently led our team at the DS+X hackathon to build <strong>ENGRAM Assist</strong>,
              a voice and hand sign controlled helper robot.
            </p>
            <div className="focus reveal">
              {FOCUS.map((f) => (
                <div className="focus-item" key={f.title}>
                  <span className="focus-icon">{f.icon}</span>
                  <div>
                    <div className="focus-title">{f.title}</div>
                    <div className="focus-text">{f.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <aside className="facts card reveal" aria-label="Quick facts">
            <div className="facts-title mono">quick facts</div>
            <dl>
              {FACTS.map((f) => (
                <div className="fact" key={f.k} style={{ ['--brand' as string]: `var(${f.brand})` }}>
                  <dt className="mono">{f.k}</dt>
                  <dd>
                    <span className="fact-v">{f.v}</span>
                    <span className="fact-sub">{f.sub}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
        <div className="stats">
          {STATS.map((s) => (
            <div className="stat card reveal" key={s.label} style={{ ['--brand' as string]: `var(${s.brand})` }}>
              <div className="stat-num" data-value={s.value} data-suffix={s.suffix}>
                {s.value.toLocaleString()}
                {s.suffix}
              </div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
