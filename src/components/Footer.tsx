import { scrollTo } from '../hooks/useSmoothScroll'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p className="muted small">
          © {new Date().getFullYear()} Bharath Srividhya · Built with React, Three.js, GSAP and Lenis.
        </p>
        <button className="footer-up mono" onClick={() => scrollTo(0)}>
          back to top ↑
        </button>
      </div>
    </footer>
  )
}
