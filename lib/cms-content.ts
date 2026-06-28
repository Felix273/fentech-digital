import { cmsDefaults, cmsSections } from "@/lib/admin/cms";
import { caseStudiesData, type CaseStudy } from "@/lib/data/case-studies";
import { servicesData, type Service } from "@/lib/data/services";
import { differentiators, kenyanMarkets, metrics, processSteps, technologies } from "@/lib/site-data";
import { createSupabaseAdminClient } from "@/lib/supabase";

type RawRecord = Record<string, unknown>;

export type SiteSettingsContent = {
  email: string;
  phone: string;
  whatsapp: string;
  location: string;
  footerBrandLine: string;
  footerTagline: string;
};

export type HomepageContent = {
  heroKicker: string;
  heroTitle: string;
  heroBody: string;
  introLabel: string;
  introTitle: string;
  introLead: string;
  servicesLabel: string;
  servicesTitle: string;
  workLabel: string;
  workTitle: string;
  industriesLabel: string;
  industriesTitle: string;
  partnersLabel: string;
  ctaTitle: string;
  ctaBody: string;
};

export type PageIntroContent = {
  heroLabel: string;
  heroTitle: string;
  heroLead: string;
};

export type AboutContent = PageIntroContent & {
  storyLabel: string;
  storyTitle: string;
  storyLead: string;
  storyBody: string;
  storyImage: string;
  storyImageAlt: string;
};

export type IndustryContent = {
  name: string;
  description: string;
};

export type TestimonialContent = {
  name: string;
  role: string;
  company: string;
  quote: string;
  featured: boolean;
};

export type PublicCmsContent = {
  siteSettings: SiteSettingsContent;
  homepage: HomepageContent;
  about: AboutContent;
  servicesPage: PageIntroContent;
  workPage: PageIntroContent;
  contactPage: PageIntroContent;
  services: Service[];
  caseStudies: CaseStudy[];
  testimonials: TestimonialContent[];
  industries: IndustryContent[];
  metrics: typeof metrics;
  processSteps: typeof processSteps;
  differentiators: typeof differentiators;
  technologies: typeof technologies;
};

const sectionIds = cmsSections.map((section) => section.id);

function record(value: unknown): RawRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as RawRecord) : {};
}

function text(value: unknown, fallback = "") {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function bool(value: unknown, fallback = true) {
  return typeof value === "boolean" ? value : fallback;
}

function lines(value: unknown, fallback: string[] = []) {
  if (Array.isArray(value)) {
    const next = value.map((item) => text(item)).filter(Boolean);
    return next.length ? next : fallback;
  }

  const next = text(value)
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);
  return next.length ? next : fallback;
}

function pairs(value: unknown, fallback: { val: string; label: string }[]) {
  if (Array.isArray(value)) {
    const next = value
      .map((item) => record(item))
      .map((item) => ({ val: text(item.val), label: text(item.label) }))
      .filter((item) => item.val && item.label);
    return next.length ? next : fallback;
  }

  const next = lines(value).map((line) => {
    const [val, ...labelParts] = line.split("|");
    return { val: text(val), label: text(labelParts.join("|")) };
  }).filter((item) => item.val && item.label);

  return next.length ? next : fallback;
}

function solutionPairs(value: unknown, fallback: { title: string; desc: string }[]) {
  if (Array.isArray(value)) {
    const next = value
      .map((item) => record(item))
      .map((item) => ({ title: text(item.title), desc: text(item.desc) }))
      .filter((item) => item.title && item.desc);
    return next.length ? next : fallback;
  }

  const next = lines(value).map((line) => {
    const [title, ...descParts] = line.split("|");
    return { title: text(title), desc: text(descParts.join("|")) };
  }).filter((item) => item.title && item.desc);

  return next.length ? next : fallback;
}

function collection(value: unknown): RawRecord[] {
  return Array.isArray(value) ? value.map(record) : [];
}

function objectSection<T extends RawRecord>(value: unknown, fallback: T): T {
  return { ...fallback, ...record(value) };
}

