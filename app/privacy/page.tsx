import type { Metadata } from "next";
import Footer from "@/components/Footer";
import { getPublicCmsContent } from "@/lib/cms-content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for FenTech Digital - Kenya's leading IT solutions provider.",
};

export default async function PrivacyPage() {
  const cms = await getPublicCmsContent();

  return (
    <main className="legal-page">
      <div className="shell">
        <article>
          <div className="label">Legal</div>
          <h1 className="headline">Privacy Policy</h1>
          <p>Last updated: June 2026</p>
          
          <h2>Information We Collect</h2>
          <p>We collect information you provide directly to us, including name, email address, phone number, and company details when you contact us through our website or request our services.</p>
          
          <h2>How We Use Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Respond to your inquiries and provide requested services</li>
            <li>Communicate with you about projects, proposals, and updates</li>
            <li>Improve our website and service offerings</li>
            <li>Comply with legal obligations</li>
          </ul>
          
          <h2>Information Sharing</h2>
          <p>We do not sell, trade, or otherwise transfer your personal information to outside parties. We may share information with trusted third parties who assist us in operating our website or conducting our business, so long as those parties agree to keep this information confidential.</p>
          
          <h2>Data Security</h2>
          <p>We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
          
          <h2>Cookies</h2>
          <p>Our website may use cookies to enhance user experience. You can choose to disable cookies through your browser settings, though this may affect site functionality.</p>
          
          <h2>Third-Party Links</h2>
          <p>Our website may contain links to third-party sites. We have no control over the content or privacy practices of these sites and encourage you to review their privacy policies.</p>
          
          <h2>Your Rights</h2>
          <p>You have the right to request access to, correction of, or deletion of your personal information. Contact us at {cms.siteSettings.email} to exercise these rights.</p>
          
          <h2>Changes to This Policy</h2>
          <p>We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page with an updated revision date.</p>
          
          <h2>Contact</h2>
          <p>If you have any questions about this privacy policy, please contact us at <a href={`mailto:${cms.siteSettings.email}`}>{cms.siteSettings.email}</a>.</p>
        </article>
      </div>
      <Footer siteSettings={cms.siteSettings} services={cms.services} />
    </main>
  );
}
