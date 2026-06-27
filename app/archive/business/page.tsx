import type { Metadata } from "next";
import CategoryArchivePage from "@/components/CategoryArchivePage";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { getScenesByCategory } from "@/data/scenes";
import { getCategoryPageContent } from "@/lib/categories";

const page = getCategoryPageContent("business")!;

export const metadata: Metadata = {
  title: "Business Archive",
  description: page.dek,
  alternates: {
    canonical: "/archive/business",
  },
};

export default function BusinessArchivePage() {
  return (
    <main className="relative bg-paper">
      <Header />
      <CategoryArchivePage
        title={page.title}
        dek={page.dek}
        intro={page.intro}
        scenes={getScenesByCategory(page.category)}
      />
      <Footer />
    </main>
  );
}
