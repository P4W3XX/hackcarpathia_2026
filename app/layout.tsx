import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hackcarpathia-2026.vercel.app/"),
  title: {
    default: "Adultify | Czas dorastania i pierwsza praca",
    template: "%s | Adultify",
  },
  description:
    "Adultify pomaga nastolatkom ogarnąć dorastanie: pierwsza praca, pierwsze CV, pierwsza wypłata i codzienne dorosłe decyzje.",
  applicationName: "Adultify",
  keywords: [
    "dorastanie",
    "nastoletniość",
    "pierwsza praca",
    "pierwsze CV",
    "kalkulator wypłaty",
    "audyt umowy",
    "AI",
    "Adultify",
  ],
  openGraph: {
    type: "website",
    locale: "pl_PL",
    siteName: "Adultify",
    title: "Adultify | Czas dorastania i pierwsza praca",
    description:
      "Jedna aplikacja na czas dorastania: praca, finanse, umowy i codzienne sprawy z pomocą AI.",
    url: "/",
    images: [
      {
        url: "/adultify.png",
        width: 1200,
        height: 1200,
        alt: "Logo Adultify",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Adultify | Czas dorastania i pierwsza praca",
    description:
      "Wsparcie AI dla nastolatków: pierwsza praca, CV, umowy i dorosłe decyzje bez presji.",
    images: ["/adultify.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
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
      className={cn(
        "h-full bg-background text-foreground antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        inter.variable
      )}
    >
      <body className="min-h-full flex flex-col">
<main>{children}</main>
        <Toaster/>
          
      </body>
    </html>
  );
}
