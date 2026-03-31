import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const COLORS = {
  primary: '#282D3F',
  accent: '#3FA7D6',
  grey: '#8A8F9B',
  background: '#F0F0F1',
  surface: '#FFFFFF',
}

const SCREENSHOTS = [
  '/screenshots/01.png',
  '/screenshots/02.png',
  '/screenshots/03.png',
  '/screenshots/04.png',
  '/screenshots/05.png',
  '/screenshots/06.png',
]

const FEATURES = [
  {
    title: 'Personalized word cards',
    description:
      'Our recommendation algorithm surfaces the words you need most — tailored to your level and play history.',
    icon: '📖',
  },
  {
    title: 'AI evaluation',
    description:
      'Write original sentences and get instant, intelligent feedback. No multiple choice — real comprehension only.',
    icon: '🤖',
  },
  {
    title: 'Progress & achievements',
    description:
      'Earn medals, gain XP, and watch your vocabulary grow round by round.',
    icon: '🏅',
  },
]

export default function Landing() {
  const heroRef = useRef<HTMLDivElement>(null)
  const stripRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          hero.classList.add('nudge-animate')
          hero.addEventListener(
            'animationend',
            () => hero.classList.remove('nudge-animate'),
            { once: true }
          )
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(hero)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const strip = stripRef.current
    if (!strip) return
    const onScroll = () => {
      const max = strip.scrollWidth - strip.clientWidth
      setScrollProgress(max > 0 ? strip.scrollLeft / max : 0)
    }
    strip.addEventListener('scroll', onScroll, { passive: true })
    return () => strip.removeEventListener('scroll', onScroll)
  }, [])

  const container: React.CSSProperties = {
    maxWidth: 900,
    margin: '0 auto',
    padding: '0 24px',
    fontFamily: 'Akshar, Helvetica, sans-serif',
  }

  return (
    <div style={{ backgroundColor: COLORS.background, minHeight: '100vh' }}>
      {/* Nav */}
      <nav
        style={{
          backgroundColor: COLORS.surface,
          borderBottom: `1px solid #E0E0E2`,
          position: 'sticky',
          top: 0,
          zIndex: 50,
        }}
      >
        <div
          style={{
            ...container,
            display: 'flex',
            alignItems: 'center',
            height: 56,
          }}
        >
          <span
            style={{
              fontSize: 22,
              fontWeight: 600,
              color: COLORS.primary,
              letterSpacing: '-0.02em',
            }}
          >
            Articulate
          </span>
        </div>
      </nav>

      {/* Hero */}
      <section
        style={{
          ...container,
          paddingTop: 72,
          paddingBottom: 64,
          textAlign: 'center',
        }}
      >
        <div ref={heroRef} style={{ display: 'inline-block', marginBottom: 32 }}>
          <img
            src="/articulate-icon.png"
            alt="Articulate app icon"
            style={{
              width: 96,
              height: 96,
              borderRadius: 22,
              boxShadow: '0 8px 32px rgba(40,45,63,0.18)',
            }}
          />
        </div>
        <h1
          style={{
            fontSize: 'clamp(2.5rem, 8vw, 5rem)',
            fontWeight: 600,
            color: COLORS.primary,
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            margin: '0 0 20px',
          }}
        >
          Master the art
          <br />
          of language.
        </h1>
        <p
          style={{
            fontSize: 'clamp(1.1rem, 3vw, 1.35rem)',
            color: COLORS.grey,
            maxWidth: 520,
            margin: '0 auto 40px',
            lineHeight: 1.55,
          }}
        >
          Turn your vocabulary into your greatest asset. Articulate builds real
          fluency through active learning — not passive memorization.
        </p>
        <a
          href="https://apps.apple.com/app/idPLACEHOLDER"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            backgroundColor: COLORS.primary,
            color: '#fff',
            borderRadius: 12,
            padding: '14px 28px',
            fontSize: 17,
            fontWeight: 600,
            textDecoration: 'none',
            fontFamily: 'Akshar, Helvetica, sans-serif',
            letterSpacing: '0.01em',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
          </svg>
          Download on the App Store
        </a>
      </section>

      {/* Screenshots carousel */}
      <section style={{ paddingBottom: 64 }}>
        <div
          ref={stripRef}
          style={{
            display: 'flex',
            overflowX: 'auto',
            gap: 16,
            scrollSnapType: 'x mandatory',
            padding: '0 24px 16px',
            scrollbarWidth: 'none',
          }}
        >
          {SCREENSHOTS.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`App screenshot ${i + 1}`}
              style={{
                scrollSnapAlign: 'start',
                borderRadius: 16,
                height: 420,
                width: 'auto',
                flexShrink: 0,
                boxShadow: '0 4px 24px rgba(40,45,63,0.12)',
              }}
            />
          ))}
        </div>
        {/* Progress bar */}
        <div
          style={{
            ...container,
            marginTop: 12,
          }}
        >
          <div
            style={{
              height: 3,
              backgroundColor: '#D8D8DA',
              borderRadius: 2,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${scrollProgress * 100}%`,
                backgroundColor: COLORS.accent,
                transition: 'width 0.2s ease',
                borderRadius: 2,
              }}
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ ...container, paddingBottom: 72 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 20,
          }}
        >
          {FEATURES.map((f) => (
            <div
              key={f.title}
              style={{
                backgroundColor: COLORS.surface,
                borderRadius: 16,
                padding: '28px 24px',
                boxShadow: '0 2px 12px rgba(40,45,63,0.07)',
              }}
            >
              <div style={{ fontSize: 32, marginBottom: 12 }}>{f.icon}</div>
              <h3
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                  color: COLORS.primary,
                  margin: '0 0 8px',
                  letterSpacing: '-0.01em',
                }}
              >
                {f.title}
              </h3>
              <p
                style={{
                  fontSize: 15,
                  color: COLORS.grey,
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Pull quote */}
      <section
        style={{
          backgroundColor: COLORS.primary,
          padding: '64px 24px',
          textAlign: 'center',
        }}
      >
        <blockquote
          style={{
            maxWidth: 680,
            margin: '0 auto',
            fontSize: 'clamp(1.2rem, 3.5vw, 1.6rem)',
            fontWeight: 500,
            color: '#fff',
            lineHeight: 1.45,
            letterSpacing: '-0.01em',
            fontFamily: 'Akshar, Helvetica, sans-serif',
            fontStyle: 'normal',
          }}
        >
          "Learn the way you actually learn and elevate your vocabulary with
          Articulate"
        </blockquote>
      </section>

      {/* Footer */}
      <footer
        style={{
          backgroundColor: COLORS.surface,
          borderTop: '1px solid #E0E0E2',
          padding: '28px 24px',
        }}
      >
        <div
          style={{
            ...container,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <span style={{ fontSize: 14, color: COLORS.grey }}>
            © {new Date().getFullYear()} Real Intelligence Tech LLC
          </span>
          <nav style={{ display: 'flex', gap: 24 }}>
            {[
              { label: 'Terms', to: '/terms' },
              { label: 'Privacy', to: '/privacy' },
              { label: 'Meshaa', href: 'https://meshaa.io' },
            ].map((link) =>
              link.href ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: 14,
                    color: COLORS.grey,
                    textDecoration: 'none',
                    fontFamily: 'Akshar, Helvetica, sans-serif',
                  }}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  to={link.to!}
                  style={{
                    fontSize: 14,
                    color: COLORS.grey,
                    textDecoration: 'none',
                    fontFamily: 'Akshar, Helvetica, sans-serif',
                  }}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>
        </div>
      </footer>
    </div>
  )
}
