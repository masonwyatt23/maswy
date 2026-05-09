import { useEffect, useRef, useState } from 'react'
import { heroPoster, heroVideo } from '../data/profile'
import { clamp } from '../lib/useSectionProgress'

const mobileFrameCount = 241
const getMobileFrame = (index: number) => `/media/hero-frames/frame-${String(index + 1).padStart(3, '0')}.jpg`
const preloadedMobileFrames = new Set<number>()
const loadedMobileFrames = new Set<number>()
const mobileFrameWaiters = new Map<number, Set<() => void>>()
let mobileFrameCacheStarted = false

export function SiteBackdrop() {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const frameRef = useRef<number | null>(null)
  const videoPaintRef = useRef<number | null>(null)
  const targetProgressRef = useRef(0)
  const currentProgressRef = useRef(0)
  const lastSeekTimeRef = useRef(-1)
  const lastMobileFrameRef = useRef(-1)
  const displayedMobileFrameRef = useRef(0)
  const [metadataReady, setMetadataReady] = useState(false)
  const [mobileFrame, setMobileFrame] = useState(0)
  const [pendingMobileFrame, setPendingMobileFrame] = useState<number | null>(null)

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
    const progressEase = finePointer ? 0.24 : 0.34

    const seekTo = (time: number, force = false) => {
      const clampedTime = Math.min(video.duration, Math.max(0, time))
      const progress = video.duration > 0 ? clamp(clampedTime / video.duration) : 0
      const mobileFrameIndex = Math.min(mobileFrameCount - 1, Math.round(progress * (mobileFrameCount - 1)))

      if (useMobileFrames && (force || mobileFrameIndex !== lastMobileFrameRef.current)) {
        lastMobileFrameRef.current = mobileFrameIndex
        requestMobileFrame(mobileFrameIndex, () => {
          if (lastMobileFrameRef.current === mobileFrameIndex && displayedMobileFrameRef.current !== mobileFrameIndex) {
            setPendingMobileFrame(mobileFrameIndex)
          }
        })
        preloadMobileFrames(mobileFrameIndex, targetProgressRef.current >= currentProgressRef.current ? 1 : -1)
        warmMobileFrameCache(mobileFrameIndex)
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
      const nextProgress = currentProgressRef.current + delta * progressEase
      currentProgressRef.current = nextProgress
      seekTo(nextProgress * video.duration)

      if (Math.abs(delta) > 0.0008) {
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

  const commitPendingMobileFrame = () => {
    if (pendingMobileFrame === null) return

    displayedMobileFrameRef.current = pendingMobileFrame
    setMobileFrame(pendingMobileFrame)
    setPendingMobileFrame(null)
  }

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
        decoding="async"
        fetchPriority="high"
      />
      {pendingMobileFrame !== null && pendingMobileFrame !== mobileFrame ? (
        <img
          className="site-backdrop-mobile-frame site-backdrop-mobile-frame-buffer"
          src={getMobileFrame(pendingMobileFrame)}
          alt=""
          decoding="async"
          onLoad={commitPendingMobileFrame}
        />
      ) : null}
      <div className="site-backdrop-shade" />
      <div className="site-backdrop-grid" />
      <div className="scanlines" />
    </div>
  )
}

function preloadMobileFrames(index: number, direction = 1) {
  if (typeof window === 'undefined') return

  const nearbyIndexes = [
    index,
    index + direction,
    index + direction * 2,
    index + direction * 3,
    index + direction * 4,
    index + direction * 5,
    index - direction,
    index - direction * 2,
    index - direction * 3,
  ]

  for (const nextIndex of nearbyIndexes) {
    if (nextIndex < 0 || nextIndex >= mobileFrameCount) continue
    requestMobileFrame(nextIndex)
  }
}

function warmMobileFrameCache(centerIndex: number) {
  if (typeof window === 'undefined' || mobileFrameCacheStarted) return

  mobileFrameCacheStarted = true

  const orderedIndexes = Array.from({ length: mobileFrameCount }, (_, index) => index).sort(
    (left, right) => Math.abs(left - centerIndex) - Math.abs(right - centerIndex),
  )

  const loadBatch = () => {
    for (let count = 0; count < 16 && orderedIndexes.length > 0; count += 1) {
      const nextIndex = orderedIndexes.shift()
      if (nextIndex === undefined) continue

      requestMobileFrame(nextIndex)
    }

    if (orderedIndexes.length > 0) {
      window.setTimeout(loadBatch, 45)
    }
  }

  window.setTimeout(loadBatch, 40)
}

function requestMobileFrame(index: number, onReady?: () => void) {
  if (typeof window === 'undefined') return
  if (index < 0 || index >= mobileFrameCount) return

  if (loadedMobileFrames.has(index)) {
    onReady?.()
    return
  }

  if (onReady) {
    const waiters = mobileFrameWaiters.get(index) ?? new Set<() => void>()
    waiters.add(onReady)
    mobileFrameWaiters.set(index, waiters)
  }

  if (preloadedMobileFrames.has(index)) return

  preloadedMobileFrames.add(index)
  const image = new Image()
  image.decoding = 'async'
  const markReady = () => {
    loadedMobileFrames.add(index)
    const waiters = mobileFrameWaiters.get(index)
    mobileFrameWaiters.delete(index)
    waiters?.forEach((waiter) => waiter())
  }
  image.onload = () => {
    image.decode().then(markReady).catch(markReady)
  }
  image.src = getMobileFrame(index)
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
