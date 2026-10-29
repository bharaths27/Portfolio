import { useEffect, useRef } from 'react'
import { scrollState } from '../hooks/scrollState'

export default function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null)
  useEffect(() => {
    let id = 0
    const loop = () => {
      if (bar.current) bar.current.style.transform = `scaleX(${scrollState.page})`
      id = requestAnimationFrame(loop)
    }
    loop()
    return () => cancelAnimationFrame(id)
  }, [])
  return <div className="scroll-progress" ref={bar} aria-hidden="true" />
}
