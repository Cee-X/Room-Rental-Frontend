
import Link from 'next/link'
export default function Footer() {
    return (
        <footer className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0 text-center md:text-left">
              <h3 className="text-xl font-bold mb-2">RoomRental</h3>
              <p>&copy; 2023 RoomRental. All rights reserved.</p>
            </div>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
              <Link href="#" className="hover:underline">Privacy Policy</Link>
              <Link href="#" className="hover:underline">Terms of Service</Link>
              <Link href="#" className="hover:underline">Contact Us</Link>
            </div>
          </div>
        </div>
      </footer>
    )
}