import { useEffect, useRef, useState } from 'react'
import { heroPoster, heroVideo } from '../data/profile'
import { clamp } from '../lib/useSectionProgress'

export function SiteBackdrop() {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const frameRef = useRef<number | null>(null)
  const frameKindRef = useRef<'animation' | 'video' | null>(null)
  const targetProgressRef = useRef(0)
  const currentProgressRef = useRef(0)
  const lastSeekTimeRef = useRef(-1)
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

    const minSeekDelta = 1 / 48

    const getScrollProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      return clamp(scrollable > 0 ? window.scrollY / scrollable : 0)
    }

    const seekTo = (time: number, force = false) => {
      const clampedTime = Math.min(video.duration, Math.max(0, time))
      if (!force && Math.abs(clampedTime - lastSeekTimeRef.current) < minSeekDelta) return false

      video.currentTime = clampedTime
      lastSeekTimeRef.current = clampedTime
      return true
    }

    const cancelScheduledScrub = () => {
      if (frameRef.current === null) return

      if (frameKindRef.current === 'video') {
        video.cancelVideoFrameCallback(frameRef.current)
      } else {
        cancelAnimationFrame(frameRef.current)
      }

      frameRef.current = null
      frameKindRef.current = null
    }

    const scheduleScrub = (preferVideoFrame = false) => {
      if (frameRef.current !== null) return

      if (preferVideoFrame && 'requestVideoFrameCallback' in video) {
        frameKindRef.current = 'video'
        frameRef.current = video.requestVideoFrameCallback(animateScrub)
        return
      }

      frameKindRef.current = 'animation'
      frameRef.current = requestAnimationFrame(animateScrub)
    }

    const updateTarget = () => {
      targetProgressRef.current = getScrollProgress()
      scheduleScrub()
    }

    const animateScrub = () => {
      frameRef.current = null
      frameKindRef.current = null

      const delta = targetProgressRef.current - currentProgressRef.current
      const nextProgress = currentProgressRef.current + delta * 0.18
      currentProgressRef.current = nextProgress
      const didSeek = seekTo(nextProgress * video.duration)

      if (Math.abs(delta) > 0.001) {
        scheduleScrub(didSeek)
      } else {
        currentProgressRef.current = targetProgressRef.current
        seekTo(currentProgressRef.current * video.duration, true)
      }
    }

    const initialProgress = getScrollProgress()
    targetProgressRef.current = initialProgress
    currentProgressRef.current = initialProgress
    seekTo(initialProgress * video.duration, true)

    window.addEventListener('scroll', updateTarget, { passive: true })
    window.addEventListener('resize', updateTarget)

    return () => {
      window.removeEventListener('scroll', updateTarget)
      window.removeEventListener('resize', updateTarget)
      cancelScheduledScrub()
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
