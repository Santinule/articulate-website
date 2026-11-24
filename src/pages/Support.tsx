import { Link } from 'react-router-dom'
import { AppIcon, TintIcon } from '@/components/AppIcon'
import { FaqList } from '@/components/Faq'
import { MetaTable, PageHero } from '@/components/PageHero'
import { CONTACT_EMAIL, MANAGE_SUBSCRIPTIONS_URL, REVIEW_URL, faqs } from '@/data/content'
import { usePageTitle } from '@/lib/usePageTitle'

type Topic = {
  icon: string
  title: string
  body: string
  link?: { label: string; href: string }
}

// Icons the app uses for the same things: My Subscription (Settings), the plans screen, Delete Account,
// and the thumbs-up it uses for rating.
const topics: Topic[] = [
  {
    icon: 'my-subscription',
    title: 'Manage your subscription',
    body: 'On your iPhone, open Settings, tap your name, then Subscriptions. You can also tap Manage in App Store from Settings inside Articulate.',
    link: { label: 'Open Apple subscriptions', href: MANAGE_SUBSCRIPTIONS_URL },
  },
  {
    icon: 'yearly-plan',
    title: 'Restore a purchase',
    body: 'New phone or reinstalled the app? Sign in with the same Apple ID, open the plans screen and tap Restore Purchases.',
  },
  {
    icon: 'icons_Delete',
    title: 'Delete your account',
    body: 'Open Settings in the app, go to Account and tap Delete Account. Deleting your account does not cancel an App Store subscription, so cancel that separately.',
  },
  {
    icon: 'thumbs-up',
    title: 'Rate Articulate',
    body: 'Reviews help other learners find the app and tell us what to improve next.',
    link: { label: 'Write a review', href: REVIEW_URL },
  },
]

export function Support() {
  usePageTitle('Support · Articulate')
  return (
    <div className="legal mx-auto w-full max-w-[1180px] px-5 pb-24 pt-12 sm:px-8 sm:pt-16">
      <PageHero tag="Support" title="How can we" emph="help" after="?" icon="check-bubble">
        <p className="legal-lede">
          Most answers are below. If yours isn't, email us and include the email address on your Articulate account.
        </p>
        <a href={`mailto:${CONTACT_EMAIL}`} className="btn btn-ink mt-7">
          <TintIcon name="envelope" className="size-5" />
          Email support
        </a>
        <MetaTable
          rows={[
            { label: 'Email', value: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> },
            {
              label: 'Subscriptions',
              value: (
                <>
                  Managed by Apple ·{' '}
                  <a href={MANAGE_SUBSCRIPTIONS_URL} target="_blank" rel="noopener noreferrer">
                    Open Apple subscriptions<span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </>
              ),
            },
            {
              label: 'Legal',
              value: (
                <>
                  <Link to="/privacy">Privacy Policy</Link> · <Link to="/terms">Terms of Use</Link>
                </>
              ),
            },
          ]}
        />
      </PageHero>

      <section aria-labelledby="common-tasks" className="support-section">
        <h2 id="common-tasks" className="numbered-title">
          <span className="legal-num capsule" aria-hidden="true">
            1
          </span>
          Common tasks
        </h2>
        <ul className="mt-8 grid gap-4 md:grid-cols-2">
          {topics.map((t) => (
            <li key={t.title} className="support-tile">
              <span className="icon-dot capsule grid size-12 shrink-0 place-items-center rounded-full bg-surface">
                <AppIcon name={t.icon} keepColors className="size-7" />
              </span>
              <div>
                <h3 className="font-display text-[1.45rem] font-semibold leading-tight">{t.title}</h3>
                <p className="mt-2 leading-relaxed text-ink-soft">{t.body}</p>
                {t.link && (
                  <a href={t.link.href} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block font-medium">
                    {t.link.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="faq-title" className="support-section grid gap-8 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
        <h2 id="faq-title" className="numbered-title self-start">
          <span className="legal-num capsule" aria-hidden="true">
            2
          </span>
          Frequently asked
        </h2>
        <FaqList items={faqs} />
      </section>
    </div>
  )
}
