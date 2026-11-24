import { useState } from 'react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { AchievementCoin } from '@/components/AchievementCoin'
import { AppIcon } from '@/components/AppIcon'
import { AppStoreButton } from '@/components/AppStoreButton'
import { CardStack } from '@/components/CardStack'
import { Blob, Emph, Scribble } from '@/components/Editorial'
import { FaqList } from '@/components/Faq'
import { FixTheSentence } from '@/components/FixTheSentence'
import { GamePhone } from '@/components/GamePhone'
import { LogoMark } from '@/components/Logo'
import { MobileAppBar } from '@/components/MobileAppBar'
import { ProgressCards } from '@/components/ProgressCards'
import { WidgetMock } from '@/components/Mockups'
import { achievements, faqs, topics } from '@/data/content'
import { playSound } from '@/lib/sound'
import { usePageTitle } from '@/lib/usePageTitle'
import { cn } from '@/lib/utils'

// White page, pastel accents and the app's illustrations, in the style of the "Fix the Sentence" posts.
const container = 'mx-auto w-full max-w-[1240px] px-5 sm:px-8'
const h2 = 'display text-[clamp(2.7rem,5.8vw,4.6rem)]'
const lede = 'text-[1.15rem] leading-relaxed text-ink-soft sm:text-[1.22rem]'

const blue = 'var(--color-blue)'
// the blue background blob (and the dark-mode one in the app's blue)
const blobBlue = 'var(--color-blob-blue)'

function Section({ id, className, children }: { id?: string; className?: string; children: ReactNode }) {
  return (
    <section id={id} className={cn('relative py-20 sm:py-28', className)}>
      <div className={container}>{children}</div>
    </section>
  )
}

/* ---------------- Hero ---------------- */

function Hero() {
  return (
    <section className={cn(container, 'grid items-center gap-16 pb-20 pt-10 sm:pt-16 lg:grid-cols-[1.1fr_1fr] lg:gap-10 lg:pb-28')}>
      <div>
        <h1 className="display text-[clamp(3.2rem,7vw,6.2rem)]">
          Learn new words by <Emph swoosh={blue}>using them</Emph>
        </h1>
        <p className={cn(lede, 'mt-9 max-w-[31rem]')}>
          Sophisticated words picked for your level, quick games to play with them, and sentences you write
          yourself.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
          <AppStoreButton />
          <Scribble className="rotate-[-4deg]">try it for free!</Scribble>
        </div>
      </div>
      <div className="relative isolate pt-14">
        <Blob variant={0} className="-left-[4%] -top-[2%] w-[108%]" />
        <AppIcon name="books" reveal="wobble" className="absolute -bottom-6 -left-4 z-10 hidden w-32 rotate-[-6deg] sm:block lg:-left-14" />
        {/* on the stack's top-right corner, arrow pointing down at the card */}
        <Scribble arrow="down-left" target="hero-stack" className="absolute right-[2%] top-0 z-10 rotate-[-5deg]">
          swipe me
        </Scribble>
        <div data-arrow-target="hero-stack">
          <CardStack initialTheme="lavender" stackClassName="rotate-[2.5deg]" />
        </div>
      </div>
    </section>
  )
}

/* ---------------- Fix the sentence (how a session works) ---------------- */

function Session() {
  return (
    <Section id="how-it-works">
      <div className="mx-auto max-w-[44rem] text-center">
        <h2 className={cn(h2, 'inline-flex items-end gap-3')}>
          <span>
            Fix the <Emph>sentence</Emph>
          </span>
          <AppIcon name="exclamation" reveal="wobble" className="mb-1 h-[1.1em] w-auto rotate-[12deg]" />
        </h2>
        <p className={cn(lede, 'mx-auto mt-6 max-w-[36rem]')}>
          Pick a few words, play quick games with them, then put them to work in sentences of your own: find the
          weak word and swap in a better one.
        </p>
      </div>
      <div className="mt-16">
        <FixTheSentence />
      </div>
    </Section>
  )
}

/* ---------------- Games ---------------- */

function Games() {
  return (
    <Section id="games">
      <div className="mx-auto max-w-[44rem] text-center">
        <h2 className={h2}>
          Games That Make <Emph>New Words</Emph> Stick
        </h2>
        <p className={cn(lede, 'mx-auto mt-6 max-w-[30rem]')}>Each word comes back in different games until it sticks.</p>
      </div>
      <div className="relative isolate mt-20">
        <Blob variant={1} color={blobBlue} className="left-1/2 top-[-8%] w-[min(760px,100%)] -translate-x-1/2" />
        <AppIcon name="stopwatch" reveal="wobble" className="absolute right-[4%] top-[6%] hidden w-24 rotate-[10deg] lg:block" />
        {/* above the phone's top-right corner, arrow pointing down at the screen */}
        <Scribble arrow="down-left" target="game-phone" className="absolute -top-8 left-[61%] hidden rotate-[4deg] lg:inline-flex">
          real screens
        </Scribble>
        <GamePhone />
      </div>
    </Section>
  )
}

