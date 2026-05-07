import {
  ArrowUpRight,
  BriefcaseBusiness,
  Gamepad2,
  GraduationCap,
  RotateCcw,
  Sparkles,
  Trophy,
} from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

const profile = {
  name: 'Mason Wyatt',
  alias: 'maswy',
  company: 'ashlr.ai',
  birthday: 'June 22, 2026',
  graduation: 'JMU, May 2025',
  links: {
    linkedin: 'https://www.linkedin.com/in/mason-wyatt-932400201',
    instagram: 'https://www.instagram.com/mason.wyatt.23',
    x: 'https://x.com/masonwyatt23',
    github: 'https://github.com/masonwyatt23',
    substack: 'https://ashlr.substack.com',
    ashlr: 'https://ashlr.ai',
  },
}

const heroVideo = '/media/maswy-hero.mp4'
const heroPoster = '/media/maswy-hero-poster.jpg'

const publicProjects = [
  {
    name: 'Stargaze',
    tag: 'open source',
    copy: 'Swipe right, star repos, boost makers. Indie GitHub discovery with actual taste.',
    repo: 'https://github.com/masonwyatt23/stargaze',
    live: 'https://stargaze-evero.vercel.app',
  },
  {
    name: 'TypeForge',
    tag: 'open source',
    copy: 'Competitive typing game with audio, particles, combos, and Guitar Hero mode.',
    repo: 'https://github.com/masonwyatt23/typeforge',
  },
  {
    name: 'CashFlow Empire',
    tag: 'open source',
    copy: 'Roblox tycoon with monetization, quests, achievements, and scheduled events.',
    repo: 'https://github.com/masonwyatt23/cashflow-empire',
  },
  {
    name: 'AI Chef',
    tag: 'open source',
    copy: 'Restaurant profile and menu/cocktail idea generator with an AI chef assistant.',
    repo: 'https://github.com/masonwyatt23/AI-chef',
  },
]

const showcaseProjects = [
  {
    name: 'ashlr.ai',
    tag: 'company',
    copy: 'The main thing. AI-native systems for the kind of work that should not be duct taped forever.',
    live: 'https://ashlr.ai',
  },
  {
    name: 'TourVault',
    tag: 'private build',
    copy: 'Golf Performance OS for elite golfers, data, coaching, and unfairly serious workflows.',
    live: 'https://tourvault.vercel.app',
  },
  {
    name: 'Cotidie',
    tag: 'private build',
    copy: 'Life-OS daemon for scheduling, ingest pollers, coach loops, and personal leverage.',
  },
  {
    name: 'Ye Universe',
    tag: 'private build',
    copy: 'Interactive visual explorer for music, samples, analysis, and curated listening paths.',
    live: 'https://yeuniverse.com',
  },
]

function clamp(value: number, min = 0, max = 1) {
  return Math.min(Math.max(value, min), max)
}

function useSectionProgress<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const update = () => {
      const node = ref.current
      if (!node) return
      const rect = node.getBoundingClientRect()
      const scrollable = Math.max(node.offsetHeight - window.innerHeight, 1)
      setProgress(clamp(-rect.top / scrollable))
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return [ref, progress] as const
}

