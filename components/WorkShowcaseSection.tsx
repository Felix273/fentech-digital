"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { HomepageContent, PublicCmsContent } from "@/lib/cms-content";

export default function WorkShowcaseSection({
  content,
  caseStudies,
}: {
  content: HomepageContent;
  caseStudies: PublicCmsContent["caseStudies"];
}) {
  return (
    <section className="section work-showcase">
      <div className="shell">
        <div className="work-intro">
          <div>
            <div className="label" data-reveal>{content.workLabel}</div>
            <h2 className="headline" data-reveal>
              {content.workTitle}
            </h2>
          </div>
          <Link href="/case-studies" className="arrow-link" data-reveal>
            View all work <ArrowRight size={18} />
          </Link>
        </div>

        <div className="editorial-work">
          {caseStudies.map((project, index) => (
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
                <h3>{project.title}</h3>
                <span>{project.category}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
