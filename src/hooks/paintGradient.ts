/* SplitText wraps each word or char in its own box, which breaks a parent's
   background-clip: text gradient. This re paints each piece with a slice of the
   gradient sized to its .grad ancestor so the gradient still reads as one sweep. */
export function paintGradient(pieces: Element[]) {
  pieces.forEach((el) => {
    const host = el.parentElement?.closest<HTMLElement>('.grad, .grad-text')
    if (!host) return
    const h = host.getBoundingClientRect()
    // Measure the mask wrapper when there is one: the piece itself may be mid animation.
    const box = el.parentElement && el.parentElement !== host ? el.parentElement : el
    const r = box.getBoundingClientRect()
    const s = (el as HTMLElement).style
    s.backgroundImage = 'var(--grad)'
    s.backgroundSize = `${h.width}px ${h.height}px`
    s.backgroundPosition = `${h.left - r.left}px ${h.top - r.top}px`
    s.setProperty('-webkit-background-clip', 'text')
    s.backgroundClip = 'text'
    s.color = 'transparent'
  })
}
