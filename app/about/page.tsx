import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Footer from "@/components/Footer";
import { getPublicCmsContent } from "@/lib/cms-content";
import { pageMetadata } from "@/lib/seo/metadata";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: pageMetadata.about.title,
  description: pageMetadata.about.description,
};

export default async function AboutPage() {
  const cms = await getPublicCmsContent();

  return (
    <main>
      <section className="page-hero editorial-page-hero">
        <div className="shell">
          <div className="label">{cms.about.heroLabel}</div>
          <h1 className="display">
            {cms.about.heroTitle}
          </h1>
          <p className="lead muted">
            {cms.about.heroLead}
          </p>
        </div>
      </section>

      <section className="section">
        <div className="shell split-story">
          <div className="story-visual">
            <div
              className="story-image"
              aria-label={cms.about.storyImageAlt}
              style={{ backgroundImage: `url(${cms.about.storyImage})` }}
              role="img"
            />
          </div>
          <div className="split-copy">
            <div className="label">{cms.about.storyLabel}</div>
            <h2 className="headline">{cms.about.storyTitle}</h2>
            <p className="lead muted">
              {cms.about.storyLead}
            </p>
            <p className="muted">{cms.about.storyBody}</p>
            <Link href="/case-studies" className="arrow-link">
              See what we build <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="shell">
          <div className="intro-grid">
            <div className="label">How we think</div>
            <div className="intro-copy">
              <h2 className="headline">Strategy, engineering and ownership in one team.</h2>
              <p className="lead">
                We do not separate advice from execution. We help clarify what should
                be built, then design, engineer, launch and improve it with discipline.
              </p>
            </div>
          </div>

          <div className="value-grid">
            {cms.differentiators.map((item, index) => (
              <div key={item.title} className="value">
                <span className="service-number">0{index + 1}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="stat-strip">
            {cms.metrics.map((metric) => (
              <div key={metric.label} className="stat">
                <b>{metric.value}</b>
                <span>{metric.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="work-intro">
            <div>
              <div className="label">Delivery rhythm</div>
              <h2 className="headline">From ambition to launch.</h2>
            </div>
            <Link href="/contact" className="arrow-link">
              Start a project <ArrowRight size={18} />
            </Link>
          </div>

          <div className="service-stack">
            {cms.processSteps.map((step) => (
              <div key={step.number} className="service-row">
                <span className="service-number">{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
                <ArrowRight className="service-arrow" size={24} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer siteSettings={cms.siteSettings} services={cms.services} />
    </main>
  );
}
