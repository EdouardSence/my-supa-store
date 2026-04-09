import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import { WebVitals } from "@/app/components/web-vitals";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bitcount = localFont({
  src: "./fonts/Bitcount_Prop_Double_Ink/BitcountPropDoubleInk-VariableFont_CRSV,ELSH,ELXP,SZP1,SZP2,XPN1,XPN2,YPN1,YPN2,slnt,wght.ttf",
  variable: "--font-bitcount",
});

export const metadata: Metadata = {
  title: {
    default: "Ma Boutique",
    template: "%s | Ma Boutique",
  },
  description: "Découvrez Ma Boutique, votre sélection de produits tech et lifestyle au meilleur prix.",
  keywords: ["boutique en ligne", "e-commerce", "produits tech", "accessoires", "ma boutique"],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Ma Boutique",
    title: "Ma Boutique",
    description: "Découvrez Ma Boutique, votre sélection de produits tech et lifestyle au meilleur prix.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${bitcount.variable} antialiased`}
      >
        {children}
        <WebVitals />
      </body>
    </html>
  );
}
