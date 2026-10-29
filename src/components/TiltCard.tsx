import { useRef, type ReactNode, type HTMLAttributes } from 'react'

/* A card that tilts in 3D toward the pointer and tracks a spotlight position
   in --mx / --my (used by CSS for a glow). */
export default function TiltCard({ children, className = '', max = 8, ...rest }: { children: ReactNode; className?: string; max?: number } & HTMLAttributes<HTMLDivElement>) {
  const ref = useRef<HTMLDivElement>(null)

  const move = (e: React.PointerEvent) => {
    const el = ref.current
    if (!el || e.pointerType !== 'mouse') return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    el.style.setProperty('--mx', `${px * 100}%`)
    el.style.setProperty('--my', `${py * 100}%`)
    el.style.transform = `perspective(900px) rotateX(${(0.5 - py) * max}deg) rotateY(${(px - 0.5) * max}deg)`
  }
  const leave = () => {
    if (ref.current) ref.current.style.transform = ''
  }

  return (
    <div ref={ref} className={`tilt ${className}`} onPointerMove={move} onPointerLeave={leave} {...rest}>
      {children}
    </div>
  )
}
