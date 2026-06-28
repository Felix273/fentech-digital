import type { Metadata } from "next";
import Footer from "@/components/Footer";
import ContactPageClient from "@/components/ContactPageClient";
import { getPublicCmsContent } from "@/lib/cms-content";
import { pageMetadata } from "@/lib/seo/metadata";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: pageMetadata.contact.title,
  description: pageMetadata.contact.description,
};

export default async function ContactPage() {
  const cms = await getPublicCmsContent();

  return (
    <main>
      <ContactPageClient content={cms.contactPage} siteSettings={cms.siteSettings} services={cms.services} />
      <Footer siteSettings={cms.siteSettings} services={cms.services} />
    </main>
  );
}
