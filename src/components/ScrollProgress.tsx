import { useEffect, useRef } from 'react'
import { scrollState } from '../hooks/scrollState'

export default function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null)
  useEffect(() => {
    let id = 0
    const scene = document.querySelector<HTMLElement>('.scene-wrap')
    const loop = () => {
      if (bar.current) bar.current.style.transform = `scaleX(${scrollState.page})`
      // Dim the 3D background once you leave the hero so text stays readable.
      if (scene) scene.style.opacity = String(1 - scrollState.hero * 0.55)
      id = requestAnimationFrame(loop)
    }
    loop()
    return () => cancelAnimationFrame(id)
  }, [])
  return <div className="scroll-progress" ref={bar} aria-hidden="true" />
}
