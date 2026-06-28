import { Metadata } from "next";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import IntroSection from "@/components/IntroSection";
import ServicesSection from "@/components/ServicesSection";
import WorkShowcaseSection from "@/components/WorkShowcaseSection";
import DifferentiatorsSection from "@/components/DifferentiatorsSection";
import IndustriesSection from "@/components/IndustriesSection";
import PartnersSection from "@/components/PartnersSection";
import CTASection from "@/components/CTASection";
import { getPublicCmsContent } from "@/lib/cms-content";
import { pageMetadata } from "@/lib/seo/metadata";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: pageMetadata.home.title,
  description: pageMetadata.home.description,
};

export default async function Home() {
  const cms = await getPublicCmsContent();

  return (
    <main>
      <Hero content={cms.homepage} />
      <IntroSection content={cms.homepage} metrics={cms.metrics} />
      <ServicesSection content={cms.homepage} services={cms.services} />
      <WorkShowcaseSection content={cms.homepage} caseStudies={cms.caseStudies} />
      <DifferentiatorsSection differentiators={cms.differentiators} />
      <IndustriesSection content={cms.homepage} industries={cms.industries} />
      <PartnersSection content={cms.homepage} industries={cms.industries} technologies={cms.technologies} />
      <CTASection content={cms.homepage} />
      <Footer siteSettings={cms.siteSettings} services={cms.services} />
    </main>
  );
}
