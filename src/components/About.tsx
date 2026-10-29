import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { PROFILE, STATS } from '../data/profile'
import SectionHead from './SectionHead'
import TiltCard from './TiltCard'

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
          duration: 2,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
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
          <div className="about-side reveal">
            <TiltCard className="photo-card">
              <img src={PROFILE.photo} alt="Bharath Srividhya" loading="lazy" />
              <div className="photo-glare" />
              <span className="photo-badge mono">
                <span className="pulse" /> Boston, MA · building and shipping
              </span>
            </TiltCard>
            <div className="edu-card glass">
              <div className="edu-school">
                <span className="logo-badge" style={{ ['--brand' as string]: 'var(--c-bu)' }}>
                  BU
                </span>
                Boston University
              </div>
              <div className="edu-degree">B.S. Computer Engineering · Machine Learning concentration</div>
              <div className="edu-meta mono">Sept 2023 to May 2027 · Boston, MA</div>
            </div>
          </div>
          <div className="about-body">
            <p className="about-lead reveal">
              I like building things where <span className="hl">intelligent systems</span> meet <span className="hl">security</span>, and lately,
              where they meet the real world through robots.
            </p>
            <p className="reveal">
              Right now I am an <strong>R&amp;D Cybersecurity Consultant at GPTfy</strong>, working on a product that probes a website from the
              outside, finds candidate weaknesses, and uses machine learning to decide which ones are actually exploitable. Before that, at{' '}
              <strong>Cognizant</strong>, I architected <strong>Aerotrace</strong>, a Pydantic AI multi agent system that cut airline compliance
              reporting from <strong>3 days to under 30 seconds</strong>.
            </p>
            <p className="reveal">
              I also do research at BU's <strong>H2X Lab</strong> on vision language models for accessible navigation, was a{' '}
              <strong>Technical AI Safety Fellow</strong>, and lead the <strong>BU Cybersecurity Association</strong> as President. Most recently I
              led our team at the DS+X hackathon to build <strong>ENGRAM Assist</strong>, a voice and hand sign controlled helper robot.
            </p>
            <div className="stats">
              {STATS.map((s) => (
                <div className="stat glass reveal" key={s.label} style={{ ['--brand' as string]: `var(${s.brand})` }}>
                  <div className="stat-num" data-value={s.value} data-suffix={s.suffix}>
                    {s.value.toLocaleString()}
                    {s.suffix}
                  </div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
