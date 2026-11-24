import { APP_STORE_URL } from '@/data/content'
import { playSound } from '@/lib/sound'
import { cn } from '@/lib/utils'

export function AppleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  )
}

// The 3D capsule makes the app's button tap when pressed (Duolingo3DButtonStyle).
const pressSound = () => playSound('button')

type Props = {
  variant?: 'ink' | 'blue' | 'white'
  size?: 'md' | 'sm'
  className?: string
}

export function AppStoreButton({ variant = 'ink', size = 'md', className }: Props) {
  if (size === 'sm') {
    return (
      <a
        href={APP_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        onPointerDown={pressSound}
        className={cn('btn btn-sm', `btn-${variant}`, className)}
      >
        <AppleIcon className="size-4" />
        Get the app
      </a>
    )
  }
  return (
    <a
      href={APP_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      onPointerDown={pressSound}
      className={cn('btn', `btn-${variant}`, className)}
      aria-label="Download Articulate on the App Store"
    >
      <AppleIcon className="size-6" />
      <span className="flex flex-col items-start text-left">
        <span className="font-sans text-[0.7rem] font-normal leading-tight opacity-80">Download on the</span>
        <span className="text-[1.3rem] leading-none">App Store</span>
      </span>
    </a>
  )
}
