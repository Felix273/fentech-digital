import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  primaryLabel?: string;
  primaryHref?: string;
};

export default function PageHero({
  eyebrow,
  title,
  description,
  primaryLabel = "Start a conversation",
  primaryHref = "/contact",
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-slate-100 bg-background px-6 pb-32 pt-40 md:pb-44 md:pt-52">
      <div className="future-grid absolute inset-0 opacity-40" />
      <div className="absolute left-1/2 top-0 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-blue-500/8 blur-[150px]" />
      <div className="relative mx-auto max-w-7xl">
        <div className="mb-10 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          <Link href="/" className="transition hover:text-blue-600">Home</Link>
          <ChevronRight size={13} />
          <span className="text-blue-600">{eyebrow}</span>
        </div>
        <div className="max-w-5xl">
          <p className="mb-6 text-sm font-bold uppercase tracking-[0.28em] text-blue-600">{eyebrow}</p>
          <h1 className="text-balance text-5xl font-bold leading-[0.98] tracking-[-0.055em] text-foreground md:text-7xl lg:text-[5.7rem]">
            {title}
          </h1>
          <p className="mt-8 max-w-3xl text-pretty text-xl leading-8 text-secondary-300 md:text-2xl md:leading-9">{description}</p>
          <Link href={primaryHref} className="button-primary mt-10">
            {primaryLabel}
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
