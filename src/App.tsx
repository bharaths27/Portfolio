import { lazy, Suspense, useCallback, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from './hooks/useReducedMotion'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import Preloader from './components/Preloader'
import Cursor from './components/Cursor'
import ScrollProgress from './components/ScrollProgress'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import About from './components/About'
import NowBuilding from './components/NowBuilding'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Modal, { type ModalContent } from './components/Modal'

const HeroScene = lazy(() => import('./three/HeroScene'))

function hasWebGL() {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}

export default function App() {
  const reduced = useReducedMotion()
  useSmoothScroll(reduced)
  const [ready, setReady] = useState(reduced)
  const [modal, setModal] = useState<ModalContent | null>(null)
  const [webgl] = useState(hasWebGL)

  const open = useCallback((m: ModalContent) => setModal(m), [])
  const close = useCallback(() => setModal(null), [])

  // Generic scroll reveal for anything marked .reveal, batched for performance.
  useEffect(() => {
    if (!ready) return
    if (reduced) {
      gsap.set('.reveal', { opacity: 1, y: 0 })
      return
    }
    const triggers = ScrollTrigger.batch('.reveal', {
      start: 'top 88%',
      once: true,
      onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.08 }),
    })
    ScrollTrigger.refresh()
    return () => triggers.forEach((t) => t.kill())
  }, [ready, reduced])

  return (
    <>
      {!reduced && <Preloader onDone={() => setReady(true)} />}
      {webgl && (
        <div className="scene-wrap" aria-hidden="true">
          <Suspense fallback={null}>
            <HeroScene reduced={reduced} />
          </Suspense>
        </div>
      )}
      <div className="scene-fade" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      {!reduced && <Cursor />}
      <ScrollProgress />
      <Nav />
      <main>
        <Hero ready={ready} reduced={reduced} />
        <Marquee reduced={reduced} />
        <About ready={ready} />
        <NowBuilding onOpen={open} reduced={reduced} />
        <Experience onOpen={open} />
        <Projects onOpen={open} />
        <Skills />
        <Contact />
      </main>
      <Footer />
      <Modal content={modal} onClose={close} />
    </>
  )
}
