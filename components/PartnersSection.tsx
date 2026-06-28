"use client";

import type { HomepageContent, PublicCmsContent } from "@/lib/cms-content";

export default function PartnersSection({
  content,
  industries,
  technologies,
}: {
  content: HomepageContent;
  industries: PublicCmsContent["industries"];
  technologies: PublicCmsContent["technologies"];
}) {
  const proofPoints = industries.slice(0, 8);

  return (
    <section className="section-sm">
      <div className="shell">
        <div className="proof-head" data-reveal>
          <div className="label">{content.partnersLabel}</div>
          <h2 className="headline">Practical systems for markets that move fast.</h2>
        </div>
        <div className="partner-grid proof-grid" data-reveal>
          {proofPoints.map((item) => (
            <div key={item.name} className="partner-card proof-card">
              <div className="partner-logo">{item.name.slice(0, 2)}</div>
              <strong>{item.name}</strong>
              <span>{item.description}</span>
            </div>
          ))}
        </div>
        <div className="tech-tags" data-reveal style={{ marginTop: "36px" }}>
          {technologies.map((technology) => (
            <span key={technology}>{technology}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
