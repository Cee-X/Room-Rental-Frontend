import Image from "next/image"
import { Button } from "../utils/Button"
const Subscribe = () => {
  return (
    <div className="py-16 bg-blue-50">
      <div className="container mx-auto text-center">
        <h3 className="text-2xl font-bold text-gray-900">Subscribe to our newsletter</h3>
        <p className="mt-2 text-lg text-gray-600">Get the latest news and interesting offers on real estate.</p>
        <div className="mt-8 flex justify-center">
          <input 
            type="email" 
            placeholder="Your email address" 
            className="px-4 py-2 w-1/3 text-gray-700 bg-white border border-gray-300 rounded-l-lg focus:outline-none focus:border-blue-500"
          />
          <button className="px-6 py-2 text-white bg-blue-600 rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Subscribe
          </button>
        </div>
      </div> 
    </div>
  )
}

export default Subscribe
