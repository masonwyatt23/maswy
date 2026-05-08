import { useEffect, useState } from 'react'
import './App.css'
import { HeroScene } from './components/HeroScene'
import { LoreSection } from './components/LoreSection'
import { NoodsModal } from './components/NoodsModal'
import { ProjectsSection } from './components/ProjectsSection'
import { RunnerGame } from './components/RunnerGame'
import { SiteBackdrop } from './components/SiteBackdrop'
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
      <SiteBackdrop />
      <HeroScene />
      <ProjectsSection />
      <LoreSection />

      <section className="ticker" aria-label="Profile ticker">
        <span>builder, founder, product person</span>
        <span>ashlr.ai and related tools</span>
        <span>github has the receipts</span>
        <span title={`turns 23 on ${profile.birthday}`}>birthday: {profile.birthday}</span>
      </section>

      <RunnerGame />

      <section className="final-section">
        <p className="kicker">end</p>
        <h2>That is the site.</h2>
        <p>
          Projects, GitHub, and socials are all linked. There is also pasta.
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
