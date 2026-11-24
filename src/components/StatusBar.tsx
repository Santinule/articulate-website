// iOS status bar for an iPhone 16 (393pt wide): time, signal, Wi-Fi and battery.
// From the provided descarga.svg, recolored with currentColor so it can sit on light or dark screens.
export function StatusBar({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 393 54" className={className} fill="currentColor" aria-hidden="true" focusable="false">
      <text
        x="71.2"
        y="35"
        textAnchor="middle"
        fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Inter, Arial, sans-serif"
        fontSize="17"
        fontWeight="600"
        letterSpacing="-0.2"
      >
        9:41
      </text>
      <g>
        <rect x="281.67" y="29" width="3.33" height="6.33" rx="1.5" />
        <rect x="287" y="27" width="3.33" height="8.33" rx="1.5" />
        <rect x="292.33" y="24.67" width="3.33" height="10.67" rx="1.5" />
        <rect x="297.67" y="22.33" width="3.33" height="13" rx="1.5" />
      </g>
      <g>
        <path
          d="M308.66 26.49A12.2 12.2 0 0 1 324.34 26.49 M311.68 30.09A7.5 7.5 0 0 1 321.32 30.09"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        <path d="M316.5 35.4 314.31 32.8A3.4 3.4 0 0 1 318.69 32.8Z" stroke="currentColor" strokeWidth="0.85" strokeLinejoin="round" />
      </g>
      <g>
        <rect x="332.67" y="23" width="25" height="13" rx="4.2" fillOpacity="0.5" />
        <path d="M336.87 23H352.67V36H336.87A4.2 4.2 0 0 1 332.67 31.80V27.20A4.2 4.2 0 0 1 336.87 23Z" />
        <path d="M358.33 27A2 2.5 0 0 1 358.33 32Z" fillOpacity="0.5" />
      </g>
    </svg>
  )
}
