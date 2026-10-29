import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'
import { PROFILE } from '../data/profile'
import { scrollTo } from '../hooks/useSmoothScroll'
import { paintGradient } from '../hooks/paintGradient'
import Magnetic from './Magnetic'
import { GithubIcon, LinkedinIcon, MailIcon } from './Icons'

gsap.registerPlugin(SplitText)

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

export default function Hero({ ready, reduced }: { ready: boolean; reduced: boolean }) {
  const root = useRef<HTMLElement>(null)
  const typed = useTyped(PROFILE.roles, ready)

  useGSAP(
    () => {
      if (reduced) return
      gsap.set('.hero-anim', { opacity: 0, y: 30 })
      if (!ready) {
        gsap.set('.hero-name', { opacity: 0 })
        return
      }
      const split = SplitText.create('.hero-name .line', { type: 'chars', mask: 'chars' })
      paintGradient(split.chars)
      gsap.set('.hero-name', { opacity: 1 })
      const tl = gsap.timeline({ delay: 0.15 })
      tl.from(split.chars, { yPercent: 120, rotate: 8, duration: 1.2, ease: 'expo.out', stagger: 0.035 })
        .to('.hero-anim', { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.08 }, '-=0.8')

      // Parallax the hero copy away as you scroll.
      gsap.to('.hero-copy', {
        yPercent: -18,
        opacity: 0.1,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      })
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
            Computer Engineering student at Boston University building where <strong className="c-cyan">AI</strong>,{' '}
            <strong className="c-violet">security</strong> and <strong className="c-orange">robotics</strong> meet. Right now I am an R&amp;D
            Cybersecurity Consultant at <strong>GPTfy</strong>, building a scanner that finds which weaknesses are actually exploitable.
          </p>
          <div className="hero-actions hero-anim">
            <Magnetic>
              <a
                href="#projects"
                className="btn btn-primary"
                onClick={(e) => {
                  e.preventDefault()
                  scrollTo('#projects')
                }}
              >
                See my work <span aria-hidden="true">↓</span>
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
      </div>
      <div className="scroll-cue hero-anim mono" aria-hidden="true">
        <span>scroll</span>
        <span className="scroll-cue-line" />
      </div>
    </header>
  )
}
