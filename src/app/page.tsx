import Image from "next/image";
import { Button } from "./utils/Button";
import TopOffers from "./components/TopOffers";
import AboutUs from "./components/AboutUs";
import Footer from "./components/Footer";
import Link from "next/link";
export default function Home() {
  return (
    <main className="">
      <section className="flex flex-col-reverse md:flex md:flex-row  mt-10 md:mt-24 md:justify-between justify-center  px-4 sm:10 md:px-24 gap-4">
        <div className="md:basis-1/2">
          <h1 className="text-xl sm:text-lg md:text-3xl lg:text-4xl font-bold md:mb-10 mb-5 mt-10 sm:mt-0 ">Discover Your Ideal Room: Rent with Ease!</h1>
          <p className="md:text-lg sm:text-xl lg:text-2xl text-sm font-light sm:leading-7 leading-5 ">Find your perfect room with ease on our rental website, where convenience meets comfort. Browse a variety of listings and secure your ideal space today!</p>
         <Link href="/search"><Button className="md:mt-10 mt-5 ">Start your room search now!</Button></Link>
        </div>
        <div className="flex-shrink-0 lg:flex-shrink-0 md:flex-shrink md:basis-1/2">
          <Image src="/homepage.jpg" alt="Room" width={580} height={557} priority={true} style={{ width: 'auto', height: 'auto' }}  /> 
        </div>
      </section>
      <section className="my-10 md:my-20 px-4 sm:px-6 md:px-24">
        <TopOffers />
      </section>
      <section className="my-10 px-4 sm:px-6 md:px-24">
        <AboutUs />
      </section>
      <section className="mt-10 bg-[#F3F3FA]">
        <Footer />
      </section>
    </main>
  );
}
