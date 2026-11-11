import React from "react";
import "./globals.css";
import type { Metadata, Viewport } from "next";
import {
  Bricolage_Grotesque,
  IBM_Plex_Mono,
  Source_Serif_4,
} from "next/font/google";
import Header from "./components/Header";
import Footer from "./components/Footer";
import GoogleAnalytics from "./components/GoogleAnalytics";
import Providers from "./components/Providers";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-mono",
  display: "swap",
});
const serif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover", // let the red bands reach the notch; padding uses safe-area insets
  themeColor: "#A4262C",
};

export const metadata: Metadata = {
  title: "RageFormatter",
  description:
    "Rage Formatter è la webapp che trasforma la rabbia da ufficio in un messaggio formale e costruttivo.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6061434464691027"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body
        className={`${display.variable} ${mono.variable} ${serif.variable} font-display antialiased`}
      >
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? (
          <GoogleAnalytics ga_id={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
        ) : null}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-toner focus:px-3 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <Providers>
          <Header />
          <div className="flex min-h-[100dvh] flex-col">
            <div id="main" className="flex-1">
              {children}
            </div>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
