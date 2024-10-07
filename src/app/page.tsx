import TopOffers from "@/components/home/TopOffers";
import AboutUs from "@/components/home/AboutUs";
import Footer from "@/components/home/Footer";
import HeroSection from "@/components/home/HeroSection";
import Subscribe from "@/components/home/Subscribe";
export default function Home() {
  return (
<div className="flex flex-col min-h-screen">
  <main className="flex-grow">
    <HeroSection />
    <TopOffers />
    <AboutUs />
    <Subscribe />
  </main>
  <Footer />
</div>
  );
}
