import Image from "next/image"
import { Button } from "../utils/Button"
const Footer = () => {
  return (
    <div className="flex flex-row justify-center items-center gap-10 p-10">
      <div className="hidden sm:block">
        <Image src='/newletter.png' width={220} height={215} alt="new letter" />
      </div>
      <div className="space-y-6">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold ">Subscribe to newsletter</h1>
        <p className="text-sm sm:text-md font-normal ">Get the latest news and interesting offers and real estate</p>
        <div className="flex gap-4 justify-start items-center">
            <input type="email" placeholder="Your email addres"  className="bg-whtie px-3 py-2 shadow-sm border-slate-400 placeholder:text-slate-400 rounded-md" />
            <Button>Subscribe</Button>
        </div>
      </div>
    </div>
  )
}

export default Footer