function HeroScene() {
  const [sectionRef, progress] = useSectionProgress<HTMLElement>()
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const heroStage = Math.round(progress * 100)
  const tilt = progress * 18 - 6

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const syncVideo = () => {
      if (!Number.isFinite(video.duration) || video.duration <= 0) return
      video.currentTime = clamp(progress) * video.duration
    }

    if (video.readyState >= 1) syncVideo()
    video.addEventListener('loadedmetadata', syncVideo)
    return () => video.removeEventListener('loadedmetadata', syncVideo)
  }, [progress])

  return (
    <section ref={sectionRef} className="hero-section" aria-label="maswy profile intro">
      <div className="scanlines" aria-hidden="true" />
      <div className="hero-chrome" aria-hidden="true">
        <span>MASWY_OS</span>
        <span>1998/2026</span>
        <span>FOUNDER MODE</span>
      </div>
      <div className="hero-media" style={{ '--scroll': progress } as React.CSSProperties}>
        <div className="video-slot">
          <div className="slot-label">
            <span>scroll scrub hero</span>
            <span>{heroStage}%</span>
          </div>
          <video
            ref={videoRef}
            className="hero-video"
            src={heroVideo}
            poster={heroPoster}
            muted
            playsInline
            preload="metadata"
            aria-label="Psychedelic maswy hero montage"
          />
          <div className="video-badge" style={{ transform: `rotate(${tilt}deg)` }}>
            <span>maswy signal</span>
            <strong>{profile.alias}</strong>
            <small>scroll to scrub the founder cinematic</small>
          </div>
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="progress-rail">
            <span style={{ width: `${heroStage}%` }} />
          </div>
        </div>
      </div>

      <div className="hero-copy">
        <p className="kicker">founder. builder. internet side quest.</p>
        <h1>{profile.alias}.com</h1>
        <p>
          A suspiciously serious personal site for {profile.name}, founder of{' '}
          <a href={profile.links.ashlr} target="_blank" rel="noreferrer">
            {profile.company}
          </a>
          . Part portfolio, part arcade cabinet, part questionable executive decision.
        </p>
        <div className="hero-actions" aria-label="Profile links">
          <SocialLink href={profile.links.linkedin} label="LinkedIn" textIcon="in" />
          <SocialLink href={profile.links.github} label="GitHub" textIcon="gh" />
          <SocialLink href={profile.links.substack} label="Substack" textIcon="ss" />
          <SocialLink href={profile.links.instagram} label="Instagram" textIcon="ig" />
          <SocialLink href={profile.links.x} label="X" textIcon="X" />
        </div>
      </div>
    </section>
  )
}

function SocialLink({
  href,
  label,
  icon,
  textIcon,
}: {
  href: string
  label: string
  icon?: React.ReactNode
  textIcon?: string
}) {
  return (
    <a
      className="social-link"
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noreferrer' : undefined}
    >
      {icon ?? <span className="text-icon">{textIcon}</span>}
      <span>{label}</span>
      <ArrowUpRight size={15} aria-hidden="true" />
    </a>
  )
}

