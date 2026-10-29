import { useEffect, useRef, type ReactNode } from 'react'
import { AnimatePresence, LazyMotion, domAnimation, m } from 'motion/react'
import { setScrollLocked } from '../hooks/useSmoothScroll'

export interface ModalContent {
  eyebrow: string
  title: string
  brand: string
  body: ReactNode
}

export default function Modal({ content, onClose }: { content: ModalContent | null; onClose: () => void }) {
  const closeBtn = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!content) return
    setScrollLocked(true)
    closeBtn.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      setScrollLocked(false)
      window.removeEventListener('keydown', onKey)
    }
  }, [content, onClose])

  return (
    <LazyMotion features={domAnimation} strict>
    <AnimatePresence>
      {content && (
        <m.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          <m.div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            style={{ ['--brand' as string]: `var(${content.brand})` }}
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.98 }}
            transition={{ type: 'spring', damping: 26, stiffness: 260 }}
            onClick={(e) => e.stopPropagation()}
            data-lenis-prevent
          >
            <div className="modal-header">
              <div>
                <div className="modal-eyebrow mono">{content.eyebrow}</div>
                <h2 id="modal-title">{content.title}</h2>
              </div>
              <button className="modal-close" ref={closeBtn} onClick={onClose} aria-label="Close">
                ×
              </button>
            </div>
            <div className="modal-body">{content.body}</div>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
    </LazyMotion>
  )
}
