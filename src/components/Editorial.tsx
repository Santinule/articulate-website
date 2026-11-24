import { useEffect, useRef } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion'

// The look of the "Fix the Sentence" Instagram posts: highlight boxes, a blue chip for the right word,
// outlined tilted tags with thin arrows, small labels with a down arrow, and soft pastel blobs.

/** Key words inside a pastel box, optionally with a blue marker swoosh under it. */
export function Emph({ children, box = 'var(--color-lavender)', swoosh }: { children: ReactNode; box?: string; swoosh?: string }) {
  return (
    <span className="emph" style={{ '--emph-box': box, '--emph-line': swoosh } as CSSProperties}>
      {children}
      {swoosh && (
        <svg className="emph-line" viewBox="0 0 200 30" preserveAspectRatio="none" aria-hidden="true">
          <path d="M14 18 C 70 10, 130 6, 192 4" pathLength={1} />
          <path d="M40 27 C 90 20, 140 16, 186 14" pathLength={1} />
        </svg>
      )}
    </span>
  )
}

/** The right word, in a blue chip with white text ("lethargic" in the posts). */
export function Chip({ children, delay = '0.45s' }: { children: ReactNode; delay?: string }) {
  return (
    <span className="word-chip" data-reveal="pop" style={{ '--reveal-delay': delay } as CSSProperties}>
      {children}
    </span>
  )
}

export type ArrowDir = 'down-left' | 'down-right' | 'up-left' | 'up-right' | 'left' | 'right'

// Two thin hand-drawn shapes: a curl that ends pointing down, and a sweep that ends pointing sideways.
// `tip` is where the arrowhead points, used to check that every arrow lands on its target.
const shapes = {
  curl: { line: 'M6 8 C 26 0, 46 8, 50 38', head: 'M42.5 31.5 L 50 40 L 55.5 30', tip: [50, 40] },
  sweep: { line: 'M4 32 C 18 10, 40 6, 58 18', head: 'M49 11 L 58.5 18 L 50 25', tip: [58.5, 18] },
} as const

const arrows: Record<ArrowDir, { shape: keyof typeof shapes; flip: string }> = {
  'down-right': { shape: 'curl', flip: 'none' },
  'down-left': { shape: 'curl', flip: 'scaleX(-1)' },
  'up-right': { shape: 'curl', flip: 'scaleY(-1)' },
  'up-left': { shape: 'curl', flip: 'scale(-1, -1)' },
  right: { shape: 'sweep', flip: 'none' },
  left: { shape: 'sweep', flip: 'scaleX(-1)' },
}

function Arrow({ dir }: { dir: ArrowDir }) {
  const { shape, flip } = arrows[dir]
  const s = shapes[shape]
  return (
    <svg
      viewBox="0 0 64 54"
      className="scribble-arrow overflow-visible"
      style={{ transform: flip }}
      data-tip-x={s.tip[0]}
      data-tip-y={s.tip[1]}
      aria-hidden="true"
    >
      <path d={s.line} pathLength={1} />
      <path d={s.head} pathLength={1} />
    </svg>
  )
}

/**
 * A handwritten note. With `arrow`, the arrow sits on the side it points to:
 * left/down-left/up-left before the text, the rest after it.
 */
export function Scribble({
  children,
  arrow,
  target,
  className,
}: {
  children: ReactNode
  arrow?: ArrowDir
  target?: string
  className?: string
}) {
  const before = arrow === 'left' || arrow === 'down-left' || arrow === 'up-left'
  return (
    <span aria-hidden="true" data-target={target} className={cn('scribble inline-flex', before && 'flex-row-reverse', className)}>
      <span>{children}</span>
      {arrow && <Arrow dir={arrow} />}
    </span>
  )
}

/** "Weak sentence ↓": a small label with a thin arrow pointing at what follows. */
export function Label({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn('flex flex-col items-center gap-1 font-display text-[1.15rem] font-medium text-ink', className)}>
      {children}
      <svg viewBox="0 0 14 22" className="h-5 w-auto" aria-hidden="true" data-reveal="draw">
        <path d="M7 1 V 20 M1.5 14.5 L7 20.5 L12.5 14.5" pathLength={1} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  )
}

// Lava-lamp blobs. Each variant has three smooth outlines built the same way (8 points joined by a
// Catmull-Rom curve), so the shape can melt from one into the next with SMIL, which every browser runs.
// On top of that the whole blob drifts and turns a little (CSS, `.blob-drift`). Off-screen blobs pause.
type BlobVariant = 0 | 1 | 2
const BLOB_SHAPES: Record<BlobVariant, { sx: number; sy: number; frames: number[][] }> = {
  0: {
    sx: 1,
    sy: 0.96,
    frames: [
      [262, 274, 246, 280, 252, 270, 238, 276],
      [280, 244, 276, 250, 280, 236, 268, 248],
      [246, 280, 262, 240, 272, 280, 250, 258],
    ],
  },
  1: {
    sx: 1.04,
    sy: 0.88,
    frames: [
      [250, 280, 262, 270, 236, 278, 256, 268],
      [272, 254, 280, 240, 266, 250, 280, 242],
      [240, 270, 248, 280, 258, 262, 240, 280],
    ],
  },
  2: {
    sx: 0.92,
    sy: 1.02,
    frames: [
      [270, 256, 280, 244, 268, 252, 280, 240],
      [248, 280, 250, 276, 240, 280, 256, 270],
      [280, 240, 268, 262, 280, 238, 262, 276],
    ],
  },
}
// The outline also turns a little between frames, so it seems to flow rather than breathe.
const FRAME_TURN = [0, 0.16, -0.1]

