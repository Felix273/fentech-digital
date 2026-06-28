type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <div className={`mb-5 flex items-center gap-3 ${align === "center" ? "justify-center" : ""}`}>
        <span className="h-px w-8 bg-blue-600" />
        <span className="text-xs font-bold uppercase tracking-[0.24em] text-blue-600">{eyebrow}</span>
      </div>
      <h2 className="text-balance text-4xl font-bold leading-[1.08] tracking-[-0.035em] text-slate-950 md:text-5xl lg:text-6xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-6 text-pretty text-lg leading-8 text-slate-600 md:text-xl">{description}</p>
      ) : null}
    </div>
  );
}
