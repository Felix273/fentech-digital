"use client";

import Link from "next/link";
import Image from "next/image";
import { Linkedin, Mail, MapPin, Phone } from "lucide-react";
import type { PublicCmsContent, SiteSettingsContent } from "@/lib/cms-content";

const companyLinks = [
  { href: "/about", label: "About" },
  { href: "/case-studies", label: "Work" },
  { href: "/contact", label: "Contact" },
];

export default function Footer({
  siteSettings,
  services,
}: {
  siteSettings: SiteSettingsContent;
  services: PublicCmsContent["services"];
}) {
  return (
    <footer>
      <div className="shell">
        <div className="footer-grid">
          <div className="footer-brand">
            <Image src="/brand/fentech-logo.png" alt="FenTech Digital" width={160} height={43} />
            <p>
              {siteSettings.footerBrandLine}
            </p>
          </div>

          <div className="footer-col">
            <h3>Services</h3>
            {services.slice(0, 5).map((service) => (
              <Link key={service.id} href={`/services/${service.slug}`}>
                {service.name}
              </Link>
            ))}
          </div>

          <div className="footer-col">
            <h3>Company</h3>
            {companyLinks.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>

          <div className="footer-col">
            <h3>Connect</h3>
            <a href={`mailto:${siteSettings.email}`}>
              <Mail size={16} style={{ display: "inline", marginRight: "8px" }} />
              {siteSettings.email}
            </a>
            <a href={`tel:${siteSettings.phone.replace(/[^\d+]/g, "")}`}>
              <Phone size={16} style={{ display: "inline", marginRight: "8px" }} />
              {siteSettings.phone}
            </a>
            <span>
              <MapPin size={16} style={{ display: "inline", marginRight: "8px" }} />
              {siteSettings.location}
            </span>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} FenTech Digital. All rights reserved.</span>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer">
            <Linkedin size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
