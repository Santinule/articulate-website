import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const TARGETS = '.emph, .scribble, [data-reveal]'
// Wait until something is properly in view: past the bottom 22% of the screen.
const ROOT_MARGIN = '0px 0px -22% 0px'
// Things that come into view together play one after another, top to bottom.
const STAGGER_MS = 110
// ...but nothing waits longer than this: on a fast scroll (a flick on a phone) the queue used to pile
// up, and things showed up seconds after they were already on screen.
const MAX_WAIT_MS = 330
// Reveals wait for the web fonts, so highlight boxes and handwritten notes are measured and drawn with
// the final type (in Safari the fallback font showed first and the boxes jumped). Never longer than this.
const FONT_WAIT_MS = 1200

/**
 * Micro-animations that play once, when you reach them: highlight boxes paint in, handwritten notes
 * write themselves, icons bounce in, chips pop. Elements start hidden because <html class="reveal-ready">
 * is set before the first paint (main.tsx); this marks them `data-shown`, in a queue.
 */
export function useReveal() {
  const { pathname } = useLocation()
  useEffect(() => {
    const timers: number[] = []
    let nextSlot = 0 // time when the next queued reveal may play

    const show = (el: Element) => el.setAttribute('data-shown', '')

    const io = new IntersectionObserver(
      (entries) => {
        const arriving = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top || a.boundingClientRect.left - b.boundingClientRect.left)
        for (const entry of arriving) {
          io.unobserve(entry.target)
          const now = performance.now()
          const at = Math.max(now, Math.min(nextSlot, now + MAX_WAIT_MS))
          nextSlot = at + STAGGER_MS
          const wait = at - now
          if (wait < 4) show(entry.target)
          else timers.push(window.setTimeout(() => show(entry.target), wait))
        }
      },
      { rootMargin: ROOT_MARGIN, threshold: 0 },
    )
    let cancelled = false
    const observeIn = (root: ParentNode) => {
      if (root instanceof Element && root.matches(TARGETS) && !root.hasAttribute('data-shown')) io.observe(root)
      root.querySelectorAll<HTMLElement>(TARGETS).forEach((el) => {
        if (!el.hasAttribute('data-shown')) io.observe(el)
      })
    }
    // Targets that mount later (a component re-rendered by hot reload, content added after load)
    // would otherwise stay hidden for good.
    const mo = new MutationObserver((records) => {
      for (const r of records) r.addedNodes.forEach((n) => n instanceof Element && observeIn(n))
    })
    const start = () => {
      if (cancelled) return
      observeIn(document)
      mo.observe(document.body, { childList: true, subtree: true })
    }
    const fontsReady = document.fonts?.status === 'loaded' ? Promise.resolve() : document.fonts?.ready
    if (fontsReady) {
      const fallback = window.setTimeout(start, FONT_WAIT_MS)
      void fontsReady.then(() => {
        window.clearTimeout(fallback)
        start()
      })
      timers.push(fallback)
    } else start()
    return () => {
      cancelled = true
      mo.disconnect()
      io.disconnect()
      timers.forEach((t) => window.clearTimeout(t))
    }
  }, [pathname])
}
