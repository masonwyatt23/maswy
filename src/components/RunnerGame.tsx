import { Gamepad2, RotateCcw, Trophy } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'

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

export function RunnerGame() {
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
