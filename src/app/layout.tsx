import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://byatskhan-gar.vercel.app"),
  title: "Бяцхан Гар - Mongolian Toddler Keyboard",
  description:
    "Бяцхан хүүхдэд зориулсан Монгол гарын тоглоом. A fun Mongolian keyboard smash app for toddlers.",
  keywords: [
    "mongolian toddler keyboard",
    "baby keyboard smash",
    "бяцхан гар",
    "хүүхдийн тоглоом",
  ],
  authors: [{ name: "Бяцхан Гар" }],
  openGraph: {
    title: "Бяцхан Гар - Mongolian Toddler Keyboard",
    description:
      "Бяцхан хүүхдэд зориулсан Монгол гарын тоглоом. A fun Mongolian keyboard smash app for toddlers.",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Бяцхан Гар - Mongolian Toddler Keyboard",
    description:
      "Бяцхан хүүхдэд зориулсан Монгол гарын тоглоом. A fun Mongolian keyboard smash app for toddlers.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="mn">
      <head>
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
