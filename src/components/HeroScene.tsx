import { profile } from '../data/profile'
import { useSectionProgress } from '../lib/useSectionProgress'
import { PronunciationChip } from './PronunciationChip'
import { SocialLink } from './SocialLink'

const memeBeats = [
  {
    quote: 'The only thing we have to fear is fear itself.',
    person: 'Franklin D. Roosevelt',
    source: 'FDR',
    image: '/media/quotes/fdr.jpg',
  },
  {
    quote: 'Ask not what your country can do for you.',
    person: 'John F. Kennedy',
    source: 'JFK',
    image: '/media/quotes/jfk.jpg',
  },
  {
    quote: 'Speak softly and carry a big stick.',
    person: 'Theodore Roosevelt',
    source: 'Teddy Roosevelt',
    image: '/media/quotes/teddy.jpg',
  },
  {
    quote: 'Those who deny freedom to others deserve it not for themselves.',
    person: 'Abraham Lincoln',
    source: 'Lincoln',
    image: '/media/quotes/lincoln.jpg',
  },
  {
    quote: 'We are the change that we seek.',
    person: 'Barack Obama',
    source: 'Obama',
    image: '/media/quotes/obama.jpg',
  },
  {
    quote: 'I am the greatest.',
    person: 'Muhammad Ali',
    source: 'Ali',
    image: '/media/quotes/ali.jpg',
  },
  {
    quote: "I'm just here so I won't get fined.",
    person: 'Marshawn Lynch',
    source: 'Marshawn',
    image: '/media/quotes/marshawn.jpg',
  },
  {
    quote: 'We talking about practice.',
    person: 'Allen Iverson',
    source: 'Iverson',
    image: '/media/quotes/iverson.jpg',
  },
  {
    quote: 'I am not a role model.',
    person: 'Charles Barkley',
    source: 'Barkley',
    image: '/media/quotes/barkley.jpg',
  },
  {
    quote: "Job's not finished.",
    person: 'Kobe Bryant',
    source: 'Kobe',
    image: '/media/quotes/kobe.jpg',
  },
  {
    quote: 'Can you dig it?',
    person: "Shaquille O'Neal",
    source: 'Shaq',
    image: '/media/quotes/shaq.jpg',
  },
  {
    quote: 'The dawgs are in the building.',
    person: 'Shane Gillis',
    source: 'Shane Gillis',
    image: '/media/quotes/gillis.jpg',
  },
]

const beatRanges = [
  [0.06, 0.16],
  [0.14, 0.24],
  [0.22, 0.32],
  [0.3, 0.4],
  [0.38, 0.48],
  [0.46, 0.56],
  [0.54, 0.64],
  [0.62, 0.72],
  [0.7, 0.8],
  [0.78, 0.88],
  [0.86, 0.96],
  [0.92, 1],
]

export function HeroScene() {
  const [sectionRef, progress] = useSectionProgress<HTMLElement>()
  const heroStage = Math.round(progress * 100)
  const getBeatStyle = (index: number) => {
    const [start, end] = beatRanges[index]
    const fade = 0.055
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
          <span>BUILD LOG</span>
        </div>

        <div className="hero-copy">
          <p className="kicker">builder. founder. products.</p>
          <h1>{profile.alias}.com</h1>
          <PronunciationChip
            display={profile.pronunciation.display}
            speech={profile.pronunciation.speech}
            label={profile.pronunciation.label}
          />
          <p>
            {profile.name} builds web products, tools, and experiments. Founder of{' '}
            <a href={profile.links.ashlr} target="_blank" rel="noopener noreferrer">
              {profile.company}
            </a>
            . This is the index.
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
          <span>scroll the video</span>
          <strong>then the work</strong>
        </div>

        <div className="hero-meme-beats" aria-label="Scroll memes">
          {memeBeats.map((beat, index) => (
            <article
              className="hero-meme-card"
              style={getBeatStyle(index)}
              key={beat.quote}
            >
              <img src={beat.image} alt="" loading="lazy" />
              <div>
                <p>{beat.source}</p>
                <h2>"{beat.quote}" - {beat.person}</h2>
              </div>
            </article>
          ))}
        </div>

        <div className="hero-meme-rail" aria-hidden="true">
          <span>video: {heroStage}%</span>
          <span>quotes while you scroll</span>
          <span>projects below</span>
          <span>name pronunciation included</span>
        </div>
      </div>
    </section>
  )
}
