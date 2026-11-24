import type { CSSProperties, ReactNode } from 'react'
import { AppIcon } from '@/components/AppIcon'
import { Blob, Chip, Emph, Label, Scribble } from '@/components/Editorial'
import { cn } from '@/lib/utils'

// Slides 2–4 of the "Fix the Sentence" Instagram post, as one row: weak sentence → the word → better sentence.

function Slide({ children, className, delay = '0s' }: { children: ReactNode; className?: string; delay?: string }) {
  return (
    <li
      data-reveal="rise"
      style={{ '--reveal-delay': delay } as CSSProperties}
      className={cn('relative isolate flex min-h-[460px] flex-col items-center justify-center overflow-hidden rounded-[30px] bg-paper px-6 py-12 text-center', className)}
    >
      {children}
    </li>
  )
}

/** A white card with an ink outline and a second card peeking out behind it, as in the posts. */
function OutlinedCard({
  children,
  className,
  tilt = '-rotate-3',
  delay = '0.2s',
}: {
  children: ReactNode
  className?: string
  tilt?: string
  delay?: string
}) {
  return (
    <div data-reveal="tilt" style={{ '--reveal-delay': delay } as CSSProperties} className={cn('relative', tilt, className)}>
      <div className="absolute inset-0 translate-x-2 translate-y-2 rotate-[4deg] rounded-[18px] bg-paper shadow-[inset_0_0_0_2.5px_var(--color-ink)]" aria-hidden="true" />
      <div className="relative rounded-[18px] bg-surface px-6 py-6 shadow-[inset_0_0_0_2.5px_var(--color-ink)]">{children}</div>
    </div>
  )
}

export function FixTheSentence() {
  return (
    // keep-light: the slides stay as light as the Instagram posts, in dark mode too
    <ol className="keep-light grid gap-4 md:grid-cols-3" aria-label="How Articulate fixes a sentence">
      <Slide>
        <Blob drift={false} variant={2} className="-bottom-[38%] -left-[30%] w-[120%]" />
        <Label>Weak sentence</Label>
        <div className="relative mt-3" data-arrow-target="weak-word">
          <p className="display text-[clamp(2.1rem,3.4vw,2.9rem)]">
            She was
            <br />
            <Emph>very tired</Emph>
            <br />
            after work.
          </p>
          {/* below the sentence's bottom-right corner, arrow curling up into it */}
          <Scribble arrow="up-left" target="weak-word" className="absolute -bottom-12 -right-10 rotate-[-8deg] sm:-right-14">
            Problem
          </Scribble>
        </div>
        <AppIcon name="battery-low" keepColors reveal="wobble" style={{ '--reveal-delay': '0.35s' } as CSSProperties} className="absolute bottom-5 left-5 w-20 rotate-[-14deg]" />
      </Slide>

      <Slide>
        <Blob drift={false} variant={0} className="-right-[35%] -top-[30%] w-[115%]" />
        <OutlinedCard className="w-full max-w-[270px]">
          <span className="tag absolute -left-3 -top-5 rotate-[-4deg] text-ink">meaning</span>
          <p className="font-display text-[2.3rem] font-bold leading-none">
            <span className="relative">
              Lethargic
              <svg viewBox="0 0 200 14" preserveAspectRatio="none" className="blue-line absolute -bottom-2 left-0 h-2 w-full" aria-hidden="true">
                <path d="M4 9 C 60 3, 140 3, 196 8" fill="none" stroke="var(--color-blue)" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </span>
          </p>
          <span className="capsule mt-4 inline-block rounded-full bg-blue px-3 py-0.5 text-[0.78rem] font-medium text-white">adjective</span>
          <p className="mt-3 text-[0.98rem] font-bold leading-snug">Feeling a lack of energy or enthusiasm; sluggish.</p>
        </OutlinedCard>
        <AppIcon name="coffee-book" keepColors reveal="wobble" style={{ '--reveal-delay': '0.45s' } as CSSProperties} className="absolute bottom-4 right-4 w-28" />
      </Slide>

      <Slide>
        <Blob drift={false} variant={1} className="-bottom-[45%] -right-[30%] w-[125%]" />
        <Label>Better sentence</Label>
        <OutlinedCard className="mt-4 w-full max-w-[290px]" tilt="rotate-1">
          <p className="text-[1.3rem] font-bold leading-snug">
            She was <Chip>lethargic</Chip> after work.
          </p>
        </OutlinedCard>
        <p className="mt-6 flex items-center gap-2 font-display text-[1.5rem] font-medium text-blue">
          <svg viewBox="0 0 24 24" className="size-7" aria-hidden="true" data-reveal="draw" style={{ '--reveal-delay': '0.6s' } as CSSProperties}>
            <circle cx="12" cy="12" r="10.5" pathLength={1} fill="none" stroke="currentColor" strokeWidth="2" transform="rotate(-90 12 12)" />
            <path d="M7.2 12.4 L10.6 15.6 L16.8 8.8" pathLength={1} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Solved
        </p>
      </Slide>
    </ol>
  )
}
