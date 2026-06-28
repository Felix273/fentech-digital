import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import Footer from "@/components/Footer";
import { getPublicCmsContent } from "@/lib/cms-content";

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cms = await getPublicCmsContent();
  const service = cms.services.find((item) => item.slug === slug);

  if (!service) return { title: "Service not found" };

  return {
    title: service.heroTitle,
    description: service.heroDescription,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const cms = await getPublicCmsContent();
  const service = cms.services.find((item) => item.slug === slug);

  if (!service) notFound();

  const related = cms.services.filter((item) => item.id !== service.id).slice(0, 3);
  const showcase = cms.caseStudies.slice(0, 2);

  return (
    <main>
      <section className="case-hero service-detail-hero">
        <div className="case-hero-bg" />
        <div className="shell">
          <Link href="/services" className="case-back">
            <ArrowLeft size={16} /> All services
          </Link>
          <div className="label">{service.eyebrow}</div>
          <h1 className="display">{service.heroTitle}</h1>
          <p className="lead">{service.heroDescription}</p>
        </div>
      </section>

      <section className="section">
        <div className="shell case-layout">
          <aside className="case-aside">
            <div className="label">The opportunity</div>
            <p>{service.title}</p>
            <Link href="/contact" className="button-primary service-aside-cta">
              Discuss this service <ArrowRight size={18} />
            </Link>
          </aside>

          <div>
            <article className="case-chapter">
              <h2>What we build</h2>
              <p>{service.description}</p>
              <div className="case-list">
                {service.features.map((feature) => (
                  <span key={feature}><Check size={16} /> {feature}</span>
                ))}
              </div>
            </article>

            <article className="case-chapter">
              <h2>Expected outcomes</h2>
              <div className="solution-list">
                {service.outcomes.map((outcome, index) => (
                  <div key={outcome}>
                    <span>0{index + 1}</span>
                    <h3>{outcome}</h3>
                    <p>
                      Practical improvements designed to make the service easier to
                      operate, measure and scale inside a Kenyan business context.
                    </p>
                  </div>
                ))}
              </div>
            </article>

            <article className="case-chapter">
              <h2>Connected capabilities</h2>
              <div className="tech-tags">
                {related.map((item) => (
                  <Link key={item.id} href={`/services/${item.slug}`}>
                    {item.name}
                  </Link>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="section work-showcase">
        <div className="shell">
          <div className="work-intro">
            <div>
              <div className="label">Relevant work</div>
              <h2 className="headline">Systems that show the thinking.</h2>
            </div>
            <Link href="/case-studies" className="arrow-link">
              View work <ArrowRight size={18} />
            </Link>
          </div>
          <div className="editorial-work related-work">
            {showcase.map((project) => (
              <Link key={project.id} href={`/case-studies/${project.id}`} className="project wide">
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

      <Footer siteSettings={cms.siteSettings} services={cms.services} />
    </main>
  );
}
