import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "leaflet/dist/leaflet.css";
import "./globals.css";

/** ------- Business constants ------- */
const COMPANY_NAME = "Hawthorne HVAC and Repair, LLC";
const DISPLAY_NAME = "Hawthorne HVAC & Repair";
const OWNER_NAME = "Brian James";
const PHONE_DISPLAY = "(608) 608-0995";
const EMAIL = "brian@hawthorne-hvacrepair.com";
const CITY = "Madison";
const REGION = "WI";
const ZIP = "53714";
const LICENSE = "791-HVACCONT";
const SERVICE_AREAS = [
  "Madison",
  "Monona",
  "Sun Prairie",
  "Deforest",
  "Fitchburg",
];

/** Hours: Mon–Fri 7:00–17:00 (Emergency line open 24/7) */
const HOURS = [
  { day: "Monday", opens: "07:00", closes: "17:00" },
  { day: "Tuesday", opens: "07:00", closes: "17:00" },
  { day: "Wednesday", opens: "07:00", closes: "17:00" },
  { day: "Thursday", opens: "07:00", closes: "17:00" },
  { day: "Friday", opens: "07:00", closes: "17:00" },
];

/** Payment methods */
const PAYMENT_ACCEPTED = "Cash, Check, Credit Card, Mobile Payments";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: `${DISPLAY_NAME} — Madison, WI`,
    template: `%s • ${DISPLAY_NAME}`,
  },
  description:
    "Owner-operated HVAC in Madison, WI. Heating & cooling repair, install, and maintenance. Licensed & insured. Emergency line open 24 hours.",
  keywords: [
    "HVAC",
    "heating",
    "cooling",
    "furnace repair",
    "AC repair",
    "Madison WI",
    "heat pump",
  ],
  icons: { icon: "/favicon.ico" },
  themeColor: "#000000",
  openGraph: {
    title: `${DISPLAY_NAME} — Madison, WI`,
    description: `Heating & cooling repair, install, and maintenance. Call or text ${PHONE_DISPLAY}.`,
    images: [{ url: "/og.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${DISPLAY_NAME} — Madison, WI`,
    description:
      "Owner-operated HVAC. Licensed & insured. Emergency line open 24 hours.",
    images: ["/og.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  /** JSON-LD for Local SEO (HVACBusiness) */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HVACBusiness",
    name: COMPANY_NAME,
    alternateName: DISPLAY_NAME,
    image: "/logo.png",
    telephone: PHONE_DISPLAY,
    email: EMAIL,
    address: {
      "@type": "PostalAddress",
      addressLocality: CITY,
      addressRegion: REGION,
      postalCode: ZIP,
      addressCountry: "US",
    },
    areaServed: SERVICE_AREAS,
    openingHoursSpecification: HOURS.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.day,
      opens: h.opens,
      closes: h.closes,
    })),
    paymentAccepted: PAYMENT_ACCEPTED,
    founder: { "@type": "Person", name: OWNER_NAME },
    priceRange: "$$",
    slogan: "Emergency line open 24 hours",
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "Professional License",
      name: LICENSE,
    },
    sameAs: [],
  };

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        {/* Load Google Places only if key is present */}
        {process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ? (
          <Script
            id="google-places"
            strategy="afterInteractive"
            src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
          />
        ) : null}
        {/* LocalBusiness schema */}
        <script
          id="hvac-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Click-to-call hint for mobile browsers */}
        <meta name="format-detection" content="telephone=yes" />
      </head>
      <body className={`${inter.className} bg-black text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
