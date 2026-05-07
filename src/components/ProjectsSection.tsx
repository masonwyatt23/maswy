import { type Project, publicProjects, showcaseProjects } from '../data/profile'
import { SocialLink } from './SocialLink'

export function ProjectsSection() {
  return (
    <section className="projects-section" aria-label="Projects">
      <div className="section-heading">
        <p className="kicker">proof of work, lightly unhinged</p>
        <h2>Things I ship when nobody takes the keyboard away.</h2>
        <div className="meme-strip" aria-hidden="true">
          <span>ship it, explain later</span>
          <span>github saw it first</span>
          <span>founder mode with receipts</span>
        </div>
      </div>
      <div className="project-rail">
        <div className="project-column">
          <div className="column-title">
            <span>Open Source</span>
            <strong>{publicProjects.length}</strong>
          </div>
          {publicProjects.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
        <div className="project-column">
          <div className="column-title">
            <span>Showcase</span>
            <strong>{showcaseProjects.length}</strong>
          </div>
          {showcaseProjects.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project-card">
      <div>
        <span className="project-tag">{project.tag}</span>
        <h3>{project.name}</h3>
      </div>
      <p>{project.copy}</p>
      <div className="project-links">
        {project.repo ? <SocialLink href={project.repo} label="Repo" textIcon="gh" /> : null}
        {project.live ? <SocialLink href={project.live} label="Live" textIcon="↗" /> : null}
      </div>
    </article>
  )
}
