"use client";

import Link from "next/link";
import { Fragment } from "react";
import { ArrowRight } from "lucide-react";
import Hero3DObject from "@/components/Hero3DObject";
import type { HomepageContent } from "@/lib/cms-content";

export default function Hero({ content }: { content: HomepageContent }) {
  return (
    <section className="home-hero">
      <Hero3DObject />
      <div className="shell">
        <div className="hero-kicker">
          <span className="label" style={{ color: "var(--cyan)" }}>
            {content.heroKicker}
          </span>
        </div>
        
        <h1 className="display">
          {content.heroTitle.split("\n").map((line, index, lines) => (
            <Fragment key={`${line}-${index}`}>
              {index === lines.length - 1 ? <span>{line}</span> : line}
              {index < lines.length - 1 ? <br /> : null}
            </Fragment>
          ))}
        </h1>
        
        <div className="hero-bottom">
          <p className="lead muted">
            {content.heroBody}
          </p>
          
          <div className="hero-actions">
            <Link href="/contact" className="button-primary">
              Start a project <ArrowRight size={18} />
            </Link>
            <Link href="/case-studies" className="button-secondary">
              Explore our work
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
