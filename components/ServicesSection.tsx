"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { HomepageContent, PublicCmsContent } from "@/lib/cms-content";

export default function ServicesSection({
  content,
  services,
}: {
  content: HomepageContent;
  services: PublicCmsContent["services"];
}) {
  const mainServices = services.slice(0, 6);

  return (
    <section className="section">
      <div className="shell">
        <div className="intro-grid">
          <div className="label" data-reveal>{content.servicesLabel}</div>
          <div className="intro-copy" data-reveal>
            <h2 className="headline">
              {content.servicesTitle}
            </h2>
            <p className="lead muted">
              {content.introLead}
            </p>
            <Link href="/services" className="arrow-link">
              View all services <ArrowRight size={18} />
            </Link>
          </div>
        </div>

        <div className="service-stack">
          {mainServices.map((service, index) => (
            <Link 
              key={service.id} 
              href={`/services/${service.slug}`}
              className="service-row"
              data-reveal
            >
              <span className="service-number">0{index + 1}</span>
              <h3>{service.name}</h3>
              <p>{service.description}</p>
              <ArrowRight className="service-arrow" size={24} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
