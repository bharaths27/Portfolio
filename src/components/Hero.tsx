import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'
import { PROFILE } from '../data/profile'
import { scrollTo } from '../hooks/useSmoothScroll'
import { paintGradient } from '../hooks/paintGradient'
import Magnetic from './Magnetic'
import { GithubIcon, LinkedinIcon, MailIcon } from './Icons'

gsap.registerPlugin(SplitText)

const HeroScene = lazy(() => import('../three/HeroScene'))

function hasWebGL() {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}

/* Types and deletes each role in turn. */
function useTyped(words: string[], run: boolean) {
  const [text, setText] = useState('')
  useEffect(() => {
    if (!run) return
    let w = 0
    let i = 0
    let deleting = false
    let t: number
    const step = () => {
      const word = words[w]
      i += deleting ? -1 : 1
      setText(word.slice(0, i))
      let delay = deleting ? 35 : 70
      if (!deleting && i === word.length) {
        deleting = true
        delay = 1800
      } else if (deleting && i === 0) {
        deleting = false
        w = (w + 1) % words.length
        delay = 300
      }
      t = window.setTimeout(step, delay)
    }
    t = window.setTimeout(step, 600)
    return () => clearTimeout(t)
  }, [words, run])
  return text
}

/* Only render the 3D scene's frames while the hero is on screen. */
function useOnScreen<T extends Element>(ref: React.RefObject<T | null>) {
  const [on, setOn] = useState(true)
  useEffect(() => {
    if (!ref.current) return
    const io = new IntersectionObserver(([e]) => setOn(e.isIntersecting))
    io.observe(ref.current)
    return () => io.disconnect()
  }, [ref])
  return on
}

export default function Hero({ ready, reduced }: { ready: boolean; reduced: boolean }) {
  const root = useRef<HTMLElement>(null)
  const typed = useTyped(PROFILE.roles, ready)
  const onScreen = useOnScreen(root)
  const [webgl] = useState(hasWebGL)

  useGSAP(
    () => {
      if (reduced) return
      gsap.set('.hero-anim', { opacity: 0, y: 24 })
      if (!ready) {
        gsap.set('.hero-name', { opacity: 0 })
        gsap.set('.hero-visual', { opacity: 0, scale: 0.92 })
        return
      }
      const split = SplitText.create('.hero-name .line', { type: 'chars', mask: 'chars' })
      paintGradient(split.chars)
      gsap.set('.hero-name', { opacity: 1 })
      gsap
        .timeline({ delay: 0.1 })
        .to('.hero-visual', { opacity: 1, scale: 1, duration: 1.2, ease: 'expo.out' }, 0)
        .from(split.chars, { yPercent: 120, duration: 1.1, ease: 'expo.out', stagger: 0.03 }, 0.1)
        .to('.hero-anim', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.07 }, 0.5)
      return () => split.revert()
    },
    { scope: root, dependencies: [ready, reduced] },
  )

  return (
    <header className="hero" id="home" ref={root}>
      <div className="container hero-inner">
        <div className="hero-copy">
          <div className="hero-badges hero-anim">
            <span className="pill">
              <span className="pulse" /> {PROFILE.status}
            </span>
            <span className="pill pill-quiet">✓ {PROFILE.auth}</span>
          </div>
          <h1 className="hero-name">
            <span className="line">{PROFILE.first}</span>
            <span className="line grad-text">{PROFILE.last}</span>
          </h1>
          <div className="hero-role mono hero-anim" aria-label={PROFILE.roles.join(', ')}>
            <span className="prompt">~/bharath $</span> <span>{reduced ? PROFILE.roles[0] : typed}</span>
            <span className="caret" />
          </div>
          <p className="hero-desc hero-anim">
            Computer Engineering student at <strong className="c-bu">Boston University</strong> working where <strong>AI</strong> meets{' '}
            <strong>cybersecurity</strong>. I am an R&amp;D Cybersecurity Consultant at <strong className="c-gptfy">GPTfy</strong>, and I run{' '}
            <strong>Boundline</strong>, my security review business for AI agents and MCP servers.
          </p>
          <div className="hero-actions hero-anim">
            <Magnetic>
              <a
                href="#experience"
                className="btn btn-primary"
                onClick={(e) => {
                  e.preventDefault()
                  scrollTo('#experience')
                }}
              >
                See my experience <span aria-hidden="true">↓</span>
              </a>
            </Magnetic>
            <Magnetic>
              <a href={PROFILE.resume} target="_blank" rel="noopener" className="btn btn-ghost">
                Download résumé
              </a>
            </Magnetic>
          </div>
          <div className="hero-socials hero-anim">
            <a href={PROFILE.github} target="_blank" rel="noopener" aria-label="GitHub">
              <GithubIcon />
            </a>
            <a href={PROFILE.linkedin} target="_blank" rel="noopener" aria-label="LinkedIn">
              <LinkedinIcon />
            </a>
            <a href={`mailto:${PROFILE.email}`} aria-label="Email">
              <MailIcon />
            </a>
            <span className="hero-loc mono">📍 {PROFILE.location}</span>
          </div>
        </div>

        <div className="hero-visual" aria-label="Photo of Bharath inside an animated neural network and security shield">
          {webgl && (
            <div className="hero-scene" aria-hidden="true">
              <Suspense fallback={null}>
                <HeroScene reduced={reduced} active={onScreen} />
              </Suspense>
            </div>
          )}
          <div className="hero-photo">
            <img src={PROFILE.photo} alt="Bharath Srividhya" />
          </div>
          <div className="hero-legend mono" aria-hidden="true">
            <span>
              <i className="dot dot-safe" /> trusted data
            </span>
            <span>
              <i className="dot dot-bad" /> blocked threat
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}
