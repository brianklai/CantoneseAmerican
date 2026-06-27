import type { Metadata } from "next";
import ArchiveIndex from "@/components/ArchiveIndex";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { publishedScenes } from "@/data/scenes";

export const metadata: Metadata = {
  title: "Archive of Cantonese American Scenes",
  description:
    "Browse published Cantonese American scenes by title, category, language, and source.",
  alternates: {
    canonical: "/archive",
  },
};

export default function ArchivePage() {
  return (
    <main className="relative bg-paper">
      <Header />
      <ArchiveIndex scenes={publishedScenes} />
      <Footer />
    </main>
  );
}
