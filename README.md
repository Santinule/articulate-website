# articulatelearning.org

Marketing and legal website for the **Articulate** iOS app by Real Intelligence Tech LLC.

## Pages

| Route | Description |
|---|---|
| `/` | Landing page |
| `/support` | Support: contact, common tasks, FAQ |
| `/terms` | Terms of Use |
| `/privacy` | Privacy Policy |
| `*` | Not found |

## Stack

- React 19 + TypeScript
- React Router v7
- Vite + Tailwind CSS v4

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
```

Output goes to `dist/`.

## Structure

- `src/data/content.ts` — all copy that comes from the app: sample words, games, achievements, topics, FAQ, links
- `src/components/` — header, footer, layout, FAQ, and:
  - `AppCard.tsx` — the app's word cards (HomeWordCard and the mini cards), drawn with the same measurements and the five card themes
  - `CardStack.tsx` — the hero stack, with the same drag, rotation, threshold and spring as `HomeCardStack.swift`
  - `Mockups.tsx` — playable versions of the app's games
  - `GamePhone.tsx` — the five games as real screens inside an iPhone frame (tabs, or swipe the screen)
  - `MobileAppBar.tsx` — on phones, a floating App Store card at the bottom (icon, name, rating, downloads, Download button). It shows after the hero and hides whenever another App Store button or the footer is on screen. The rating and download count are `APP_RATING` and `APP_DOWNLOADS` in `content.ts`
  - `AchievementCoin.tsx` — the achievements as 3D coins, like the app's `Coin3DView`: badge art on a cool-grey coin with a real rim and the pencil "A" on the back. They lean toward the mouse, spin on hover or tap, and flip in when you reach them
  - `Editorial.tsx` — the "Fix the Sentence" post look: highlight boxes, chips, handwritten notes with arrows, and the pastel `Blob`s, which melt between three outlines (SMIL, desktop only: on phones it repainted too much) and drift slowly (CSS `.blob-drift`, off inside rounded `overflow-hidden` cards, where it made iPhones drop the whole card) like a lava lamp. They pause off-screen and stay still with reduced motion
- `src/index.css` — design tokens (colors from the app's `AppColors`, Akshar + Helvetica) and shared styles
- Light and dark mode: every color token is `light-dark(light, dark)` in `src/index.css`, built from the app's palette (the app itself has no dark mode). The site follows the system; the moon/sun button in the header (`SiteHeader.tsx`, `src/lib/theme.ts`) flips it and pins the choice in `localStorage`, applied before the first paint by a small script in `index.html`. Flipping back to the system's own scheme unpins it. Use `bg-page` / `bg-surface` instead of `bg-white`, and the `dark` variant for anything that isn't a color. Copies of the app's screens stay white, like the app: wrap them in `.keep-light` (the progress cards and the topic cards). In dark mode the app's icons use `public/img/icons-app/dark/`: the same drawings and colors with the Ink Navy lines in the app's Cool Grey, made by `npm run icons:dark` (`scripts/make-dark-icons.mjs`). Pass `keepColors` to `AppIcon` inside `.keep-light`.
- `src/lib/squircle.ts` — Apple-style continuous corners with native CSS `corner-shape` (Chrome/Edge today, Safari once it ships the superellipse WebKit already has). Other browsers keep plain rounded corners: an earlier `clip-path` fallback cut off decorations and made animations flicker in Safari, so it was removed. `squirclePath()` still draws the SVG word cards. Use the radius tokens (`rounded-card`, `rounded-block`…).

## Assets

Images in `public/img/` are WebP exports of the iOS app's asset catalog (`Articulate-Client-ios/Articulate/Assets.xcassets`):
- `app/` — game screens captured from the app in the iOS Simulator, 603px wide, with the simulator's status bar removed (the site draws its own, `src/components/StatusBar.tsx`)
- `public/sounds/` — UI sounds from the app (`Articulate/Resources/Sounds`), trimmed and encoded as mono MP3 (~43 KB in all). `src/lib/sound.ts` plays them with Web Audio, only in response to the visitor: swiping a card, picking a card color, a game tab or a topic, tapping a coin, opening a FAQ, pressing an App Store button. Never on scroll, hover or the automatic demo. The speaker button in the header mutes them (remembered in `localStorage`)
- `cursors/` — the site's mouse cursors in the app's style: `arrow` and `hand` (lavender fill, ink outline), SVG with PNG fallbacks. Clicking draws a small burst of blue lines (`src/components/ClickBurst.tsx`)
- `device/iphone16-bezel.webp` — the iPhone 16 frame used around the screens (transparent 1177×2554 screen window at 91,91)
- `achievements/`, `badges/`, `misc/` — achievement coins, streak medals, progress icons
- `icons/` — the three alternate app icons
- `public/favicon.svg` and `apple-touch-icon.png` — the pencil "A" logo
