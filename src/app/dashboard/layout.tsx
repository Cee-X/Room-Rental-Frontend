'use client'
import { Button } from "@/components/ui/button"
import { Calendar, Home, Hotel, LogOut, MessageSquare } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useAuth } from '@/components/auth/AuthProvider'
interface AdminDashboardLayoutProps {
  children: React.ReactNode
}

const AdminDashboardLayout: React.FC<AdminDashboardLayoutProps> = ({ children }) => {
  const router = useRouter()
  const { logout } = useAuth()
  const handleLogout = () => {
    logout()
    router.push('/login')
}

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <aside className="w-full md:w-64 bg-white shadow-md">
        <nav className="p-4 md:mt-6">
          <Link href="/dashboard" className="block py-2 px-4 text-gray-600 hover:bg-gray-200">
            <Home className="inline-block mr-2" size={20} />
            Dashboard
          </Link>
          <Link href="/dashboard/rooms" className="block py-2 px-4 text-gray-600 hover:bg-gray-200">
            <Hotel className="inline-block mr-2" size={20} />
            Rooms
          </Link>
          <Link href="/dashboard/bookings" className="block py-2 px-4 text-gray-600 hover:bg-gray-200">
            <Calendar className="inline-block mr-2" size={20} />
            Bookings
          </Link>
          <Link href="/dashboard/reviews" className="block py-2 px-4 text-gray-600 hover:bg-gray-200">
            <MessageSquare className="inline-block mr-2" size={20} />
            Reviews
          </Link>
        </nav>
        <div className="p-4 mt-auto">
          <Button onClick={handleLogout} variant="outline" className="w-full">
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        </div>
      </aside>
      <main className="flex-1 p-4 md:p-8 overflow-auto">
        {children}
      </main>
    </div>
  )
}

export default AdminDashboardLayout