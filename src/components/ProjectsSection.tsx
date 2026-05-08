import { ashlrGitHubProjects, type Project, publicProjects, showcaseProjects } from '../data/profile'
import { SocialLink } from './SocialLink'

export function ProjectsSection() {
  return (
    <section className="projects-section" aria-label="Projects">
      <div className="section-heading">
        <p className="kicker">Selected work</p>
        <h2>Projects</h2>
        <div className="project-summary" aria-label="Project groups">
          <span>{publicProjects.length} Mason projects</span>
          <span>{ashlrGitHubProjects.length} Ashlr repos</span>
          <span>{showcaseProjects.length} showcase builds</span>
        </div>
      </div>
      <ProjectGroup title="Showcase" projects={showcaseProjects} />
      <ProjectGroup title="Ashlr" projects={ashlrGitHubProjects} />
      <ProjectGroup title="Open source" projects={publicProjects} />
    </section>
  )
}

function ProjectGroup({ title, projects }: { title: string; projects: Project[] }) {
  return (
    <div className="project-group">
      <div className="project-group-heading">
        <h3>{title}</h3>
        <span>{projects.length}</span>
      </div>
      <div className="project-grid">
        {projects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </div>
  )
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project-card">
      <div className="project-media">
        <img src={project.preview} alt={`${project.name} preview`} loading="eager" />
        <span className="project-tag">{project.tag}</span>
      </div>
      <div className="project-body">
        <h4>{project.name}</h4>
        <p>{project.copy}</p>
        <div className="project-links">
          {project.repo ? <SocialLink href={project.repo} label="Repo" textIcon="gh" /> : null}
          {project.live ? <SocialLink href={project.live} label="Live" textIcon="↗" /> : null}
        </div>
      </div>
    </article>
  )
}
