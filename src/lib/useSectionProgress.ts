import { useEffect, useRef, useState } from 'react'

export function clamp(value: number, min = 0, max = 1) {
  return Math.min(Math.max(value, min), max)
}

export function useSectionProgress<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)
  const frameRef = useRef<number | null>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const update = () => {
      if (frameRef.current !== null) return
      frameRef.current = requestAnimationFrame(() => {
        frameRef.current = null
        const node = ref.current
        if (!node) return
        const rect = node.getBoundingClientRect()
        const scrollable = Math.max(node.offsetHeight - window.innerHeight, 1)
        setProgress(clamp(-rect.top / scrollable))
      })
    }

    const updateNow = () => {
      const node = ref.current
      if (!node) return
      const rect = node.getBoundingClientRect()
      const scrollable = Math.max(node.offsetHeight - window.innerHeight, 1)
      setProgress(clamp(-rect.top / scrollable))
    }

    updateNow()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return [ref, progress] as const
}
