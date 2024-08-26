import Image from "next/image"

const AboutUs = () => {
  return (
    <div className="p-6 md:p-16 bg-gray-50">
      <div className="container mx-auto flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 p-6">
          <Image 
            src="/AboutUs.png"
            alt="About Us"
            width={500}
            height={400}
            className="rounded-lg object-cover"
          />
        </div>
        <div className="md:w-1/2 p-6">
          <h2 className="text-3xl font-bold text-gray-900">About us</h2>
          <p className="mt-4 text-lg text-gray-600 leading-relaxed">At our website, we are dedicated to revolutionizing the student housing experience. With a passion for providing affordable, comfortable, and convenient living spaces, we strive to create a seamless platform where students can easily find their ideal accommodation. Our commitment to excellence drives us to continually enhance our services, ensuring that every student housing need is met with utmost satisfaction. Join us in our mission to redefine student living.</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
