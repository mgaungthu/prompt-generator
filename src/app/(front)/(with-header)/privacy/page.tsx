export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Privacy Policy</h1>

      <section>
        <h2 className="text-xl font-semibold">Introduction</h2>
        <p className="text-gray-200 leading-relaxed">
          Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information when you use our services.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Information We Collect</h2>
        <p className="text-gray-200 leading-relaxed">
          We collect information in several ways to provide and improve our services:
        </p>
        <ul className="list-disc list-inside text-gray-200 leading-relaxed space-y-1">
          <li>
            <span className="font-semibold">Information you provide:</span> When you sign up, contact us, or interact with our services, you may give us information such as your name, email address, or other details.
          </li>
          <li>
            <span className="font-semibold">Automatically collected:</span> We automatically collect certain information through cookies and similar technologies, such as your IP address, browser type, and usage data.
          </li>
          <li>
            <span className="font-semibold">From third parties:</span> We may receive information about you from third-party services if you choose to connect them with our platform.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">How We Use Your Information</h2>
        <p className="text-gray-200 leading-relaxed">
          We use your information to operate, maintain, and improve our services, communicate with you, personalize your experience, and comply with legal obligations.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Cookies &amp; Tracking Technologies</h2>
        <p className="text-gray-200 leading-relaxed">
          We use cookies and similar technologies to enhance your experience, analyze usage, and personalize content. You can manage your cookie preferences in your browser settings.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Data Sharing &amp; Disclosure</h2>
        <p className="text-gray-200 leading-relaxed">
          We do not sell your personal information. We may share data with service providers, legal authorities, or as required by law, and only as necessary to provide our services or protect our rights.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Data Retention</h2>
        <p className="text-gray-200 leading-relaxed">
          We retain your information only as long as necessary for the purposes described in this policy or as required by law.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Your Rights &amp; Choices</h2>
        <p className="text-gray-200 leading-relaxed">
          You may have rights regarding your personal information, such as accessing, correcting, or deleting your data. Contact us to exercise these rights.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">International Transfers</h2>
        <p className="text-gray-200 leading-relaxed">
          Your information may be processed in countries outside your own. We take steps to ensure your data is protected in accordance with this policy.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Data Security</h2>
        <p className="text-gray-200 leading-relaxed">
          We use reasonable security measures to protect your information, but no method of transmission over the Internet is completely secure.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Children’s Privacy</h2>
        <p className="text-gray-200 leading-relaxed">
          Our services are not intended for children under 13. We do not knowingly collect personal information from children.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Third‑Party Links</h2>
        <p className="text-gray-200 leading-relaxed">
          Our services may contain links to third-party websites. We are not responsible for their privacy practices. Please review their policies before providing data.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Changes to This Policy</h2>
        <p className="text-gray-200 leading-relaxed">
          We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the new policy on this page.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Contact Us</h2>
        <p className="text-gray-200 leading-relaxed">
          If you have any questions or concerns about this Privacy Policy, please contact us at{' '}
          <a className="text-blue-600 hover:underline" href="mailto:support@example.com">
            support@example.com
          </a>
          .
        </p>
      </section>
    </div>
  );
}