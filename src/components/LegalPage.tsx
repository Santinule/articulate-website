import { Children, isValidElement, useEffect, useRef, useState } from 'react'
import type { ReactElement, ReactNode } from 'react'
import { ArrowUp } from 'lucide-react'
import { MetaTable, PageHero } from '@/components/PageHero'

// Layout for the legal pages (Privacy, Terms), in the site's look: a big title with a highlight, the
// dates and provider in a small table, a table of contents that follows you (a sidebar on desktop, a
// sticky row of chips on phones and tablets) and numbered sections. The legal text is passed in unchanged.

type SectionProps = { n: number; title: string; children: ReactNode }

const anchor = (n: number, title: string) =>
  `${n}-${title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')}`

/** One numbered section: "1. Information We Collect" with the number in a badge. */
export function LegalSection({ n, title, children }: SectionProps) {
  return (
    <section id={anchor(n, title)} className="legal-section">
      <h2>
        <span className="legal-num capsule" aria-hidden="true">
          {n}
        </span>
        <span className="sr-only">{n}. </span>
        {title}
      </h2>
      {children}
    </section>
  )
}

function Contents({ sections, active }: { sections: { id: string; n: number; title: string }[]; active?: string }) {
  return (
    <ol className="legal-toc-list">
      {sections.map((s) => (
        <li key={s.id}>
          <a href={`#${s.id}`} aria-current={active === s.id ? 'location' : undefined} className="capsule">
            <span className="legal-num capsule" aria-hidden="true">
              {s.n}
            </span>
            {s.title}
          </a>
        </li>
      ))}
    </ol>
  )
}

/** Phones and tablets: the sections as a row of chips that sticks under the header and keeps the one
 * you're reading in view. */
function ContentsBar({ sections, active }: { sections: { id: string; n: number; title: string }[]; active?: string }) {
  const row = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const box = row.current
    const chip = box?.querySelector<HTMLElement>('[aria-current]')
    if (!box || !chip) return
    // scroll the row sideways only (scrollIntoView could also move the page)
    box.scrollTo({ left: chip.offsetLeft - (box.clientWidth - chip.offsetWidth) / 2, behavior: 'smooth' })
  }, [active])
  return (
    <nav aria-label="On this page" className="legal-bar lg:hidden">
      <div ref={row} className="legal-bar-row">
        <span className="legal-bar-label">On this page</span>
        {sections.map((s) => (
          <a key={s.id} href={`#${s.id}`} aria-current={active === s.id ? 'location' : undefined} className="legal-chip capsule">
            <span className="legal-num capsule" aria-hidden="true">
              {s.n}
            </span>
            {s.title}
          </a>
        ))}
      </div>
    </nav>
  )
}

export function LegalPage({
  title,
  emph,
  icon,
  meta,
  intro,
  children,
}: {
  /** "Privacy" — the title reads `${title} ${emph}`, with `emph` highlighted */
  title: string
  emph: string
  /** an icon from the app (public/img/icons-app) next to the title */
  icon: string
  /** dates, provider and contact, as they appear at the top of the document */
  meta: { label: string; value: ReactNode }[]
  intro: ReactNode
  children: ReactNode
}) {
  const sections = Children.toArray(children)
    .filter((c): c is ReactElement<SectionProps> => isValidElement(c) && c.type === LegalSection)
    .map((c) => ({ id: anchor(c.props.n, c.props.title), n: c.props.n, title: c.props.title }))
  const ids = sections.map((s) => s.id).join(' ')
  const [active, setActive] = useState<string>()

  // Highlight the section you're reading: the one crossing a band a quarter of the way down the screen.
  useEffect(() => {
    const els = ids
      .split(' ')
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
        if (hit) setActive(hit.target.id)
      },
      { rootMargin: '-25% 0px -65% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [ids])

  return (
    <div className="legal mx-auto w-full max-w-[1180px] px-5 pb-24 pt-12 sm:px-8 sm:pt-16">
      <PageHero tag="Legal" title={title} emph={emph} icon={icon}>
        <MetaTable rows={meta} />
      </PageHero>

      <div className="relative mt-12 lg:mt-16 lg:grid lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-16">
        <aside className="hidden lg:block">
          <nav aria-label="On this page" className="legal-toc">
            <p className="legal-toc-title">On this page</p>
            <Contents sections={sections} active={active} />
          </nav>
        </aside>

        <div className="legal-body min-w-0 max-w-[72ch]">
          <ContentsBar sections={sections} active={active} />

          <div className="legal-intro">{intro}</div>
          {children}

          <button type="button" className="legal-top capsule" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <ArrowUp className="size-4" strokeWidth={2.4} aria-hidden="true" />
            Back to top
          </button>
        </div>
      </div>
    </div>
  )
}
