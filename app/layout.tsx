import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import FloatingCTA from "@/components/FloatingCTA";
import localFont from "next/font/local";
import "./globals.css";
import { siteConfig } from "@/lib/seo/metadata";
import GoogleAnalytics from "@/components/GoogleAnalytics";

// Path is now relative to this file (app/layout.tsx)
const glacialIndifference = localFont({
  src: [
    {
      path: "./fonts/GlacialIndifference-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/GlacialIndifference-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-glacial",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.author }],
  creator: siteConfig.creator,
  publisher: siteConfig.publisher,
  
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: siteConfig.social.twitter,
  },
  
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  verification: {
    // Add these when you set up Google Search Console and Bing
    // google: 'your-google-verification-code',
    // bing: 'your-bing-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* antialiased makes fonts look smoother and more professional */}
      <body className={`${glacialIndifference.variable} font-sans antialiased`}>
        <body className={`${glacialIndifference.variable} font-sans antialiased`}>
  {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
    <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
  )}
  <Navbar />       
  {children}
  <FloatingCTA />
</body>

        <Navbar />       
        {children}
        <FloatingCTA />
      </body>
    </html>
  );
}
