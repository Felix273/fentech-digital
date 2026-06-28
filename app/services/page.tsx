import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Footer from "@/components/Footer";
import { getPublicCmsContent } from "@/lib/cms-content";
import { pageMetadata } from "@/lib/seo/metadata";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: pageMetadata.services.title,
  description: pageMetadata.services.description,
};

export default async function ServicesPage() {
  const cms = await getPublicCmsContent();

  return (
    <main>
      <section className="page-hero editorial-page-hero">
        <div className="shell">
          <div className="label">{cms.servicesPage.heroLabel}</div>
          <h1 className="display">
            {cms.servicesPage.heroTitle}
          </h1>
          <p className="lead muted">
            {cms.servicesPage.heroLead}
          </p>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="service-stack">
            {cms.services.map((service, index) => (
              <Link key={service.id} href={`/services/${service.slug}`} className="service-row">
                <span className="service-number">0{index + 1}</span>
                <h2>{service.name}</h2>
                <p>{service.description}</p>
                <ArrowRight className="service-arrow" size={24} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="shell">
          <div className="intro-grid">
            <div className="label">How we deliver</div>
            <div className="intro-copy">
              <h2 className="headline">A clear path from challenge to working system.</h2>
              <p className="lead">
                We keep the process simple enough for momentum and disciplined enough
                for quality, security and long-term maintainability.
              </p>
            </div>
          </div>
          <div className="value-grid">
            {cms.processSteps.map((step) => (
              <div key={step.number} className="value">
                <span className="service-number">{step.number}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-purple">
        <div className="shell cta-band">
          <h2 className="headline">Not sure which service you need?</h2>
          <div>
            <p>Start with the business challenge. We will shape the right combination of strategy, engineering and support.</p>
            <Link href="/contact" className="arrow-link arrow-light">
              Talk to FenTech <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <Footer siteSettings={cms.siteSettings} services={cms.services} />
    </main>
  );
}
