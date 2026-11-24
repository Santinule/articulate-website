// Builds the dark-mode copies of the app's icons: public/img/icons-app/*.svg -> public/img/icons-app/dark/.
// Only the line color changes: the near-black Ink Navy of the outlines (any color darker than DARK_LIMIT,
// plus black) turns the app's Cool Grey, which reads on the dark page and against the icons' light fills.
// Every other color stays as it is.
// Run it again after adding or changing icons: npm run icons:dark
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const SRC = 'public/img/icons-app'
const OUT = join(SRC, 'dark')
const GREY = '#8a8f9b' // AppColors.secondaryAccent, "Cool Grey"
const DARK_LIMIT = 0.26 // HSL lightness; the outline navies are 0.19–0.24, the fills 0.5 and up

const lightness = (hex) => {
  let h = hex.slice(1)
  if (h.length === 3) h = [...h].map((c) => c + c).join('')
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255)
  return (Math.max(r, g, b) + Math.min(r, g, b)) / 2
}

// colors in attributes (fill="…"), inline styles and <style> blocks (fill:…), and gradient stops
const COLOR = /((?:fill|stroke|stop-color|color)\s*(?:=\s*"|:\s*))(#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b|black\b)/gi

mkdirSync(OUT, { recursive: true })
let changed = 0
for (const file of readdirSync(SRC).filter((f) => f.endsWith('.svg'))) {
  const svg = readFileSync(join(SRC, file), 'utf8')
  const dark = svg.replace(COLOR, (match, prop, color) => {
    if (color.toLowerCase() !== 'black' && lightness(color) >= DARK_LIMIT) return match
    changed++
    return prop + GREY
  })
  writeFileSync(join(OUT, file), dark)
}
console.log(`dark icons: ${changed} line colors turned grey in ${OUT}`)