const f = (n: number) => Math.round(n * 10) / 10

function blobPath(radii: number[], sx: number, sy: number, turn: number) {
  const n = radii.length
  const pts = radii.map((r, i) => {
    const a = turn - Math.PI / 2 + (i / n) * Math.PI * 2
    return [300 + Math.cos(a) * r * sx, 300 + Math.sin(a) * r * sy]
  })
  let d = `M${f(pts[0][0])} ${f(pts[0][1])}`
  for (let i = 0; i < n; i++) {
    const [p0, p1, p2, p3] = [pts[(i + n - 1) % n], pts[i], pts[(i + 1) % n], pts[(i + 2) % n]]
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6]
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6]
    d += `C${f(c1[0])} ${f(c1[1])} ${f(c2[0])} ${f(c2[1])} ${f(p2[0])} ${f(p2[1])}`
  }
  return d + 'Z'
}

const blobFrames = ([0, 1, 2] as const).map((v) => {
  const { sx, sy, frames } = BLOB_SHAPES[v]
  return frames.map((r, i) => blobPath(r, sx, sy, FRAME_TURN[i]))
})

// A stable number per blob, so blobs on the same screen never move in step.
function seedOf(text: string) {
  let h = 2166136261
  for (let i = 0; i < text.length; i++) h = Math.imul(h ^ text.charCodeAt(i), 16777619)
  return (h >>> 0) / 4294967296
}

// Phones and tablets skip the outline morph: animating `d` repaints the whole SVG every frame, and on
// iPhones that starved Safari's painting so parts of the page showed up blank and popped in late.
// The drift is a transform (composited, no repaint), so it stays.
const TOUCH = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches

// One observer for every blob: animations only run while the blob is near the screen.
let blobObserver: IntersectionObserver | undefined
function watchBlob(svg: SVGSVGElement) {
  blobObserver ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const el = entry.target as SVGSVGElement
        if (entry.isIntersecting) {
          el.unpauseAnimations()
          el.removeAttribute('data-paused')
        } else {
          el.pauseAnimations()
          el.setAttribute('data-paused', '')
        }
      }
    },
    { rootMargin: '120px 0px' },
  )
  blobObserver.observe(svg)
  return () => blobObserver?.unobserve(svg)
}

/**
 * Soft pastel shape behind a visual, like the lavender blobs in the posts. It moves like a lava lamp.
 * Pass `drift={false}` inside a rounded `overflow-hidden` card: the drift is a transform animation,
 * and on real iPhones a moving layer clipped by rounded corners made the whole card vanish. The
 * outline still melts (that only repaints the SVG).
 */
export function Blob({
  className,
  color = 'var(--color-blob)',
  variant = 0,
  drift = true,
}: {
  className?: string
  color?: string
  variant?: BlobVariant
  drift?: boolean
}) {
  const reduced = usePrefersReducedMotion()
  const ref = useRef<SVGSVGElement>(null)
  useEffect(() => {
    if (reduced || !ref.current) return
    return watchBlob(ref.current)
  }, [reduced])

  const [a, b, c] = blobFrames[variant]
  const seed = seedOf(`${variant}${className ?? ''}`)
  const morph = 18 + seed * 8 // seconds per shape cycle
  const swing = 24 + ((seed * 7) % 1) * 10 // seconds per drift swing
  return (
    <svg
      ref={ref}
      viewBox="0 0 600 600"
      className={cn('blob pointer-events-none absolute -z-10', drift && 'blob-drift', className)}
      style={{ '--blob-drift': `${swing.toFixed(1)}s`, '--blob-delay': `${(-seed * swing).toFixed(1)}s` } as CSSProperties}
      aria-hidden="true"
    >
      <path d={a} style={{ fill: color }}>
        {!reduced && !TOUCH && (
          <animate
            attributeName="d"
            values={`${a};${b};${c};${a}`}
            keyTimes="0;0.33;0.67;1"
            calcMode="spline"
            keySplines="0.45 0 0.55 1;0.45 0 0.55 1;0.45 0 0.55 1"
            dur={`${morph.toFixed(1)}s`}
            begin={`${(-seed * morph).toFixed(1)}s`}
            repeatCount="indefinite"
          />
        )}
      </path>
    </svg>
  )
}
