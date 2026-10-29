import { useState } from 'react'
import { PROFILE } from '../data/profile'
import Magnetic from './Magnetic'
import { GithubIcon, LinkedinIcon } from './Icons'

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${PROFILE.email}`
    }
  }

  return (
    <section className="section contact" id="contact">
      <div className="container contact-inner">
        <div className="section-eyebrow mono reveal" style={{ justifyContent: 'center' }}>
          <span className="eyebrow-idx">05</span>
          <span className="eyebrow-line" />
          get in touch
        </div>
        <h2 className="contact-title reveal">
          Let's build something <span className="grad">smart and secure.</span>
        </h2>
        <p className="contact-sub reveal">
          I am open to roles in AI, security and robotics. Whether you have a role, a project, or just want to talk shop, my inbox
          is open.
        </p>
        <div className="contact-actions reveal">
          <Magnetic>
            <a href={`mailto:${PROFILE.email}`} className="btn btn-primary btn-lg">
              Say hello →
            </a>
          </Magnetic>
          <button className="btn btn-ghost" onClick={copy} data-cursor={copied ? 'copied' : 'copy'}>
            {copied ? 'Copied ✓' : PROFILE.email}
          </button>
        </div>
        <div className="contact-socials reveal">
          <a href={PROFILE.linkedin} target="_blank" rel="noopener">
            <LinkedinIcon /> LinkedIn
          </a>
          <a href={PROFILE.github} target="_blank" rel="noopener">
            <GithubIcon /> GitHub
          </a>
          <a href={PROFILE.resume} target="_blank" rel="noopener">
            📄 Résumé
          </a>
        </div>
      </div>
    </section>
  )
}
