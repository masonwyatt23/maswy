import { useEffect, useRef, useState } from 'react'
import { heroPoster, heroVideo } from '../data/profile'
import { clamp } from '../lib/useSectionProgress'

export function SiteBackdrop() {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const frameRef = useRef<number | null>(null)
  const targetProgressRef = useRef(0)
  const currentProgressRef = useRef(0)
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

    const updateTarget = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      targetProgressRef.current = clamp(scrollable > 0 ? window.scrollY / scrollable : 0)
      if (frameRef.current !== null) return
      frameRef.current = requestAnimationFrame(animateScrub)
    }

    const animateScrub = () => {
      const delta = targetProgressRef.current - currentProgressRef.current
      currentProgressRef.current += delta * 0.12
      video.currentTime = currentProgressRef.current * video.duration

      if (Math.abs(delta) > 0.001) {
        frameRef.current = requestAnimationFrame(animateScrub)
      } else {
        currentProgressRef.current = targetProgressRef.current
        video.currentTime = currentProgressRef.current * video.duration
        frameRef.current = null
      }
    }

    updateTarget()
    window.addEventListener('scroll', updateTarget, { passive: true })
    window.addEventListener('resize', updateTarget)

    return () => {
      window.removeEventListener('scroll', updateTarget)
      window.removeEventListener('resize', updateTarget)
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
