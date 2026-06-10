import { Metadata } from "next";
import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import FeatureBox from "@/components/FeatureBox";
import About from "@/components/About";
import Solutions from "@/components/Solutions";
import Industries from "@/components/Industries";
import SuccessStories from "@/components/SuccessStories";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import AfriAdsSlot from "@/components/AfriAdsSlot";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = {
  title: pageMetadata.home.title,
  description: pageMetadata.home.description,
};

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <AfriAdsSlot zoneId={4} websiteId={4} format="leaderboard" label="Sponsored insight" />
      <StatsBar />
      <FeatureBox />
      <About />
      <Solutions />
      <AfriAdsSlot zoneId={4} websiteId={4} format="billboard" label="Partner message" className="bg-slate-50" />
      <Industries />
      <SuccessStories />
      <Testimonials />
      <AfriAdsSlot zoneId={4} websiteId={4} format="native" label="Recommended for business leaders" />
      <Contact />
      <Footer />
      <footer className="py-10 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} FenTech Digital. All rights reserved.
      </footer>
    </main>
  );
}
