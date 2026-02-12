import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { generateOrganizationSchema } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { GoogleAnalytics } from "@/components/google-analytics";
import { WebVitals } from "@/components/web-vitals";
import { CrispChat } from "@/components/crisp-chat";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://saas-anatomy.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "SaaS Anatomy - Le guide pour un SaaS rentable",
  description: "Apprenez à construire des produits SaaS rentables de A à Z. De l'idée au lancement, maîtrisez l'anatomie des SaaS à succès.",
  keywords: ["SaaS", "développement", "startup", "tutoriel", "guide", "business", "produit", "monétisation"],
  authors: [{ name: "SaaS Anatomy" }],
  creator: "SaaS Anatomy",
  publisher: "SaaS Anatomy",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteUrl,
    siteName: "SaaS Anatomy",
    title: "SaaS Anatomy - Le guide pour un SaaS rentable",
    description: "Apprenez à construire des produits SaaS rentables de A à Z. De l'idée au lancement, maîtrisez l'anatomie des SaaS à succès.",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "SaaS Anatomy - Le guide pour un SaaS rentable",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SaaS Anatomy - Le guide pour un SaaS rentable",
    description: "Apprenez à construire des produits SaaS rentables de A à Z. De l'idée au lancement, maîtrisez l'anatomie des SaaS à succès.",
    images: ["/og-default.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = generateOrganizationSchema();

  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GoogleAnalytics />
        <WebVitals />
        <CrispChat />
        <JsonLd data={organizationSchema} />
        {children}
      </body>
    </html>
  );
}
