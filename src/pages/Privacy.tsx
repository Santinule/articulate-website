import { Link } from 'react-router-dom'

export default function Privacy() {
  return (
    <div className="max-w-3xl mx-auto px-8 py-16">
      <Link
        to="/"
        className="text-sm text-muted-foreground hover:text-foreground mb-8 inline-block"
      >
        ← Articulate
      </Link>

      <h1 className="text-3xl font-bold mb-2">Articulate — Privacy Policy</h1>
      <div className="text-sm text-muted-foreground mb-12 space-y-1">
        <p>Effective Date: March 16, 2026</p>
        <p>Last Updated: March 16, 2026</p>
        <p>Provider: Real Intelligence Tech LLC ("Articulate," "we," "us," "our")</p>
        <p>Contact: contact@meshaa.io</p>
      </div>

      <div className="space-y-10">
        <section>
          <h2 className="text-xl font-semibold mb-4">1. Information We Collect</h2>

          <h3 className="text-lg font-medium mb-2">Information You Provide</h3>
          <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
            <li>Account information: email address and password (or Sign in with Apple credentials)</li>
            <li>Onboarding survey responses used to build your personal word dictionary</li>
            <li>Sentences and written responses you submit during gameplay</li>
          </ul>

          <h3 className="text-lg font-medium mb-2">Information We Collect Automatically</h3>
          <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
            <li>Game play history: words presented, sentences written, scores, and medals earned</li>
            <li>Performance data: round results, XP progression, and achievement history</li>
            <li>Device information: device type, operating system version, and app version</li>
            <li>Usage data: session times and feature interactions</li>
            <li>Timezone data (used to track daily streaks and progress)</li>
          </ul>

          <h3 className="text-lg font-medium mb-2">Information from Third Parties</h3>
          <p className="text-muted-foreground leading-relaxed">
            If you use Sign in with Apple, we receive your Apple-provided identifier and, if you
            choose, your name and email address from Apple.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">2. How We Use Your Information</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">We use the information we collect to:</p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2">
            <li>Create and manage your account</li>
            <li>Operate the core game experience: word selection, sentence evaluation, scoring</li>
            <li>Power the personalized word recommendation algorithm</li>
            <li>Track your progress, XP, medals, and achievements</li>
            <li>Improve the app's AI evaluation systems and educational content</li>
            <li>Send transactional communications (e.g., account verification, password reset)</li>
            <li>Maintain the security and integrity of the service</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">3. AI-Generated Content and Human Review</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Your submitted sentences are processed by AI systems (Claude by Anthropic, Gemini by
            Google) for evaluation. Please be aware:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2">
            <li>
              Sentence data sent to AI providers is governed by their respective privacy policies
              and data processing agreements
            </li>
            <li>
              Authorized team members at Real Intelligence Tech LLC may review submitted content
              for quality assurance, safety monitoring, and AI model improvement purposes
            </li>
            <li>
              We do not use your sentences for advertising or sell them to third parties
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">4. How We Share Your Information</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            We do not sell your personal information. We may share your information with:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2">
            <li>
              <span className="text-foreground font-medium">AI Service Providers:</span> Anthropic
              (Claude) and Google (Gemini) to process sentence evaluations
            </li>
            <li>
              <span className="text-foreground font-medium">Infrastructure Providers:</span> Cloud
              hosting and database services that store and process your data on our behalf
            </li>
            <li>
              <span className="text-foreground font-medium">Apple:</span> For App Store
              transactions and Sign in with Apple functionality
            </li>
            <li>
              <span className="text-foreground font-medium">Legal Authorities:</span> When required
              by law, court order, or to protect the rights and safety of our users and the public
            </li>
            <li>
              <span className="text-foreground font-medium">Business Transfers:</span> In connection
              with a merger, acquisition, or sale of assets, with appropriate confidentiality
              protections
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">5. Data Retention</h2>
          <p className="text-muted-foreground leading-relaxed">
            We retain your account and usage data for as long as your account is active or as
            needed to provide the service. If you delete your account, we will delete or anonymize
            your personal data within 30 days, except where retention is required by law or
            legitimate business purposes (such as fraud prevention or dispute resolution).
            Anonymized, aggregated data may be retained indefinitely for research and improvement
            purposes.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">6. Your Rights and Choices</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Depending on your location, you may have the right to:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-3">
            <li>Access the personal information we hold about you</li>
            <li>Correct inaccurate or incomplete data</li>
            <li>Request deletion of your account and associated data</li>
            <li>Object to or restrict certain processing of your data</li>
            <li>Receive a copy of your data in a portable format</li>
          </ul>
          <p className="text-muted-foreground leading-relaxed">
            To exercise these rights, contact us at contact@meshaa.io. We will respond within 30
            days. Note that some requests may be limited by legal obligations or legitimate business
            needs.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">7. Children's Privacy</h2>
          <p className="text-muted-foreground leading-relaxed">
            Articulate is not directed to children under 13. We do not knowingly collect personal
            information from children under 13. If you believe a child under 13 has provided us
            with personal information, please contact us at contact@meshaa.io and we will promptly
            delete that information.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">8. Data Security</h2>
          <p className="text-muted-foreground leading-relaxed">
            We implement reasonable administrative, technical, and physical safeguards to protect
            your information against unauthorized access, alteration, disclosure, or destruction.
            However, no security system is perfect, and we cannot guarantee the absolute security
            of your data. You are responsible for maintaining the confidentiality of your account
            credentials.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">9. Third-Party Services</h2>
          <p className="text-muted-foreground leading-relaxed">
            Articulate integrates with third-party services including Apple (App Store, Sign in
            with Apple), Anthropic (Claude AI evaluation), and Google (Gemini AI evaluation). Each
            of these services has its own privacy policy that governs their handling of your data.
            We encourage you to review their privacy policies. We are not responsible for the
            privacy practices of these third parties.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">10. Changes to This Policy</h2>
          <p className="text-muted-foreground leading-relaxed">
            We may update this Privacy Policy from time to time. When we make material changes, we
            will update the "Last Updated" date at the top of this page and notify you through
            in-app notifications or other appropriate means. Your continued use of Articulate after
            any changes constitutes your acceptance of the updated policy.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">11. Contact</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            If you have any questions, concerns, or requests regarding this Privacy Policy or our
            data practices, please contact us:
          </p>
          <div className="text-muted-foreground space-y-1">
            <p className="font-medium text-foreground">Real Intelligence Tech LLC</p>
            <p>800 N King Street, Suite 304-1716</p>
            <p>Wilmington, DE 19801, United States</p>
            <p>
              <a href="mailto:contact@meshaa.io" className="text-foreground hover:underline">
                contact@meshaa.io
              </a>
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
