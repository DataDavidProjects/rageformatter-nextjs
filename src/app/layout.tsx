import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rage Formatter",
  description: "Rage Formatter è la webapp che trasforma la rabbia ... ",
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
      <body className={inter.className}>
        <Header />
        <div className="app-container">
          <div className="main-content">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
