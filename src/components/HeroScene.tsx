import { profile } from '../data/profile'
import { useSectionProgress } from '../lib/useSectionProgress'
import { PronunciationChip } from './PronunciationChip'
import { SocialLink } from './SocialLink'

export function HeroScene() {
  const [sectionRef, progress] = useSectionProgress<HTMLElement>()
  const heroStage = Math.round(progress * 100)

  return (
    <section
      ref={sectionRef}
      className="hero-section"
      style={{ '--scroll': progress } as React.CSSProperties}
      aria-label="maswy profile intro"
    >
      <div className="hero-sticky">
        <div className="hero-chrome" aria-hidden="true">
          <span>MASWY_OS</span>
          <span>1998/2026</span>
          <span>FOUNDER MODE</span>
        </div>

        <div className="hero-copy">
          <p className="kicker">founder. builder. internet side quest.</p>
          <h1>{profile.alias}.com</h1>
          <PronunciationChip
            display={profile.pronunciation.display}
            speech={profile.pronunciation.speech}
            label={profile.pronunciation.label}
          />
          <p>
            A suspiciously serious personal site for {profile.name}, founder of{' '}
            <a href={profile.links.ashlr} target="_blank" rel="noopener noreferrer">
              {profile.company}
            </a>
            . Part portfolio, part arcade cabinet, part questionable executive decision.
          </p>
          <div className="hero-actions" aria-label="Profile links">
            <SocialLink href={profile.links.linkedin} label="LinkedIn" />
            <SocialLink href={profile.links.github} label="GitHub" />
            <SocialLink href={profile.links.substack} label="Substack" />
            <SocialLink href={profile.links.instagram} label="Instagram" />
            <SocialLink href={profile.links.x} label="X" />
          </div>
        </div>

        <div className="hero-video-focus" aria-hidden="true">
          <span>scroll scrub cinematic</span>
          <strong>video gets the room now</strong>
        </div>

        <div className="hero-meme-rail" aria-hidden="true">
          <span>founder cinematic loading: {heroStage}%</span>
          <span>board meeting? side quest.</span>
          <span>portfolio got a little dramatic</span>
          <span>official pronunciation department</span>
        </div>
      </div>
    </section>
  )
}
