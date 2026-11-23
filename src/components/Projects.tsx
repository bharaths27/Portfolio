import { PROJECTS, type Project } from '../data/projects'
import SectionHead from './SectionHead'
import type { ModalContent } from './Modal'
import { Chips, MetricPills, ProjectLinks, projectModal, youtubeId } from './modalContent'
import { PlayIcon } from './Icons'

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

function Featured({ p, onOpen, flip, badge }: { p: Project; onOpen: (m: ModalContent) => void; flip?: boolean; badge?: string }) {
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
        {badge && <span className="owner-badge mono">{badge}</span>}
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

function ProjectCard({ p, onOpen }: { p: Project; onOpen: (m: ModalContent) => void }) {
  const yt = youtubeId(p.links.video)
  return (
    <article
      className={`project-card card reveal ${p.award ? 'is-winner' : ''}`}
      style={{ ['--brand' as string]: `var(${p.brand})` }}
      data-cursor="open"
      role="button"
      tabIndex={0}
      onClick={() => onOpen(projectModal(p))}
      onKeyDown={(e) => e.key === 'Enter' && onOpen(projectModal(p))}
    >
      <div className={`project-cover ${p.image ? 'has-shot' : ''}`}>
        <div className="cover-grid" />
        {p.image ? (
          <img className="cover-shot" src={p.image} alt={p.imageAlt ?? ''} loading="lazy" />
        ) : (
          <>
            <span className="glyph">{p.glyph}</span>
            {yt && <YoutubeThumb id={yt} alt="" />}
          </>
        )}
        {p.award && <span className="winner-ribbon mono">🏆 winner</span>}
        <span className="project-date mono">{p.date}</span>
      </div>
      <div className="project-body">
        {p.award && (
          <div className="award">
            <div className="award-event">{p.award.event}</div>
            <ul>
              {p.award.prizes.map((prize) => (
                <li key={prize}>{prize}</li>
              ))}
            </ul>
          </div>
        )}
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
}

function GroupHead({ k, title, sub }: { k: string; title: string; sub: string }) {
  return (
    <div className="group-head reveal">
      <span className="group-k mono">{k}</span>
      <div>
        <h3>{title}</h3>
        <p>{sub}</p>
      </div>
    </div>
  )
}

export default function Projects({ onOpen }: { onOpen: (m: ModalContent) => void }) {
  const business = PROJECTS.filter((p) => p.group === 'business')
  const winners = PROJECTS.filter((p) => p.group === 'winner')
  const others = PROJECTS.filter((p) => p.group === 'other')

  return (
    <section className="section" id="projects">
      <div className="container">
        <SectionHead index="03" eyebrow="built with intent" title="Things I have" accent="built" sub="My business first, then the hackathon projects that won, then the rest. Click any card for the full story." />

        <GroupHead k="01" title="My business" sub="A startup I founded and own." />
        <div className="featured-list">
          {business.map((p) => (
            <Featured key={p.id} p={p} onOpen={onOpen} badge="Founder and owner" />
          ))}
        </div>

        <GroupHead k="02" title="Hackathon winners" sub="Projects that won at HackDartmouth, HackPrinceton and BostonHacks." />
        <div className="projects-grid is-winners">
          {winners.map((p) => (
            <ProjectCard key={p.id} p={p} onOpen={onOpen} />
          ))}
        </div>

        <GroupHead k="03" title="Other projects" sub="Hackathon builds, internship work and side projects." />
        <div className="projects-grid is-others">
          {others.map((p) => (
            <ProjectCard key={p.id} p={p} onOpen={onOpen} />
          ))}
        </div>
      </div>
    </section>
  )
}
