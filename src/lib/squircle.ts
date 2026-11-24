// Apple-style continuous corners ("squircles").
//
// - Browsers with CSS `corner-shape` (Chrome/Edge 139+, and Safari once it ships the superellipse that
//   WebKit landed in July 2026) get them natively: <html class="corners-native"> switches every corner to
//   a superellipse and scales the radius tokens (see index.css).
// - Other browsers keep plain rounded corners. An earlier fallback clipped every rounded element with
//   clip-path, but in Safari that cut off decorations (marker swooshes, 3D button lips) and made
//   animated content flicker or vanish for a moment, so it's gone.
//
// squirclePath() still draws the SVG word cards (AppCard.tsx). It uses Figma's corner smoothing at
// 60% (close to iOS), from the geometry described in Figma's "Desperately seeking squircles".

const SMOOTHING = 0.6

type Corner = { r: number; p: number; a: number; b: number; c: number; d: number; arc: number }

const rad = (deg: number) => (deg * Math.PI) / 180
const fmt = (n: number) => +n.toFixed(2)

function cornerParams(radius: number, budget: number): Corner {
  const r = Math.min(radius, budget)
  if (r <= 0) return { r: 0, p: 0, a: 0, b: 0, c: 0, d: 0, arc: 0 }

  let p = (1 + SMOOTHING) * r // how far along each edge the corner starts
  const arcMeasure = 90 * (1 - SMOOTHING) // the circular part that remains in the middle
  const arc = Math.sin(rad(arcMeasure / 2)) * r * Math.SQRT2
  const alpha = (90 - arcMeasure) / 2
  const p3ToP4 = r * Math.tan(rad(alpha / 2))
  const beta = 45 * SMOOTHING
  const c = p3ToP4 * Math.cos(rad(beta))
  const d = c * Math.tan(rad(beta))
  let b = (p - arc - c - d) / 3
  let a = 2 * b

  // Not enough room for the full transition: shorten the straight-edge curves, keep the smoothness.
  if (p > budget) {
    const room = budget - d - arc - c
    b = Math.min(b, room - room / 6)
    a = room - b
    p = budget
  }
  return { r, p, a, b, c, d, arc }
}

/** SVG path for a w×h box with radii [topLeft, topRight, bottomRight, bottomLeft]. */
export function squirclePath(w: number, h: number, radii: number[]): string {
  const budget = Math.min(w, h) / 2
  const [tl, tr, br, bl] = radii.map((r) => cornerParams(r, budget))
  const parts: (string | number)[] = ['M', fmt(w - tr.p), 0]

  if (tr.r) {
    const { a, b, c, d, r, arc } = tr
    parts.push('c', fmt(a), 0, fmt(a + b), 0, fmt(a + b + c), fmt(d))
    parts.push('a', fmt(r), fmt(r), 0, 0, 1, fmt(arc), fmt(arc))
    parts.push('c', fmt(d), fmt(c), fmt(d), fmt(b + c), fmt(d), fmt(a + b + c))
  }
  parts.push('L', fmt(w), fmt(h - br.p))
  if (br.r) {
    const { a, b, c, d, r, arc } = br
    parts.push('c', 0, fmt(a), 0, fmt(a + b), fmt(-d), fmt(a + b + c))
    parts.push('a', fmt(r), fmt(r), 0, 0, 1, fmt(-arc), fmt(arc))
    parts.push('c', fmt(-c), fmt(d), fmt(-(b + c)), fmt(d), fmt(-(a + b + c)), fmt(d))
  }
  parts.push('L', fmt(bl.p), fmt(h))
  if (bl.r) {
    const { a, b, c, d, r, arc } = bl
    parts.push('c', fmt(-a), 0, fmt(-(a + b)), 0, fmt(-(a + b + c)), fmt(-d))
    parts.push('a', fmt(r), fmt(r), 0, 0, 1, fmt(-arc), fmt(-arc))
    parts.push('c', fmt(-d), fmt(-c), fmt(-d), fmt(-(b + c)), fmt(-d), fmt(-(a + b + c)))
  }
  parts.push('L', 0, fmt(tl.p))
  if (tl.r) {
    const { a, b, c, d, r, arc } = tl
    parts.push('c', 0, fmt(-a), 0, fmt(-(a + b)), fmt(d), fmt(-(a + b + c)))
    parts.push('a', fmt(r), fmt(r), 0, 0, 1, fmt(arc), fmt(-arc))
    parts.push('c', fmt(c), fmt(-d), fmt(b + c), fmt(-d), fmt(a + b + c), fmt(-d))
  }
  parts.push('Z')
  return parts.join(' ')
}

export function initSquircles() {
  if (CSS.supports('corner-shape', 'superellipse(1.5)')) document.documentElement.classList.add('corners-native')
}
