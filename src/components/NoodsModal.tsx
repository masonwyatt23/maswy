import { useEffect, useRef } from 'react'

export function NoodsModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    if (!open) return
    const previouslyFocused = document.activeElement as HTMLElement | null
    closeButtonRef.current?.focus()
    return () => previouslyFocused?.focus?.()
  }, [open])

  if (!open) return null

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Pasta image">
      <button ref={closeButtonRef} className="modal-close" type="button" onClick={onClose}>
        close
      </button>
      <figure className="noods-frame" aria-label="Pasta noodles covered in sauce">
        <img src="/media/saucy-noods.webp" alt="Spicy chicken noodles on a colorful table" />
        <figcaption>pasta.</figcaption>
      </figure>
    </div>
  )
}
