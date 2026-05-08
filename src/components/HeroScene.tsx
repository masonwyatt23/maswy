import { profile } from '../data/profile'
import { useSectionProgress } from '../lib/useSectionProgress'
import { PronunciationChip } from './PronunciationChip'
import { SocialLink } from './SocialLink'

const memeBeats = [
  {
    eyebrow: 'Yogi Berra',
    title: "It ain't over till it's over.",
    body: 'Baseball logic. Product roadmap logic. Scrolling through this page logic.',
    stat: 'classic',
  },
  {
    eyebrow: 'Muhammad Ali',
    title: 'I am the greatest.',
    body: 'An acceptable amount of confidence when the hero video has this much budget.',
    stat: 'float',
  },
  {
    eyebrow: 'Steve Jobs',
    title: 'Stay hungry. Stay foolish.',
    body: 'Also: stay hydrated. This page is doing a lot.',
    stat: 'garage energy',
  },
  {
    eyebrow: 'Oscar Wilde',
    title: 'I can resist everything except temptation.',
    body: 'The temptation, unfortunately, was adding a cinematic scroll sequence.',
    stat: 'valid',
  },
  {
    eyebrow: 'Mark Twain',
    title: 'The report of my death was an exaggeration.',
    body: 'Useful when someone says personal websites are dead.',
    stat: 'still posting',
  },
  {
    eyebrow: 'Neil Armstrong',
    title: 'One small step for man, one giant leap for mankind.',
    body: 'One tiny scroll for you. One dramatic robe reveal for the internet.',
    stat: 'moon logic',
  },
  {
    eyebrow: 'Theodore Roosevelt',
    title: 'Speak softly and carry a big stick; you will go far.',
    body: 'Modern translation: quiet taste, loud execution.',
    stat: 'big stick',
  },
]

const beatRanges = [
  [0.1, 0.2],
  [0.21, 0.31],
  [0.32, 0.42],
  [0.43, 0.53],
  [0.54, 0.64],
  [0.65, 0.76],
  [0.77, 0.91],
]

export function HeroScene() {
  const [sectionRef, progress] = useSectionProgress<HTMLElement>()
  const heroStage = Math.round(progress * 100)
  const getBeatStyle = (index: number) => {
    const [start, end] = beatRanges[index]
    const fade = 0.035
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
              <div>
                <p>{beat.eyebrow}</p>
                <h2>{beat.title}</h2>
                <span>{beat.body}</span>
              </div>
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
