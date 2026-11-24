import { useSyncExternalStore } from 'react'

// Short UI sounds from the iOS app (Articulate/Resources/Sounds, used the same way as SoundService),
// played with the Web Audio API so they start instantly and can overlap. They only ever play in
// response to something the visitor does: never on scroll, on hover, or for the automatic demo.
// The speaker button in the header turns them off, and the choice is remembered.

const FILES = {
  /** card_swipe: a card flung off the deck */
  swipe: '/sounds/card-swipe.mp3',
  /** select_tap: picking an option */
  select: '/sounds/select-tap.mp3',
  /** flashlight_tap: the app's tile tap */
  tap: '/sounds/flashlight-tap.mp3',
  /** bubble_drop: something dropping into place */
  drop: '/sounds/bubble-drop.mp3',
  /** galaxy_touch: the 3D capsule button press */
  button: '/sounds/button-tap.mp3',
  /** achievement_land: the coin landing */
  coin: '/sounds/coin-land.mp3',
} as const

export type SoundName = keyof typeof FILES

const STORAGE_KEY = 'articulate-sound'
const MASTER_VOLUME = 0.7

let enabled = readPreference()
const listeners = new Set<() => void>()

let ctx: AudioContext | null = null
let master: GainNode | null = null
const files = new Map<SoundName, Promise<ArrayBuffer | null>>()
const buffers = new Map<SoundName, Promise<AudioBuffer | null>>()

function readPreference() {
  try {
    return localStorage.getItem(STORAGE_KEY) !== 'off'
  } catch {
    return true
  }
}

function fetchFile(name: SoundName) {
  let file = files.get(name)
  if (!file) {
    file = fetch(FILES[name])
      .then((r) => (r.ok ? r.arrayBuffer() : null))
      .catch(() => null)
    files.set(name, file)
  }
  return file
}

function audio() {
  if (ctx) return ctx
  const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
  if (!Ctor) return null
  // Like the app's `.ambient` session: mixes with the visitor's music and follows the silent switch.
  const session = (navigator as Navigator & { audioSession?: { type: string } }).audioSession
  if (session) session.type = 'ambient'
  ctx = new Ctor()
  master = ctx.createGain()
  master.gain.value = MASTER_VOLUME
  master.connect(ctx.destination)
  return ctx
}

function buffer(name: SoundName) {
  let buf = buffers.get(name)
  if (!buf) {
    const context = audio()
    if (!context) return Promise.resolve(null)
    // decodeAudioData detaches the bytes it's given, so it gets a copy
    buf = fetchFile(name)
      .then((bytes) => (bytes ? context.decodeAudioData(bytes.slice(0)) : null))
      .catch(() => null)
    buffers.set(name, buf)
  }
  return buf
}

/** Play one of the app's sounds. `volume` and `rate` work like SoundService.play(_:rate:volume:). */
export function playSound(name: SoundName, { volume = 1, rate = 1, delay = 0 } = {}) {
  if (!enabled) return
  const context = audio()
  if (!context) return
  if (context.state === 'suspended') void context.resume()
  void buffer(name).then((buf) => {
    if (!buf || !master || !enabled) return
    const source = context.createBufferSource()
    source.buffer = buf
    source.playbackRate.value = rate
    const gain = context.createGain()
    gain.gain.value = volume
    source.connect(gain).connect(master)
    source.start(context.currentTime + delay)
  })
}

/**
 * Download the sounds once the page is idle, and get the audio ready on the visitor's first
 * press or key, so the first sound isn't late. Browsers only allow audio after an interaction.
 */
export function initSounds() {
  const names = Object.keys(FILES) as SoundName[]
  const prefetch = () => names.forEach(fetchFile)
  // Safari has no requestIdleCallback
  if (typeof window.requestIdleCallback === 'function') window.requestIdleCallback(prefetch, { timeout: 4000 })
  else setTimeout(prefetch, 2500)

  const warm = () => {
    if (!enabled) return
    const context = audio()
    if (context?.state === 'suspended') void context.resume()
    names.forEach(buffer)
    window.removeEventListener('pointerdown', warm, true)
    window.removeEventListener('keydown', warm, true)
  }
  window.addEventListener('pointerdown', warm, { capture: true, passive: true })
  window.addEventListener('keydown', warm, true)
}

export function setSoundEnabled(on: boolean) {
  enabled = on
  try {
    localStorage.setItem(STORAGE_KEY, on ? 'on' : 'off')
  } catch {
    // private mode: the choice lasts for this visit
  }
  listeners.forEach((l) => l())
}

export function useSoundEnabled() {
  return useSyncExternalStore(
    (onChange) => {
      listeners.add(onChange)
      return () => listeners.delete(onChange)
    },
    () => enabled,
    () => true,
  )
}
