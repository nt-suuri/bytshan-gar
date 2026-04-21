import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://bytshan-gar.vercel.app"),
  title: "Бяцхан Гар 🎹 Хүүхдийн интерактив тоглоом | Baby Keyboard Smash Game",
  description:
    "Бяцхан хүүхдэд зориулсан үнэгүй интерактив тоглоом 🐴🦅🌈 Амьтад, эможи, дуу хөгжим, өнгө. Free interactive emoji smash game for babies & toddlers — animals, sounds, colors. No ads, no tracking.",
  keywords: [
    "бяцхан гар",
    "хүүхдийн тоглоом",
    "монгол хүүхдийн тоглоом",
    "бяцхан хүүхдийн тоглоом",
    "нялх хүүхдийн тоглоом",
    "бага насны хүүхдийн тоглоом",
    "хүүхдийн онлайн тоглоом",
    "гар дарах тоглоом",
    "амьтдын тоглоом хүүхдэд",
    "эможи тоглоом",
    "хүүхдийн боловсрол",
    "монгол хүүхэд",
    "хүүхдийн апп",
    "тоглоом хүүхдэд",
    "интерактив тоглоом",
    "baby keyboard smash",
    "toddler keyboard game",
    "baby smash game free",
    "toddler touch screen game",
    "interactive baby toy online",
    "free toddler game no ads",
    "keyboard game for babies",
    "baby safe keyboard app",
    "toddler sensory game",
    "baby cause and effect game",
    "toddler emoji game",
    "kids tap game",
    "mongolian toddler game",
    "mongolian kids app",
    "baby first app",
    "toddler tablet game",
    "sensory play online",
    "baby entertainment app",
    "toddler animal game",
    "kids sound game",
  ],
  authors: [{ name: "Бяцхан Гар" }],
  openGraph: {
    title: "Бяцхан Гар 🎹 Хүүхдийн интерактив тоглоом",
    description:
      "Үнэгүй интерактив тоглоом 🐴🦅🌈🎵 Амьтад, эможи, дуу хөгжим, өнгө. Free emoji smash game for babies & toddlers!",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
    type: "website",
    locale: "mn_MN",
    alternateLocale: "en_US",
    siteName: "Бяцхан Гар",
  },
  twitter: {
    card: "summary_large_image",
    title: "Бяцхан Гар 🎹 Baby Emoji Smash Game",
    description:
      "Free interactive emoji smash game for toddlers 🐴🦅🌈🎵 Animals, sounds & colors! No ads.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://bytshan-gar.vercel.app",
    languages: {
      "mn": "https://bytshan-gar.vercel.app",
      "en": "https://bytshan-gar.vercel.app",
    },
  },
  category: "education",
  other: {
    "geo.region": "MN",
    "geo.placename": "Mongolia",
    "geo.position": "47.9213;106.9055",
    "ICBM": "47.9213, 106.9055",
    "content-language": "mn, en",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "Бяцхан Гар",
    "mobile-web-app-capable": "yes",
    "format-detection": "telephone=no",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Бяцхан Гар",
  alternateName: "Bytshan Gar - Baby Keyboard Smash",
  description: "Free interactive emoji smash game for babies and toddlers. Animals, sounds, colors. Mongolian cultural identity.",
  url: "https://bytshan-gar.vercel.app",
  applicationCategory: "GameApplication",
  genre: "Educational",
  audience: {
    "@type": "PeopleAudience",
    suggestedMinAge: "0",
    suggestedMaxAge: "4",
  },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  operatingSystem: "Any",
  browserRequirements: "Requires JavaScript. Requires HTML5.",
  inLanguage: ["mn", "en"],
  author: {
    "@type": "Organization",
    name: "Бяцхан Гар",
  },
  image: "https://bytshan-gar.vercel.app/og.png",
  screenshot: "https://bytshan-gar.vercel.app/og.png",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="mn">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;500;600;700;800&family=Noto+Serif:wght@700;800;900&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#0066B3" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/icons/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icons/icon.svg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `if('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js');`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
