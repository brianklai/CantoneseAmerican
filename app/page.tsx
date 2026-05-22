import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturedScene from "@/components/FeaturedScene";
import WhyThisExists from "@/components/WhyThisExists";
import SubmitForm from "@/components/SubmitForm";
import Follow from "@/components/Follow";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <main className="relative">
      <Header />
      <Hero />
      <FeaturedScene />
      <WhyThisExists />
      <SubmitForm />
      <Follow />
      <Footer />
    </main>
  );
}
