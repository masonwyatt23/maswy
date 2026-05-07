import { useEffect, useState } from 'react'
import './App.css'
import { HeroScene } from './components/HeroScene'
import { LoreSection } from './components/LoreSection'
import { NoodsModal } from './components/NoodsModal'
import { ProjectsSection } from './components/ProjectsSection'
import { RunnerGame } from './components/RunnerGame'
import { profile } from './data/profile'

function App() {
  const [showNoods, setShowNoods] = useState(false)

  useEffect(() => {
    if (!showNoods) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setShowNoods(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [showNoods])

  return (
    <main>
      <HeroScene />
      <ProjectsSection />
      <LoreSection />

      <section className="ticker" aria-label="Profile ticker">
        <span>college friends said maswy and the brand department lost control</span>
        <span>ashlr.ai founder mode with side-quest energy</span>
        <span>github link gets front-row seating</span>
        <span title={`turns 23 on ${profile.birthday}`}>hidden stat unlocked only by hovering like a nerd</span>
      </section>

      <RunnerGame />

      <section className="final-section">
        <p className="kicker">deep internet footer</p>
        <h2>That is enough personal branding for one scroll.</h2>
        <p>
          Hero cinematic installed, GitHub is properly front-row, projects are on display, and the
          pasta button remains exactly as serious as it sounds.
        </p>
        <button className="noods-button" type="button" onClick={() => setShowNoods(true)}>
          Saucy noods
        </button>
      </section>

      <NoodsModal open={showNoods} onClose={() => setShowNoods(false)} />
    </main>
  )
}

export default App
