import Link from "next/link";
import { ArrowRight } from "lucide-react";

type CTASectionProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
};

export default function CTASection({
  eyebrow = "Your next move",
  title = "Ready to turn technology into an advantage?",
  description = "Tell us where you are today and where you need to go. We’ll help you define the clearest path forward.",
}: CTASectionProps) {
  return (
    <section className="px-6 py-24">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-violet-50 px-7 py-20 shadow-[0_30px_100px_rgba(15,23,42,0.06)] md:px-16 md:py-24">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full border border-blue-200 opacity-60" />
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full border border-violet-200" />
        <div className="relative z-10 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.26em] text-blue-600">{eyebrow}</p>
          <h2 className="mt-5 text-balance text-4xl font-bold leading-tight tracking-[-0.04em] text-slate-950 md:text-6xl">{title}</h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">{description}</p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link href="/contact" className="button-primary">
              Start a project <ArrowRight size={18} />
            </Link>
            <a href="mailto:fentechgroup@gmail.com" className="button-secondary">Email our team</a>
          </div>
        </div>
      </div>
    </section>
  );
}
