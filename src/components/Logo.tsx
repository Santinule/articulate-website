import { LOGO_PATHS, LOGO_VIEWBOX } from '@/lib/logo'

// The pencil "A" from the iOS app (Assets.xcassets/home-card-logo), recolorable via currentColor.

export function LogoMark({ className, title }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox={`0 0 ${LOGO_VIEWBOX.width} ${LOGO_VIEWBOX.height}`}
      className={className}
      fill="currentColor"
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {LOGO_PATHS.map((d) => (
        <path key={d.slice(0, 12)} d={d} />
      ))}
    </svg>
  )
}

/**
 * "Articulate" with the pencil logo standing in for its first letter. The logo is exactly as tall as
 * Akshar's capitals (0.72em) and sits on the text baseline, so it reads as the word's "A".
 * Size it with a font-size class (e.g. text-[1.6rem]).
 */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={`wordmark ${className ?? 'text-[1.6rem]'}`}>
      <span className="sr-only">Articulate</span>
      <span className="wordmark-word" aria-hidden="true">
        <LogoMark className="wordmark-a" />
        rticulate
      </span>
    </span>
  )
}