/* ---------------- Progress ---------------- */

function Progress() {
  return (
    <Section id="progress">
      <div className="grid items-center gap-16 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        <div>
          <h2 className={h2}>
            Keep the <Emph swoosh={blue}>streak</Emph> going
          </h2>
          <p className={cn(lede, 'mt-8 max-w-[30rem]')}>
            Every session adds XP, fills in your week and can earn a medal. Achievements unlock along the way.
          </p>
          <div className="relative mt-12">
            <Scribble arrow="down-right" target="coins" className="mb-1 ml-6 rotate-[-4deg]">
              Tap an achievement
            </Scribble>
            <ul className="grid grid-cols-3 gap-x-2 gap-y-5 sm:grid-cols-5" data-arrow-target="coins">
              {achievements.slice(0, 5).map((a) => (
                <li key={a.name}>
                  <AchievementCoin name={a.name} img={a.img} />
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="relative isolate flex justify-center py-6">
          <Blob variant={2} className="right-0 top-[-4%] w-[min(600px,100%)]" />
          <AppIcon name="alarm-clock" reveal="wobble" className="absolute -bottom-2 right-0 hidden w-24 rotate-[8deg] sm:block" />
          <div className="relative w-full max-w-[420px]">
            {/* left of the streak card, arrow pointing right at it */}
            <Scribble arrow="right" target="streak" className="absolute right-full top-[128px] mr-1 hidden rotate-[-6deg] xl:inline-flex">
              4 in a row!
            </Scribble>
            <div className="rotate-[2deg]">
              <ProgressCards />
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

/* ---------------- Topics ---------------- */

function Topics() {
  const [followed, setFollowed] = useState(() => new Set(['Business & Finance', 'Literature & Language', 'Science & Research']))
  const toggle = (t: string) => {
    // following drops into place; unfollowing is a lighter tap
    playSound(followed.has(t) ? 'select' : 'drop', { volume: 0.8 })
    setFollowed((prev) => {
      const next = new Set(prev)
      if (next.has(t)) next.delete(t)
      else next.add(t)
      return next
    })
  }
  return (
    <Section>
      <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
        <div className="relative">
          <h2 className={h2}>
            Words from what you <Emph>love</Emph>
          </h2>
          <p className={cn(lede, 'mt-8 max-w-[30rem]')}>
            Pick your topics and your level. Recommendations follow both, and you choose how many words to practice
            each day.
          </p>
          {/* at the column's edge, arrow pointing right at the cards */}
          <Scribble arrow="right" target="topics" className="absolute -right-24 top-[62%] hidden rotate-[-5deg] lg:inline-flex">
            pick yours
          </Scribble>
        </div>
        {/* keep-light: the topic cards stay as light as the app's onboarding, in dark mode too */}
        <ul className="keep-light grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4" aria-label="Topics" data-arrow-target="topics">
          {topics.map((t) => {
            const on = followed.has(t.name)
            return (
              <li key={t.name}>
                <button type="button" aria-pressed={on} onClick={() => toggle(t.name)} className="category-card h-full w-full px-3 pb-3.5 pt-5 text-ink">
                  <span className="category-check capsule absolute right-2.5 top-2.5 grid size-6 place-items-center rounded-full bg-blue shadow-[0_0_0_2px_var(--color-surface)]">
                    <AppIcon name="correct" keepColors className="size-3" />
                  </span>
                  <AppIcon name={t.icon} keepColors className="h-12 w-auto" />
                  <span className="mt-3 h-px w-3/4 bg-ink/20" aria-hidden="true" />
                  <span className="mt-2.5 font-display text-[1rem] font-semibold leading-tight">{t.name}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </Section>
  )
}

/* ---------------- Make it yours ---------------- */

function MakeItYours() {
  return (
    <Section>
      <div className="relative isolate">
        <Blob variant={1} className="left-1/2 top-[58%] w-[min(900px,100%)] -translate-x-1/2 -translate-y-1/2 opacity-80" />
        <h2 className={cn(h2, 'text-center')}>
          Make it <Emph swoosh={blue}>yours</Emph>
        </h2>
        <ul className="mt-20 grid items-end gap-16 text-center sm:grid-cols-3 sm:gap-8">
          <li className="flex flex-col items-center gap-7">
            <div className="rotate-[-5deg]">
              <WidgetMock />
            </div>
            <Scribble className="rotate-[-3deg]">a word on your Home Screen</Scribble>
          </li>
          <li className="flex flex-col items-center gap-7">
            <div className="flex items-end" aria-hidden="true">
              {['classic', 'blue', 'navy'].map((v, i) => (
                <img
                  key={v}
                  src={`/img/icons/app-icon-${v}.webp`}
                  alt=""
                  width={84}
                  height={84}
                  loading="lazy"
                  className={cn('block size-[84px] rounded-[22px] shadow-[0_10px_20px_-10px_rgb(36_48_64/0.45)]', ['-rotate-8 translate-x-3', 'z-10 -translate-y-2', 'rotate-8 -translate-x-3'][i])}
                />
              ))}
            </div>
            <Scribble className="rotate-[2deg]">three app icons</Scribble>
          </li>
          <li className="flex flex-col items-center gap-7">
            <span className="grid size-[120px] rotate-[6deg] place-items-center rounded-[30px] bg-surface shadow-[inset_0_0_0_2.5px_var(--color-ink)]">
              <AppIcon name="notifications" className="size-16" />
            </span>
            <Scribble className="rotate-[-2deg]">a daily reminder</Scribble>
          </li>
        </ul>
      </div>
    </Section>
  )
}

/* ---------------- What Articulate is about ---------------- */

function Manifesto() {
  return (
    <Section className="pb-4 sm:pb-6">
      <figure className="mx-auto max-w-[52rem] text-center">
        <blockquote data-reveal="rise" className="display manifesto-quote text-[clamp(2rem,4.6vw,3.5rem)]">
          {/* no swoosh: mid-sentence, it would run into the next line */}
          Learn the way you <Emph>actually learn</Emph> and elevate your vocabulary with Articulate.
        </blockquote>
        <figcaption className="manifesto-by">— Designed by students and scientists.</figcaption>
      </figure>
    </Section>
  )
}

/* ---------------- Try it for free ---------------- */

function TryFree() {
  return (
    <Section id="try">
      <div className="keep-light relative isolate mx-auto max-w-[920px] overflow-hidden rounded-[36px] bg-paper px-6 py-16 text-center sm:px-12 sm:py-20">
        <Blob drift={false} variant={0} className="-left-[18%] -top-[45%] w-[70%]" />
        <Blob drift={false} variant={2} color={blobBlue} className="-bottom-[50%] -right-[16%] w-[62%]" />
        <AppIcon name="alarm-clock" keepColors reveal="wobble" className="mx-auto w-20 rotate-[-8deg] sm:w-24" />
        <h2 className={cn(h2, 'mt-6')}>
          Try it for <Emph swoosh={blue}>free</Emph>
        </h2>
        <p className={cn(lede, 'mx-auto mt-7 max-w-[30rem]')}>
          Every game, from day one. Download Articulate and start with today's words.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-4">
          <span data-arrow-target="try-button">
            <AppStoreButton />
          </span>
          {/* right of the button, arrow pointing back at it; on phones it wraps under it and points up */}
          <Scribble arrow="left" target="try-button" className="rotate-[-4deg] max-sm:hidden">
            start for free
          </Scribble>
          <Scribble arrow="up-left" target="try-button" className="rotate-[-3deg] sm:hidden">
            start for free
          </Scribble>
        </div>
      </div>
    </Section>
  )
}

/* ---------------- FAQ ---------------- */

function FaqSection() {
  return (
    <Section id="faq">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
        <div>
          <h2 className={h2}>
            Good <Emph>questions</Emph>
          </h2>
          <AppIcon name="check-bubble" reveal="wobble" className="mt-8 w-24 rotate-[-6deg]" />
          <p className="mt-6 max-w-[22rem] text-[1.05rem] leading-relaxed text-ink-soft">
            Anything else?{' '}
            <Link to="/support" className="font-medium text-ink underline decoration-blue decoration-[3px] underline-offset-4">
              Visit Support
            </Link>
            .
          </p>
        </div>
        <FaqList items={faqs} />
      </div>
    </Section>
  )
}

/* ---------------- Final call to action ---------------- */

function FinalCta() {
  return (
    <Section className="pb-28 sm:pb-36">
      <div className="relative isolate mx-auto max-w-[46rem] text-center">
        <Blob variant={2} className="left-1/2 top-1/2 w-[min(820px,100%)] -translate-x-1/2 -translate-y-1/2" />
        <LogoMark className="mx-auto h-16 w-auto text-lavender-deep" />
        <h2 className={cn(h2, 'mt-8')}>
          Don't just learn words.
          <br />
          <Emph swoosh={blue}>Use them</Emph>
        </h2>
        <div className="mt-12 flex justify-center">
          <AppStoreButton />
        </div>
        <AppIcon name="coffee-book" reveal="wobble" className="absolute -bottom-6 right-0 hidden w-32 rotate-[4deg] md:block" />
      </div>
    </Section>
  )
}

export function Landing() {
  usePageTitle('Articulate: learn new words by using them')
  return (
    <>
      <Hero />
      <Session />
      <Games />
      <Progress />
      <Topics />
      <MakeItYours />
      <Manifesto />
      <TryFree />
      <FaqSection />
      <FinalCta />
      <MobileAppBar />
    </>
  )
}
