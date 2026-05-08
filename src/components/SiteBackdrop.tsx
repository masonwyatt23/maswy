import { useEffect, useRef, useState } from 'react'
import { heroPoster, heroVideo } from '../data/profile'
import { clamp } from '../lib/useSectionProgress'

const mobileFrameCount = 121
const getMobileFrame = (index: number) => `/media/hero-frames/frame-${String(index + 1).padStart(3, '0')}.jpg`

export function SiteBackdrop() {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const frameRef = useRef<number | null>(null)
  const videoPaintRef = useRef<number | null>(null)
  const targetProgressRef = useRef(0)
  const currentProgressRef = useRef(0)
  const lastSeekTimeRef = useRef(-1)
  const lastMobileFrameRef = useRef(-1)
  const [metadataReady, setMetadataReady] = useState(false)
  const [mobileFrame, setMobileFrame] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const shouldUseMobileFrames = () => window.matchMedia('(max-width: 760px)').matches || !window.matchMedia('(pointer: fine)').matches
    const updateMobileFrame = () => {
      if (!shouldUseMobileFrames()) return

      const frameIndex = Math.min(mobileFrameCount - 1, Math.round(getHeroScrollProgress() * (mobileFrameCount - 1)))
      if (frameIndex === lastMobileFrameRef.current) return

      lastMobileFrameRef.current = frameIndex
      setMobileFrame(frameIndex)
      preloadMobileFrames(frameIndex)
    }

    updateMobileFrame()
    window.addEventListener('scroll', updateMobileFrame, { passive: true })
    window.addEventListener('touchmove', updateMobileFrame, { passive: true })
    window.addEventListener('resize', updateMobileFrame)
    window.addEventListener('orientationchange', updateMobileFrame)
    window.visualViewport?.addEventListener('resize', updateMobileFrame)
    window.visualViewport?.addEventListener('scroll', updateMobileFrame)

    return () => {
      window.removeEventListener('scroll', updateMobileFrame)
      window.removeEventListener('touchmove', updateMobileFrame)
      window.removeEventListener('resize', updateMobileFrame)
      window.removeEventListener('orientationchange', updateMobileFrame)
      window.visualViewport?.removeEventListener('resize', updateMobileFrame)
      window.visualViewport?.removeEventListener('scroll', updateMobileFrame)
    }
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const markReady = () => {
      if (video.currentTime === 0 && Number.isFinite(video.duration) && video.duration > 0) {
        video.currentTime = 0.001
      }
      setMetadataReady(true)
    }
    if (video.readyState >= 1) markReady()
    video.addEventListener('loadedmetadata', markReady)
    return () => video.removeEventListener('loadedmetadata', markReady)
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !metadataReady) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!Number.isFinite(video.duration) || video.duration <= 0) return

    const minSeekDelta = 1 / 60
    const finePointer = window.matchMedia('(pointer: fine)').matches
    const mobileViewport = window.matchMedia('(max-width: 760px)').matches
    const useMobileFrames = mobileViewport || !finePointer
    const progressEase = finePointer ? 0.24 : 0.42

    const seekTo = (time: number, force = false) => {
      const clampedTime = Math.min(video.duration, Math.max(0, time))
      const progress = video.duration > 0 ? clamp(clampedTime / video.duration) : 0
      const mobileFrameIndex = Math.min(mobileFrameCount - 1, Math.round(progress * (mobileFrameCount - 1)))

      if (useMobileFrames && (force || mobileFrameIndex !== lastMobileFrameRef.current)) {
        lastMobileFrameRef.current = mobileFrameIndex
        setMobileFrame(mobileFrameIndex)
        preloadMobileFrames(mobileFrameIndex)
      }

      if (useMobileFrames) return true
      if (!force && Math.abs(clampedTime - lastSeekTimeRef.current) < minSeekDelta) return false

      video.currentTime = clampedTime
      lastSeekTimeRef.current = clampedTime

      if ('requestVideoFrameCallback' in video && videoPaintRef.current === null) {
        videoPaintRef.current = video.requestVideoFrameCallback(() => {
          videoPaintRef.current = null
        })
      }

      return true
    }

    const cancelScheduledScrub = () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current)
        frameRef.current = null
      }

      if (videoPaintRef.current !== null && 'cancelVideoFrameCallback' in video) {
        video.cancelVideoFrameCallback(videoPaintRef.current)
        videoPaintRef.current = null
      }
    }

    const scheduleScrub = () => {
      if (frameRef.current !== null) return
      frameRef.current = requestAnimationFrame(animateScrub)
    }

    const updateTarget = () => {
      targetProgressRef.current = getHeroScrollProgress()
      scheduleScrub()
    }

    const animateScrub = () => {
      frameRef.current = null

      const delta = targetProgressRef.current - currentProgressRef.current
      const nextProgress = useMobileFrames
        ? targetProgressRef.current
        : currentProgressRef.current + delta * progressEase
      currentProgressRef.current = nextProgress
      seekTo(nextProgress * video.duration)

      if (Math.abs(delta) > 0.001) {
        scheduleScrub()
      } else {
        currentProgressRef.current = targetProgressRef.current
        seekTo(currentProgressRef.current * video.duration, true)
      }
    }

    const initialProgress = getHeroScrollProgress()
    targetProgressRef.current = initialProgress
    currentProgressRef.current = initialProgress
    seekTo(initialProgress * video.duration, true)

    window.addEventListener('scroll', updateTarget, { passive: true })
    window.addEventListener('touchmove', updateTarget, { passive: true })
    window.addEventListener('resize', updateTarget)
    window.addEventListener('orientationchange', updateTarget)
    window.visualViewport?.addEventListener('resize', updateTarget)
    window.visualViewport?.addEventListener('scroll', updateTarget)

    return () => {
      window.removeEventListener('scroll', updateTarget)
      window.removeEventListener('touchmove', updateTarget)
      window.removeEventListener('resize', updateTarget)
      window.removeEventListener('orientationchange', updateTarget)
      window.visualViewport?.removeEventListener('resize', updateTarget)
      window.visualViewport?.removeEventListener('scroll', updateTarget)
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
      <img
        className="site-backdrop-mobile-frame"
        src={getMobileFrame(mobileFrame)}
        alt=""
        decoding="sync"
        fetchPriority="high"
      />
      <div className="site-backdrop-shade" />
      <div className="site-backdrop-grid" />
      <div className="scanlines" />
    </div>
  )
}

function preloadMobileFrames(index: number) {
  if (typeof window === 'undefined') return

  for (const nextIndex of [index + 1, index + 2, index - 1]) {
    if (nextIndex < 0 || nextIndex >= mobileFrameCount) continue
    const image = new Image()
    image.src = getMobileFrame(nextIndex)
  }
}

function getHeroScrollProgress() {
  const hero = document.querySelector<HTMLElement>('.hero-section')
  if (hero) {
    const rect = hero.getBoundingClientRect()
    const scrollable = rect.height - window.innerHeight
    return clamp(scrollable > 0 ? -rect.top / scrollable : 0)
  }

  const scroller = document.scrollingElement ?? document.documentElement
  const scrollable = scroller.scrollHeight - window.innerHeight

  return clamp(scrollable > 0 ? scroller.scrollTop / scrollable : 0)
}
