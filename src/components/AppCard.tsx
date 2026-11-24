import { useId } from 'react'
import { LOGO_PATHS, LOGO_VIEWBOX } from '@/lib/logo'
import { squirclePath } from '@/lib/squircle'
import { cn } from '@/lib/utils'
import type { CardTheme } from '@/lib/cardThemes'

// Web versions of the app's word cards. Colors per theme live in index.css ([data-card-theme]).


// HomeWordCard.swift: 340×330pt, corner radius 40, 1.5pt border, logo 246.93×314.49 at x 182.4, 15.64 from the bottom.
const W = 340
const H = 330
const CARD_PATH = squirclePath(W, H, [40, 40, 40, 40])
const BORDER_PATH = squirclePath(W - 1.5, H - 1.5, [39.25, 39.25, 39.25, 39.25])
const LOGO = { x: 182.4, y: H - 15.64 - 314.49, w: 246.93, h: 314.49 }

type CardProps = {
  word: string
  pos: string
  meaning: string
  theme: CardTheme
  hint?: string | null
  className?: string
}

/** HomeWordCard: the card on the app's home screen. Sized by its container (any width, fixed ratio). */
export function AppWordCard({ word, pos, meaning, theme, hint = 'Swipe to Continue', className }: CardProps) {
  const clipId = useId()
  return (
    <div className={cn('app-card', className)} data-card-theme={theme}>
      <svg className="app-card-shape" viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
        <defs>
          <clipPath id={clipId}>
            <path d={CARD_PATH} />
          </clipPath>
        </defs>
        <path d={CARD_PATH} className="app-card-fill" />
        <g clipPath={`url(#${clipId})`}>
          <svg
            x={LOGO.x}
            y={LOGO.y}
            width={LOGO.w}
            height={LOGO.h}
            viewBox={`0 0 ${LOGO_VIEWBOX.width} ${LOGO_VIEWBOX.height}`}
            className="app-card-logo"
          >
            {LOGO_PATHS.map((d) => (
              <path key={d.slice(0, 12)} d={d} />
            ))}
          </svg>
        </g>
        <path d={BORDER_PATH} transform="translate(0.75 0.75)" className="app-card-border" />
      </svg>
      <div className="app-card-content">
        <p lang="en" className="app-card-word">
          {word}
        </p>
        <span className="app-card-badge">{pos}</span>
        <span className="app-card-label">Definition:</span>
        <p className="app-card-meaning">{meaning}</p>
        {hint && <span className="app-card-hint">{hint}</span>}
      </div>
    </div>
  )
}

/** The smaller word cards used inside games (Semantic Scale, Word Confusor). */
export function MiniWordCard({ word, meaning, theme, className }: Omit<CardProps, 'pos' | 'hint'>) {
  return (
    <div className={cn('mini-card', className)} data-card-theme={theme}>
      <svg className="mini-card-logo" viewBox={`0 0 ${LOGO_VIEWBOX.width} ${LOGO_VIEWBOX.height}`} aria-hidden="true">
        {LOGO_PATHS.map((d) => (
          <path key={d.slice(0, 12)} d={d} />
        ))}
      </svg>
      <p lang="en" className="mini-card-word">
        {word}
      </p>
      <span className="mini-card-label">Definition:</span>
      <p className="mini-card-meaning">{meaning}</p>
    </div>
  )
}
