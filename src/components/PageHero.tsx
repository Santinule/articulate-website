import type { ReactNode } from 'react'
import { AppIcon } from '@/components/AppIcon'
import { Blob, Emph } from '@/components/Editorial'

// The top of the inner pages (Support, Privacy, Terms): a small tilted tag, a big title with one word
// highlighted, and an app icon on a pastel blob. Styles: "Inner pages" in index.css.

export function PageHero({
  tag,
  title,
  emph,
  after,
  icon,
  children,
}: {
  tag: string
  /** the title reads `${title} ${emph}${after}`, with `emph` highlighted */
  title: string
  emph: string
  after?: string
  /** an icon from the app (public/img/icons-app) */
  icon: string
  children?: ReactNode
}) {
  return (
    <header className="legal-hero">
      {/* small, behind the icon: the hero is a positioned layer, so a big blob would paint over the text below */}
      <Blob variant={0} className="-right-[2%] -top-[22%] w-[min(300px,42%)]" />
      <AppIcon name={icon} reveal="wobble" className="legal-hero-icon" />
      <span className="tag rotate-[-3deg] text-ink">{tag}</span>
      <h1>
        {title}{' '}
        {/* the highlighted word and what follows it ("help?") never split across lines */}
        <span className="whitespace-nowrap">
          <Emph>{emph}</Emph>
          {after}
        </span>
      </h1>
      {children}
    </header>
  )
}

/** Label/value rows with hairlines, like the header of a document. */
export function MetaTable({ rows }: { rows: { label: string; value: ReactNode }[] }) {
  return (
    <dl className="legal-meta">
      {rows.map((r) => (
        <div key={r.label}>
          <dt>{r.label}</dt>
          <dd>{r.value}</dd>
        </div>
      ))}
    </dl>
  )
}
