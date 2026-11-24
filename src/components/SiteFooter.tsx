import { Link } from 'react-router-dom'
import type { LucideIcon } from 'lucide-react'
import { ArrowUpRight, CircleHelp, Gamepad2, LifeBuoy, Route, ScrollText, ShieldCheck, Star, Trophy, Gift } from 'lucide-react'
import { AppleIcon } from '@/components/AppStoreButton'
import { Wordmark } from '@/components/Logo'
import { APP_STORE_URL, COMPANY, CONTACT_EMAIL, REVIEW_URL } from '@/data/content'

type FooterLink = {
  label: string
  to: string
  icon: LucideIcon | typeof AppleIcon
  tint: string
  external?: boolean
}

const columns: { title: string; links: FooterLink[] }[] = [
  {
    title: 'The app',
    links: [
      { label: 'How it works', to: '/#how-it-works', icon: Route, tint: 'bg-blue text-ink' },
      { label: 'Games', to: '/#games', icon: Gamepad2, tint: 'bg-lavender text-ink' },
      { label: 'Achievements', to: '/#progress', icon: Trophy, tint: 'bg-foil text-ink' },
      { label: 'Try it for free', to: '/#try', icon: Gift, tint: 'bg-blue-soft text-ink' },
    ],
  },
  {
    title: 'Help',
    links: [
      { label: 'Support', to: '/support', icon: LifeBuoy, tint: 'bg-blue text-ink' },
      { label: 'FAQ', to: '/#faq', icon: CircleHelp, tint: 'bg-lavender text-ink' },
      { label: 'Rate Articulate', to: REVIEW_URL, icon: Star, tint: 'bg-foil text-ink', external: true },
      { label: 'App Store', to: APP_STORE_URL, icon: AppleIcon, tint: 'bg-lavender-pale text-ink', external: true },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', to: '/privacy', icon: ShieldCheck, tint: 'bg-blue-soft text-ink' },
      { label: 'Terms of Use', to: '/terms', icon: ScrollText, tint: 'bg-lavender-soft text-ink' },
    ],
  },
]

function FooterItem({ link }: { link: FooterLink }) {
  const Icon = link.icon
  const content = (
    <>
      <span className={`grid size-7 shrink-0 place-items-center rounded-lg ${link.tint}`}>
        <Icon className="size-4" strokeWidth={2.25} />
      </span>
      <span>{link.label}</span>
      {link.external && <ArrowUpRight className="size-3.5 opacity-50" aria-hidden="true" />}
    </>
  )
  const cls =
    'group inline-flex items-center gap-3 rounded-md py-1 text-[0.95rem] font-medium text-ink/85 transition-colors hover:text-ink'
  return link.external ? (
    <a href={link.to} target="_blank" rel="noopener noreferrer" className={cls}>
      {content}
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  ) : (
    <Link to={link.to} className={cls}>
      {content}
    </Link>
  )
}

export function SiteFooter() {
  return (
    <footer className="border-t border-ink/10 bg-page text-ink">
      <div className="mx-auto grid max-w-[1240px] gap-12 px-5 pb-12 pt-16 sm:px-8 lg:grid-cols-[1.1fr_2fr] lg:gap-16">
        <div className="max-w-sm">
          <Link to="/" className="text-ink" aria-label="Articulate home">
            <Wordmark className="text-[2.6rem]" />
          </Link>
          <p className="mt-5 text-[1.05rem] leading-relaxed text-ink-soft">
            Learn new words by using them. Built for iPhone by students and scientists.
          </p>
          <p className="mt-6 text-sm text-ink-soft">
            Questions?{' '}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-medium text-ink underline decoration-blue underline-offset-4 hover:decoration-2"
            >
              {CONTACT_EMAIL}
            </a>
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
          {columns.map((col) => (
            <div key={col.title}>
              <h2 className="font-display text-lg font-semibold text-ink-soft">{col.title}</h2>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <FooterItem link={link} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-ink/10">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-2 px-5 py-6 text-sm text-ink-soft sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>© 2022–2026 {COMPANY}</p>
          <p>Apple, the Apple logo, iPhone and App Store are trademarks of Apple Inc.</p>
        </div>
      </div>
    </footer>
  )
}
