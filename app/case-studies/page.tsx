import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Footer from "@/components/Footer";
import { getPublicCmsContent } from "@/lib/cms-content";
import { pageMetadata } from "@/lib/seo/metadata";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: pageMetadata.caseStudies.title,
  description: pageMetadata.caseStudies.description,
};

export default async function CaseStudiesPage() {
  const cms = await getPublicCmsContent();

  return (
    <main>
      <section className="page-hero editorial-page-hero">
        <div className="shell">
          <div className="label">{cms.workPage.heroLabel}</div>
          <h1 className="display">
            {cms.workPage.heroTitle}
          </h1>
          <p className="lead muted">
            {cms.workPage.heroLead}
          </p>
        </div>
      </section>

      <section className="section work-showcase">
        <div className="shell">
          <div className="editorial-work">
            {cms.caseStudies.map((project, index) => (
              <Link
                key={project.id}
                href={`/case-studies/${project.id}`}
                className={`project ${index === 0 || index === 3 ? "wide" : ""}`}
                data-reveal
              >
                <div className="project-media project-system-card">
                  <div className="project-orb" />
                  <div className="project-screen">
                    <span>{project.category}</span>
                    <strong>{project.industry}</strong>
                    <small>{project.results[0]}</small>
                  </div>
                </div>
                <div className="project-meta">
                  <h2>{project.title}</h2>
                  <span>{project.category}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-purple">
        <div className="shell cta-band">
          <h2 className="headline">Have a project clients should see next?</h2>
          <div>
            <p>Let’s turn your idea, workflow, or business challenge into a credible digital product.</p>
            <Link href="/contact" className="arrow-link arrow-light">
              Start a conversation <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <Footer siteSettings={cms.siteSettings} services={cms.services} />
    </main>
  );
}
