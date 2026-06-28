"use client";

import { Check } from "lucide-react";
import type { PublicCmsContent } from "@/lib/cms-content";

export default function DifferentiatorsSection({
  differentiators,
}: {
  differentiators: PublicCmsContent["differentiators"];
}) {
  return (
    <section className="section section-dark">
      <div className="shell">
        <div className="intro-grid">
          <div className="label" data-reveal>Why FenTech</div>
          <div className="intro-copy" data-reveal>
            <h2 className="headline">
              Built for how<br />
              Kenya actually works.
            </h2>
            <p className="lead">
              We combine local market knowledge with world-class engineering 
              to deliver technology that fits your budget, your customers, 
              and your growth trajectory.
            </p>
          </div>
        </div>

        <div className="value-grid">
          {differentiators.map((diff, index) => (
            <div key={index} className="value" data-reveal>
              <div className="value-check">
                <Check size={20} />
              </div>
              <div>
                <h3>{diff.title}</h3>
                <p>{diff.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
