"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { HomepageContent, PublicCmsContent } from "@/lib/cms-content";

export default function IntroSection({
  content,
  metrics,
}: {
  content: HomepageContent;
  metrics: PublicCmsContent["metrics"];
}) {
  return (
    <section className="section">
      <div className="shell">
        <div className="intro-grid">
          <div className="label" data-reveal>{content.introLabel}</div>
          <div className="intro-copy" data-reveal>
            <h2 className="headline">
              {content.introTitle}
            </h2>
            <p className="lead muted">
              {content.introLead}
            </p>
            <Link href="/about" className="arrow-link">
              Discover FenTech <ArrowRight size={18} />
            </Link>
          </div>
        </div>

        <div className="stat-strip" data-reveal>
          {metrics.map((metric) => (
            <div key={metric.label} className="stat">
              <b>{metric.value}</b>
              <span>{metric.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