function normalizeService(item: RawRecord, fallback?: Service): Service | null {
  const id = text(item.id, fallback?.id);
  const name = text(item.name, fallback?.name);
  if (!id || !name) return null;

  const slug = text(item.slug, text(item.href).replace(/^\/services\//, "") || fallback?.slug || id);

  return {
    id,
    slug,
    name,
    eyebrow: text(item.eyebrow, fallback?.eyebrow || "Digital capability"),
    title: text(item.title, fallback?.title || `${name} for growing Kenyan teams.`),
    description: text(item.description || item.summary, fallback?.description || ""),
    features: lines(item.features, fallback?.features || []),
    outcomes: lines(item.outcomes, fallback?.outcomes || []),
    heroTitle: text(item.heroTitle, fallback?.heroTitle || name),
    heroDescription: text(item.heroDescription, fallback?.heroDescription || text(item.description, "")),
  };
}

function normalizeCaseStudy(item: RawRecord, fallback?: CaseStudy): CaseStudy | null {
  const id = text(item.id, fallback?.id);
  const title = text(item.title, fallback?.title);
  if (!id || !title) return null;

  return {
    id,
    title,
    category: text(item.category, fallback?.category || "Digital Product"),
    industry: text(item.industry, fallback?.industry || "Kenyan business"),
    about: text(item.about, fallback?.about || "A practical digital system for a growing Kenyan organization."),
    rating: text(item.rating, fallback?.rating || "5/5"),
    reviewCount: text(item.reviewCount, fallback?.reviewCount || "Portfolio showcase"),
    stats: pairs(item.stats, fallback?.stats || [{ val: "Live", label: "Working digital workflow" }]),
    challenge: text(item.challenge, fallback?.challenge || "The team needed a clearer, more reliable digital workflow."),
    challengeDetails: lines(item.challengeDetails, fallback?.challengeDetails || []),
    solutionTitle: text(item.solutionTitle, fallback?.solutionTitle || "A focused digital system"),
    solutionDetails: solutionPairs(item.solutionDetails, fallback?.solutionDetails || []),
    results: lines(item.results, fallback?.results || []),
    techStack: lines(item.techStack, fallback?.techStack || []),
    image: text(item.image, fallback?.image || "/editorial/it-software-team.webp"),
  };
}

function normalizeServices(value: unknown) {
  const items = collection(value);
  if (!items.length) return servicesData;

  const normalized = items
    .filter((item) => bool(item.featured, true))
    .map((item) => normalizeService(item, servicesData.find((service) => service.id === text(item.id))))
    .filter(Boolean) as Service[];

  return normalized.length ? normalized : servicesData;
}

function normalizeCaseStudies(value: unknown) {
  const items = collection(value);
  if (!items.length) return caseStudiesData;

  const normalized = items
    .filter((item) => bool(item.featured, true))
    .map((item) => normalizeCaseStudy(item, caseStudiesData.find((project) => project.id === text(item.id))))
    .filter(Boolean) as CaseStudy[];

  return normalized.length ? normalized : caseStudiesData;
}

function normalizeIndustries(value: unknown): IndustryContent[] {
  const items = collection(value)
    .map((item) => ({
      name: text(item.name),
      description: text(item.description),
    }))
    .filter((item) => item.name);

  return items.length
    ? items
    : kenyanMarkets.map((name) => ({ name, description: "A market FenTech understands and supports with practical digital systems." }));
}

function normalizeTestimonials(value: unknown): TestimonialContent[] {
  return collection(value)
    .filter((item) => bool(item.featured, true))
    .map((item) => ({
      name: text(item.name),
      role: text(item.role),
      company: text(item.company),
      quote: text(item.quote),
      featured: bool(item.featured, true),
    }))
    .filter((item) => item.name && item.quote);
}

function normalizeMetrics(value: unknown): typeof metrics {
  const items = collection(value)
    .map((item) => ({ value: text(item.value), label: text(item.label) }))
    .filter((item) => item.value && item.label);

  return items.length ? items : metrics;
}

function normalizeDifferentiators(value: unknown): typeof differentiators {
  const items = collection(value)
    .map((item) => ({ title: text(item.title), description: text(item.description) }))
    .filter((item) => item.title && item.description);

  return items.length ? items : differentiators;
}

function normalizeProcessSteps(value: unknown): typeof processSteps {
  const items = collection(value)
    .map((item, index) => ({
      number: text(item.number, String(index + 1).padStart(2, "0")),
      title: text(item.title),
      description: text(item.description),
    }))
    .filter((item) => item.title && item.description);

  return items.length ? items : processSteps;
}

function normalizeTechnologies(value: unknown): typeof technologies {
  const items = collection(value)
    .map((item) => text(item.name))
    .filter(Boolean);

  return items.length ? items : technologies;
}

async function loadRawContent() {
  const content = Object.fromEntries(sectionIds.map((id) => [id, cmsDefaults[id] ?? {}]));

  try {
    const supabase = createSupabaseAdminClient();
    const { data, error } = await supabase
      .from("site_content")
      .select("id, content")
      .in("id", sectionIds);

    if (error) throw error;

    for (const row of data || []) {
      content[row.id] = row.content;
    }
  } catch {
    // Local defaults keep the public website rendering when Supabase is not configured.
  }

  return content;
}

export async function getPublicCmsContent(): Promise<PublicCmsContent> {
  const raw = await loadRawContent();

  return {
    siteSettings: objectSection(raw.site_settings, cmsDefaults.site_settings as SiteSettingsContent),
    homepage: objectSection(raw.homepage, cmsDefaults.homepage as HomepageContent),
    about: objectSection(raw.about, cmsDefaults.about as AboutContent),
    servicesPage: objectSection(raw.services, cmsDefaults.services as PageIntroContent),
    workPage: objectSection(raw.work, cmsDefaults.work as PageIntroContent),
    contactPage: objectSection(raw.contact, cmsDefaults.contact as PageIntroContent),
    services: normalizeServices(raw.services_collection),
    caseStudies: normalizeCaseStudies(raw.case_studies),
    testimonials: normalizeTestimonials(raw.testimonials),
    industries: normalizeIndustries(raw.industries),
    metrics: normalizeMetrics(raw.metrics),
    processSteps: normalizeProcessSteps(raw.process_steps),
    differentiators: normalizeDifferentiators(raw.differentiators),
    technologies: normalizeTechnologies(raw.technologies),
  };
}
