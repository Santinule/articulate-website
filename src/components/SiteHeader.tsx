import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Moon, Sun, Volume2, VolumeX } from 'lucide-react'
import { Wordmark } from '@/components/Logo'
import { AppleIcon } from '@/components/AppStoreButton'
import { APP_STORE_URL } from '@/data/content'
import { playSound, setSoundEnabled, useSoundEnabled } from '@/lib/sound'
import { toggleTheme, useShownTheme } from '@/lib/theme'
import { cn } from '@/lib/utils'

const nav = [
  { label: 'How it works', to: '/#how-it-works' },
  { label: 'Games', to: '/#games' },
  { label: 'Progress', to: '/#progress' },
  { label: 'Try it for free', to: '/#try' },
  { label: 'FAQ', to: '/#faq' },
]

// Pages whose first section is dark, so the bar starts with light text (none at the moment: every page is white).
const darkTop = new Set<string>()

/** Light/dark: shows the moon in light mode and the sun in dark mode, and flips to the other one. */
function ThemeToggle() {
  const dark = useShownTheme() === 'dark'
  return (
    <button
      type="button"
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={dark ? 'Light mode' : 'Dark mode'}
      className="nav-icon capsule"
      onClick={() => {
        playSound('select')
        toggleTheme()
      }}
    >
      {/* keyed, so the new icon spins in */}
      <span key={dark ? 'sun' : 'moon'} className="nav-icon-swap">
        {dark ? <Sun className="size-[18px]" strokeWidth={2.2} /> : <Moon className="size-[17px]" strokeWidth={2.2} />}
      </span>
    </button>
  )
}

/** Turns the site's sound effects on and off (remembered for next time). */
function SoundToggle() {
  const on = useSoundEnabled()
  return (
    <button
      type="button"
      aria-pressed={on}
      aria-label="Sound effects"
      title={on ? 'Sound on' : 'Sound off'}
      className="nav-icon capsule"
      onClick={() => {
        setSoundEnabled(!on)
        if (!on) playSound('select')
      }}
    >
      {on ? <Volume2 className="size-[18px]" strokeWidth={2.2} /> : <VolumeX className="size-[18px]" strokeWidth={2.2} />}
    </button>
  )
}

/**
 * Fixed header. At the top of the page it's transparent and full width; once you scroll it shrinks
 * into a floating white pill (same timing as the reference: 0.45s, expo-out).
 */
export function SiteHeader() {
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const light = !scrolled && darkTop.has(pathname)

  return (
    <header className="site-header" data-scrolled={scrolled} data-light={light}>
      <div className="nav-bar capsule">
        <Link to="/" className="nav-logo" aria-label="Articulate home">
          <Wordmark />
        </Link>
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-0.5">
            {nav.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="nav-link capsule">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          <SoundToggle />
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            onPointerDown={() => playSound('button')}
            className={cn('nav-pill capsule max-[349px]:px-3')}
            aria-label="Get the app on the App Store (opens in a new tab)"
          >
            <AppleIcon className="size-4" />
            {/* shorter on phones so the bar fits next to the round buttons: "Get", then just the logo */}
            <span className="max-[439px]:hidden">Get the app</span>
            <span className="max-[349px]:hidden min-[440px]:hidden">Get</span>
          </a>
        </div>
      </div>
    </header>
  )
}
