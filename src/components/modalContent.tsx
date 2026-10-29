import type { Experience } from '../data/experience'
import type { Project } from '../data/projects'
import type { ModalContent } from './Modal'
import { GithubIcon, LinkIcon, PlayIcon } from './Icons'

export function MetricPills({ metrics }: { metrics?: { v: string; l: string }[] }) {
  if (!metrics?.length) return null
  return (
    <div className="metrics">
      {metrics.map((m) => (
        <div className="metric" key={m.l}>
          <span className="metric-v">{m.v}</span>
          <span className="metric-l">{m.l}</span>
        </div>
      ))}
    </div>
  )
}

export function Chips({ items, max }: { items: string[]; max?: number }) {
  const shown = max ? items.slice(0, max) : items
  return (
    <div className="chips">
      {shown.map((t) => (
        <span className="chip" key={t}>
          {t}
        </span>
      ))}
      {max && items.length > max && <span className="chip chip-more">+{items.length - max}</span>}
    </div>
  )
}

export function ProjectLinks({ p, large }: { p: Project; large?: boolean }) {
  const cls = large ? 'btn btn-ghost btn-sm' : 'plink'
  const stop = (e: React.MouseEvent) => e.stopPropagation()
  return (
    <>
      {p.links.demo && (
        <a className={cls} href={p.links.demo} target="_blank" rel="noopener" onClick={stop}>
          <LinkIcon /> Live demo
        </a>
      )}
      {p.links.github && (
        <a className={cls} href={p.links.github} target="_blank" rel="noopener" onClick={stop}>
          <GithubIcon /> Code
        </a>
      )}
      {p.links.video && (
        <a className={cls} href={p.links.video} target="_blank" rel="noopener" onClick={stop}>
          <PlayIcon /> Video
        </a>
      )}
      {p.links.devpost && (
        <a className={cls} href={p.links.devpost} target="_blank" rel="noopener" onClick={stop}>
          <LinkIcon /> Devpost
        </a>
      )}
    </>
  )
}

export function experienceModal(e: Experience): ModalContent {
  return {
    eyebrow: `${e.company} · ${e.date}`,
    title: e.role,
    brand: e.brand,
    body: (
      <>
        <p className="m-meta">
          {e.type}
          {e.location && ` · 📍 ${e.location}`}
        </p>
        <p className="tagline mono">{e.tagline}</p>
        <h3>What I did</h3>
        <ul>
          {e.points.map((p, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: p }} />
          ))}
        </ul>
        {e.metrics && (
          <>
            <h3>Impact</h3>
            <MetricPills metrics={e.metrics} />
          </>
        )}
        {e.note && <p className="note">{e.note}</p>}
        <h3>Skills and tools</h3>
        <Chips items={e.tags} />
      </>
    ),
  }
}

export function youtubeId(url?: string) {
  return url?.match(/[?&]v=([\w-]{11})/)?.[1]
}

export function projectModal(p: Project, withVideo = false): ModalContent {
  const yt = youtubeId(p.links.video)
  return {
    eyebrow: `${p.category} · ${p.date}`,
    title: p.title,
    brand: p.brand,
    body: (
      <>
        {withVideo && yt && (
          <div className="video-frame">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${yt}?autoplay=1&rel=0`}
              title={`${p.title} demo video`}
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}
        {p.stats && <MetricPills metrics={p.stats} />}
        <div className="m-links">
          <ProjectLinks p={p} large />
        </div>
        <div className="m-rich" dangerouslySetInnerHTML={{ __html: p.body }} />
        {p.note && <p className="note">{p.note}</p>}
        <h3>Skills and tools</h3>
        <Chips items={p.skills} />
      </>
    ),
  }
}
