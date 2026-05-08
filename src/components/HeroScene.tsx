import { profile } from '../data/profile'
import { useSectionProgress } from '../lib/useSectionProgress'
import { PronunciationChip } from './PronunciationChip'
import { SocialLink } from './SocialLink'

const memeBeats = [
  {
    eyebrow: '0.18x executive presence',
    title: 'The annual review is just a fog machine with equity paperwork.',
    body: 'A cloaked board member has entered the chat. Nobody knows the agenda. Everyone agrees the deck needs one more slide.',
    stat: 'synergy: cursed',
  },
  {
    eyebrow: '0.34x founder mode',
    title: 'He said "quick prototype" and the server grew lore.',
    body: 'Somewhere between deploy preview and production, the website became a cinematic universe with compliance concerns.',
    stat: 'scope creep: dressed formally',
  },
  {
    eyebrow: '0.52x internet artifact',
    title: 'The KPI is whether the robe looks disappointed in you.',
    body: 'If the video pauses here, that is not buffering. That is the masked investor silently reconsidering your burn rate.',
    stat: 'runway: emotionally complex',
  },
  {
    eyebrow: '0.70x due diligence',
    title: 'Every hallway is a funnel. Every funnel is haunted.',
    body: 'Marketing asked for authenticity. Product shipped a marble palace, one mysterious cape, and a pronunciation chip.',
    stat: 'CAC: cloak acquisition cost',
  },
  {
    eyebrow: '0.87x final boss energy',
    title: 'The exit strategy is walking dramatically toward the next section.',
    body: 'You have now watched enough cinema to legally call this a portfolio. Please proceed to the actual evidence.',
    stat: 'vibes: audited',
  },
]

const beatRanges = [
  [0.14, 0.28],
  [0.29, 0.43],
  [0.44, 0.58],
  [0.59, 0.73],
  [0.74, 0.91],
]

export function HeroScene() {
  const [sectionRef, progress] = useSectionProgress<HTMLElement>()
  const heroStage = Math.round(progress * 100)
  const getBeatStyle = (index: number) => {
    const [start, end] = beatRanges[index]
    const fade = 0.045
    const opacity = Math.max(0, Math.min((progress - start) / fade, (end - progress) / fade, 1))
    const shift = `${Math.max(-34, Math.min(18, (progress - start) * -52))}px`

    return {
      '--beat-opacity': opacity,
      '--beat-shift': shift,
    } as React.CSSProperties
  }

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

        <div className="hero-meme-beats" aria-label="Scroll memes">
          {memeBeats.map((beat, index) => (
            <article
              className="hero-meme-card"
              style={getBeatStyle(index)}
              key={beat.title}
            >
              <p>{beat.eyebrow}</p>
              <h2>{beat.title}</h2>
              <span>{beat.body}</span>
              <strong>{beat.stat}</strong>
            </article>
          ))}
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
