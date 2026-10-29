import { useCallback, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from './hooks/useReducedMotion'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import Preloader from './components/Preloader'
import Cursor from './components/Cursor'
import ScrollProgress from './components/ScrollProgress'
import SectionRail from './components/SectionRail'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Modal, { type ModalContent } from './components/Modal'

export default function App() {
  const reduced = useReducedMotion()
  useSmoothScroll(reduced)
  const [ready, setReady] = useState(reduced)
  const [modal, setModal] = useState<ModalContent | null>(null)

  const open = useCallback((m: ModalContent) => setModal(m), [])
  const close = useCallback(() => setModal(null), [])

  // Gentle scroll reveal for anything marked .reveal, batched for performance.
  useEffect(() => {
    if (!ready) return
    if (reduced) {
      gsap.set('.reveal', { opacity: 1, y: 0 })
      return
    }
    const triggers = ScrollTrigger.batch('.reveal', {
      start: 'top 90%',
      once: true,
      onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.06 }),
    })
    ScrollTrigger.refresh()
    return () => triggers.forEach((t) => t.kill())
  }, [ready, reduced])

  return (
    <>
      {!reduced && <Preloader onDone={() => setReady(true)} />}
      <div className="page-bg" aria-hidden="true" />
      {!reduced && <Cursor />}
      <ScrollProgress />
      <Nav />
      <SectionRail />
      <main>
        <Hero ready={ready} reduced={reduced} />
        <About ready={ready} />
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
