import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { AppIcon } from '@/components/AppIcon'
import { cn } from '@/lib/utils'

// The cards from the app's My Progress screen (LevelProgressCard, StreakWidget, WeekMedalsSection).
// They fill in once, when they scroll into view.

const days = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
const doneDays = 4
const medals = [
  { name: 'Bronze', img: '/img/badges/bronze.webp', earned: true },
  { name: 'Silver', img: '/img/badges/silver.webp', earned: true },
  { name: 'Gold', img: '/img/badges/gold.webp', earned: false },
  { name: 'Diamond', img: '/img/badges/diamond.webp', earned: false },
]

function useShownOnce<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold: 0.35 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return [ref, shown] as const
}

const card = 'rounded-3xl bg-surface px-5 py-4 text-ink shadow-[inset_0_0_0_1px_var(--color-ink)]'

export function ProgressCards() {
  const [ref, shown] = useShownOnce<HTMLDivElement>()
  const delay = (ms: number): CSSProperties => ({ transitionDelay: shown ? `${ms}ms` : '0ms' })

  return (
    <div ref={ref} className="keep-light flex w-full max-w-[420px] flex-col gap-3" aria-label="My Progress, as it looks in the app">
      <div className={card}>
        <div className="flex items-start justify-between">
          <div>
            <p className="font-display text-[1.6rem] font-bold leading-none">Level 6</p>
            <p className="mt-1 text-xs font-bold text-grey">8 XP to Level 7</p>
          </div>
          <img src="/img/misc/lightning.webp" alt="" width={38} height={60} loading="lazy" className="h-12 w-auto" />
        </div>
        <div className="mt-3 flex justify-between text-xs font-bold">
          <span>100 XP</span>
          <span className="text-grey">108 XP</span>
        </div>
        <div className="capsule mt-1.5 rounded-full bg-paper p-[3px] shadow-[inset_0_0_0_1px_var(--color-ink)]">
          <div
            className="capsule h-2.5 rounded-full bg-blue transition-[width] duration-[1100ms] [transition-timing-function:var(--spring-card)]"
            style={{ width: shown ? '93%' : '4%', ...delay(250) }}
          />
        </div>
      </div>

      <div className={card} data-arrow-target="streak">
        <div className="flex items-center gap-4">
          {/* The app's animated flame: 56 frames at 25 fps (StreakWidget). */}
          <span className="streak-fire" aria-hidden="true">
            <picture>
              <source srcSet="/img/misc/fire-still.webp" media="(prefers-reduced-motion: reduce)" />
              <img src="/img/misc/fire-anim.webp" alt="" width={34} height={52} loading="lazy" className="streak-fire-img" />
            </picture>
          </span>
          <div className="flex-1">
            <p className="font-display text-[1.45rem] font-bold leading-none">Your Streak</p>
            <ul className="mt-3 grid grid-cols-7 gap-1 text-center">
              {days.map((d, i) => {
                const done = i < doneDays
                return (
                  <li key={d} className="flex flex-col items-center gap-1.5">
                    <span className={cn('font-display text-[0.7rem]', i === doneDays - 1 ? 'font-bold text-ink' : 'text-ink/45')}>{d}</span>
                    <span className="relative grid size-7 place-items-center">
                      <AppIcon name="pending" keepColors className="size-7" />
                      {done && (
                        <AppIcon
                          name="completed"
                          keepColors
                          className="absolute inset-0 size-7 transition-[transform,opacity] duration-[600ms] [transition-timing-function:var(--spring-pop)]"
                          style={{ transform: shown ? 'scale(1)' : 'scale(0.2)', opacity: shown ? 1 : 0, ...delay(400 + i * 110) }}
                        />
                      )}
                    </span>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>

      <div className={card}>
        <p className="font-display text-[1.45rem] font-bold leading-none">Daily Medals</p>
        <ul className="mt-3 flex justify-between px-1">
          {medals.map((m, i) => (
            <li key={m.name}>
              <img
                src={m.img}
                alt={m.earned ? `${m.name} medal` : `${m.name} medal, not earned yet`}
                width={52}
                height={70}
                loading="lazy"
                className={cn(
                  'h-16 w-auto transition-[transform,opacity] duration-[600ms] [transition-timing-function:var(--spring-pop)]',
                  !m.earned && 'opacity-30 grayscale',
                )}
                style={m.earned ? { transform: shown ? 'none' : 'translateY(-14px) scale(0.8)', opacity: shown ? 1 : 0, ...delay(900 + i * 140) } : undefined}
              />
            </li>
          ))}
        </ul>
      </div>

      {[
        { icon: 'saved-words', label: 'Saved Words' },
        { icon: 'my-progress', label: 'Achievements' },
      ].map((row) => (
        <div key={row.label} className="capsule flex items-center justify-center gap-4 rounded-full bg-surface py-2.5 text-ink shadow-[inset_0_0_0_1px_var(--color-ink)]">
          <AppIcon name={row.icon} keepColors className="h-8 w-auto" />
          <span className="text-[0.9rem]">{row.label}</span>
        </div>
      ))}
    </div>
  )
}
