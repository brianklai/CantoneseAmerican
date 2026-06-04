import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturedScene from "@/components/FeaturedScene";
import Archive from "@/components/Archive";
import WhyThisExists from "@/components/WhyThisExists";
import SubmitForm from "@/components/SubmitForm";
import Follow from "@/components/Follow";
import Footer from "@/components/Footer";
import { archiveScenes, leadScene, scenes } from "@/data/scenes";

export default function Page() {
  return (
    <main className="relative">
      <Header />
      <Hero sceneCount={scenes.length} />
      <section id="featured" className="border-b border-rule">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 py-20 sm:py-28">
          <FeaturedScene scene={leadScene} />
        </div>
      </section>
      <Archive scenes={archiveScenes} />
      <WhyThisExists />
      <SubmitForm />
      <Follow />
      <Footer />
    </main>
  );
}
