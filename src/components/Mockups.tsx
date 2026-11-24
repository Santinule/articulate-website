import { MiniWordCard } from '@/components/AppCard'

// HTML version of the Home Screen widget (it needs a signed-in account to capture from the app).

/* ---------------- Home Screen widget ---------------- */

export function WidgetMock() {
  return (
    <div aria-hidden="true" className="shrink-0 drop-shadow-[0_14px_16px_rgba(36,48,64,0.2)]">
      <MiniWordCard word="Glimpse" meaning="A brief or partial view of something." theme="lavender" className="size-[150px] justify-center" />
    </div>
  )
}
