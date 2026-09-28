import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://calcmypower.com"),
  title: {
    default: "CalcMyPower | Power, Energy & Electrical Calculators",
    template: "%s | CalcMyPower",
  },
  description:
    "Practical electrical, battery backup, solar, and power calculators with transparent formulas and clear engineering baselines.",
  authors: [{ name: "CalcMyPower Technical Publishing" }],
  creator: "CalcMyPower",
  publisher: "CalcMyPower",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://calcmypower.com",
    siteName: "CalcMyPower",
    title: "CalcMyPower | Electrical & Power Calculators",
    description:
      "Clear power calculations for UPS systems, battery backups, generators, solar arrays, and electrical circuits.",
  },
  twitter: {
    card: "summary_large_image",
    title: "CalcMyPower | Power & Electrical Calculators",
    description:
      "Accurate power calculations for UPS systems, generators, solar arrays, battery backups, and wire gauges.",
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
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#1e3a8a",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased selection:bg-blue-600 selection:text-white">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
