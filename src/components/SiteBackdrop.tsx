import { useEffect, useRef, useState } from 'react'
import { heroPoster, heroVideo } from '../data/profile'
import { clamp } from '../lib/useSectionProgress'

export function SiteBackdrop() {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const frameRef = useRef<number | null>(null)
  const [metadataReady, setMetadataReady] = useState(false)

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

    const scrubVideo = () => {
      if (frameRef.current !== null) return
      frameRef.current = requestAnimationFrame(() => {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight
        const pageProgress = scrollable > 0 ? window.scrollY / scrollable : 0
        video.currentTime = clamp(pageProgress) * video.duration
        frameRef.current = null
      })
    }

    scrubVideo()
    window.addEventListener('scroll', scrubVideo, { passive: true })
    window.addEventListener('resize', scrubVideo)

    return () => {
      window.removeEventListener('scroll', scrubVideo)
      window.removeEventListener('resize', scrubVideo)
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current)
        frameRef.current = null
      }
    }
  }, [metadataReady])

  return (
    <div className="site-backdrop" aria-hidden="true">
      <video
        ref={videoRef}
        className="site-backdrop-video"
        src={heroVideo}
        poster={heroPoster}
        muted
        playsInline
        preload="auto"
      />
      <div className="site-backdrop-shade" />
      <div className="site-backdrop-grid" />
      <div className="scanlines" />
    </div>
  )
}
