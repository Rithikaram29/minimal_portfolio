import React, { useEffect, useMemo, useRef, useState } from 'react'

type Obstacle = {
  x: number
  width: number
  gapY: number
  gapH: number
}

type SmallGameProps = {
  birdSrc?: string
}

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v))

export const SmallGame: React.FC<SmallGameProps> = ({ birdSrc }) => {
  const hostRef = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const rafRef = useRef<number | null>(null)

  const [isRunning, setIsRunning] = useState(false)
  const [isGameOver, setIsGameOver] = useState(false)
  const [score, setScore] = useState(0)

  const stateRef = useRef({
    w: 600,
    h: 224,
    birdX: 120,
    birdY: 112,
    birdR: 12,
    vy: 0,
    gravity: 900,
    flapImpulse: -250,
    obstacles: [] as Obstacle[],
    obstacleSpeed: 220,
    spawnEvery: 1.25,
    spawnT: 0,
    passed: new Set<number>(),
    nextId: 1,
    lastT: 0,
  })

  const birdImg = useMemo(() => {
    if (!birdSrc) return null
    const img = new Image()
    img.src = birdSrc
    return img
  }, [birdSrc])

  useEffect(() => {
    const host = hostRef.current
    const canvas = canvasRef.current
    if (!host || !canvas) return

    const resize = () => {
      const rect = host.getBoundingClientRect()
      const w = Math.max(1, Math.floor(rect.width))
      const h = Math.max(1, Math.floor(rect.height))

      const dpr = window.devicePixelRatio || 1
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`

      const s = stateRef.current
      s.w = w
      s.h = h
      s.birdX = clamp(Math.min(s.birdX, w * 0.35), 40, w - 40)
      s.birdY = clamp(s.birdY, 20, h - 20)
    }

    resize()
    const ro = new ResizeObserver(() => resize())
    ro.observe(host)
    window.addEventListener('resize', resize)

    return () => {
      ro.disconnect()
      window.removeEventListener('resize', resize)
    }
  }, [])

  const resetGame = () => {
    const s = stateRef.current
    s.birdX = Math.max(60, Math.min(140, s.w * 0.25))
    s.birdY = s.h * 0.5
    s.vy = 0
    s.obstacles = []
    s.spawnT = 0
    s.passed = new Set()
    s.nextId = 1
    s.lastT = 0
    setScore(0)
    setIsGameOver(false)
    setIsRunning(true)
  }

  const stopLoop = () => {
    if (rafRef.current != null) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
  }

  const gameOver = () => {
    setIsGameOver(true)
    setIsRunning(false)
  }

  const flap = () => {
    const s = stateRef.current

    if (isGameOver) {
      resetGame()
      s.vy = s.flapImpulse
      return
    }

    if (!isRunning) {
      resetGame()
      s.vy = s.flapImpulse
      return
    }

    s.vy = s.flapImpulse
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const tick = (tms: number) => {
      const s = stateRef.current
      const dpr = window.devicePixelRatio || 1

      if (!s.lastT) s.lastT = tms
      const dt = Math.min(0.033, (tms - s.lastT) / 1000)
      s.lastT = tms

      if (isRunning && !isGameOver) {
        s.vy += s.gravity * dt
        s.birdY += s.vy * dt

        s.spawnT += dt
        if (s.spawnT >= s.spawnEvery) {
          s.spawnT = 0

          const width = clamp(s.w * 0.10, 44, 80)
          const gapH = clamp(s.h * 0.42, 72, 120)
          const margin = 18
          const minGapY = margin
          const maxGapY = Math.max(margin, s.h - margin - gapH)
          const gapY = minGapY + Math.random() * Math.max(1, maxGapY - minGapY)

          s.obstacles.push({
            x: s.w + width,
            width,
            gapY,
            gapH,
          })
        }

        for (const ob of s.obstacles) {
          ob.x -= s.obstacleSpeed * dt
        }
        s.obstacles = s.obstacles.filter((ob) => ob.x + ob.width > -10)

        for (let i = 0; i < s.obstacles.length; i++) {
          const ob = s.obstacles[i]
          const key = Math.floor(ob.x)
          if (s.birdX > ob.x + ob.width && !s.passed.has(key)) {
            s.passed.add(key)
            setScore((prev) => prev + 1)
          }
        }

        const birdTop = s.birdY - s.birdR
        const birdBottom = s.birdY + s.birdR
        const birdLeft = s.birdX - s.birdR
        const birdRight = s.birdX + s.birdR

        if (birdBottom >= s.h - 2) {
          gameOver()
        }
        if (birdTop <= 2) {
          s.birdY = s.birdR + 2
          s.vy = Math.max(s.vy, 0)
        }

        for (const ob of s.obstacles) {
          const inX = birdRight >= ob.x && birdLeft <= ob.x + ob.width
          if (!inX) continue

          const hitsTopBlock = birdTop <= ob.gapY
          const hitsBottomBlock = birdBottom >= ob.gapY + ob.gapH

          if (hitsTopBlock || hitsBottomBlock) {
            gameOver()
            break
          }
        }
      }

      // ---- draw ----
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      // Warm dark background
      ctx.clearRect(0, 0, s.w, s.h)
      ctx.fillStyle = '#1F2A30'
      ctx.fillRect(0, 0, s.w, s.h)

      // Subtle teal-tinted dots
      ctx.fillStyle = 'rgba(79, 160, 149, 0.04)'
      for (let i = 0; i < 40; i++) {
        const x = (i * 97) % s.w
        const y = (i * 53) % s.h
        ctx.fillRect(x, y, 2, 2)
      }

      // Obstacles
      for (const ob of s.obstacles) {
        ctx.fillStyle = '#2E3E47'
        ctx.fillRect(ob.x, 0, ob.width, ob.gapY)
        const bottomY = ob.gapY + ob.gapH
        ctx.fillRect(ob.x, bottomY, ob.width, s.h - bottomY)

        // Teal edge highlight
        ctx.fillStyle = 'rgba(79, 160, 149, 0.15)'
        ctx.fillRect(ob.x, 0, 2, ob.gapY)
        ctx.fillRect(ob.x, bottomY, 2, s.h - bottomY)
      }

      // Ground line
      ctx.fillStyle = 'rgba(79, 160, 149, 0.12)'
      ctx.fillRect(0, s.h - 2, s.w, 2)

      // Bird — coral colored
      const drawBirdCircle = () => {
        ctx.beginPath()
        ctx.arc(s.birdX, s.birdY, s.birdR, 0, Math.PI * 2)
        ctx.fillStyle = '#D97C7C'
        ctx.fill()
        ctx.strokeStyle = 'rgba(217, 124, 124, 0.4)'
        ctx.lineWidth = 2
        ctx.stroke()
      }

      if (birdImg && birdImg.complete && birdImg.naturalWidth > 0) {
        const size = s.birdR * 2.4
        ctx.save()
        const rot = clamp(s.vy / 900, -0.6, 0.6)
        ctx.translate(s.birdX, s.birdY)
        ctx.rotate(rot)
        ctx.drawImage(birdImg, -size / 2, -size / 2, size, size)
        ctx.restore()
      } else {
        drawBirdCircle()
      }

      // HUD
      ctx.fillStyle = 'rgba(230, 227, 221, 0.90)'
      ctx.font = '600 14px Inter, system-ui, -apple-system, sans-serif'
      ctx.fillText(`Score: ${score}`, 12, 20)

      if (!isRunning && !isGameOver) {
        ctx.fillStyle = 'rgba(230, 227, 221, 0.70)'
        ctx.font = '600 16px Inter, system-ui, -apple-system, sans-serif'
        ctx.fillText('Tap the button to start', 12, s.h - 18)
      }

      if (isGameOver) {
        ctx.fillStyle = 'rgba(31, 42, 48, 0.65)'
        ctx.fillRect(0, 0, s.w, s.h)

        ctx.fillStyle = 'rgba(230, 227, 221, 0.95)'
        ctx.font = '800 22px Satoshi, Inter, system-ui, sans-serif'
        const msg = 'GAME OVER'
        const tw = ctx.measureText(msg).width
        ctx.fillText(msg, (s.w - tw) / 2, s.h / 2 - 10)

        ctx.font = '600 14px Inter, system-ui, sans-serif'
        const msg2 = 'Tap the button to retry'
        const tw2 = ctx.measureText(msg2).width
        ctx.fillText(msg2, (s.w - tw2) / 2, s.h / 2 + 14)
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    stopLoop()
    rafRef.current = requestAnimationFrame(tick)

    return () => stopLoop()
  }, [isRunning, isGameOver, score, birdImg])


  return (
    <div ref={hostRef} className="w-full h-full relative select-none pixel-grid-overlay grain-overlay cursor-crosshair">
      <canvas ref={canvasRef} className="block w-full h-full rounded-lg" />

      <div className="absolute inset-x-0 bottom-3 flex items-center justify-center">
        <button
          type="button"
          onClick={flap}
          onPointerDown={(e) => {
            e.preventDefault()
            flap()
          }}
          className="select-none touch-none rounded-full bg-accent-coral/20 border border-accent-coral/30 px-6 py-3 text-white text-sm sm:text-base font-semibold hover:bg-accent-coral/30 active:scale-[0.98] transition cursor-pointer"
          aria-label="Flap"
        >
          {isGameOver ? 'Tap to Retry' : isRunning ? 'FLAP' : 'Tap to Start'}
        </button>
      </div>
    </div>
  )
}
