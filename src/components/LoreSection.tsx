import { BriefcaseBusiness, GraduationCap, Sparkles } from 'lucide-react'
import { profile } from '../data/profile'

export function LoreSection() {
  const facts = [
    {
      icon: <BriefcaseBusiness />,
      title: 'Currently',
      copy: `Building ${profile.company}, pretending the calendar is not real.`,
    },
    {
      icon: <GraduationCap />,
      title: 'Previously',
      copy: `Graduated from ${profile.graduation}. Retired from dining hall strategy.`,
    },
    {
      icon: <Sparkles />,
      title: 'Known as',
      copy: 'maswy, by college buddies and the company people enabling the bit.',
    },
  ]

  return (
    <section className="lore-section" aria-label="Quick profile facts">
      <div className="section-heading">
        <p className="kicker">the official unofficial file</p>
        <h2>Small profile. Large questionable energy.</h2>
      </div>
      <div className="fact-grid">
        {facts.map((fact) => (
          <article className="fact-card" key={fact.title}>
            <div className="fact-icon">{fact.icon}</div>
            <h3>{fact.title}</h3>
            <p>{fact.copy}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
