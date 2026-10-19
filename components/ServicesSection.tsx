"use client";

import Link from "next/link";
import { ArrowRight, Code2, Globe, Smartphone, Cloud, ShieldCheck, Cpu } from "lucide-react";
import type { HomepageContent, PublicCmsContent } from "@/lib/cms-content";

const serviceIcons = [Code2, Globe, Smartphone, Cloud, ShieldCheck, Cpu];

export default function ServicesSection({
  content,
  services,
}: {
  content: HomepageContent;
  services: PublicCmsContent["services"];
}) {
  const mainServices = services.slice(0, 6);

  return (
    <section className="py-20 md:py-28 bg-[#F5F6F8] border-b border-[#E2E5EA]">
      <div className="shell">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E2E5EA] text-[#0052FF] text-xs font-semibold tracking-wider uppercase mb-5">
              <span>{content.servicesLabel || "Core Solutions"}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0A0B0D] leading-[1.12]">
              {content.servicesTitle}
            </h2>
          </div>

          <Link 
            href="/services" 
            className="button-secondary text-sm !py-3 !px-6 self-start md:self-auto"
          >
            <span>View all services</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        {/* Coinbase Modular Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {mainServices.map((service, index) => {
            const Icon = serviceIcons[index % serviceIcons.length];
            return (
              <Link 
                key={service.id} 
                href={`/services/${service.slug}`}
                className="group bg-white rounded-3xl p-8 border border-[#E2E5EA] hover:border-[#0052FF] transition-all duration-200 flex flex-col justify-between hover:shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-[#EEF2FF] text-[#0052FF] flex items-center justify-center group-hover:bg-[#0052FF] group-hover:text-white transition-colors duration-200">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-semibold text-[#5B616E] group-hover:text-[#0052FF] transition-colors">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold text-[#0A0B0D] tracking-tight mb-3 group-hover:text-[#0052FF] transition-colors">
                    {service.name}
                  </h3>

                  <p className="text-sm text-[#5B616E] font-normal leading-relaxed line-clamp-3">
                    {service.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#E2E5EA] flex items-center gap-2 text-sm font-medium text-[#0052FF]">
                  <span>Explore service</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-200" />
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
