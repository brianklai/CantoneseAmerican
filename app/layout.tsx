import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const serif = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cantonese American — A Speaking American project",
  description:
    "A living archive of Cantonese-speaking culture in American movies, TV, history, and everyday life — starting with the scenes that made us feel at home.",
  openGraph: {
    title: "Cantonese American",
    description:
      "A living archive of Cantonese-speaking culture in American movies, TV, history, and everyday life.",
    type: "website",
    siteName: "Cantonese American",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cantonese American",
    description:
      "A living archive of Cantonese-speaking culture in American movies, TV, history, and everyday life.",
  },
};

export const viewport: Viewport = {
  themeColor: "#FAF8F4",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body className="font-sans bg-paper text-ink antialiased">{children}</body>
    </html>
  );
}
