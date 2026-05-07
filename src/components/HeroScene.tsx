import { useEffect, useRef, useState } from 'react'
import { heroPoster, heroVideo, profile } from '../data/profile'
import { clamp, useSectionProgress } from '../lib/useSectionProgress'
import { SocialLink } from './SocialLink'

export function HeroScene() {
  const [sectionRef, progress] = useSectionProgress<HTMLElement>()
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [metadataReady, setMetadataReady] = useState(false)
  const heroStage = Math.round(progress * 100)
  const tilt = progress * 18 - 6

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
    video.currentTime = clamp(progress) * video.duration
  }, [progress, metadataReady])

  return (
    <section ref={sectionRef} className="hero-section" aria-label="maswy profile intro">
      <div className="scanlines" aria-hidden="true" />
      <div className="hero-chrome" aria-hidden="true">
        <span>MASWY_OS</span>
        <span>1998/2026</span>
        <span>FOUNDER MODE</span>
      </div>
      <div className="hero-media" style={{ '--scroll': progress } as React.CSSProperties}>
        <div className="video-slot">
          <div className="slot-label">
            <span>scroll scrub hero</span>
            <span>{heroStage}%</span>
          </div>
          <video
            ref={videoRef}
            className="hero-video"
            src={heroVideo}
            poster={heroPoster}
            muted
            playsInline
            preload="metadata"
            aria-label="Psychedelic maswy hero montage"
          />
          <div className="video-badge" style={{ transform: `rotate(${tilt}deg)` }}>
            <span>maswy signal</span>
            <strong>{profile.alias}</strong>
            <small>scroll to scrub the founder cinematic</small>
          </div>
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="progress-rail">
            <span style={{ width: `${heroStage}%` }} />
          </div>
        </div>
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
    </section>
  )
}
