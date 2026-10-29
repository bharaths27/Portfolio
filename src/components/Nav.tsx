import { useEffect, useState } from 'react'
import { PROFILE } from '../data/profile'
import { scrollTo } from '../hooks/useSmoothScroll'

const LINKS = [
  { id: 'about', label: 'About' },
  { id: 'now', label: 'Now' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]

export default function Nav() {
  const [active, setActive] = useState('')
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    let last = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 30)
      setHidden(y > last && y > 400)
      last = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    LINKS.forEach((l) => {
      const el = document.getElementById(l.id)
      if (el) io.observe(el)
    })
    return () => {
      window.removeEventListener('scroll', onScroll)
      io.disconnect()
    }
  }, [])

  const go = (e: React.MouseEvent, id: string) => {
    e.preventDefault()
    setOpen(false)
    scrollTo(`#${id}`)
  }

  return (
    <nav className={`nav ${scrolled ? 'is-scrolled' : ''} ${hidden && !open ? 'is-hidden' : ''} ${open ? 'is-open' : ''}`}>
      <div className="container nav-inner">
        <a href="#home" className="nav-logo" onClick={(e) => go(e, 'home')} aria-label="Back to top">
          <span className="nav-logo-mark">BS</span>
          <span className="nav-logo-text">Bharath Srividhya</span>
        </a>
        <ul className="nav-links">
          {LINKS.map((l, i) => (
            <li key={l.id}>
              <a href={`#${l.id}`} className={active === l.id ? 'is-active' : ''} onClick={(e) => go(e, l.id)}>
                <span className="mono idx">0{i + 1}</span>
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a href={PROFILE.resume} target="_blank" rel="noopener" className="btn btn-ghost btn-sm">
              Résumé
            </a>
          </li>
        </ul>
        <button className="nav-toggle" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
          <span />
          <span />
        </button>
      </div>
    </nav>
  )
}
