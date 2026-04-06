import { Link } from 'react-router-dom'
import { useEffect, useLayoutEffect, useRef } from 'react'

const c = {
  primary: '#282D3F',
  accent: '#3FA7D6',
  grey: '#8A8F9B',
  bg: '#F0F0F1',
  surface: '#FFFFFF',
}

const akshar = "'Akshar', sans-serif"
const helvetica = "Helvetica, Arial, sans-serif"

const ASPECT = 2868 / 1320
const screenshots = ['/screenshots/02.png', '/screenshots/03.png', '/screenshots/01.png', '/screenshots/04.png', '/screenshots/05.png', '/screenshots/06.png']

function PhoneMockup({ src, width }: { src: string; width: number }) {
  const height = Math.round(width * ASPECT)
  return (
    <div
      style={{
        width,
        height,
        borderRadius: 24,
        overflow: 'hidden',
        boxShadow: '0 24px 56px rgba(40,45,63,0.18), 0 6px 16px rgba(40,45,63,0.08)',
        flexShrink: 0,
      }}
    >
      <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
    </div>
  )
}

export function Landing() {
  const stripRef = useRef<HTMLDivElement>(null)
  const pillRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }, [])

  useEffect(() => {
    const el = stripRef.current
    const pill = pillRef.current
    if (!el) return

    const updatePill = () => {
      if (!pill) return
      pill.style.animation = 'none'
      const progress = el.scrollLeft / (el.scrollWidth - el.clientWidth) || 0
      pill.style.transform = `translateX(${progress * 52}px)`
    }

    el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2
    updatePill()
    el.addEventListener('scroll', updatePill, { passive: true })

    let nudged = false
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && pill && !nudged) {
          nudged = true
          pill.classList.add('nudge')
          pill.addEventListener('animationend', () => pill.classList.remove('nudge'), { once: true })
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)

    return () => {
      el.removeEventListener('scroll', updatePill)
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    const id = 'akshar-font'
    if (!document.getElementById(id)) {
      const link = document.createElement('link')
      link.id = id
      link.rel = 'stylesheet'
      link.href = 'https://fonts.googleapis.com/css2?family=Akshar:wght@300;400;500;600;700&display=swap'
      document.head.appendChild(link)
    }
  }, [])

  return (
    <div style={{ fontFamily: helvetica, backgroundColor: c.bg, minHeight: '100vh', color: c.primary }}>

      {/* Nav */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 48px' }} />

      {/* Hero */}
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '80px 48px 120px' }}>
        <div className="articulate-hero-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '64px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto' }}>
            <img
              src="/articulate-icon.png"
              alt="Articulate"
              style={{
                width: 'clamp(160px, 18vw, 260px)',
                display: 'block',
                mixBlendMode: 'multiply',
              }}
            />
          </div>

          <div className="articulate-hero-text" style={{ flex: 1, display: 'flex', flexDirection: 'column', paddingLeft: '96px' }}>
            <h1
              style={{
                fontFamily: akshar,
                fontWeight: 700,
                fontSize: 'clamp(56px, 10vw, 90px)',
                color: c.primary,
                lineHeight: 0.95,
                marginBottom: '32px',
                letterSpacing: '-2px',
              }}
            >
              Articulate
            </h1>
            <p
              className="articulate-hero-subtitle"
              style={{
                fontFamily: helvetica,
                fontWeight: 300,
                fontSize: '20px',
                color: c.grey,
                maxWidth: '460px',
                lineHeight: 1.65,
                marginBottom: '48px',
              }}
            >
              Learn sophisticated words through active learning, personalized recommendations, and an AI grader for every word you want to master.
            </p>
            <a
              href="https://apps.apple.com/us/app/articulate-vocabulary-mastery/id6759561001"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignSelf: 'flex-start',
                alignItems: 'center',
                gap: '12px',
                backgroundColor: c.primary,
                color: '#FFFFFF',
                padding: '13px 26px',
                borderRadius: '12px',
                textDecoration: 'none',
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="white">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              <div>
                <div style={{ fontSize: '10px', fontFamily: helvetica, fontWeight: 300, opacity: 0.75, lineHeight: 1.3 }}>
                  Download on the
                </div>
                <div style={{ fontSize: '18px', fontFamily: akshar, fontWeight: 600, lineHeight: 1.2 }}>
                  App Store
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Screenshots */}
      <section style={{ backgroundColor: c.bg, padding: '0 48px 100px', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2
            style={{
              fontFamily: akshar,
              fontWeight: 700,
              fontSize: '25px',
              color: c.primary,
              marginBottom: '52px',
              letterSpacing: '-0.5px',
            }}
          >
            Where learning happens
          </h2>
          <div style={{ position: 'relative' }}>
            <div
              ref={stripRef}
              style={{
                overflowX: 'auto',
                WebkitOverflowScrolling: 'touch',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                marginLeft: '-48px',
                marginRight: '-48px',
                paddingLeft: '48px',
                paddingRight: '48px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  gap: '16px',
                  paddingBottom: '8px',
                  width: 'max-content',
                }}
              >
                {screenshots.map((src, i) => {
                  const widths = [160, 172, 188, 188, 172, 160]
                  return <PhoneMockup key={src} src={src} width={widths[i] ?? 172} />
                })}
              </div>
            </div>
          </div>
          <div className="strip-indicator-track">
            <div className="strip-indicator-pill" ref={pillRef} />
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ backgroundColor: c.bg, padding: '80px 48px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2
            style={{
              fontFamily: akshar,
              fontWeight: 700,
              fontSize: '25px',
              color: c.primary,
              marginBottom: '52px',
              letterSpacing: '-0.5px',
            }}
          >
            How it works
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '48px',
            }}
          >
            {[
              {
                title: 'Personalized word cards',
                desc: 'Words are selected based on your level, goals, and learning history — always relevant, never random.',
              },
              {
                title: 'AI evaluation',
                desc: 'Write sentences and get instant feedback on correctness, quality, and usage from our AI system.',
              },
              {
                title: 'Progress & achievements',
                desc: 'Earn medals, experience points, and achievements that track your growth over time.',
              },
            ].map((f) => (
              <div key={f.title}>
                <div
                  style={{
                    width: '32px',
                    height: '3px',
                    backgroundColor: c.accent,
                    marginBottom: '20px',
                    borderRadius: '2px',
                  }}
                />
                <h3
                  style={{
                    fontFamily: akshar,
                    fontWeight: 600,
                    fontSize: '18px',
                    color: c.primary,
                    marginBottom: '12px',
                  }}
                >
                  {f.title}
                </h3>
                <p
                  style={{
                    fontFamily: helvetica,
                    fontWeight: 300,
                    fontSize: '16px',
                    color: c.grey,
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  {f.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Pull Quote */}
          <div style={{ borderTop: `1px solid ${c.primary}20`, marginTop: '64px', paddingTop: '48px', textAlign: 'center' }}>
            <p
              style={{
                fontFamily: helvetica,
                fontStyle: 'italic',
                fontWeight: 300,
                fontSize: 'clamp(15px, 2vw, 18px)',
                color: c.primary,
                lineHeight: 1.5,
                marginBottom: '12px',
              }}
            >
              "Learn the way you actually learn and elevate your vocabulary with Articulate."
            </p>
            <p
              style={{
                fontFamily: helvetica,
                fontStyle: 'italic',
                fontWeight: 300,
                fontSize: '14px',
                color: c.grey,
                letterSpacing: '0.02em',
              }}
            >
              — Designed by students and scientists.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '100px 48px', textAlign: 'center' }}>
        <h2
          style={{
            fontFamily: akshar,
            fontWeight: 700,
            fontSize: 'clamp(28px, 5vw, 48px)',
            color: c.primary,
            marginBottom: '20px',
            letterSpacing: '-1px',
          }}
        >
          Start learning today.
        </h2>
        <p
          style={{
            fontFamily: helvetica,
            fontWeight: 300,
            fontSize: '16px',
            color: c.grey,
            marginBottom: '40px',
          }}
        >
          Available on iOS.
        </p>
        <a
          href="https://apps.apple.com/us/app/articulate-vocabulary-mastery/id6759561001"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            backgroundColor: c.primary,
            color: '#FFFFFF',
            padding: '13px 26px',
            borderRadius: '12px',
            textDecoration: 'none',
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="white">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
          </svg>
          <div>
            <div style={{ fontSize: '10px', fontFamily: helvetica, fontWeight: 300, opacity: 0.75, lineHeight: 1.3 }}>
              Download on the
            </div>
            <div style={{ fontSize: '18px', fontFamily: akshar, fontWeight: 600, lineHeight: 1.2 }}>
              App Store
            </div>
          </div>
        </a>
      </section>

      {/* Footer */}
      <footer
        style={{
          borderTop: '1px solid #E0E0E2',
          padding: '32px 48px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <span style={{ color: c.grey, fontSize: '13px', fontFamily: helvetica, fontWeight: 300 }}>
          © 2022–2026 Real Intelligence Tech LLC
        </span>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <Link
            to="/terms"
            style={{ color: c.grey, fontSize: '13px', textDecoration: 'none', fontFamily: helvetica, fontWeight: 300 }}
          >
            Terms
          </Link>
          <Link
            to="/privacy"
            style={{ color: c.grey, fontSize: '13px', textDecoration: 'none', fontFamily: helvetica, fontWeight: 300 }}
          >
            Privacy
          </Link>
        </div>
      </footer>
    </div>
  )
}
