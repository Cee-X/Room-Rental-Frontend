import Image from "next/image"

const AboutUs = () => {
  return (
    <section className="flex flex-col lg:flex-row justify-between gap-16 ">
      <div className="md:flex-shrink-0">
        <Image src="/aboutUs.png" alt="About Us" width={721} height={412} />
      </div>
      <div className="flex flex-col justify-center items-center gap-8 ">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold ">About us</h1>
        <p className="text-md sm:text-lg font-normal tracking-normal sm:leading-8 leading-7 text-center lg:text-start">At our website, we are dedicated to revolutionizing the student housing experience. With a passion for providing affordable, comfortable, and convenient living spaces, we strive to create a seamless platform where students can easily find their ideal accommodation. Our commitment to excellence drives us to continually enhance our services, ensuring that every student housing needs are met with utmost satisfaction. Join us in our mission to redefine student living.</p>
      </div>
    </section>
  )
}

export default AboutUs
