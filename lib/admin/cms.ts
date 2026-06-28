import { caseStudiesData } from "@/lib/data/case-studies";
import { servicesData } from "@/lib/data/services";
import { differentiators, kenyanMarkets, metrics, processSteps, technologies } from "@/lib/site-data";

export type FieldType = "text" | "email" | "url" | "textarea" | "checkbox";

export type ObjectField = {
  key: string;
  label: string;
  type: FieldType;
};

export type CmsObjectSection = {
  id: string;
  label: string;
  help: string;
  kind: "object";
  fields: ObjectField[];
};

export type CmsCollectionSection = {
  id: string;
  label: string;
  help: string;
  kind: "collection";
  singular: string;
  empty: Record<string, string | boolean>;
  fields: ObjectField[];
};

export type CmsSection = CmsObjectSection | CmsCollectionSection;

export const cmsSections: CmsSection[] = [
  {
    id: "site_settings",
    label: "Site settings",
    help: "Global contact details, footer copy and shared business information.",
    kind: "object",
    fields: [
      { key: "email", label: "Email address", type: "email" },
      { key: "phone", label: "Phone number", type: "text" },
      { key: "whatsapp", label: "WhatsApp link", type: "url" },
      { key: "location", label: "Location", type: "text" },
      { key: "footerBrandLine", label: "Footer brand line", type: "textarea" },
      { key: "footerTagline", label: "Footer tagline", type: "text" },
    ],
  },
  {
    id: "homepage",
    label: "Homepage",
    help: "Hero copy, introduction, homepage labels, featured work headings and CTA messaging.",
    kind: "object",
    fields: [
      { key: "heroKicker", label: "Hero kicker", type: "text" },
      { key: "heroTitle", label: "Hero title", type: "textarea" },
      { key: "heroBody", label: "Hero body", type: "textarea" },
      { key: "introLabel", label: "Intro label", type: "text" },
      { key: "introTitle", label: "Intro title", type: "textarea" },
      { key: "introLead", label: "Intro lead", type: "textarea" },
      { key: "servicesLabel", label: "Services label", type: "text" },
      { key: "servicesTitle", label: "Services title", type: "textarea" },
      { key: "workLabel", label: "Work label", type: "text" },
      { key: "workTitle", label: "Work title", type: "textarea" },
      { key: "industriesLabel", label: "Industries label", type: "text" },
      { key: "industriesTitle", label: "Industries title", type: "textarea" },
      { key: "partnersLabel", label: "Partners/tech label", type: "text" },
      { key: "ctaTitle", label: "CTA title", type: "textarea" },
      { key: "ctaBody", label: "CTA body", type: "textarea" },
    ],
  },
  {
    id: "about",
    label: "About page",
    help: "About page hero, story section, long-form copy and story image.",
    kind: "object",
    fields: [
      { key: "heroLabel", label: "Hero label", type: "text" },
      { key: "heroTitle", label: "Hero title", type: "textarea" },
      { key: "heroLead", label: "Hero lead", type: "textarea" },
      { key: "storyLabel", label: "Story label", type: "text" },
      { key: "storyTitle", label: "Story title", type: "textarea" },
      { key: "storyLead", label: "Story lead", type: "textarea" },
      { key: "storyBody", label: "Story body", type: "textarea" },
      { key: "storyImage", label: "Story image path / URL", type: "url" },
      { key: "storyImageAlt", label: "Story image alt text", type: "text" },
    ],
  },
  {
    id: "services",
    label: "Services page",
    help: "Page-level services messaging.",
    kind: "object",
    fields: [
      { key: "heroLabel", label: "Hero label", type: "text" },
      { key: "heroTitle", label: "Hero title", type: "textarea" },
      { key: "heroLead", label: "Hero lead", type: "textarea" },
    ],
  },
  {
    id: "work",
    label: "Work page",
    help: "Portfolio and case-study page messaging.",
    kind: "object",
    fields: [
      { key: "heroLabel", label: "Hero label", type: "text" },
      { key: "heroTitle", label: "Hero title", type: "textarea" },
      { key: "heroLead", label: "Hero lead", type: "textarea" },
    ],
  },
  {
    id: "contact",
    label: "Contact page",
    help: "Contact page hero copy and lead-in messaging.",
    kind: "object",
    fields: [
      { key: "heroLabel", label: "Hero label", type: "text" },
      { key: "heroTitle", label: "Hero title", type: "textarea" },
      { key: "heroLead", label: "Hero lead", type: "textarea" },
    ],
  },
  {
    id: "services_collection",
    label: "Services collection",
    help: "Repeatable service cards and capability labels.",
    kind: "collection",
    singular: "Service",
    empty: {
      id: "",
      name: "",
      eyebrow: "",
      title: "",
      description: "",
      features: "",
      outcomes: "",
      heroTitle: "",
      heroDescription: "",
      href: "",
      featured: true,
    },
    fields: [
      { key: "id", label: "Service ID / slug", type: "text" },
      { key: "name", label: "Service name", type: "text" },
      { key: "eyebrow", label: "Small label", type: "text" },
      { key: "title", label: "Service page intro title", type: "textarea" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "features", label: "Features (one per line)", type: "textarea" },
      { key: "outcomes", label: "Outcomes (one per line)", type: "textarea" },
      { key: "heroTitle", label: "Detail page hero title", type: "textarea" },
      { key: "heroDescription", label: "Detail page hero description", type: "textarea" },
      { key: "href", label: "Page URL", type: "url" },
      { key: "featured", label: "Featured", type: "checkbox" },
    ],
  },
  {
    id: "case_studies",
    label: "Work / case studies",
    help: "Repeatable portfolio projects for potential clients.",
    kind: "collection",
    singular: "Project",
    empty: {
      id: "",
      title: "",
      industry: "",
      category: "",
      about: "",
      challenge: "",
      challengeDetails: "",
      solutionTitle: "",
      solutionDetails: "",
      results: "",
      stats: "",
      techStack: "",
      image: "",
      featured: true,
    },
    fields: [
      { key: "id", label: "Project ID / slug", type: "text" },
      { key: "title", label: "Project title", type: "text" },
      { key: "industry", label: "Industry", type: "text" },
      { key: "category", label: "Category", type: "text" },
      { key: "about", label: "Context / about", type: "textarea" },
      { key: "challenge", label: "Challenge", type: "textarea" },
      { key: "challengeDetails", label: "Challenge details (one per line)", type: "textarea" },
      { key: "solutionTitle", label: "Solution section title", type: "textarea" },
      { key: "solutionDetails", label: "Solution details (Title | Description, one per line)", type: "textarea" },
      { key: "results", label: "Results (one per line)", type: "textarea" },
      { key: "stats", label: "Stats (Value | Label, one per line)", type: "textarea" },
      { key: "techStack", label: "Technology stack (one per line)", type: "textarea" },
      { key: "image", label: "Image path / URL", type: "url" },
      { key: "featured", label: "Featured", type: "checkbox" },
    ],
  },
  {
    id: "testimonials",
    label: "Testimonials",
    help: "Client proof and testimonial snippets.",
    kind: "collection",
    singular: "Testimonial",
    empty: { name: "", role: "", company: "", quote: "", featured: true },
    fields: [
      { key: "name", label: "Name", type: "text" },
      { key: "role", label: "Role", type: "text" },
      { key: "company", label: "Company", type: "text" },
      { key: "quote", label: "Quote", type: "textarea" },
      { key: "featured", label: "Featured", type: "checkbox" },
    ],
  },
  {
    id: "industries",
    label: "Industries",
    help: "Markets and sectors FenTech serves.",
    kind: "collection",
    singular: "Industry",
    empty: { name: "", description: "" },
    fields: [
      { key: "name", label: "Industry name", type: "text" },
      { key: "description", label: "Short description", type: "textarea" },
    ],
  },
  {
    id: "metrics",
    label: "Metrics / proof points",
    help: "Small proof points shown near the homepage and about page intro.",
    kind: "collection",
    singular: "Metric",
    empty: { value: "", label: "" },
    fields: [
      { key: "value", label: "Value", type: "text" },
      { key: "label", label: "Label", type: "textarea" },
    ],
  },
  {
    id: "differentiators",
    label: "Why choose us",
    help: "Differentiator cards used across the homepage and about page.",
    kind: "collection",
    singular: "Differentiator",
    empty: { title: "", description: "" },
    fields: [
      { key: "title", label: "Title", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
    ],
  },
  {
    id: "process_steps",
    label: "Process steps",
    help: "Delivery process used on services and about pages.",
    kind: "collection",
    singular: "Process step",
    empty: { number: "", title: "", description: "" },
    fields: [
      { key: "number", label: "Number", type: "text" },
      { key: "title", label: "Title", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
    ],
  },
  {
    id: "technologies",
    label: "Technologies",
    help: "Technology names used for partner/technology sections.",
    kind: "collection",
    singular: "Technology",
    empty: { name: "" },
    fields: [
      { key: "name", label: "Technology name", type: "text" },
    ],
  },
];

const serviceDefaults = servicesData.map((service) => ({
  id: service.id,
  name: service.name,
  eyebrow: service.eyebrow,
  title: service.title,
  description: service.description,
  features: service.features.join("\n"),
  outcomes: service.outcomes.join("\n"),
  heroTitle: service.heroTitle,
  heroDescription: service.heroDescription,
  href: `/services/${service.slug}`,
  featured: true,
}));

const caseStudyDefaults = caseStudiesData.map((project) => ({
  id: project.id,
  title: project.title,
  industry: project.industry,
  category: project.category,
  about: project.about,
  challenge: project.challenge,
  challengeDetails: project.challengeDetails.join("\n"),
  solutionTitle: project.solutionTitle,
  solutionDetails: project.solutionDetails.map((item) => `${item.title} | ${item.desc}`).join("\n"),
  results: project.results.join("\n"),
  stats: project.stats.map((item) => `${item.val} | ${item.label}`).join("\n"),
  techStack: project.techStack.join("\n"),
  image: project.image,
  featured: true,
}));

export const cmsDefaults: Record<string, unknown> = {
  site_settings: {
    email: "fentechgroup@gmail.com",
    phone: "+254 114 295 869",
    whatsapp: "https://wa.me/254114295869",
    location: "Nairobi, Kenya",
    footerBrandLine: "Software, cloud, cybersecurity and automation for ambitious Kenyan businesses.",
    footerTagline: "Growth, engineered for Kenya.",
  },
  homepage: {
    heroKicker: "Nairobi · Software · Cloud · AI",
    heroTitle: "Growth,\nengineered\nfor Kenya.",
    heroBody: "We design and build software, websites, cloud systems and automation that help Kenyan businesses turn ambition into visible, measurable progress.",
    introLabel: "What we do",
    introTitle: "Technology that moves real operations.",
    introLead: "FenTech helps companies replace manual processes, fragile websites and disconnected tools with reliable digital systems built for how Kenyan teams work.",
    servicesLabel: "Capabilities",
    servicesTitle: "Software, cloud and security under one roof.",
    workLabel: "Selected work",
    workTitle: "Practical systems for practical growth.",
    industriesLabel: "Markets we understand",
    industriesTitle: "Built for Kenya’s daily business realities.",
    partnersLabel: "Technology focus",
    ctaTitle: "Ready to build something useful?",
    ctaBody: "Tell us what you want to launch, fix or automate.",
  },
  about: {
    heroLabel: "About FenTech",
    heroTitle: "A Kenyan technology partner for serious digital growth.",
    heroLead: "We combine product thinking, software engineering, cloud infrastructure and security discipline to help businesses build systems that last.",
    storyLabel: "Our story",
    storyTitle: "We build technology around the work, not the other way around.",
    storyLead: "FenTech Digital exists for organizations that need practical, secure and scalable technology without enterprise complexity.",
    storyBody: "From SMEs and SACCOs to clinics, logistics teams and service businesses, we help teams turn manual workflows into clear digital products, dashboards and automations.",
    storyImage: "/editorial/it-software-team.webp",
    storyImageAlt: "Software team reviewing cloud architecture and product dashboards",
  },
  services: {
    heroLabel: "Services",
    heroTitle: "Digital capability built end to end.",
    heroLead: "From strategy to launch, we design, build, secure and support the systems Kenyan businesses depend on.",
  },
  work: {
    heroLabel: "Work",
    heroTitle: "Proof-of-work for Kenyan business problems.",
    heroLead: "A portfolio of commerce platforms, portals, booking systems and operations dashboards designed for real market constraints.",
  },
  contact: {
    heroLabel: "Contact FenTech",
    heroTitle: "Let’s make your next system move.",
    heroLead: "Tell us what you are building, fixing or automating. We will help turn the challenge into a clear digital plan.",
  },
  services_collection: serviceDefaults,
  case_studies: caseStudyDefaults,
  testimonials: [],
  industries: kenyanMarkets.map((name) => ({
    name,
    description: "A market FenTech understands and supports with practical digital systems.",
  })),
  metrics,
  differentiators,
  process_steps: processSteps,
  technologies: technologies.map((name) => ({ name })),
};
