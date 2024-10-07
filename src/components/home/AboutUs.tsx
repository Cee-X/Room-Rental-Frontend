import Image from "next/image"

const AboutUs = () => {
  return (
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="w-full md:w-1/2 mb-8 md:mb-0 md:pr-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">About RoomRental</h2>
                <p className="mb-4">
                  RoomRental is your go-to platform for finding comfortable and affordable accommodations. 
                  Whether you&apos;re traveling for business or pleasure, we have the perfect room for you.
                </p>
                <p>
                  Our mission is to connect travelers with unique living spaces and experiences around the world.
                </p>
              </div>
              <div className="w-full md:w-1/2">
                <Image src="/AboutUs.png" width={600} height={400} alt="About" className="rounded-lg shadow-lg w-full h-auto" />
              </div>
            </div>
          </div>
        </section>
  );
};

export default AboutUs;
