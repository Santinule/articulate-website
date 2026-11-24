import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { ClickBurst } from '@/components/ClickBurst'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { useReveal } from '@/lib/useReveal'
import { useWiggle } from '@/lib/useWiggle'

// Scroll to the top on page change, or to the #section when the link has a hash.
function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (el) {
        el.scrollIntoView()
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

export function Layout() {
  useReveal()
  useWiggle()
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        Skip to content
      </a>
      <ScrollManager />
      <SiteHeader />
      <main id="main" className="overflow-x-clip pt-[88px]">
        <Outlet />
      </main>
      <SiteFooter />
      <ClickBurst />
    </>
  )
}
