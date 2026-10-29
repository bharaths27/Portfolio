import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { MARQUEE } from '../data/profile'
import { scrollState } from '../hooks/scrollState'

/* Two rows of tech that loop in opposite directions and speed up with scroll velocity. */
export default function Marquee({ reduced }: { reduced: boolean }) {
  const rows = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (reduced) return
    const state = rows.current.map(() => ({ x: 0 }))
    const tick = (_t: number, dt: number) => {
      const boost = 1 + Math.min(Math.abs(scrollState.velocity) * 0.25, 8)
      rows.current.forEach((row, i) => {
        if (!row) return
        const half = row.scrollWidth / 2
        const dir = i % 2 === 0 ? -1 : 1
        state[i].x += dir * 0.04 * dt * boost
        if (state[i].x <= -half) state[i].x += half
        if (state[i].x >= 0) state[i].x -= half
        row.style.transform = `translate3d(${state[i].x}px,0,0)`
      })
    }
    // Start the reverse row offset so both directions wrap cleanly.
    if (rows.current[1]) state[1].x = -rows.current[1].scrollWidth / 2
    gsap.ticker.add(tick)
    return () => gsap.ticker.remove(tick)
  }, [reduced])

  const half = Math.ceil(MARQUEE.length / 2)
  const lines = [MARQUEE.slice(0, half), MARQUEE.slice(half)]

  return (
    <section className="marquee" aria-label="Technologies I use">
      {lines.map((items, i) => (
        <div className={`marquee-row ${i ? 'is-outline' : ''}`} key={i}>
          <div className="marquee-track" ref={(el) => void (rows.current[i] = el)}>
            {[...items, ...items].map((t, j) => (
              <span key={j} className="marquee-item">
                {t}
                <span className="marquee-sep">✦</span>
              </span>
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}
