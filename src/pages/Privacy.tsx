import { useLayoutEffect } from 'react'

export function Privacy() {
  useLayoutEffect(() => {
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }, [])

  return (
    <div className="max-w-3xl mx-auto px-8 py-16">
      <h1 className="text-3xl font-bold mb-2">Articulate — Privacy Policy</h1>
      <div className="text-sm text-muted-foreground mb-12 space-y-1">
        <p>Effective Date: March 16, 2026</p>
        <p>Last Updated: March 16, 2026</p>
        <p>Provider: Real Intelligence Tech LLC ("Articulate," "we," "us," "our")</p>
        <p>Contact: <a href="mailto:contact@meshaa.io" className="hover:text-foreground">contact@meshaa.io</a></p>
      </div>

      <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
        <p className="text-muted-foreground leading-relaxed">
          This Privacy Policy describes how Real Intelligence Tech LLC, operating the Articulate mobile application and related services (collectively, the "Service"), collects, uses, processes, and discloses information in connection with your use of the Service. By accessing or using the Service, you acknowledge that you have read and understood this Policy and agree to the practices described herein.
        </p>

        <section>
          <h2 className="text-xl font-semibold mb-4">1. Information We Collect</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            In the course of providing, operating, and improving the Service, we collect various categories of information, including but not limited to the following:
          </p>

          <h3 className="text-lg font-medium mb-2">Account Information</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            When you create an account or interact with the Service, you may provide information such as your name, email address, and any preferences or settings you configure. This information is used to establish and maintain your account and to personalize your experience.
          </p>

          <h3 className="text-lg font-medium mb-2">Learning and Interaction Data</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            The Service is designed to adapt to your individual learning patterns. As you use Articulate, we collect information relating to your engagement with the Service, including but not limited to: words you have reviewed or encountered, sentences you submit for evaluation, responses and results from AI-assisted feedback, your progression data (including experience points, medals, and achievements), session frequency and duration, feature engagement patterns, and onboarding and survey responses. This information is integral to the operation of the personalization and recommendation systems within the Service, and is further used as described in Section 2 of this Policy.
          </p>

          <h3 className="text-lg font-medium mb-2">Device and Technical Data</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            We and our service providers automatically collect certain technical information when you access the Service, such as your device type, operating system version, unique device identifiers, app version, IP address, diagnostic and crash data, and related technical logs. This information is used to maintain the stability, security, and performance of the Service.
          </p>

          <h3 className="text-lg font-medium mb-2">Subscription and Transaction Data</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Subscription purchases are processed through Apple's App Store. We receive confirmation of your subscription status and associated transaction identifiers to verify and maintain your access to the Service. Full payment credentials are handled by Apple and are not stored by us directly.
          </p>

          <h3 className="text-lg font-medium mb-2">Communications</h3>
          <p className="text-muted-foreground leading-relaxed">
            If you contact us for support, submit feedback, or otherwise communicate with us, we retain the contents of those communications and your contact information to the extent necessary to respond to and resolve your inquiry, and to improve our support processes.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">2. How We Use Your Information</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            We use the information we collect for the following purposes, among others:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
            <li>To provide, operate, and maintain the Service and your account</li>
            <li>To personalize your experience, including word selection, difficulty calibration, and the operation of our recommendation system</li>
            <li>To evaluate, maintain, and improve the Service, including our AI evaluation systems, personalization algorithms, educational content, and underlying technology</li>
            <li>To develop new features, capabilities, and enhancements to the Service</li>
            <li>To conduct research and analysis regarding the effectiveness and quality of the educational content and learning outcomes supported by the Service</li>
            <li>To verify and manage your subscription entitlements</li>
            <li>To detect, investigate, and prevent security incidents, abuse, or technical failures</li>
            <li>To communicate with you about your account, Service updates, and support matters</li>
            <li>To comply with applicable legal obligations and enforce our Terms of Use</li>
          </ul>
          <p className="text-muted-foreground leading-relaxed">
            Where your information is used to improve or develop our Services and underlying technology — including AI systems and recommendation models — such use is carried out in a manner consistent with this Policy and applicable law. We may process information in aggregate or de-identified forms for analytical and research purposes.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">3. AI-Generated Content and Human Review</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Content within the Service — including word definitions, example sentences, contextual usage illustrations, and evaluation feedback — is generated or augmented by artificial intelligence systems. While AI enables us to deliver a broad, adaptive, and scalable educational experience, AI-generated content may on occasion contain inaccuracies, incomplete information, or outputs that do not fully reflect established linguistic standards.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Real Intelligence Tech LLC employs human review processes as part of its quality assurance practices to identify, assess, and remediate errors, anomalies, and inconsistencies in AI-generated content. These processes are designed to improve content reliability over time; however, we cannot warrant or guarantee the accuracy, completeness, or fitness for any particular purpose of all content presented within the Service at any given time.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            All content within the Service is provided for educational purposes only and is intended to serve as a supplementary learning aid. Users are encouraged to consult authoritative linguistic references where precision is material.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">4. How We Share Your Information</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            We may disclose information about you in the following circumstances:
          </p>

          <h3 className="text-lg font-medium mb-2">Service Providers</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            We engage third-party vendors and service providers to support the operation of the Service, including cloud infrastructure, analytics platforms, crash reporting tools, AI API providers, and customer support systems. These parties access information only to the extent necessary to perform services on our behalf and are subject to confidentiality and data protection obligations.
          </p>

          <h3 className="text-lg font-medium mb-2">Apple and Platform Partners</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Subscription and purchase verification is conducted through Apple's App Store. Apple's handling of your information in connection with transactions is governed by Apple's own privacy policy.
          </p>

          <h3 className="text-lg font-medium mb-2">Legal and Regulatory Compliance</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            We may disclose information when required to do so by law, regulation, subpoena, court order, or governmental authority, or where we reasonably believe disclosure is necessary to protect the rights, property, or safety of Real Intelligence Tech LLC, our users, or the public.
          </p>

          <h3 className="text-lg font-medium mb-2">Business Transfers</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            In connection with a merger, acquisition, reorganization, asset sale, or similar transaction, information about users may be transferred as part of the business assets involved. We will provide notice of any such transfer where required by applicable law.
          </p>

          <h3 className="text-lg font-medium mb-2">With Your Consent</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            We may share your information in other circumstances with your explicit consent.
          </p>

          <p className="text-muted-foreground leading-relaxed">
            We do not sell your personal information to third parties for their own independent marketing or advertising purposes.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">5. Data Retention</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            We retain information for as long as reasonably necessary to provide the Service, fulfill the purposes described in this Policy, resolve disputes, enforce our agreements, and comply with applicable legal obligations. The specific retention period for a given category of information is determined by reference to the nature of that information, the purpose for which it was collected, and any applicable legal requirements.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Upon account deletion, we will take reasonable steps to delete or de-identify your personal information within a reasonable time, subject to our legal obligations. Aggregate, de-identified, or anonymized data derived from user interactions may be retained beyond account deletion for product improvement, research, and analytical purposes, as such data no longer reasonably identifies you.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">6. Your Rights and Choices</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Depending on your jurisdiction, you may have certain rights with respect to your personal information, including the right to access, correct, or request deletion of information we hold about you.
          </p>

          <h3 className="text-lg font-medium mb-2">Account Deletion</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            You may request deletion of your account and associated personal information by contacting us at <a href="mailto:contact@meshaa.io" className="hover:text-foreground">contact@meshaa.io</a>. Please note that account deletion does not automatically cancel an active App Store subscription, which must be managed separately through your Apple ID settings.
          </p>

          <h3 className="text-lg font-medium mb-2">California Residents (CCPA)</h3>
          <p className="text-muted-foreground leading-relaxed">
            If you are a California resident, you have rights under the California Consumer Privacy Act (CCPA), including the right to know what personal information we collect about you, the right to request deletion of your personal information, and the right to opt out of the sale of personal information. We do not sell personal information. To exercise your rights, please contact us at <a href="mailto:contact@meshaa.io" className="hover:text-foreground">contact@meshaa.io</a>. We will not discriminate against you for exercising your rights under the CCPA.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">7. Children's Privacy</h2>
          <p className="text-muted-foreground leading-relaxed">
            The Service is not directed to children under the age of 13. We do not knowingly collect personal information from children under 13 without verifiable parental consent. If you believe we have inadvertently collected information from a child under 13, please contact us immediately at <a href="mailto:contact@meshaa.io" className="hover:text-foreground">contact@meshaa.io</a> and we will take prompt steps to delete such information.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">8. Data Security</h2>
          <p className="text-muted-foreground leading-relaxed">
            We implement reasonable technical and organizational measures designed to protect your information from unauthorized access, disclosure, alteration, or destruction. However, no method of electronic transmission or storage is completely secure. While we strive to protect your information, we cannot guarantee absolute security, and you use the Service at your own risk with respect to information transmitted over the internet.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">9. Third-Party Services</h2>
          <p className="text-muted-foreground leading-relaxed">
            The Service may rely upon or integrate with third-party platforms, APIs, or services, including Apple's App Store, AI service providers, and analytics tools. Each third party's collection and use of your information is governed by that party's own privacy policy. We are not responsible for the data practices of third-party services outside our control, and we encourage you to review applicable third-party privacy policies.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">10. Changes to This Policy</h2>
          <p className="text-muted-foreground leading-relaxed">
            We reserve the right to update or modify this Privacy Policy at any time. Material changes will be communicated through in-app notice or by updating the "Last Updated" date at the top of this Policy. Your continued use of the Service following notice of changes constitutes your acceptance of the revised Policy. We encourage you to review this Policy periodically.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">11. Contact</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Questions, concerns, or requests regarding this Privacy Policy or our data practices may be directed to: <a href="mailto:contact@meshaa.io" className="hover:text-foreground">contact@meshaa.io</a>
          </p>
          <div className="text-muted-foreground space-y-1">
            <p><strong>Real Intelligence Tech LLC</strong></p>
            <p className="mt-2"><strong>Address</strong></p>
            <p>800 N King Street, Suite 304-1716</p>
            <p>Wilmington, DE 19801, United States</p>
          </div>
        </section>
      </div>
    </div>
  )
}
