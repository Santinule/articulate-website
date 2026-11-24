import type { CSSProperties } from 'react'
import { useShownTheme } from '@/lib/theme'
import { cn } from '@/lib/utils'

// Icons from the iOS app (Assets.xcassets/svg), copied to public/img/icons-app. In dark mode they use the
// copies in icons-app/dark: the same drawing and colors, with the Ink Navy lines in the app's Cool Grey
// (scripts/make-dark-icons.mjs, `npm run icons:dark`).

const src = (name: string, dark = false) => `/img/icons-app/${dark ? 'dark/' : ''}${name}.svg`

/** An icon drawn in its own colors (renderingMode(.original) in the app). */
export function AppIcon({
  name,
  className,
  alt = '',
  style,
  reveal,
  keepColors,
}: {
  name: string
  className?: string
  alt?: string
  style?: CSSProperties
  /** a micro-animation to play when it scrolls into view (see useReveal), e.g. "wobble" */
  reveal?: string
  /** keep the navy lines in dark mode, on the cards that stay white like the app (.keep-light) */
  keepColors?: boolean
}) {
  const dark = useShownTheme() === 'dark' && !keepColors
  return (
    <img
      src={src(name, dark)}
      alt={alt}
      className={cn('inline-block shrink-0', className)}
      style={style}
      data-reveal={reveal}
      draggable={false}
    />
  )
}

/** An icon the app tints (renderingMode(.template)): takes the current text color. */
export function TintIcon({ name, className }: { name: string; className?: string }) {
  return <span aria-hidden="true" className={cn('mask-icon', className)} style={{ '--icon': `url(${src(name)})` } as CSSProperties} />
}
