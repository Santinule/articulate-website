import { useCallback, useEffect, useRef, useState } from 'react'
import type { CSSProperties, KeyboardEvent, PointerEvent } from 'react'
import { AppWordCard } from '@/components/AppCard'
import { TintIcon } from '@/components/AppIcon'
import { CARD_THEMES } from '@/lib/cardThemes'
import type { CardTheme } from '@/lib/cardThemes'
import { deckWords } from '@/data/content'
import { playSound } from '@/lib/sound'
import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion'
import { cn } from '@/lib/utils'

// The app's home card stack (HomeCardStack.swift), on the web. Three physical cards, like a real deck:
// - cards behind shrink 4% and drop 10pt per level, anchored at the bottom
// - the front card follows the finger, moves 10% vertically and rotates drag/25 degrees around its bottom
// - released past 80pt (or flicked), it slides out to the side over the others, then tucks in behind the
//   deck as the last card while the others move up; once hidden back there it takes the next word.
//   A short drag springs back instead (response 0.4, damping 0.7).

const SLOTS = 3
const SWIPE_PT = 80
const FLICK_PX_PER_MS = 0.55
const OUT_MS = 280
const BACK_MS = 520
const AUTO_MS = 4600

type Mode = 'idle' | 'dragging' | 'release' | 'cycle'
type Card = { id: number; word: number }
type Flight = { id: number; phase: 'out' | 'back'; x: number; y: number; rotate: number }

// Where the demo hand's fingertip rests on the card, as a fraction of its size.
const HAND_POINT = { x: 0.6, y: 0.62 }

const themeNames: Record<CardTheme, string> = {
  lavender: 'Lavender',
  gray: 'Gray',
  navy: 'Navy',
  blue: 'Blue',
  cream: 'Cream',
}

