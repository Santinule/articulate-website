import { useEffect } from 'react'

const WIGGLY = '[data-reveal="wobble"][data-shown]'

/**
 * Illustrations wiggle when the pointer reaches them. The animation is started here and only removed when
 * it ends, so moving the pointer away quickly lets it settle instead of snapping back.
 */
export function useWiggle() {
  useEffect(() => {
    const onOver = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      const el = (e.target as Element | null)?.closest?.(WIGGLY)
      if (!el || el.hasAttribute('data-wiggle')) return
      el.setAttribute('data-wiggle', '')
      el.addEventListener('animationend', () => el.removeAttribute('data-wiggle'), { once: true })
    }
    document.addEventListener('pointerover', onOver, { passive: true })
    return () => document.removeEventListener('pointerover', onOver)
  }, [])
}
