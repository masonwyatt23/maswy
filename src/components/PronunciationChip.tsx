import { useEffect, useRef, useState } from 'react'
import { Volume2 } from 'lucide-react'

type PronunciationChipProps = {
  display: string
  speech: string
  label: string
}

export function PronunciationChip({ display, speech, label }: PronunciationChipProps) {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const utteranceIdRef = useRef(0)
  const canSpeak = typeof window !== 'undefined' && 'speechSynthesis' in window

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel()
      }
    }
  }, [])

  const speak = () => {
    if (!canSpeak) return

    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(speech)
    const utteranceId = utteranceIdRef.current + 1
    utteranceIdRef.current = utteranceId
    utterance.lang = 'en-US'
    utterance.rate = 0.82
    utterance.pitch = 0.95
    utterance.volume = 1
    utterance.onend = () => {
      if (utteranceIdRef.current === utteranceId) setIsSpeaking(false)
    }
    utterance.onerror = () => {
      if (utteranceIdRef.current === utteranceId) setIsSpeaking(false)
    }

    setIsSpeaking(true)
    window.speechSynthesis.speak(utterance)
  }

  return (
    <button
      className="pronunciation-chip"
      type="button"
      onClick={speak}
      aria-label={
        canSpeak
          ? `Play pronunciation: ${display}`
          : `Pronunciation: ${display}. Speech playback is unavailable.`
      }
      aria-disabled={!canSpeak}
      data-speaking={isSpeaking}
    >
      <span className="pronunciation-icon" aria-hidden="true">
        <Volume2 size={17} strokeWidth={2.4} />
      </span>
      <span className="pronunciation-copy">
        <span>{label}</span>
        <strong>{display}</strong>
      </span>
    </button>
  )
}
