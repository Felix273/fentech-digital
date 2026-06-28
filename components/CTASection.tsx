"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { HomepageContent } from "@/lib/cms-content";

export default function CTASection({ content }: { content: HomepageContent }) {
  return (
    <section className="section section-purple">
      <div className="shell cta-band">
        <h2 className="headline">
          {content.ctaTitle}
        </h2>
        <div>
          <p>{content.ctaBody}</p>
          <Link href="/contact" className="arrow-link arrow-light">
            Start a conversation <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
