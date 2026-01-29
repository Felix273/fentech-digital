import { Metadata } from "next";
import Navbar from "@/components/Navbar";
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
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = {
  title: pageMetadata.home.title,
  description: pageMetadata.home.description,
};

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <StatsBar />
      <FeatureBox />
      <About />
      <Solutions />
      <Industries />
      <SuccessStories />
      <Testimonials />
      <Contact />
      <Footer />
      {/* Footer Placeholder */}
      <footer className="py-10 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} FenTech Digital. All rights reserved.
      </footer>
    </main>
  );
}
