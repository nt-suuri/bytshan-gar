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

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Бяцхан Гар",
    alternateName: ["Bytshan Gar", "Baby Keyboard Smash Game", "Toddler Emoji Smash"],
    description: "Бяцхан Гар is a free, ad-free interactive emoji smash game designed for babies and toddlers aged 0 to 4. Every tap or keypress produces colorful emoji animations, musical sounds, and flying animals. Built with Mongolian cultural identity — featuring Mongolian animal names and pentatonic melodies. Works on phones, tablets, and computers. No account required, no data collected.",
    url: "https://bytshan-gar.vercel.app",
    applicationCategory: "GameApplication",
    genre: ["Educational", "Casual"],
    audience: { "@type": "PeopleAudience", suggestedMinAge: "0", suggestedMaxAge: "4" },
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD", availability: "https://schema.org/InStock" },
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript and HTML5",
    inLanguage: ["mn", "en"],
    author: { "@type": "Organization", name: "Бяцхан Гар", url: "https://github.com/nt-suuri/bytshan-gar" },
    image: "https://bytshan-gar.vercel.app/og.png",
    aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", bestRating: "5", ratingCount: "1" },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is Бяцхан Гар (Bytshan Gar)?",
        acceptedAnswer: { "@type": "Answer", text: "Бяцхан Гар is a free interactive emoji smash game for babies and toddlers aged 0-4. Every tap, click, or keypress produces colorful emoji animations (animals, stars, flowers, hearts), musical pentatonic sounds, and flying animal sprites. It is designed with Mongolian cultural identity." },
      },
      {
        "@type": "Question",
        name: "Is Бяцхан Гар free and safe for toddlers?",
        acceptedAnswer: { "@type": "Answer", text: "Yes, completely free with no ads, no tracking, no account required, and no data collection. The app blocks accidental navigation, prevents browser shortcuts, and runs in fullscreen. Parents can access a hidden settings panel by holding the top-left corner for 2 seconds." },
      },
      {
        "@type": "Question",
        name: "What devices does Бяцхан Гар work on?",
        acceptedAnswer: { "@type": "Answer", text: "Бяцхан Гар works on any device with a modern web browser: phones, tablets, laptops, and desktop computers. It supports touch, mouse, and keyboard input. It can be installed as a PWA (Progressive Web App) on your home screen for an app-like experience." },
      },
      {
        "@type": "Question",
        name: "What makes Бяцхан Гар different from other toddler keyboard apps?",
        acceptedAnswer: { "@type": "Answer", text: "Бяцхан Гар features Mongolian cultural identity with Mongolian animal names (Морь, Бүргэд, Тэмээ, Сарлаг), pentatonic melodies, and three visual themes inspired by Mongolian landscapes: Тэнгэр (Sky), Тал (Steppe), and Шөнө (Night). It uses Web Audio synthesis for layered sounds with no audio file downloads." },
      },
      {
        "@type": "Question",
        name: "Бяцхан Гар гэж юу вэ?",
        acceptedAnswer: { "@type": "Answer", text: "Бяцхан Гар бол 0-4 насны бяцхан хүүхдүүдэд зориулсан үнэгүй интерактив эможи тоглоом юм. Дэлгэцэнд хүрэх, товчлуур дарах бүрт өнгөлөг эможи, амьтад, хөгжмийн аялгуу гарч ирнэ. Монгол соёлын онцлогтой — Монгол амьтдын нэр, уран хээ, пентатоник аялгуу." },
      },
      {
        "@type": "Question",
        name: "Бяцхан Гар тоглоом аюулгүй юу?",
        acceptedAnswer: { "@type": "Answer", text: "Тийм, бүрэн аюулгүй. Зар сурталчилгаагүй, хэрэглэгчийн мэдээлэл цуглуулдаггүй, бүртгэл шаардлагагүй. Хүүхэд санамсаргүйгээр хуудсыг хаах, өөр хуудас руу шилжихээс хамгаална. Эцэг эхчүүд зүүн дээд буланг 2 секунд дарж тохиргооны самбарт хандах боломжтой." },
      },
    ],
  },
];

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
        {jsonLd.map((ld, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
          />
        ))}
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
