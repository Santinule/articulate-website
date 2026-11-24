import { useRef, useState } from 'react'
import type { CSSProperties, PointerEvent } from 'react'
import { LogoMark } from '@/components/Logo'
import { playSound } from '@/lib/sound'
import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion'

// The app's 3D achievement coin (Coin3DView / CoinWithOverflowView): the badge art in front of a
// cool-grey coin with real thickness (11% of its width in the app, a touch more here so it reads at
// this size). The rim is a stack of thin discs, so it looks solid from any angle. The coin rests
// slightly turned so you see its edge, leans toward the mouse, and hover or tap spins it once.

const LAYERS = 12
// Lean limits in degrees, for the mouse over the coin.
const LEAN = 28

export function AchievementCoin({ name, img }: { name: string; img: string }) {
  const [spins, setSpins] = useState(0)
  const coin = useRef<HTMLSpanElement>(null)
  const reduced = usePrefersReducedMotion()

  const lean = (e: PointerEvent<HTMLButtonElement>) => {
    const el = coin.current
    if (!el || reduced || e.pointerType !== 'mouse') return
    const r = el.getBoundingClientRect()
    const x = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width) * 2 - 1))
    const y = Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height) * 2 - 1))
    // the face turns toward the pointer
    el.style.setProperty('--lean-y', `${(x * LEAN).toFixed(1)}deg`)
    el.style.setProperty('--lean-x', `${(-y * LEAN).toFixed(1)}deg`)
  }
  const rest = () => {
    coin.current?.style.removeProperty('--lean-x')
    coin.current?.style.removeProperty('--lean-y')
  }

  return (
    <button
      type="button"
      onPointerEnter={(e) => e.pointerType === 'mouse' && setSpins((n) => n + 1)}
      onPointerMove={lean}
      onPointerLeave={rest}
      onClick={() => {
        // like the app's achievement reveal: a whoosh as it spins, then the coin lands
        playSound('swipe', { volume: 0.3, rate: 1.3 })
        playSound('coin', { volume: 0.4, delay: 0.55 })
        setSpins((n) => n + 1)
      }}
      className="press-pop flex flex-col items-center gap-2 rounded-2xl p-1 text-center"
    >
      <span ref={coin} className="coin3d" data-reveal="coin" aria-hidden="true">
        <span className="coin-lean">
          <span className="coin-spin" style={{ '--turn': `${spins * 360}deg` } as CSSProperties}>
            {Array.from({ length: LAYERS }, (_, i) => (
              <span
                key={i}
                className={i === 0 ? 'coin-layer coin-back rounded-full' : 'coin-layer rounded-full'}
                style={{ '--z': (i / (LAYERS - 1) - 0.5).toFixed(3) } as CSSProperties}
              >
                {/* the back of the coin carries the pencil "A", turned so it reads the right way round */}
                {i === 0 && <LogoMark className="coin-back-logo" />}
              </span>
            ))}
            <img src={img} alt="" width={160} height={160} loading="lazy" className="coin-face" />
          </span>
        </span>
      </span>
      <span className="font-display text-[1rem] font-semibold leading-tight">{name}</span>
    </button>
  )
}
