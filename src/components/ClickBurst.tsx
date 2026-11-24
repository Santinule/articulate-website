import { useEffect, useState } from 'react'
import type { CSSProperties } from 'react'
import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion'

// A small burst where you click: blue lines fanning out and a soft lavender ring, like the action lines
// in the app's illustrations. Mouse only, and off when the visitor prefers reduced motion.

type Burst = { id: number; x: number; y: number }

// Angles above the click point, where the cursor doesn't cover them.
const RAYS = [-165, -120, -75, -30]

let nextId = 0

export function ClickBurst() {
  const reduced = usePrefersReducedMotion()
  const [bursts, setBursts] = useState<Burst[]>([])

  useEffect(() => {
    if (reduced) return
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' || e.button !== 0) return
      const burst = { id: ++nextId, x: e.clientX, y: e.clientY }
      setBursts((bs) => [...bs.slice(-4), burst])
      window.setTimeout(() => setBursts((bs) => bs.filter((b) => b.id !== burst.id)), 650)
    }
    window.addEventListener('pointerdown', onDown, { passive: true })
    return () => window.removeEventListener('pointerdown', onDown)
  }, [reduced])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[100]">
      {bursts.map((b) => (
        <svg key={b.id} className="click-burst" viewBox="-24 -24 48 48" style={{ left: b.x, top: b.y }}>
          <circle className="click-ring" r="9" />
          {RAYS.map((deg) => {
            const a = (deg * Math.PI) / 180
            const cos = Math.cos(a)
            const sin = Math.sin(a)
            return (
              <line
                key={deg}
                className="click-ray"
                x1={cos * 8}
                y1={sin * 8}
                x2={cos * 13}
                y2={sin * 13}
                style={{ '--dx': `${cos * 6}px`, '--dy': `${sin * 6}px` } as CSSProperties}
              />
            )
          })}
        </svg>
      ))}
    </div>
  )
}
