import { TintIcon } from '@/components/AppIcon'
import type { Faq } from '@/data/content'
import { playSound } from '@/lib/sound'

export function FaqList({ items }: { items: Faq[] }) {
  return (
    <div className="faq divide-y divide-ink/10 border-y border-ink/10">
      {items.map((item) => (
        <details key={item.q} className="group">
          <summary onClick={() => playSound('tap', { volume: 0.5 })} className="flex items-center justify-between gap-6 py-5 font-display text-[1.35rem] font-semibold leading-snug text-ink">
            {item.q}
            <span className="faq-icon capsule grid size-8 shrink-0 place-items-center rounded-full bg-surface text-ink shadow-[0_2px_0_var(--color-linen)]">
              <TintIcon name="chevron-down" className="size-3.5" />
            </span>
          </summary>
          <p className="max-w-[62ch] pb-6 pr-12 text-[1.05rem] leading-relaxed text-ink-soft">{item.a}</p>
        </details>
      ))}
    </div>
  )
}
