import { LegalPage, LegalSection } from '@/components/LegalPage'
import { usePageTitle } from '@/lib/usePageTitle'

export function Terms() {
  usePageTitle('Terms of Use · Articulate')

  return (
    <LegalPage
      title="Terms of"
      emph="Use"
      icon="books"
      meta={[
        { label: 'Effective Date', value: 'January 19, 2026' },
        { label: 'Last Updated', value: 'March 23, 2026' },
        { label: 'Provider', value: 'Real Intelligence Tech LLC ("Articulate," "we," "us," "our")' },
        { label: 'Contact', value: <a href="mailto:contact@meshaa.io">contact@meshaa.io</a> },
      ]}
      intro={
        <>
          <p className="text-muted-foreground leading-relaxed">
            These Terms of Use ("Terms") govern your access to and use of the Articulate mobile application, website (if any), and related services (collectively, the "Service"). These Terms form a legal agreement between you and Real Intelligence Tech LLC regarding your use of the Service. By downloading, accessing, or using the Service, you agree to these Terms.
          </p>
          <p className="text-muted-foreground leading-relaxed font-medium">
            If you do not agree, do not use the Service.
          </p>
        </>
      }
    >
      <LegalSection n={1} title="What Articulate Is">
        <p className="text-muted-foreground leading-relaxed mb-4">
          Articulate is a vocabulary-learning app designed to help users learn sophisticated words through an active learning approach. The Service includes:
        </p>
        <ul className="list-disc list-inside text-muted-foreground space-y-2">
          <li>Word cards selected by a personalized recommendation system</li>
          <li>AI-assisted evaluation and feedback on sentence correctness and usage quality</li>
          <li>Progress features such as medals, experience points, and achievements</li>
        </ul>
      </LegalSection>

      <LegalSection n={2} title="Eligibility">
        <p className="text-muted-foreground leading-relaxed">
          You must be at least 13 years old to use the Service. If you are under the age of majority where you live, you may use the Service only with permission of a parent or legal guardian.
        </p>
      </LegalSection>

      <LegalSection n={3} title="Accounts and Access">
        <p className="text-muted-foreground leading-relaxed mb-4">
          You may need to create an account to use parts of the Service. You agree to:
        </p>
        <ul className="list-disc list-inside text-muted-foreground space-y-2">
          <li>Provide accurate information</li>
          <li>Keep your login credentials secure</li>
          <li>Notify us promptly of unauthorized access</li>
        </ul>
        <p className="text-muted-foreground leading-relaxed mt-4">
          You are responsible for activity that occurs under your account.
        </p>
      </LegalSection>

      <LegalSection n={4} title="Subscriptions, Billing, Cancellation, and Restore">

        <h3 className="text-lg font-medium mb-2">Subscription Required</h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Articulate requires an active paid subscription to access and use the Service. You may view the subscription screen and purchase options before subscribing, but core app functionality is not available without an active subscription.
        </p>

        <h3 className="text-lg font-medium mb-2">Subscription Offer Details</h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Before you confirm a purchase, the applicable subscription title, subscription length, and purchase price will be displayed in the app and/or through Apple's purchase flow. Prices may vary by region, currency, taxes, promotional offer, and App Store settings. The price shown to you at the time of purchase is the price that applies to your subscription.
        </p>

        <h3 className="text-lg font-medium mb-2">Billing through Apple</h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          If you subscribe in the iOS app, billing is handled by Apple and charged to your Apple ID. Subscription management (including cancellation) occurs through your App Store account settings.
        </p>

        <h3 className="text-lg font-medium mb-2">Renewal</h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Subscriptions may automatically renew unless canceled at least 24 hours before the end of the current period (as determined by Apple's rules).
        </p>

        <h3 className="text-lg font-medium mb-2">Cancellation</h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          You can cancel anytime in your Apple ID subscription settings. Cancellation stops future renewals; you typically retain access until the end of the paid period.
        </p>

        <h3 className="text-lg font-medium mb-2">Restore Purchases</h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          If you previously subscribed, you can use Restore Purchases to re-sync your entitlements on a device (for example, after reinstalling the app). Restoring does not guarantee access if your subscription is expired or if you are signed into a different Apple ID than the one used to purchase.
        </p>

        <h3 className="text-lg font-medium mb-2">Refunds</h3>
        <p className="text-muted-foreground leading-relaxed">
          Refund requests are handled by Apple under Apple's policies. We generally cannot issue App Store refunds directly.
        </p>
      </LegalSection>

      <LegalSection n={5} title="User Content (Your Writing) and Permissions">

        <h3 className="text-lg font-medium mb-2">Your Content</h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          You may submit content to the Service, including sentences you write ("User Content"). You retain ownership of your User Content.
        </p>

        <h3 className="text-lg font-medium mb-2">License You Grant Us</h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          To operate and improve the Service, you grant us a worldwide, non-exclusive, royalty-free license to host, store, process, display, and analyze your User Content solely for:
        </p>
        <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
          <li>Providing the Service (including AI evaluation and feedback)</li>
          <li>Maintaining and securing the Service</li>
          <li>Improving features and learning experience (including model and recommendation improvements), where permitted by law and consistent with our Privacy Policy</li>
        </ul>
        <p className="text-muted-foreground leading-relaxed mb-4">
          You can request deletion of your account and associated data as described in our Privacy Policy.
        </p>

        <h3 className="text-lg font-medium mb-2">Content Rules</h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          You agree not to submit User Content that:
        </p>
        <ul className="list-disc list-inside text-muted-foreground space-y-2">
          <li>Is illegal, threatening, harassing, or hateful</li>
          <li>Infringes someone else's rights</li>
          <li>Contains malware or attempts to exploit the Service</li>
          <li>Attempts to reverse engineer, probe, or attack the Service</li>
        </ul>
      </LegalSection>

      <LegalSection n={6} title="AI Evaluation and Educational Disclaimer">
        <p className="text-muted-foreground leading-relaxed mb-4">
          Articulate uses automated systems to evaluate writing and provide feedback. You understand and agree:
        </p>
        <ul className="list-disc list-inside text-muted-foreground space-y-2">
          <li>AI feedback may be incorrect, incomplete, or inappropriate for your specific context.</li>
          <li>The Service is for educational purposes and does not guarantee outcomes (test scores, job results, etc.).</li>
          <li>You are responsible for how you use the feedback and for your final writing decisions.</li>
        </ul>
      </LegalSection>

      <LegalSection n={7} title="Personalized Recommendations">
        <p className="text-muted-foreground leading-relaxed mb-4">
          Articulate selects word cards using personalization signals such as onboarding answers, word survey responses, and gameplay activity. Personalization is designed to improve relevance, but it may not always match your preferences. You can adjust behavior by changing how you interact with the Service.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Details about data used for personalization are provided in the Privacy Policy.
        </p>
      </LegalSection>

      <LegalSection n={8} title="Intellectual Property">
        <p className="text-muted-foreground leading-relaxed">
          We and our licensors own the Service and all related intellectual property, including app design, text (excluding your User Content), graphics, logos, and software. You may not copy, modify, distribute, sell, lease, or reverse engineer any part of the Service except as allowed by law.
        </p>
      </LegalSection>

      <LegalSection n={9} title="Third-Party Services and Links">
        <p className="text-muted-foreground leading-relaxed">
          The Service may rely on third-party services (e.g., analytics, crash reporting, infrastructure). We are not responsible for third-party services outside our control. If the Service links to third-party websites, we do not endorse them and are not responsible for their content or practices.
        </p>
      </LegalSection>

      <LegalSection n={10} title="Acceptable Use">
        <p className="text-muted-foreground leading-relaxed mb-4">
          You agree not to:
        </p>
        <ul className="list-disc list-inside text-muted-foreground space-y-2">
          <li>Use the Service to violate laws or regulations</li>
          <li>Attempt unauthorized access to systems or accounts</li>
          <li>Scrape, crawl, or bulk-export content</li>
          <li>Interfere with the Service's operation (spam, abuse, load testing without permission)</li>
          <li>Use the Service to generate or distribute harmful or illegal content</li>
        </ul>
        <p className="text-muted-foreground leading-relaxed mt-4">
          We may suspend or terminate access for violations.
        </p>
      </LegalSection>

      <LegalSection n={11} title="Termination">
        <p className="text-muted-foreground leading-relaxed mb-4">
          You may stop using the Service at any time. We may suspend or terminate your account if you violate these Terms or if we must do so to comply with law or protect the Service.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Termination does not automatically cancel an App Store subscription—you must cancel through Apple.
        </p>
      </LegalSection>

      <LegalSection n={12} title="Disclaimers">
        <p className="text-muted-foreground leading-relaxed">
          THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE." TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICE WILL BE ERROR-FREE OR UNINTERRUPTED.
        </p>
      </LegalSection>

      <LegalSection n={13} title="Limitation of Liability">
        <p className="text-muted-foreground leading-relaxed mb-4">
          TO THE MAXIMUM EXTENT PERMITTED BY LAW, ARTICULATE AND ITS AFFILIATES WILL NOT BE LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR FOR ANY LOSS OF PROFITS, DATA, OR GOODWILL, ARISING OUT OF OR RELATED TO YOUR USE OF THE SERVICE.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          OUR TOTAL LIABILITY FOR ANY CLAIM ARISING OUT OF OR RELATING TO THE SERVICE WILL NOT EXCEED THE AMOUNT YOU PAID TO US (IF ANY) IN THE 12 MONTHS BEFORE THE EVENT GIVING RISE TO THE CLAIM.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          (Some jurisdictions do not allow certain limitations, so some of the above may not apply to you.)
        </p>
      </LegalSection>

      <LegalSection n={14} title="Indemnification">
        <p className="text-muted-foreground leading-relaxed">
          If you use the Service in violation of these Terms, or you submit User Content that violates laws or third-party rights, you agree to defend and indemnify us from claims, damages, and expenses (including reasonable legal fees) arising from that misuse.
        </p>
      </LegalSection>

      <LegalSection n={15} title="Changes to the Service or Terms">
        <p className="text-muted-foreground leading-relaxed">
          We may update the Service and these Terms from time to time. If changes are material, we will provide reasonable notice (for example, in-app notice or updating the "Last Updated" date). Continued use after changes means you accept the updated Terms.
        </p>
      </LegalSection>

      <LegalSection n={16} title="Governing Law">
        <p className="text-muted-foreground leading-relaxed">
          These Terms are governed by the laws of the State of Delaware, United States, excluding conflict of law rules. Any disputes will be brought in the courts located in the State of Delaware, unless applicable law requires otherwise.
        </p>
      </LegalSection>

      <LegalSection n={17} title="Contact">
        <p className="text-muted-foreground leading-relaxed mb-4">
          Questions about these Terms: <a href="mailto:contact@meshaa.io" className="hover:text-foreground">contact@meshaa.io</a>
        </p>
        <div className="legal-card">
          <p><strong>Real Intelligence Tech LLC</strong></p>
          <p className="mt-2"><strong>Address</strong></p>
          <p>800 N King Street, Suite 304-1716</p>
          <p>Wilmington, DE 19801, United States</p>
        </div>
      </LegalSection>
    </LegalPage>
  )
}
