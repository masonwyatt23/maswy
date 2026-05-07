export function NoodsModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Saucy noods">
      <button className="modal-close" type="button" onClick={onClose}>
        close
      </button>
      <figure className="noods-frame" aria-label="Pasta noodles covered in sauce">
        <div className="pasta-plate" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
          <i />
          <i />
          <i />
        </div>
        <figcaption>saucy noods. legally pasta.</figcaption>
      </figure>
    </div>
  )
}
