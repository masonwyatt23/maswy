import {
  ArrowUpRight,
  BriefcaseBusiness,
  Gamepad2,
  GraduationCap,
  RotateCcw,
  Sparkles,
  Trophy,
} from 'lucide-react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import './App.css'

const profile = {
  name: 'Mason Wyatt',
  alias: 'maswy',
  company: 'ashlr.ai',
  birthday: 'June 22, 2026',
  graduation: 'JMU, May 2025',
  links: {
    linkedin: '#linkedin',
    instagram: '#instagram',
    x: '#x',
    github: '#github',
    substack: '#substack',
    ashlr: 'https://ashlr.ai',
  },
}

function useScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return progress
}

function HeroScene({ progress }: { progress: number }) {
  const heroStage = Math.round(progress * 100)
  const tilt = progress * 18 - 6

  return (
    <section className="hero-section" aria-label="maswy profile intro">
      <div className="scanlines" aria-hidden="true" />
      <div className="hero-chrome" aria-hidden="true">
        <span>MASWY_OS</span>
        <span>1998/2026</span>
        <span>FOUNDER MODE</span>
      </div>
      <div className="hero-media" style={{ '--scroll': progress } as React.CSSProperties}>
        <div className="video-slot">
          <div className="slot-label">
            <span>hero video storyboard</span>
            <span>{heroStage}%</span>
          </div>
          <div className="placeholder-frame" style={{ transform: `rotate(${tilt}deg)` }}>
            <span>drop final scroll video here</span>
            <strong>{profile.alias}</strong>
            <small>old internet brain / new money polish</small>
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

function VideoBlueprint() {
  const beats = [
    '0-20%: clean founder portrait, dead serious, VHS timestamp says "DO NOT OVERTHINK".',
    '20-45%: camera pulls back into a retro desktop/terminal world with ashlr.ai artifacts flying by.',
    '45-70%: JMU/friend lore flashes like trading cards, then glitches into founder mode.',
    '70-90%: absurd confidence ramp, suit/hoodie/maswy mascot energy, dramatic fake product launch lighting.',
    '90-100%: hard cut to a ridiculous victory pose that lines up with the game section below.',
  ]

  const assets = [
    'One high-quality vertical photo/video of you, preferably clean background and strong facial detail.',
    'Optional second funny image: deadpan founder pose, blurry party photo, or college throwback.',
    'ashlr.ai logo or product screenshot if you want the founder part to feel real.',
    'Exact GitHub, Substack, LinkedIn, Instagram, and X URLs.',
    'Final hero video as vertical MP4/WebM, ideally 9:16, 8-14 seconds, under 12 MB for mobile.',
  ]

  return (
    <section className="blueprint-section" aria-label="Hero video creative plan">
      <div className="section-heading">
        <p className="kicker">hero scroll video recipe</p>
        <h2>Make it cinematic, then disrespect it.</h2>
      </div>
      <div className="blueprint-grid">
        <article>
          <h3>Video beats</h3>
          <ol>
            {beats.map((beat) => (
              <li key={beat}>{beat}</li>
            ))}
          </ol>
        </article>
        <article>
          <h3>Assets to collect</h3>
          <ol>
            {assets.map((asset) => (
              <li key={asset}>{asset}</li>
            ))}
          </ol>
        </article>
      </div>
    </section>
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
      copy: 'maswy, by college buddies and the company people enabling the bit. Secret unlock: birthday mode is June 22.',
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

type Obstacle = {
  id: number
  x: number
  width: number
  height: number
  passed: boolean
}

function RunnerGame() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const requestRef = useRef<number | null>(null)
  const [score, setScore] = useState(0)
  const [best, setBest] = useState(() => Number(localStorage.getItem('maswy-runner-best') ?? 0))
  const [status, setStatus] = useState<'ready' | 'running' | 'crashed'>('ready')
  const stateRef = useRef({
    y: 0,
    velocity: 0,
    speed: 4.2,
    score: 0,
    floor: 0,
    obstacles: [] as Obstacle[],
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
      floor: 0,
      obstacles: [],
      nextId: 1,
      lastSpawn: 0,
      status: 'ready',
    }
    setScore(0)
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
      context.fillStyle = '#fff7e1'
      context.fillRect(0, 0, width, height)

      context.fillStyle = '#121212'
      context.fillRect(0, state.floor + 28, width, 5)

      for (let i = 0; i < 14; i += 1) {
        context.fillStyle = i % 2 ? '#ed3b2f' : '#1f9a68'
        context.fillRect((i * 54 - (state.score * 7) % 54) % width, state.floor + 39, 25, 4)
      }

      if (state.status === 'running') {
        state.velocity += 0.72
        state.y = Math.min(state.floor, state.y + state.velocity)
        state.speed = Math.min(8.8, state.speed + 0.0018)

        if (time - state.lastSpawn > Math.max(760, 1320 - state.score * 8)) {
          const obstacleHeight = 28 + Math.random() * 30
          state.obstacles.push({
            id: state.nextId,
            x: width + 20,
            width: 22 + Math.random() * 20,
            height: obstacleHeight,
            passed: false,
          })
          state.nextId += 1
          state.lastSpawn = time
        }

        state.obstacles = state.obstacles
          .map((obstacle) => ({ ...obstacle, x: obstacle.x - state.speed }))
          .filter((obstacle) => obstacle.x > -60)

        state.obstacles.forEach((obstacle) => {
          if (!obstacle.passed && obstacle.x + obstacle.width < 64) {
            obstacle.passed = true
            state.score += 1
            setScore(state.score)
          }
        })

        const player = { x: 46, y: state.y - 48, width: 38, height: 48 }
        const hit = state.obstacles.some((obstacle) => {
          const box = {
            x: obstacle.x,
            y: state.floor + 28 - obstacle.height,
            width: obstacle.width,
            height: obstacle.height,
          }
          return (
            player.x < box.x + box.width &&
            player.x + player.width > box.x &&
            player.y < box.y + box.height &&
            player.y + player.height > box.y
          )
        })

        if (hit) crash()
      }

      drawPlayer(context, 64, state.y)
      state.obstacles.forEach((obstacle) => drawObstacle(context, obstacle, state.floor))

      if (state.status !== 'running') {
        context.fillStyle = 'rgba(18, 18, 18, 0.76)'
        context.fillRect(0, 0, width, height)
        context.fillStyle = '#fffdf7'
        context.font = '700 22px Inter, system-ui, sans-serif'
        context.textAlign = 'center'
        context.fillText(state.status === 'crashed' ? 'tiny founder down' : 'tap to run', width / 2, height / 2 - 8)
        context.font = '500 13px Inter, system-ui, sans-serif'
        context.fillText('tap, space, or arrow up', width / 2, height / 2 + 20)
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
        <h2>Maswy Run</h2>
      </div>
      <div className="game-shell">
        <div className="game-topline">
          <span>
            <Gamepad2 size={16} /> {status}
          </span>
          <span>
            <Trophy size={16} /> {score} / best {best}
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

function drawPlayer(context: CanvasRenderingContext2D, x: number, floor: number) {
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

function drawObstacle(context: CanvasRenderingContext2D, obstacle: Obstacle, floor: number) {
  context.fillStyle = '#1f9a68'
  context.fillRect(obstacle.x, floor + 28 - obstacle.height, obstacle.width, obstacle.height)
  context.fillStyle = '#ed3b2f'
  context.fillRect(obstacle.x + 4, floor + 33 - obstacle.height, obstacle.width - 8, 6)
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
  const progress = useScrollProgress()
  const [showNoods, setShowNoods] = useState(false)
  const birthdayLine = useMemo(() => `hidden stat: turns 23 on ${profile.birthday}`, [])

  return (
    <main>
      <HeroScene progress={progress} />
      <VideoBlueprint />
      <LoreSection />

      <section className="ticker" aria-label="Profile ticker">
        <span>college friends said maswy and the brand department lost control</span>
        <span>ashlr.ai founder mode with side-quest energy</span>
        <span>github link gets front-row seating</span>
        <span>{birthdayLine}</span>
      </section>

      <RunnerGame />

      <section className="final-section">
        <p className="kicker">deep internet footer</p>
        <h2>That is enough personal branding for one scroll.</h2>
        <p>
          Links are placeholder-configured, hero media is ready for the final video, and the pasta
          button is exactly as serious as it sounds.
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
