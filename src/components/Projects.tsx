import { useRef, useState } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PROJECTS, type Project } from '../data/projects'
import SectionHead from './SectionHead'
import type { ModalContent } from './Modal'
import { Chips, MetricPills, ProjectLinks, projectModal, youtubeId } from './modalContent'
import { PlayIcon } from './Icons'

const FILTERS: { id: Project['tag'] | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'ai', label: 'AI / LLM' },
  { id: 'security', label: 'Security' },
  { id: 'robotics', label: 'Robotics' },
  { id: 'ml', label: 'Machine Learning' },
]

function YoutubeThumb({ id, alt }: { id: string; alt: string }) {
  return (
    <img
      src={`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`}
      alt={alt}
      loading="lazy"
      onError={(e) => {
        const img = e.currentTarget
        if (img.src.includes('maxres')) img.src = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
        else img.remove()
      }}
    />
  )
}

/* Boundline has no video, so its media panel is a small drawing of its own story:
   one untrusted message, the agent, the attempt to cross the line, and the gate that stops it. */
function BoundlineStory() {
  const steps = [
    { c: 'amber', t: 'Untrusted ticket lands' },
    { c: 'amber', t: 'Agent reads it' },
    { c: 'crimson', t: 'Agent tries to email data out' },
    { c: 'jade', t: 'Approval gate stops it' },
  ]
  return (
    <div className="bl-story" aria-label="How one message crosses the line, in four steps">
      <div className="bl-title mono">how one message crosses the line</div>
      <ol>
        {steps.map((s, i) => (
          <li key={i} className={`bl-${s.c}`}>
            <span className="bl-dot" />
            <span className="mono bl-k">0{i + 1}</span>
            {s.t}
          </li>
        ))}
      </ol>
      <div className="bl-boundary" aria-hidden="true">
        <span>trust boundary</span>
      </div>
    </div>
  )
}

function Featured({ p, onOpen, flip }: { p: Project; onOpen: (m: ModalContent) => void; flip?: boolean }) {
  const yt = youtubeId(p.links.video)
  return (
    <article className={`featured card reveal ${flip ? 'is-flip' : ''}`} style={{ ['--brand' as string]: `var(${p.brand})` }}>
      {yt ? (
        <button className="featured-media" data-cursor="play" onClick={() => onOpen(projectModal(p, true))} aria-label={`Play the ${p.title} demo video`}>
          <span className="featured-glyph" aria-hidden="true">
            {p.glyph}
          </span>
          <YoutubeThumb id={yt} alt="" />
          <span className="featured-play">
            <PlayIcon />
          </span>
          <span className="featured-ribbon mono">▶ watch the demo</span>
        </button>
      ) : (
        <button className="featured-media featured-media-art" data-cursor="open" onClick={() => onOpen(projectModal(p))} aria-label={`Read about ${p.title}`}>
          <BoundlineStory />
        </button>
      )}
      <div className="featured-body">
        <div className="p-cat mono">
          {p.category} · {p.date}
        </div>
        <h3 className="featured-title">{p.title}</h3>
        <p className="featured-desc">{p.short}</p>
        <MetricPills metrics={p.stats} />
        <Chips items={p.tags} />
        <div className="featured-actions">
          <button className="btn btn-primary btn-sm" onClick={() => onOpen(projectModal(p))}>
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
  const featured = PROJECTS.filter((p) => p.featured)
  const rest = PROJECTS.filter((p) => !p.featured && (filter === 'all' || p.tag === filter))

  useGSAP(
    () => {
      gsap.fromTo('.project-card', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: 'power3.out' })
      ScrollTrigger.refresh()
    },
    { scope: root, dependencies: [filter], revertOnUpdate: true },
  )

  return (
    <section className="section" id="projects" ref={root}>
      <div className="container">
        <SectionHead index="03" eyebrow="built with intent" title="Things I have" accent="built" sub="Two highlights first, then the rest. Click any card for the architecture, challenges and what I learned." />
        <div className="featured-list">
          {featured.map((p, i) => (
            <Featured key={p.id} p={p} onOpen={onOpen} flip={i % 2 === 1} />
          ))}
        </div>
        <div className="more-head reveal">
          <h3>More projects</h3>
          <div className="filter-bar" role="tablist">
            {FILTERS.map((f) => (
              <button key={f.id} role="tab" aria-selected={filter === f.id} className={`filter-btn ${filter === f.id ? 'is-active' : ''}`} onClick={() => setFilter(f.id)}>
                {f.label}
              </button>
            ))}
          </div>
        </div>
        <div className="projects-grid">
          {rest.map((p) => {
            const yt = youtubeId(p.links.video)
            return (
              <article
                key={p.id}
                className="project-card card"
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
                  {yt && <YoutubeThumb id={yt} alt="" />}
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
              </article>
            )
          })}
          {!rest.length && <p className="muted">No other projects in this group yet.</p>}
        </div>
      </div>
    </section>
  )
}
