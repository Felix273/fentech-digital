import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Braces,
  Check,
  Cloud,
  Code2,
  Database,
  Layers3,
  MessageSquareQuote,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import ContactForm from "@/components/ContactForm";
import { servicesData } from "@/lib/data/services";
import { caseStudiesData } from "@/lib/data/case-studies";
import { differentiators, kenyanMarkets, metrics, processSteps, technologies } from "@/lib/site-data";

const serviceIcons = [Braces, Code2, Smartphone, ShieldCheck, Cloud, Bot, Layers3, Database];

export function MetricsStrip() {
  return (
    <section className="border-y border-secondary/10 bg-surface/50 px-6">
      <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-secondary/10 md:grid-cols-4">
        {metrics.map((metric) => (
          <div key={metric.label} className="px-4 py-8 md:py-10">
            <p className="text-3xl font-bold tracking-[-0.05em] text-foreground md:text-4xl">{metric.value}</p>
            <p className="mt-3 max-w-44 text-xs uppercase leading-5 tracking-[0.13em] text-secondary-400">{metric.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ServicesOverview() {
  const pillars = [
    {
      title: "Product & software engineering",
      text: "Custom platforms, portals, dashboards, APIs, commerce systems, and mobile apps designed around how your team and customers actually work.",
      href: "/services/software-development",
    },
    {
      title: "Cloud, security & operations",
      text: "Infrastructure, managed IT, cybersecurity, backups, monitoring, and resilient deployment foundations for businesses that cannot afford avoidable downtime.",
      href: "/services/cloud-services",
    },
    {
      title: "AI, automation & digital growth",
      text: "Useful automation for support, reporting, documents, CRM, field operations, marketing funnels, and decision-making without unnecessary complexity.",
      href: "/services/ai-automation",
    },
  ];

  return (
    <section className="section-shell">
      <div className="grid gap-14 lg:grid-cols-[0.72fr_1.28fr]">
        <SectionHeading
          eyebrow="How we partner"
          title="Technology capabilities connected directly to growth."
          description="Inspired by the world’s best agency networks, but built for the speed, budget, mobile behaviour, and market conditions of Kenya."
        />
        <div className="divide-y divide-slate-200 border-y border-secondary/20">
          {pillars.map((pillar, index) => (
            <Link
              key={pillar.title}
              href={pillar.href}
              className="group grid gap-8 py-8 transition hover:bg-blue-50/30 md:grid-cols-[0.18fr_1fr_auto]"
            >
              <span className="text-sm font-bold text-primary">0{index + 1}</span>
              <span>
                <span className="block text-3xl font-bold tracking-[-0.04em] text-foreground md:text-4xl">{pillar.title}</span>
                <span className="mt-4 block max-w-2xl text-base leading-7 text-secondary-300">{pillar.text}</span>
              </span>
              <ArrowRight className="text-slate-300 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary" />
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-20 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {servicesData.slice(0, 8).map((service, index) => {
          const Icon = serviceIcons[index];
          return (
            <Link key={service.id} href={`/services/${service.slug}`} className="glass-card group flex min-h-64 flex-col p-6">
              <div className="flex items-start justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl.border.border-primary/20 bg-blue-50 text-primary transition group-hover:border-blue-200 group-hover:bg-surface">
                  <Icon size={22} />
                </span>
                <ArrowRight size={18} className="text-slate-400 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary" />
              </div>
              <p className="mt-8 text-[10px] font-bold uppercase tracking-[0.2em] text-violet-600">{service.eyebrow}</p>
              <h3 className="mt-3 text-xl font-bold tracking-tight text-foreground">{service.name}</h3>
              <p className="mt-4 text-sm leading-6 text-secondary-300">{service.description}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export function AboutPreview() {
  return (
    <section className="section-shell">
      <div className="grid items-end gap-14 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.26em] text-primary">Kenya-first growth systems</p>
          <h2 className="mt-6 max-w-5xl text-balance text-5xl font-bold leading-[0.98] tracking-[-0.06em] text-foreground md:text-7xl lg:text-[5.6rem]">
            Local insight.
            <br />
            Global craft.
            <br />
            <span className="gradient-text">Practical execution.</span>
          </h2>
        </div>
        <div>
          <p className="text-lg leading-8 text-secondary-300">
            We are a Nairobi-based digital engineering partner for founders and teams who need technology to create real business movement: more sales, smoother operations, safer data, and better customer experiences.
          </p>
          <Link href="/about" className="mt-8 inline-flex items-center gap-2 font-bold text-primary transition hover:gap-4 hover:text-foreground">
            Meet FenTech <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function WhyChooseUs() {
  return (
    <section className="section-shell">
      <div className="grid gap-14 lg:grid-cols-[0.75fr_1.25fr]">
        <SectionHeading
          eyebrow="Why clients choose us"
          title="A startup partner with senior taste, technical depth, and Kenyan context."
          description="You do not need a bloated agency process. You need clear thinking, sharp execution, and systems that survive real usage."
        />
        <div className="grid gap-px overflow-hidden rounded-3xl border border-secondary/10 bg-slate-100 md:grid-cols-2">
          {differentiators.map((item, index) => (
            <div key={item.title} className="bg-surface p-8 md:p-10">
              <span className="text-xs font-bold text-primary">0{index + 1}</span>
              <h3 className="mt-8 text-2xl font-bold text-foreground">{item.title}</h3>
              <p className="mt-4 max-w-lg leading-7 text-secondary-300">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FeaturedWork() {
  return (
    <section className="section-shell">
      <div className="mb-14 flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <SectionHeading
          eyebrow="Project showcase"
          title="Work designed to help Kenyan clients see what is possible."
          description="A portfolio-style showcase of the systems we can design and build for businesses that need practical digital growth."
        />
        <Link href="/case-studies" className="button-secondary shrink-0">
          View all work <ArrowRight size={17} />
        </Link>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {caseStudiesData.map((project, index) => (
          <Link
            key={project.id}
            href={`/case-studies/${project.id}`}
            className={`project-card group min-h-[430px] p-7 md:p-9 ${index === 0 ? "lg:min-h-[560px]" : ""}`}
          >
            <div className="future-grid absolute inset-0 opacity-25" />
            <div className="absolute right-6 top-6 h-28 w-28 rounded-full bg-primary/100/10 blur-3xl" />
            <div className="relative z-10 flex h-full flex-col justify-between">
              <div className="flex items-start justify-between gap-6">
                <span className="rounded-full border border-primary/20 bg-blue-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-primary">{project.category}</span>
                <ArrowRight className="text-slate-300 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-600">{project.industry}</p>
                <h3 className={`mt-4 font-bold leading-tight tracking-[-0.045em] text-foreground ${index === 0 ? "text-4xl md:text-6xl" : "text-3xl md:text-4xl"}`}>{project.title}</h3>
                <p className="mt-5 max-w-2xl leading-7 text-secondary-300">{project.challenge}</p>
                <div className="mt-8 flex flex-wrap gap-2">
                  {project.results.slice(0, 3).map((result) => (
                    <span key={result} className="rounded-full border border-secondary/10 bg-surface px-3 py-1.5 text-xs text-secondary-300 shadow-sm">{result}</span>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function ProcessSection() {
  return (
    <section className="section-shell">
      <SectionHeading
        eyebrow="How we work"
        title="From business ambition to launched product."
        description="A simple delivery rhythm that gives founders and teams clarity before, during, and after the build."
      />
      <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {processSteps.map((step) => (
          <div key={step.number} className="relative border-t border-blue-200 pt-7">
            <p className="text-xs font-bold tracking-[0.2em] text-primary">{step.number}</p>
            <h3 className="mt-8 text-2xl font-bold text-foreground">{step.title}</h3>
            <p className="mt-4 leading-7 text-secondary-300">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function TechnologySection() {
  return (
    <section className="section-shell">
      <div className="grid gap-12 rounded-[2rem] border border-secondary/10 bg-slate-950 p-8 text-white shadow-[0_30px_100px_rgba(15,23,42,0.16)] md:p-12 lg:grid-cols-[0.85fr_1.15fr] lg:p-16">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-300">Technology stack</p>
          <h2 className="mt-5 text-4xl font-bold tracking-[-0.04em] text-white md:text-5xl">Modern tools. Chosen for outcomes.</h2>
          <p className="mt-6 leading-7 text-slate-300">We choose technology based on reliability, maintainability, developer speed, hosting cost, security, and the team that will own the system after launch.</p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {technologies.map((technology, index) => (
            <div key={technology} className="flex items-center gap-3 rounded-xl border border-white/10 bg-surface/[0.04] p-4 text-sm font-semibold text-slate-200 transition hover:border-cyan-300/30 hover:bg-surface/[0.08]">
              {index % 3 === 0 ? <Code2 size={16} className="text-cyan-300" /> : index % 3 === 1 ? <Database size={16} className="text-violet-300" /> : <Cloud size={16} className="text-blue-300" />}
              {technology}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TestimonialsSection() {
  return (
    <section className="section-shell">
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <SectionHeading
          eyebrow="Who we build for"
          title="Digital systems for the businesses shaping modern Kenya."
          description="We focus on teams where better technology can immediately improve trust, service delivery, customer experience, or revenue."
        />
        <div className="flex flex-wrap gap-3">
          {kenyanMarkets.map((market) => (
            <span key={market} className="rounded-full border border-secondary/20 bg-surface px-4 py-2 text-sm font-semibold text-secondary-200 shadow-sm">
              {market}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-16 grid gap-5 lg:grid-cols-3">
        {[
          ["For founders", "Shape a credible digital product, launch faster, and avoid expensive technical mistakes."],
          ["For operators", "Automate repetitive work, connect data, and give teams tools that make daily execution easier."],
          ["For leaders", "Make better technology investment decisions with clear roadmaps, security thinking, and measurable outcomes."],
        ].map(([title, quote]) => (
          <blockquote key={title} className="glass-card p-7">
            <MessageSquareQuote className="text-primary" size={26} />
            <h3 className="mt-8 text-2xl font-bold text-foreground">{title}</h3>
            <p className="mt-5 text-lg leading-8 text-secondary-200">{quote}</p>
          </blockquote>
        ))}
      </div>
    </section>
  );
}

export function HomeContact() {
  return (
    <section className="section-shell">
      <div className="grid items-start gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="lg:sticky lg:top-32">
          <SectionHeading
            eyebrow="Start a conversation"
            title="Let’s build the system your market is already asking for."
            description="Share the business you are growing, the workflow that is slowing you down, or the product idea you want to launch. We’ll help turn it into a practical plan."
          />
          <div className="mt-9 space-y-4">
            {["Useful discovery conversation", "Kenyan-market product thinking", "Clear next steps before a proposal"].map((item) => (
              <p key={item} className="flex items-center gap-3 text-sm text-secondary-300">
                <Check size={16} className="text-primary" />
                {item}
              </p>
            ))}
          </div>
        </div>
        <ContactForm compact />
      </div>
    </section>
  );
}
