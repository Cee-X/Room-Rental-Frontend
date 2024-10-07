import Image from 'next/image';
import Link from 'next/link'
const HeroSection = () => {
  return (
    <section className="bg-primary text-primary-foreground py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="w-full md:w-1/2 mb-8 md:mb-0 md:pr-8">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">Find Your Perfect Stay</h1>
                <p className="text-lg md:text-xl mb-8">Discover comfortable and affordable rooms for your next adventure.</p>
                <Link href="/rooms" className="inline-block bg-secondary text-primary px-6 py-3 rounded-md hover:bg-secondary-dark transition-colors">Explore Rooms</Link>
              </div>
              <div className="w-full md:w-1/2">
                <Image src="/homepage.jpg" width={600} height={400} alt="Hero" className="rounded-lg shadow-lg w-full h-auto" />
              </div>
            </div>
          </div>
    </section>
  )
}
export default HeroSection;