import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

// Headroom's actual display font is "TWK Lausanne" (TWK Type foundry, licensed —
// not redistributed here). Plus Jakarta Sans is the closest free substitute:
// same geometric-grotesk proportions and available at the same 300/400/500/700 weights.
const interFont = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const lausanneFont = Plus_Jakarta_Sans({
  variable: "--font-lausanne",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Headroom | The Small Business Operating System For AI",
  description:
    "You built the business by hand. Headroom helps you run it with software, workflows, and AI.",
  icons: {
    icon: "/seo/icon.png",
  },
  openGraph: {
    title: "Headroom | The Small Business Operating System For AI",
    description:
      "You built the business by hand. Headroom helps you run it with software, workflows, and AI.",
    url: "https://www.headroom.com",
    type: "website",
    images: ["/seo/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${interFont.variable} ${lausanneFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
