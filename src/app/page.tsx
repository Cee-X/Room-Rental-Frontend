import HeroSection from "./components/HeroSection";
import TopOffers from "./components/TopOffers";
import AboutUs from "./components/AboutUs";
import Subscribe from "./components/Subscribe";
export default function Home() {
  return (
<div className="space-y-8">
  <HeroSection />
  <TopOffers />
  <AboutUs />
  <Subscribe />
</div>
  );
}
