import CreateRoom from '@/components/dashboard/create-room'
import { Metadata } from "next"
export const metadata : Metadata = {
  title: "Create Room",
  description: "Create Room - Rent rooms easily",
}
const Page = () => {
  return (
    <div className='w-full max-w-4xl mx-auto px-4 py-8'>
      <CreateRoom />
    </div>
  )
}

export default Page
