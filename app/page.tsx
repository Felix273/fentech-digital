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
import { pageMetadata } from "@/lib/seo/metadata";
import Script from 'next/script';

export const metadata: Metadata = {
  title: pageMetadata.home.title,
  description: pageMetadata.home.description,
};

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <StatsBar />
      <FeatureBox />
      <About />
      <Solutions />
      {/* AfriAds Ad Space */}
<section className="w-full py-12 px-6 bg-slate-50 flex justify-center">
  <div className="max-w-7xl w-full">
    <div id="afriads-zone-2"></div>
  </div>
</section>
        
      <Industries />
      <SuccessStories />
      <Testimonials />
      <Contact />
      <Footer />
      {/* Footer Placeholder */}
      <footer className="py-10 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} FenTech Digital. All rights reserved.
      </footer>
     <Script id="afriads-script" strategy="afterInteractive">
{`
(function() {
  var script = document.createElement('script');
  script.src = 'http://localhost:5000/ad-widget.js';
  script.async = true;
  script.onload = function() {
    AfriAds.loadAd({
      zoneId: 2,
      websiteId: 2,
      containerId: 'afriads-zone-2'
    });
  };
  document.head.appendChild(script);
})();
`}
</Script>
    </main>
  );
}
