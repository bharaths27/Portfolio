import { useRef, useState } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PROJECTS, type Project } from '../data/projects'
import SectionHead from './SectionHead'
import TiltCard from './TiltCard'
import type { ModalContent } from './Modal'
import { Chips, MetricPills, ProjectLinks, projectModal, youtubeId } from './modalContent'
import { PlayIcon } from './Icons'

const FILTERS: { id: Project['tag'] | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'robotics', label: 'Robotics' },
  { id: 'ai', label: 'AI / LLM' },
  { id: 'ml', label: 'Machine Learning' },
  { id: 'embedded', label: 'Embedded' },
]

function Featured({ p, onOpen }: { p: Project; onOpen: (m: ModalContent) => void }) {
  const yt = youtubeId(p.links.video)
  return (
    <article className="featured reveal" style={{ ['--brand' as string]: `var(${p.brand})` }}>
      <button className="featured-media" data-cursor="play" onClick={() => onOpen(projectModal(p, true))} aria-label={`Play the ${p.title} demo video`}>
        {yt && (
          <img
            src={`https://i.ytimg.com/vi/${yt}/maxresdefault.jpg`}
            alt=""
            loading="lazy"
            onError={(e) => {
              const img = e.currentTarget
              if (img.src.includes('maxres')) img.src = `https://i.ytimg.com/vi/${yt}/hqdefault.jpg`
              else img.remove()
            }}
          />
        )}
        <span className="featured-glyph" aria-hidden="true">{p.glyph}</span>
        <span className="featured-play">
          <PlayIcon />
        </span>
        <span className="featured-ribbon mono">★ latest · {p.date}</span>
      </button>
      <div className="featured-body">
        <div className="p-cat mono">{p.category}</div>
        <h3 className="featured-title">{p.title}</h3>
        <p className="featured-desc">{p.short}</p>
        <MetricPills metrics={p.stats} />
        <Chips items={p.tags} />
        <div className="featured-actions">
          <button className="btn btn-primary btn-sm" data-cursor="read" onClick={() => onOpen(projectModal(p))}>
            Read the case study →
          </button>
          <ProjectLinks p={p} large />
        </div>
      </div>
    </article>
  )
}

export default function Projects({ onOpen }: { onOpen: (m: ModalContent) => void }) {
  const root = useRef<HTMLElement>(null)
  const [filter, setFilter] = useState<Project['tag'] | 'all'>('all')
  const featured = PROJECTS.find((p) => p.featured)!
  const rest = PROJECTS.filter((p) => !p.featured && (filter === 'all' || p.tag === filter))

  useGSAP(
    () => {
      gsap.fromTo('.project-card', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.07, ease: 'power3.out' })
      ScrollTrigger.refresh()
    },
    { scope: root, dependencies: [filter], revertOnUpdate: true },
  )

  return (
    <section className="section" id="projects" ref={root}>
      <div className="container">
        <SectionHead index="04" eyebrow="built with intent" title="Things I have" accent="built" sub="Hackathon builds, research tools and side projects. Click any card for the architecture, challenges and what I learned." />
        <Featured p={featured} onOpen={onOpen} />
        <div className="filter-bar reveal" role="tablist">
          {FILTERS.map((f) => (
            <button key={f.id} role="tab" aria-selected={filter === f.id} className={`filter-btn ${filter === f.id ? 'is-active' : ''}`} onClick={() => setFilter(f.id)}>
              {f.label}
            </button>
          ))}
        </div>
        <div className="projects-grid">
          {rest.map((p) => (
            <TiltCard
              key={p.id}
              className="project-card glass"
              style={{ ['--brand' as string]: `var(${p.brand})` }}
              data-cursor="open"
              role="button"
              tabIndex={0}
              onClick={() => onOpen(projectModal(p))}
              onKeyDown={(e) => e.key === 'Enter' && onOpen(projectModal(p))}
            >
              <div className="project-cover">
                <div className="cover-grid" />
                <span className="glyph">{p.glyph}</span>
                <span className="project-date mono">{p.date}</span>
              </div>
              <div className="project-body">
                <div className="p-cat mono">{p.category}</div>
                <h3>{p.title}</h3>
                <p>{p.short}</p>
                <Chips items={p.tags} max={4} />
                <div className="project-foot">
                  <div className="plinks">
                    <ProjectLinks p={p} />
                    {!Object.keys(p.links).length && <span className="muted small">{p.note ?? 'Coursework'}</span>}
                  </div>
                  <span className="more mono">details →</span>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  )
}
