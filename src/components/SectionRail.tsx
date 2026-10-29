import { useEffect, useState } from 'react'
import { scrollTo } from '../hooks/useSmoothScroll'

export const SECTIONS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]

/* A fixed rail on the right that shows where you are on the page and jumps between sections. */
export default function SectionRail() {
  const [active, setActive] = useState('home')

  useEffect(() => {
    const io = new IntersectionObserver((entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)), {
      rootMargin: '-45% 0px -50% 0px',
    })
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  return (
    <nav className="rail" aria-label="Page sections">
      {SECTIONS.map((s, i) => (
        <button key={s.id} className={`rail-item ${active === s.id ? 'is-active' : ''}`} onClick={() => scrollTo(s.id === 'home' ? 0 : `#${s.id}`)}>
          <span className="rail-label">
            <span className="mono">0{i}</span> {s.label}
          </span>
          <span className="rail-dot" />
        </button>
      ))}
    </nav>
  )
}
