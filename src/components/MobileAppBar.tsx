import { useEffect, useState } from 'react'
import { Star } from 'lucide-react'
import { AppleIcon } from '@/components/AppStoreButton'
import { APP_DOWNLOADS, APP_RATING, APP_STORE_URL } from '@/data/content'
import { playSound } from '@/lib/sound'

// Past this much scrolling the card may show (the hero's own App Store button is up there).
const SHOW_AFTER_PX = 240
const SETTLE_MS = 160

/**
 * A floating "get the app" card at the bottom of the screen on phones, laid out like an App Store
 * listing: icon, name, rating, downloads and a 3D Download button. It shows once you scroll past the
 * hero and steps aside whenever another App Store button or the footer is on screen, so there are
 * never two download buttons in view at once.
 */
export function MobileAppBar() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScreen = new Set<Element>()
    let pastTop = window.scrollY > SHOW_AFTER_PX
    // Settle first: when Safari's toolbar collapses, an App Store button right at the screen edge can
    // flip in and out of view several times in a row, which made the card blink.
    let timer = 0
    const update = () => {
      window.clearTimeout(timer)
      timer = window.setTimeout(() => setShow(pastTop && onScreen.size === 0), SETTLE_MS)
    }

    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) onScreen.add(entry.target)
        else onScreen.delete(entry.target)
      }
      update()
    })
    document.querySelectorAll('a.btn[href*="apps.apple.com"], footer').forEach((el) => io.observe(el))

    const onScroll = () => {
      const past = window.scrollY > SHOW_AFTER_PX
      if (past !== pastTop) {
        pastTop = past
        update()
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.clearTimeout(timer)
      io.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <div className="app-bar md:hidden" data-show={show} inert={!show}>
      <a
        href={APP_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        onPointerDown={() => playSound('button')}
        className="app-bar-card"
        aria-label={`Download Articulate on the App Store. Rated ${APP_RATING}, ${APP_DOWNLOADS} downloads. Opens in a new tab`}
      >
        <img
          src="/img/icons/app-icon-classic.webp"
          alt=""
          width={56}
          height={56}
          className="size-14 shrink-0 rounded-[13px] max-[350px]:size-12 max-[350px]:rounded-[11px]"
        />
        <span className="min-w-0 flex-1">
          {/* on the narrowest phones the rating wraps under the name */}
          <span className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1 font-display leading-none">
            <span className="text-[1.3rem] font-bold">Articulate</span>
            <span className="inline-flex items-center gap-1 text-[1.05rem] font-semibold">
              <Star className="size-[15px] -translate-y-px fill-current" strokeWidth={0} />
              {APP_RATING}
            </span>
          </span>
          <span className="mt-1.5 block whitespace-nowrap text-[0.95rem] leading-none text-ink-soft">{APP_DOWNLOADS} downloads</span>
        </span>
        <span className="btn btn-ink btn-sm shrink-0" aria-hidden="true">
          <AppleIcon className="size-[18px]" />
          {/* "Get" on small phones, like the App Store's own button */}
          <span className="max-[419px]:hidden">Download</span>
          <span className="min-[420px]:hidden">Get</span>
        </span>
      </a>
    </div>
  )
}
