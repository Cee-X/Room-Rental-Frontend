import { Metadata } from "next"
import Dashboard from "@/components/dashboard/Dashboard"
export const metadata : Metadata = {
  title: "Dashboard",
  description: "Dashboard - Rent rooms easily",
}
const Page = () => {
  return (
    <div>
      <Dashboard />
    </div>
  )
}

export default Page
