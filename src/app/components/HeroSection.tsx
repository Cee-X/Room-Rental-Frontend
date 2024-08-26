import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../utils/Button';
const HeroSection = () => {
    return (
      <div className="relative flex flex-col-reverse md:flex-row items-center justify-between bg-white p-8 md:p-16">
        <div className="md:max-w-lg z-10">
          <h1 className="text-4xl font-bold text-gray-900 md:text-5xl">Discover Your Ideal Room: Rent with Ease!</h1>
          <p className="mt-4 text-lg text-gray-600">Find your perfect room with ease on our rental website, where convenience meets comfort. Browse a variety of listings and secure your ideal space today!</p>
        <Button className="mt-8">
            <Link href="/room">
                Start Exploring
            </Link>
        </Button>
        </div>
        <div className="relative w-full h-64 md:h-96 md:w-1/2 mt-8 md:mt-0">
          <Image 
            src="/homepage.jpg"
            alt="Modern House"
            layout='fill'
            className="rounded-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent rounded-lg"></div>
        </div>
      </div>
    );
  };

export default HeroSection;
