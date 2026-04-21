import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://bytshan-gar.vercel.app"),
  title: "Бяцхан Гар 🎹 Монгол хүүхдийн товчлуур тоглоом | Baby Keyboard Smash",
  description:
    "Бяцхан хүүхдэд зориулсан Монгол гарын интерактив тоглоом 🐴🦅 Монгол үсэг, амьтад, дуу хөгжим. Free interactive Mongolian keyboard smash game for babies & toddlers with letters, animals, sounds & colors.",
  keywords: [
    "бяцхан гар",
    "хүүхдийн тоглоом",
    "монгол хүүхдийн тоглоом",
    "монгол үсэг сурах",
    "бяцхан хүүхдийн тоглоом",
    "нялх хүүхдийн тоглоом",
    "гар дарах тоглоом",
    "mongolian toddler keyboard",
    "baby keyboard smash",
    "toddler keyboard game",
    "baby smash game",
    "kids keyboard game",
    "toddler learning game",
    "mongolian alphabet for kids",
    "mongolian letters game",
    "keyboard game for babies",
    "toddler safe keyboard",
    "baby proof keyboard game",
    "interactive baby toy online",
    "free toddler game",
    "toddler touch screen game",
    "baby first keyboard",
    "mongolian children game",
    "монгол цагаан толгой",
    "хүүхдийн боловсрол",
    "бага насны хүүхдийн тоглоом",
  ],
  authors: [{ name: "Бяцхан Гар" }],
  openGraph: {
    title: "Бяцхан Гар 🎹 Монгол хүүхдийн товчлуур тоглоом",
    description:
      "Бяцхан хүүхдэд зориулсан Монгол гарын интерактив тоглоом 🐴🦅🎵 Монгол үсэг, амьтад, дуу хөгжим. Free keyboard smash game for babies & toddlers!",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
    type: "website",
    locale: "mn_MN",
    siteName: "Бяцхан Гар",
  },
  twitter: {
    card: "summary_large_image",
    title: "Бяцхан Гар 🎹 Mongolian Baby Keyboard Smash Game",
    description:
      "Free interactive keyboard smash game for toddlers 🐴🦅🎵 Mongolian letters, animals & sounds!",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://bytshan-gar.vercel.app",
  },
  category: "education",
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
          dangerouslySetInnerHTML={{
            __html: `if('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js');`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
