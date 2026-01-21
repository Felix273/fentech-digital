import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

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
  title: "FenTech Digital",
  description: "Engineering the Digital Frontier",
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
        {children}
      </body>
    </html>
  );
}