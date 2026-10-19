"use client";

import Link from "next/link";
import Image from "next/image";
import { Linkedin, Mail, MapPin, Phone, ArrowUpRight } from "lucide-react";
import type { PublicCmsContent, SiteSettingsContent } from "@/lib/cms-content";

const companyLinks = [
  { href: "/about", label: "About" },
  { href: "/work", label: "Work" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
];

export default function Footer({
  siteSettings,
  services,
}: {
  siteSettings: SiteSettingsContent;
  services: PublicCmsContent["services"];
}) {
  return (
    <footer className="bg-[#0A0B0D] text-white pt-20 pb-12 border-t border-[#1E2025]">
      <div className="shell">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-[#1E2025]">
          
          {/* Brand Info */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <Link href="/" className="mb-6 block" aria-label="FenTech Digital Home">
              <Image 
                src="/brand/fentech-logo.png" 
                alt="FenTech Digital" 
                width={140} 
                height={38} 
                className="brightness-0 invert object-contain"
              />
            </Link>

            <p className="text-sm text-neutral-400 font-normal leading-relaxed max-w-sm mb-6">
              {siteSettings.footerBrandLine || "Engineering scalable software, cloud infrastructure, and fintech systems for modern African enterprises."}
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/10 text-xs text-neutral-300">
              <span className="w-2 h-2 rounded-full bg-[#0052FF]"></span>
              <span>Based in Nairobi, Kenya</span>
            </div>
          </div>

          {/* Core Services */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-5">
              Services
            </h3>
            <ul className="space-y-3">
              {services.slice(0, 6).map((service) => (
                <li key={service.id}>
                  <Link 
                    href={`/services/${service.slug}`}
                    className="text-sm text-neutral-300 hover:text-[#0052FF] transition-colors"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-5">
              Company
            </h3>
            <ul className="space-y-3">
              {companyLinks.map((item) => (
                <li key={item.href}>
                  <Link 
                    href={item.href}
                    className="text-sm text-neutral-300 hover:text-[#0052FF] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-5">
              Connect
            </h3>
            <ul className="space-y-3.5 text-sm text-neutral-300">
              <li>
                <a 
                  href={`mailto:${siteSettings.email}`}
                  className="inline-flex items-center gap-2 hover:text-[#0052FF] transition-colors"
                >
                  <Mail className="w-4 h-4 text-neutral-500" />
                  <span className="truncate">{siteSettings.email}</span>
                </a>
              </li>
              <li>
                <a 
                  href={`tel:${siteSettings.phone.replace(/[^\d+]/g, "")}`}
                  className="inline-flex items-center gap-2 hover:text-[#0052FF] transition-colors"
                >
                  <Phone className="w-4 h-4 text-neutral-500" />
                  <span>{siteSettings.phone}</span>
                </a>
              </li>
              <li className="inline-flex items-center gap-2 text-neutral-400">
                <MapPin className="w-4 h-4 text-neutral-500 shrink-0" />
                <span>{siteSettings.location}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <span>© {new Date().getFullYear()} FenTech Digital. All rights reserved.</span>

          <div className="flex items-center gap-6">
            <span className="text-neutral-500">Institutional Tech · Kenya</span>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noreferrer"
              className="text-neutral-400 hover:text-white transition-colors flex items-center gap-1"
            >
              <span>LinkedIn</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
