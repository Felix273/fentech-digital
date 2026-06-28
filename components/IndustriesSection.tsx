"use client";

import type { HomepageContent, PublicCmsContent } from "@/lib/cms-content";

export default function IndustriesSection({
  content,
  industries,
}: {
  content: HomepageContent;
  industries: PublicCmsContent["industries"];
}) {
  // Double the array for seamless marquee
  const allMarkets = [...industries, ...industries];

  return (
    <section className="section-sm">
      <div className="shell">
        <div className="intro-grid" style={{ marginBottom: "60px" }}>
          <div className="label" data-reveal>{content.industriesLabel}</div>
          <div className="intro-copy" data-reveal>
            <h2 className="headline">
              {content.industriesTitle}
            </h2>
          </div>
        </div>

        <div className="industry-marquee">
          <div className="industry-track">
            {allMarkets.map((market, index) => (
              <div key={`${market.name}-${index}`} className="industry-item" title={market.description}>
                {market.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
