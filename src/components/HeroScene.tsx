import { profile } from '../data/profile'
import { useSectionProgress } from '../lib/useSectionProgress'
import { PronunciationChip } from './PronunciationChip'
import { SocialLink } from './SocialLink'

const memeBeats = [
  {
    eyebrow: '2015',
    title: 'Hotline Bling',
    body: 'Drakeposting, but the rejected option is pretending portfolio sites should be normal.',
    stat: 'less corporate',
    image: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Drake_-_Hotline_Bling.png?width=640',
    alt: 'Hotline Bling cover art',
    credit: 'Public domain text logo',
  },
  {
    eyebrow: '1951',
    title: 'Einstein Said Relax',
    body: 'Peak genius energy is taking the work seriously and absolutely nothing else.',
    stat: 'big brain, unserious face',
    image: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Albert_Einstein_sticks_his_tongue.jpg?width=640',
    alt: 'Albert Einstein sticking out his tongue',
    credit: 'Arthur Sasse / Commons',
  },
  {
    eyebrow: '2012',
    title: 'Grumpy Cat Approves',
    body: 'The official review: not terrible. Historically, that is a standing ovation.',
    stat: 'ship it',
    image: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Grumpy_Cat_(14534417224).jpg?width=640',
    alt: 'Grumpy Cat at VidCon',
    credit: 'Gage Skidmore / CC BY-SA',
  },
  {
    eyebrow: '1969',
    title: 'One Small Step',
    body: 'One giant leap for clicking a personal website and somehow landing in a sci-fi hallway.',
    stat: 'moonwalk the scroll',
    image: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Neil_Armstrong.jpg?width=640',
    alt: 'Neil Armstrong after the Apollo 11 moonwalk',
    credit: 'NASA / public domain',
  },
  {
    eyebrow: 'always',
    title: 'Facepalm Checkpoint',
    body: 'If this page had a product manager, this is where they would ask whether the cloak is in scope.',
    stat: 'it is now',
    image: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Facepalm.svg?width=640',
    alt: 'Facepalm illustration',
    credit: 'ShakataGaNai / CC BY-SA',
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
              <img src={beat.image} alt={beat.alt} loading="lazy" />
              <div>
                <p>{beat.eyebrow}</p>
                <h2>{beat.title}</h2>
                <span>{beat.body}</span>
                <small>{beat.credit}</small>
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
