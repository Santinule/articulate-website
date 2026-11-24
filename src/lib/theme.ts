import { useSyncExternalStore } from 'react'

// Light/dark appearance. By default the site follows the system; the moon/sun button in the header
// flips it. Flipping to the system's own scheme goes back to following the system, so there's no
// separate "System" option. A pinned choice lives in localStorage and on <html data-theme>, which
// index.html sets before the first paint so it never flashes the other theme.

export type ThemeChoice = 'system' | 'light' | 'dark'

const STORAGE_KEY = 'articulate-theme'
const DARK_QUERY = '(prefers-color-scheme: dark)'
// Safari tints its toolbar with theme-color; these match --color-paper (light) and --color-page (dark).
const BAR = { light: '#f8f6f1', dark: '#2b2f3d' }

const listeners = new Set<() => void>()

function read(): ThemeChoice {
  const t = document.documentElement.dataset.theme
  return t === 'light' || t === 'dark' ? t : 'system'
}

export function setTheme(choice: ThemeChoice) {
  const root = document.documentElement
  if (choice === 'system') delete root.dataset.theme
  else root.dataset.theme = choice
  try {
    if (choice === 'system') localStorage.removeItem(STORAGE_KEY)
    else localStorage.setItem(STORAGE_KEY, choice)
  } catch {
    // private mode: the choice lasts for this visit
  }
  // a pinned theme pins the toolbar color too; "system" restores the per-scheme values
  document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]').forEach((meta) => {
    const scheme = meta.media.includes('dark') ? 'dark' : 'light'
    meta.content = choice === 'system' ? BAR[scheme] : BAR[choice]
  })
  listeners.forEach((l) => l())
}

const systemScheme = () => (window.matchMedia(DARK_QUERY).matches ? 'dark' : 'light')
const shownScheme = () => {
  const t = read()
  return t === 'system' ? systemScheme() : t
}

/** Flip the theme on screen. Landing on the system's own scheme unpins it. */
export function toggleTheme() {
  const next = shownScheme() === 'dark' ? 'light' : 'dark'
  setTheme(next === systemScheme() ? 'system' : next)
}

/** The scheme on screen right now: the pinned one, or the system's (updates when either changes). */
export function useShownTheme() {
  return useSyncExternalStore(
    (onChange) => {
      listeners.add(onChange)
      const mq = window.matchMedia(DARK_QUERY)
      mq.addEventListener('change', onChange)
      return () => {
        listeners.delete(onChange)
        mq.removeEventListener('change', onChange)
      }
    },
    shownScheme,
    () => 'light' as const,
  )
}