export function CardStack({ stackClassName, initialTheme = 'navy' }: { stackClassName?: string; initialTheme?: CardTheme }) {
  const [cards, setCards] = useState<Card[]>(() => Array.from({ length: SLOTS }, (_, i) => ({ id: i, word: i })))
  const nextWord = useRef(SLOTS % deckWords.length)
  const [drag, setDrag] = useState({ x: 0, y: 0 })
  const [mode, setMode] = useState<Mode>('idle')
  const [flight, setFlight] = useState<Flight | null>(null)
  const [theme, setTheme] = useState<CardTheme>(initialTheme)
  const [touched, setTouched] = useState(false)
  const [paused, setPaused] = useState(false)
  const [hand, setHand] = useState({ visible: false, pressed: false, x: 0, y: 0 })
  const reduced = usePrefersReducedMotion()
  const demoTimers = useRef<number[]>([])
  const demoFrame = useRef(0)

  const stackRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef({ x: 0, y: 0 })
  const pointer = useRef<{ x: number; y: number; moved: boolean; samples: { x: number; t: number }[] } | null>(null)
  const busy = useRef(false)
  const buttons = useRef(new Map<number, HTMLButtonElement>())

  // Size of one app point in CSS px (the card is 340pt wide in the app).
  const [ptPx, setPtPx] = useState(1)
  const width = useCallback(() => stackRef.current?.offsetWidth ?? 340, [])
  const pt = useCallback(() => width() / 340, [width])
  useEffect(() => {
    const el = stackRef.current
    if (!el) return
    const ro = new ResizeObserver(() => setPtPx(el.offsetWidth / 340))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const setDragBoth = (next: { x: number; y: number }) => {
    dragRef.current = next
    setDrag(next)
  }

  // A point on the front card, after the card's own drag transform (rotation around its bottom centre).
  const pointOnCard = useCallback(
    (dx: number, dy: number) => {
    const w = width()
    const h = (w * 330) / 340
    const angle = ((dx / pt() / 25) * Math.PI) / 180
    const px = HAND_POINT.x * w - w / 2
    const py = HAND_POINT.y * h - h
    return {
      x: w / 2 + px * Math.cos(angle) - py * Math.sin(angle) + dx,
      y: h + px * Math.sin(angle) + py * Math.cos(angle) + dy * 0.1,
    }
    },
    [width, pt],
  )

  const fling = useCallback(
    (dir: 1 | -1) => {
      if (busy.current) return
      const from = dragRef.current
      dragRef.current = { x: 0, y: 0 }
      setDrag({ x: 0, y: 0 })
      setMode('cycle')
      const swiped = cards[0]
      const upcoming = nextWord.current
      nextWord.current = (upcoming + 1) % deckWords.length
      // the other cards move up; the swiped one becomes the last card
      setCards((cs) => [...cs.slice(1), cs[0]])
      const takeNextWord = () =>
        setCards((cs) => cs.map((c) => (c.id === swiped.id ? { ...c, word: upcoming } : c)))
      if (reduced) {
        takeNextWord()
        return
      }
      busy.current = true
      const w = width()
      setFlight({ id: swiped.id, phase: 'out', x: dir * w * 1.06, y: from.y * 0.1 - 8 * pt(), rotate: dir * 12 })
      window.setTimeout(() => setFlight((f) => (f ? { ...f, phase: 'back' } : f)), OUT_MS)
      window.setTimeout(() => {
        takeNextWord()
        setFlight(null)
        busy.current = false
      }, OUT_MS + BACK_MS)
    },
    [cards, reduced, width, pt],
  )

  // The app's DemoHandIndicator: the hand appears on the card, presses, drags it and lets go.
  const stopDemo = useCallback(() => {
    demoTimers.current.forEach((t) => window.clearTimeout(t))
    demoTimers.current = []
    cancelAnimationFrame(demoFrame.current)
    setHand((h) => ({ ...h, visible: false, pressed: false }))
  }, [])

  const demo = useCallback(() => {
    if (busy.current) return
    const later = (ms: number, fn: () => void) => demoTimers.current.push(window.setTimeout(fn, ms))
    const rest = pointOnCard(0, 0)
    setHand({ visible: true, pressed: false, ...rest })
    later(420, () => setHand((h) => ({ ...h, pressed: true })))
    later(620, () => {
      setMode('dragging')
      const target = 125 * pt()
      const t0 = performance.now()
      const step = (now: number) => {
        const p = Math.min(1, (now - t0) / 640)
        const eased = 0.5 - Math.cos(Math.PI * p) / 2
        const dx = target * eased
        setDragBoth({ x: dx, y: 0 })
        setHand((h) => ({ ...h, ...pointOnCard(dx, 0) }))
        if (p < 1) {
          demoFrame.current = requestAnimationFrame(step)
        } else {
          // the finger lifts where it is and fades; the card carries on
          setHand((h) => ({ ...h, pressed: false }))
          later(120, () => setHand((h) => ({ ...h, visible: false })))
          fling(1)
        }
      }
      demoFrame.current = requestAnimationFrame(step)
    })
  }, [fling, pointOnCard, pt])

  // Idle demo until the visitor touches the stack.
  useEffect(() => {
    if (touched || paused || reduced) return
    const id = window.setInterval(() => {
      if (document.visibilityState === 'visible') demo()
    }, AUTO_MS)
    return () => window.clearInterval(id)
  }, [touched, paused, reduced, demo])

  const onPointerDown = (e: PointerEvent<HTMLButtonElement>) => {
    if (busy.current || e.button !== 0) return
    try {
      e.currentTarget.setPointerCapture(e.pointerId)
    } catch {
      // the pointer may already be gone (e.g. a very short tap); dragging still works without capture
    }
    stopDemo()
    pointer.current = { x: e.clientX, y: e.clientY, moved: false, samples: [{ x: e.clientX, t: e.timeStamp }] }
    setTouched(true)
    setMode('dragging')
  }

  const onPointerMove = (e: PointerEvent<HTMLButtonElement>) => {
    const start = pointer.current
    if (!start) return
    const dx = e.clientX - start.x
    const dy = e.clientY - start.y
    if (Math.hypot(dx, dy) > 6) start.moved = true
    start.samples = [...start.samples.filter((s) => e.timeStamp - s.t < 90), { x: e.clientX, t: e.timeStamp }]
    setDragBoth({ x: dx, y: dy })
  }

  // The visitor's own swipes make the card sound; the idle demo calls fling() and stays silent.
  const swipe = (dir: 1 | -1) => {
    if (!busy.current) playSound('swipe', { volume: 0.6 })
    fling(dir)
  }

  const onPointerUp = () => {
    const start = pointer.current
    if (!start) return
    pointer.current = null
    const first = start.samples[0]
    const last = start.samples[start.samples.length - 1]
    const velocity = last.t > first.t ? (last.x - first.x) / (last.t - first.t) : 0
    const dx = dragRef.current.x
    if (Math.abs(dx) > SWIPE_PT * pt()) {
      swipe(dx > 0 ? 1 : -1)
    } else if (Math.abs(velocity) > FLICK_PX_PER_MS && Math.abs(dx) > 16) {
      swipe(velocity > 0 ? 1 : -1)
    } else if (!start.moved) {
      swipe(1)
    } else {
      setMode('release')
      setDragBoth({ x: 0, y: 0 })
    }
  }

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (['ArrowLeft', 'ArrowRight', 'Enter', ' '].includes(e.key)) {
      e.preventDefault()
      stopDemo()
      setTouched(true)
      const nextFront = cards[1]?.id
      swipe(e.key === 'ArrowLeft' ? -1 : 1)
      // keep keyboard focus on the deck: move it to the card that's now in front
      requestAnimationFrame(() => buttons.current.get(nextFront)?.focus({ preventScroll: true }))
    }
  }

  const behind = (level: number) => `translateY(calc(${level * 10} * var(--pt))) scale(${1 - level * 0.04})`

  const styleFor = (depth: number, id: number): CSSProperties => {
    if (flight?.id === id && flight.phase === 'out') {
      // sliding out to the side, above the rest of the deck
      return {
        zIndex: 40,
        pointerEvents: 'none',
        transform: `translate(${flight.x}px, ${flight.y}px) rotate(${flight.rotate}deg)`,
        transition: `transform ${OUT_MS}ms cubic-bezier(0.25, 0.75, 0.4, 1)`,
      }
    }
    if (flight?.id === id && flight.phase === 'back') {
      // already clear of the deck: drop behind it and tuck in as the last card
      return {
        zIndex: 1,
        pointerEvents: 'none',
        transform: behind(depth),
        transition: `transform ${BACK_MS}ms var(--spring-card)`,
      }
    }
    if (depth === 0) {
      return {
        zIndex: 30,
        transform: `translate(${drag.x}px, ${drag.y * 0.1}px) rotate(${drag.x / ptPx / 25}deg)`,
        transition:
          mode === 'dragging'
            ? 'none'
            : mode === 'release'
              ? 'transform 600ms var(--spring-card)'
              : `transform ${OUT_MS + 40}ms ease-out`,
      }
    }
    return {
      zIndex: 30 - depth * 10,
      pointerEvents: 'none',
      transform: behind(depth),
      transition: `transform ${OUT_MS + 40}ms ease-out`,
    }
  }

  const front = deckWords[cards[0].word]

  return (
    <div
      className="mx-auto w-full max-w-[440px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div ref={stackRef} className={cn('stack', stackClassName)} style={{ aspectRatio: '340 / 360' }}>
        <img
          src="/img/icons-app/hand.svg"
          alt=""
          aria-hidden="true"
          draggable={false}
          className="demo-hand"
          data-visible={hand.visible}
          data-pressed={hand.pressed}
          style={{ left: hand.x, top: hand.y }}
        />
        {/* DOM order stays fixed (by id): moving a node in the DOM would cancel its CSS transition.
            Depth only changes styles and z-index. */}
        {[...cards].sort((a, b) => a.id - b.id).map((card) => {
          const depth = cards.findIndex((c) => c.id === card.id)
          const w = deckWords[card.word]
          const isFront = depth === 0 && flight?.id !== card.id
          return (
            <button
              key={card.id}
              ref={(el) => {
                if (el) buttons.current.set(card.id, el)
                else buttons.current.delete(card.id)
              }}
              type="button"
              className="stack-item block w-full select-none text-left"
              data-front={isFront}
              style={styleFor(depth, card.id)}
              tabIndex={isFront ? 0 : -1}
              aria-hidden={isFront ? undefined : true}
              aria-label={isFront ? `${w.word}, ${w.pos}: ${w.meaning}. Show the next word` : undefined}
              onPointerDown={isFront ? onPointerDown : undefined}
              onPointerMove={isFront ? onPointerMove : undefined}
              onPointerUp={isFront ? onPointerUp : undefined}
              onPointerCancel={isFront ? onPointerUp : undefined}
              onKeyDown={isFront ? onKeyDown : undefined}
            >
              <AppWordCard word={w.word} pos={w.pos} meaning={w.meaning} theme={theme} />
            </button>
          )
        })}
      </div>
      <p className="sr-only" aria-live="polite">
        {touched ? `${front.word}: ${front.meaning}` : ''}
      </p>

      <div role="radiogroup" aria-label="Card color" className="mt-9 flex justify-center gap-3 sm:gap-5">
        {CARD_THEMES.map((t) => (
          <button
            key={t}
            type="button"
            role="radio"
            aria-checked={theme === t}
            data-card-theme={t}
            className="swatch press-pop flex flex-col items-center gap-2 rounded-xl px-1 py-1"
            onClick={() => {
              if (t !== theme) playSound('select')
              setTheme(t)
            }}
          >
            <span className="swatch-dot capsule">
              <TintIcon name="correct" className="swatch-check size-3.5" />
            </span>
            <span className={theme === t ? 'text-xs font-bold' : 'text-xs opacity-75'}>{themeNames[t]}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