function ProjectsSection() {
  return (
    <section className="projects-section" aria-label="Projects">
      <div className="section-heading">
        <p className="kicker">proof of work, lightly unhinged</p>
        <h2>Things I ship when nobody takes the keyboard away.</h2>
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

type Project = {
  name: string
  tag: string
  copy: string
  repo?: string
  live?: string
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

function LoreSection() {
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

type RunnerEntity = {
  id: number
  kind: 'obstacle' | 'powerup'
  label: string
  x: number
  width: number
  height: number
  color: string
  points: number
  passed: boolean
}

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  color: string
}

function RunnerGame() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const requestRef = useRef<number | null>(null)
  const [score, setScore] = useState(0)
  const [combo, setCombo] = useState(1)
  const [best, setBest] = useState(() => Number(localStorage.getItem('maswy-runner-best') ?? 0))
  const [status, setStatus] = useState<'ready' | 'running' | 'crashed'>('ready')
  const stateRef = useRef({
    y: 0,
    velocity: 0,
    speed: 4.2,
    score: 0,
    combo: 1,
    shield: 0,
    floor: 0,
    entities: [] as RunnerEntity[],
    particles: [] as Particle[],
    nextId: 1,
    lastSpawn: 0,
    status: 'ready' as 'ready' | 'running' | 'crashed',
  })

  const resetGame = useCallback(() => {
    stateRef.current = {
      y: 0,
      velocity: 0,
      speed: 4.2,
      score: 0,
      combo: 1,
      shield: 0,
      floor: 0,
      entities: [],
      particles: [],
      nextId: 1,
      lastSpawn: 0,
      status: 'ready',
    }
    setScore(0)
    setCombo(1)
    setStatus('ready')
  }, [])

  const jump = useCallback(() => {
    const state = stateRef.current
    if (state.status === 'crashed') {
      resetGame()
      return
    }
    if (state.status === 'ready') {
      state.status = 'running'
      setStatus('running')
    }
    if (state.y >= state.floor - 4) {
      state.velocity = -14.5
    }
  }, [resetGame])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Space' || event.code === 'ArrowUp') {
        event.preventDefault()
        jump()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [jump])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d')
    if (!context) return

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const ratio = window.devicePixelRatio || 1
      canvas.width = rect.width * ratio
      canvas.height = rect.height * ratio
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      stateRef.current.floor = rect.height - 54
      if (!stateRef.current.y) stateRef.current.y = stateRef.current.floor
    }

    const crash = () => {
      const state = stateRef.current
      state.status = 'crashed'
      setStatus('crashed')
      setBest((current) => {
        const nextBest = Math.max(current, state.score)
        localStorage.setItem('maswy-runner-best', String(nextBest))
        return nextBest
      })
    }

    const draw = (time: number) => {
      const width = canvas.clientWidth
      const height = canvas.clientHeight
      const state = stateRef.current

      context.clearRect(0, 0, width, height)
      context.fillStyle = '#0f1715'
      context.fillRect(0, 0, width, height)
      context.fillStyle = 'rgba(248, 242, 220, 0.06)'
      for (let x = 0; x < width; x += 28) context.fillRect(x - ((time / 30) % 28), 0, 1, height)
      for (let y = 0; y < height; y += 28) context.fillRect(0, y, width, 1)

      context.fillStyle = '#f8f2dc'
      context.fillRect(0, state.floor + 28, width, 5)

      for (let i = 0; i < 14; i += 1) {
        context.fillStyle = i % 2 ? '#ed3b2f' : '#1f9a68'
        context.fillRect((i * 54 - (state.score * 7) % 54) % width, state.floor + 39, 25, 4)
      }

      if (state.status === 'running') {
        state.velocity += 0.72
        state.y = Math.min(state.floor, state.y + state.velocity)
        state.speed = Math.min(8.8, state.speed + 0.0018)

        if (time - state.lastSpawn > Math.max(640, 1260 - state.score * 7)) {
          const isPowerup = Math.random() > 0.76
          const obstacleHeight = isPowerup ? 26 : 32 + Math.random() * 36
          const labels = isPowerup ? ['ship', 'gh', 'ai', 'focus'] : ['bug', 'email', 'scope', 'deck']
          state.entities.push({
            id: state.nextId,
            kind: isPowerup ? 'powerup' : 'obstacle',
            label: labels[Math.floor(Math.random() * labels.length)],
            x: width + 20,
            width: isPowerup ? 42 : 34 + Math.random() * 24,
            height: obstacleHeight,
            color: isPowerup ? '#f7c948' : Math.random() > 0.5 ? '#ed3b2f' : '#1f9a68',
            points: isPowerup ? 7 : 1,
            passed: false,
          })
          state.nextId += 1
          state.lastSpawn = time
        }

        state.entities = state.entities
          .map((entity) => ({ ...entity, x: entity.x - state.speed }))
          .filter((entity) => entity.x > -80)

        state.particles = state.particles
          .map((particle) => ({
            ...particle,
            x: particle.x + particle.vx,
            y: particle.y + particle.vy,
            vy: particle.vy + 0.14,
            life: particle.life - 1,
          }))
          .filter((particle) => particle.life > 0)

        state.entities.forEach((entity) => {
          if (entity.kind === 'obstacle' && !entity.passed && entity.x + entity.width < 64) {
            entity.passed = true
            state.combo = Math.min(9, state.combo + 1)
            state.score += state.combo
            setCombo(state.combo)
            setScore(state.score)
          }
        })

        const player = { x: 46, y: state.y - 48, width: 38, height: 48 }
        state.entities.forEach((entity) => {
          const box = {
            x: entity.x,
            y: entity.kind === 'powerup' ? state.floor - 92 : state.floor + 28 - entity.height,
            width: entity.width,
            height: entity.height,
          }
          const overlaps =
            player.x < box.x + box.width &&
            player.x + player.width > box.x &&
            player.y < box.y + box.height &&
            player.y + player.height > box.y

          if (!overlaps || entity.passed) return

          if (entity.kind === 'powerup') {
            entity.passed = true
            state.shield = 120
            state.combo = Math.min(9, state.combo + 2)
            state.score += entity.points * state.combo
            setCombo(state.combo)
            setScore(state.score)
            burst(state, box.x, box.y, '#f7c948')
          } else if (state.shield > 0) {
            entity.passed = true
            state.shield = 0
            state.score += 5
            setScore(state.score)
            burst(state, box.x, box.y, '#f8f2dc')
          } else {
            state.combo = 1
            setCombo(1)
            crash()
          }
        })

        state.shield = Math.max(0, state.shield - 1)
      }

      state.particles.forEach((particle) => drawParticle(context, particle))
      drawPlayer(context, 64, state.y, state.shield > 0)
      state.entities.forEach((entity) => drawEntity(context, entity, state.floor))

      if (state.status !== 'running') {
        context.fillStyle = 'rgba(18, 18, 18, 0.76)'
        context.fillRect(0, 0, width, height)
        context.fillStyle = '#fffdf7'
        context.font = '700 22px Inter, system-ui, sans-serif'
        context.textAlign = 'center'
        context.fillText(state.status === 'crashed' ? 'runway incident' : 'tap to ship', width / 2, height / 2 - 8)
        context.font = '500 13px Inter, system-ui, sans-serif'
        context.fillText('jump bugs, collect yellow powerups', width / 2, height / 2 + 20)
      }

      requestRef.current = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    requestRef.current = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('resize', resize)
      if (requestRef.current) cancelAnimationFrame(requestRef.current)
    }
  }, [])

  return (
    <section className="game-section" aria-label="Mini runner game">
      <div className="section-heading">
        <p className="kicker">mandatory productivity hazard</p>
        <h2>Maswy Run: Ship Mode</h2>
      </div>
      <div className="game-shell">
        <div className="game-topline">
          <span>
            <Gamepad2 size={16} /> {status}
          </span>
          <span>
            <Trophy size={16} /> {score} / best {best} / x{combo}
          </span>
          <button type="button" onClick={resetGame} aria-label="Restart game">
            <RotateCcw size={16} />
          </button>
        </div>
        <canvas
          ref={canvasRef}
          className="runner-canvas"
          width="760"
          height="360"
          onPointerDown={jump}
          aria-label="Tap to jump over obstacles"
        />
      </div>
    </section>
  )
}

