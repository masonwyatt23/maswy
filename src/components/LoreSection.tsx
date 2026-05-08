import { BriefcaseBusiness, GraduationCap, Sparkles } from 'lucide-react'
import { profile } from '../data/profile'

export function LoreSection() {
  const facts = [
    {
      icon: <BriefcaseBusiness />,
      title: 'Currently',
      copy: `Building ${profile.company} and the products around it.`,
    },
    {
      icon: <GraduationCap />,
      title: 'Previously',
      copy: `Graduated from ${profile.graduation}.`,
    },
    {
      icon: <Sparkles />,
      title: 'Known as',
      copy: 'maswy online. Mason in normal settings.',
    },
  ]

  return (
    <section className="lore-section" aria-label="Quick profile facts">
      <div className="section-heading">
        <p className="kicker">basic context</p>
        <h2>Short version.</h2>
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
