import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import StudioBoard from "@/components/StudioBoard";
import { scenes } from "@/data/scenes";
import { isStudioEnabled } from "@/lib/site";

export const metadata: Metadata = {
  title: "Studio Workflow",
  description:
    "Internal Cantonese American publishing board for weekly archive production, verification, and scene backlog management.",
  alternates: {
    canonical: "/studio",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function StudioPage() {
  if (!isStudioEnabled()) {
    notFound();
  }

  return (
    <main className="relative bg-paper">
      <Header />
      <StudioBoard scenes={scenes} />
      <Footer />
    </main>
  );
}
