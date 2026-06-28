import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import Footer from "@/components/Footer";
import { getPublicCmsContent } from "@/lib/cms-content";

type Props = {
  params: Promise<{ id: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const cms = await getPublicCmsContent();
  const project = cms.caseStudies.find((item) => item.id === id);

  if (!project) {
    return { title: "Project not found" };
  }

  return {
    title: project.title,
    description: project.challenge,
  };
}

export default async function SingleCaseStudyPage({ params }: Props) {
  const { id } = await params;
  const cms = await getPublicCmsContent();
  const project = cms.caseStudies.find((item) => item.id === id);

  if (!project) {
    notFound();
  }

  const related = cms.caseStudies.filter((item) => item.id !== project.id).slice(0, 2);

  return (
    <main>
      <section className="case-hero">
        <div className="case-hero-bg" />
        <div className="shell">
          <Link href="/case-studies" className="case-back">
            <ArrowLeft size={16} /> Back to work
          </Link>
          <div className="label">{project.category} · {project.industry}</div>
          <h1 className="display">{project.title}</h1>
          <p className="lead">{project.challenge}</p>
        </div>
      </section>

      <section className="section">
        <div className="shell case-stats">
          {project.stats.map((stat) => (
            <div key={stat.label} className="stat">
              <b>{stat.val}</b>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="shell case-layout">
          <aside className="case-aside">
            <div className="label">Context</div>
            <p>{project.about}</p>
          </aside>
          <div>
            <article className="case-chapter">
              <h2>The challenge</h2>
              <p>{project.challenge}</p>
              <div className="case-list">
                {project.challengeDetails.map((detail) => (
                  <span key={detail}><Check size={16} /> {detail}</span>
                ))}
              </div>
            </article>

            <article className="case-chapter">
              <h2>{project.solutionTitle}</h2>
              <div className="solution-list">
                {project.solutionDetails.map((item, index) => (
                  <div key={item.title}>
                    <span>0{index + 1}</span>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </div>
                ))}
              </div>
            </article>

            <article className="case-chapter">
              <h2>What changed</h2>
              <div className="case-list">
                {project.results.map((result) => (
                  <span key={result}><Check size={16} /> {result}</span>
                ))}
              </div>
            </article>

            <article className="case-chapter">
              <h2>Technology</h2>
              <div className="tech-tags">
                {project.techStack.map((tech) => (
                  <span key={tech}>{tech}</span>
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
              <div className="label">Keep exploring</div>
              <h2 className="headline">More systems for Kenyan growth.</h2>
            </div>
            <Link href="/case-studies" className="arrow-link">
              All work <ArrowRight size={18} />
            </Link>
          </div>
          <div className="editorial-work related-work">
            {related.map((item) => (
              <Link key={item.id} href={`/case-studies/${item.id}`} className="project wide">
                <div className="project-media project-system-card">
                  <div className="project-orb" />
                  <div className="project-screen">
                    <span>{item.category}</span>
                    <strong>{item.industry}</strong>
                    <small>{item.results[0]}</small>
                  </div>
                </div>
                <div className="project-meta">
                  <h2>{item.title}</h2>
                  <span>{item.category}</span>
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
