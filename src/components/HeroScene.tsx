import { useEffect, useRef, useState } from 'react'
import { heroPoster, heroVideo, profile } from '../data/profile'
import { clamp, useSectionProgress } from '../lib/useSectionProgress'
import { SocialLink } from './SocialLink'

export function HeroScene() {
  const [sectionRef, progress] = useSectionProgress<HTMLElement>()
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const frameRef = useRef<number | null>(null)
  const [metadataReady, setMetadataReady] = useState(false)
  const heroStage = Math.round(progress * 100)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const markReady = () => setMetadataReady(true)
    if (video.readyState >= 1) markReady()
    video.addEventListener('loadedmetadata', markReady)
    return () => video.removeEventListener('loadedmetadata', markReady)
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !metadataReady) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!Number.isFinite(video.duration) || video.duration <= 0) return

    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
    frameRef.current = requestAnimationFrame(() => {
      video.currentTime = clamp(progress) * video.duration
      frameRef.current = null
    })

    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current)
        frameRef.current = null
      }
    }
  }, [progress, metadataReady])

  return (
    <section
      ref={sectionRef}
      className="hero-section"
      style={{ '--scroll': progress } as React.CSSProperties}
      aria-label="maswy profile intro"
    >
      <div className="hero-sticky">
        <div className="hero-backdrop" aria-hidden="true">
          <video
            ref={videoRef}
            className="hero-video"
            src={heroVideo}
            poster={heroPoster}
            muted
            playsInline
            preload="auto"
            aria-label="Psychedelic maswy hero montage"
          />
          <div className="hero-video-shade" />
          <div className="hero-grid" />
          <div className="scanlines" />
        </div>

        <div className="hero-chrome" aria-hidden="true">
          <span>MASWY_OS</span>
          <span>1998/2026</span>
          <span>FOUNDER MODE</span>
        </div>

        <div className="hero-copy">
          <p className="kicker">founder. builder. internet side quest.</p>
          <h1>{profile.alias}.com</h1>
          <p>
            A suspiciously serious personal site for {profile.name}, founder of{' '}
            <a href={profile.links.ashlr} target="_blank" rel="noopener noreferrer">
              {profile.company}
            </a>
            . Part portfolio, part arcade cabinet, part questionable executive decision.
          </p>
          <div className="hero-actions" aria-label="Profile links">
            <SocialLink href={profile.links.linkedin} label="LinkedIn" textIcon="in" />
            <SocialLink href={profile.links.github} label="GitHub" textIcon="gh" />
            <SocialLink href={profile.links.substack} label="Substack" textIcon="ss" />
            <SocialLink href={profile.links.instagram} label="Instagram" textIcon="ig" />
            <SocialLink href={profile.links.x} label="X" textIcon="X" />
          </div>
        </div>

        <div className="hero-meme-rail" aria-hidden="true">
          <span>founder cinematic loading: {heroStage}%</span>
          <span>board meeting? side quest.</span>
          <span>portfolio got a little dramatic</span>
        </div>
      </div>
    </section>
  )
}
