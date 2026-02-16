import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import "../globals.css";
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

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    metadataBase: new URL(siteUrl),
    title: t("siteTitle"),
    description: t("siteDescription"),
    keywords: t("keywords"),
    authors: [{ name: "SaaS Anatomy" }],
    creator: "SaaS Anatomy",
    publisher: "SaaS Anatomy",
    openGraph: {
      type: "website",
      locale: locale === "fr" ? "fr_FR" : "en_US",
      url: `${siteUrl}/${locale}`,
      siteName: "SaaS Anatomy",
      title: t("siteTitle"),
      description: t("siteDescription"),
      images: [
        {
          url: `/${locale}/og`,
          width: 1200,
          height: 630,
          alt: t("siteTitle"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("siteTitle"),
      description: t("siteDescription"),
      images: [`/${locale}/og`],
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
    alternates: {
      canonical: `${siteUrl}/${locale}`,
      languages: {
        fr: `${siteUrl}/fr`,
        en: `${siteUrl}/en`,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  const messages = await getMessages();
  const organizationSchema = generateOrganizationSchema();

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <GoogleAnalytics />
          <WebVitals />
          <CrispChat />
          <JsonLd data={organizationSchema} />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
