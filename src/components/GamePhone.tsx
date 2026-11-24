import { useRef, useState } from 'react'
import type { CSSProperties, KeyboardEvent, PointerEvent } from 'react'
import { AppIcon } from '@/components/AppIcon'
import { StatusBar } from '@/components/StatusBar'
import { games } from '@/data/content'
import { playSound } from '@/lib/sound'
import { cn } from '@/lib/utils'

// Swipe: past this distance, or a quick flick, changes the screen.
const SWIPE_PX = 40
const FLICK_PX_PER_MS = 0.35
// At the first and last screen there's nothing to pull in, so the screen only gives a little.
const EDGE_RESISTANCE = 0.3

/**
 * iPhone frame around real screenshots. The screens sit side by side like pages on iOS: picking a game
 * slides the row, and a swipe drags it under your finger (the next screen peeks in), then glides into
 * place. Past the first or last screen it stretches a little and springs back.
 */
function PhoneFrame({ active, onSwipe }: { active: number; onSwipe: (dir: 1 | -1) => void }) {
  const [drag, setDrag] = useState<number | null>(null)
  const start = useRef<{ x: number; t: number } | null>(null)
  const last = games.length - 1

  const down = (e: PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return
    start.current = { x: e.clientX, t: e.timeStamp }
    try {
      e.currentTarget.setPointerCapture(e.pointerId)
    } catch {
      // capture is optional
    }
  }
  const move = (e: PointerEvent<HTMLDivElement>) => {
    if (!start.current) return
    const dx = e.clientX - start.current.x
    const pastEdge = (active === 0 && dx > 0) || (active === last && dx < 0)
    setDrag(pastEdge ? dx * EDGE_RESISTANCE : dx)
  }
  const up = (e: PointerEvent<HTMLDivElement>) => {
    if (!start.current) return
    const dx = drag ?? 0
    const speed = dx / Math.max(1, e.timeStamp - start.current.t)
    start.current = null
    setDrag(null)
    const next = dx < -SWIPE_PX || (speed < -FLICK_PX_PER_MS && dx < -12)
    const prev = dx > SWIPE_PX || (speed > FLICK_PX_PER_MS && dx > 12)
    if (next && active < last) onSwipe(1)
    else if (prev && active > 0) onSwipe(-1)
  }

  return (
    <div className="phone mx-auto w-[min(300px,calc(100vw-120px))] lg:w-[min(320px,78vw)]" data-arrow-target="game-phone">
      <div className="device">
        {/* the screen sits in the bezel's transparent window, slightly under its edge */}
        <div
          className="device-screen cursor-grab active:cursor-grabbing"
          data-dragging={drag !== null}
          style={{ '--drag': `${drag ?? 0}px` } as CSSProperties}
          onPointerDown={down}
          onPointerMove={move}
          onPointerUp={up}
          onPointerCancel={up}
        >
          {games.map((g, i) => (
            <img
              key={g.title}
              src={g.img}
              alt={i === active ? g.alt : ''}
              aria-hidden={i === active ? undefined : true}
              width={603}
              height={1311}
              // all five load up front (160 KB in all), so a screen is never blank as it slides in
              fetchPriority={i === 0 ? 'high' : 'low'}
              decoding="async"
              draggable={false}
              className="phone-shot"
              style={{ '--offset': i - active } as CSSProperties}
            />
          ))}
          <StatusBar className="device-status" />
        </div>
        <img src="/img/device/iphone16-bezel.webp" alt="" aria-hidden="true" width={1359} height={2736} draggable={false} className="device-bezel" />
      </div>
    </div>
  )
}

/** The five games: pick one on the left, see the real screen in the phone. */
export function GamePhone() {
  const [active, setActive] = useState(0)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  // Tabs tap like the app's game tiles; swiping the screen flicks like a card.
  const go = (i: number, focus = false, swiped = false) => {
    const next = (i + games.length) % games.length
    if (next !== active) playSound(swiped ? 'swipe' : 'tap', swiped ? { volume: 0.35, rate: 1.4 } : { volume: 0.8 })
    setActive(next)
    if (focus) tabRefs.current[next]?.focus()
  }

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault()
      go(active + 1, true)
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault()
      go(active - 1, true)
    }
  }

  const current = games[active]

  return (
    // phones and tablets: the phone with a column of game icons beside it, the text below;
    // desktop: the named list, the phone, the text (see .game-layout)
    <div className="game-layout">
      <div role="tablist" aria-label="Games" aria-orientation="vertical" className="game-layout-tabs">
        <ul className="flex flex-col gap-2 lg:gap-1.5">
          {games.map((g, i) => (
            <li key={g.title} className="shrink-0">
              <button
                ref={(el) => {
                  tabRefs.current[i] = el
                }}
                type="button"
                role="tab"
                id={`game-tab-${i}`}
                aria-selected={i === active}
                aria-label={g.title}
                aria-controls="game-panel"
                tabIndex={i === active ? 0 : -1}
                onClick={() => go(i)}
                onKeyDown={onKeyDown}
                className={cn(
                  // phones: just the round icon (a lavender ring when selected); desktop: icon and name
                  'press-pop flex items-center gap-3 rounded-full p-1 text-left transition-colors lg:w-full lg:rounded-2xl lg:py-2.5 lg:pl-2.5 lg:pr-5',
                  // the selected game stays light in dark mode (keep-light), the others follow the page
                  i === active ? 'keep-light bg-lavender-pale text-ink max-lg:bg-lavender' : 'text-ink-soft hover:bg-ink/[0.04] hover:text-ink',
                )}
              >
                <span className={cn('icon-dot capsule grid size-10 shrink-0 place-items-center rounded-full transition-colors', i === active ? 'bg-surface' : 'bg-lavender-pale')}>
                  <AppIcon name={g.icon} keepColors className="size-7" />
                </span>
                <span className="hidden whitespace-nowrap font-display text-[1.3rem] font-semibold leading-tight lg:inline">{g.title}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="game-layout-phone">
        <PhoneFrame active={active} onSwipe={(dir) => go(active + dir, false, true)} />
      </div>

      <div id="game-panel" role="tabpanel" aria-labelledby={`game-tab-${active}`} className="game-layout-panel text-center lg:text-left">
        {/* phones: the icons have no names, so the selected game's name sits above its text */}
        <p key={`name-${current.title}`} className="pop-in mb-3 lg:hidden">
          <span className="capsule inline-block rounded-full bg-lavender-pale px-3.5 py-1 font-display text-[1rem] font-semibold text-ink">
            {current.title}
          </span>
        </p>
        <p key={current.title} className="pop-in mx-auto max-w-[22rem] font-display text-[clamp(1.6rem,3vw,2.2rem)] font-semibold leading-tight lg:mx-0">
          {current.text}
        </p>
      </div>
    </div>
  )
}