function burst(state: { particles: Particle[] }, x: number, y: number, color: string) {
  for (let i = 0; i < 12; i += 1) {
    state.particles.push({
      x,
      y,
      vx: Math.cos(i) * (1.5 + Math.random() * 2),
      vy: Math.sin(i) * (1.5 + Math.random() * 2),
      life: 24 + Math.random() * 16,
      color,
    })
  }
}

function drawParticle(context: CanvasRenderingContext2D, particle: Particle) {
  context.globalAlpha = Math.max(0, particle.life / 38)
  context.fillStyle = particle.color
  context.fillRect(particle.x, particle.y, 5, 5)
  context.globalAlpha = 1
}

function drawPlayer(context: CanvasRenderingContext2D, x: number, floor: number, shielded: boolean) {
  if (shielded) {
    context.strokeStyle = '#f7c948'
    context.lineWidth = 3
    context.beginPath()
    context.arc(x, floor - 26, 35, 0, Math.PI * 2)
    context.stroke()
  }
  context.fillStyle = '#121212'
  context.fillRect(x - 18, floor - 48, 36, 45)
  context.fillStyle = '#f7c948'
  context.fillRect(x - 12, floor - 42, 24, 14)
  context.fillStyle = '#ffffff'
  context.fillRect(x - 3, floor - 34, 6, 6)
  context.fillStyle = '#ed3b2f'
  context.fillRect(x - 21, floor - 12, 14, 9)
  context.fillRect(x + 7, floor - 12, 14, 9)
}

function drawEntity(context: CanvasRenderingContext2D, entity: RunnerEntity, floor: number) {
  const y = entity.kind === 'powerup' ? floor - 92 : floor + 28 - entity.height
  context.fillStyle = entity.color
  context.fillRect(entity.x, y, entity.width, entity.height)
  context.strokeStyle = '#f8f2dc'
  context.lineWidth = 2
  context.strokeRect(entity.x, y, entity.width, entity.height)
  context.fillStyle = entity.kind === 'powerup' ? '#121212' : '#fffdf7'
  context.font = '800 11px Inter, system-ui, sans-serif'
  context.textAlign = 'center'
  context.fillText(entity.label, entity.x + entity.width / 2, y + entity.height / 2 + 4)
}

function NoodsModal({ open, onClose }: { open: boolean; onClose: () => void }) {
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

function App() {
  const [showNoods, setShowNoods] = useState(false)

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
