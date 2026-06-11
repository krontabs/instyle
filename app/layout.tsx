import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Jost,
  Noto_Serif_SC,
  Noto_Sans_SC,
} from "next/font/google";
import { LanguageProvider } from "@/lib/i18n";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  display: "swap",
});

const notoSerifSC = Noto_Serif_SC({
  variable: "--font-noto-serif-sc",
  weight: "500",
  display: "swap",
  preload: false,
});

const notoSansSC = Noto_Sans_SC({
  variable: "--font-noto-sans-sc",
  weight: ["300", "400", "500"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ),
  title: "InStyle Hair Salon — Cuts, Color & Balayage | City of Industry, CA",
  description:
    "Upscale hair salon inside Seasons Place, City of Industry. Women's & men's cuts, balayage, perms, keratin treatments and extensions. Open daily 10:30–7. Book online.",
  openGraph: {
    title: "InStyle Hair Salon — City of Industry, CA",
    description:
      "Precision cuts, dimensional color and silk-finish treatments in a marble-and-gold studio. Open every day, 10:30–7.",
    type: "website",
    images: ["/images/salon-mirrors.jpg"],
  },
};

const businessSchema = {
  "@context": "https://schema.org",
  "@type": "HairSalon",
  name: "InStyle Hair Salon",
  image: "/images/salon-mirrors.jpg",
  email: "admin@krontabs.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "18558 Gale Ave #180",
    addressLocality: "City of Industry",
    addressRegion: "CA",
    postalCode: "91748",
    addressCountry: "US",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "10:30",
    closes: "19:00",
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
      className={`${cormorant.variable} ${jost.variable} ${notoSerifSC.variable} ${notoSansSC.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
        />
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
