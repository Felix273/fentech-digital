import type { Metadata } from "next";
import Footer from "@/components/Footer";
import { getPublicCmsContent } from "@/lib/cms-content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms of use for FenTech Digital - Kenya's leading IT solutions provider.",
};

export default async function TermsPage() {
  const cms = await getPublicCmsContent();

  return (
    <main className="legal-page">
      <div className="shell">
        <article>
          <div className="label">Legal</div>
          <h1 className="headline">Terms of Use</h1>
          <p>Last updated: June 2026</p>
          
          <p>By using this website, you agree to these terms. If you do not agree, please do not use the website.</p>
          
          <h2>Website Content</h2>
          <p>Content is provided for general information and may be updated without notice. While we aim for accuracy, we do not guarantee that all information is complete or current.</p>
          
          <h2>Intellectual Property</h2>
          <p>Unless otherwise stated, the website design, text, graphics and original materials belong to FenTech Digital. Client trademarks and project materials remain the property of their respective owners and are displayed for portfolio purposes.</p>
          
          <h2>Acceptable Use</h2>
          <p>You may not misuse the website, interfere with its operation, attempt unauthorized access, or reproduce substantial content without permission.</p>
          
          <h2>External Links</h2>
          <p>Links to external websites are provided for convenience. FenTech Digital is not responsible for their content, availability or privacy practices.</p>
          
          <h2>Limitation of Liability</h2>
          <p>To the extent permitted by law, FenTech Digital is not liable for loss arising solely from reliance on this website or temporary website unavailability.</p>
          
          <h2>Contact</h2>
          <p>Questions about these terms may be sent to <a href={`mailto:${cms.siteSettings.email}`}>{cms.siteSettings.email}</a>.</p>
        </article>
      </div>
      <Footer siteSettings={cms.siteSettings} services={cms.services} />
    </main>
  );
}
