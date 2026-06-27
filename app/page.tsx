import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Archive from "@/components/Archive";
import WhyThisExists from "@/components/WhyThisExists";
import SubmitForm from "@/components/SubmitForm";
import Follow from "@/components/Follow";
import Footer from "@/components/Footer";
import { publishedScenes } from "@/data/scenes";

export default function Page() {
  return (
    <main className="relative">
      <Header />
      <Hero sceneCount={publishedScenes.length} />
      <Archive scenes={publishedScenes} />
      <WhyThisExists />
      <SubmitForm />
      <Follow />
      <Footer />
    </main>
  );
}
