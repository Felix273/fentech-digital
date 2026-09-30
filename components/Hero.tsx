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
          <span className="hero-status"><i aria-hidden="true" /> Live systems · Nairobi</span>
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
            <Link href="/work" className="button-secondary">
              Explore our work
            </Link>
          </div>
        </div>

        <aside className="hero-signal-card" aria-label="FenTech delivery signal">
          <div className="signal-card-top">
            <span>FENTECH / SIGNAL</span>
            <span className="signal-live"><i aria-hidden="true" /> ACTIVE</span>
          </div>
          <strong>Digital systems<br />built to move.</strong>
          <div className="signal-card-grid">
            <span><b>01</b> Clarity</span>
            <span><b>02</b> Control</span>
            <span><b>03</b> Growth</span>
          </div>
        </aside>
      </div>
    </section>
  );
}
