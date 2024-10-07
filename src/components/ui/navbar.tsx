"use client"
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ChevronDown, Menu, User } from "lucide-react";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '@/components/auth/AuthProvider';

const NavBar = () => {
  const router = useRouter();
  const { logout, userRole} = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const handleLogout = () => {
    logout();
    router.push('/login');
  };
  return (
    <header className="bg-white shadow-sm">
        <nav className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-primary">RoomRental</Link>
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/" className="text-sm font-medium hover:text-primary">Home</Link>
              <Link href="/rooms" className="text-sm font-medium hover:text-primary">Rooms</Link>
              <Link href="/contact" className="text-sm font-medium hover:text-primary">Contact</Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                    <ChevronDown className="h-4 w-4 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" >
                  {userRole ? (
                    <>
                      <DropdownMenuItem>
                        <Link href="/profile" className='w-full'>
                          Profile
                        </Link>
                        </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href='/profile/bookings' className='w-full'>
                          Bookings
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href='/profile/reviews' className='w-full'>
                          Reviews
                        </Link>
                      </DropdownMenuItem> 
                      {userRole === 'admin' && (
                            <>
                                <DropdownMenuItem >
                                    <Link href="/dashboard" className='w-full' >
                                        Dashboard
                                    </Link>
                                </DropdownMenuItem>
                            </>
                        )}
                      <DropdownMenuItem onClick={handleLogout} >Log Out</DropdownMenuItem>
                    </>
                  ) : (
                    <>
                      <DropdownMenuItem>
                        <Link href="/login" className='w-full'>
                          Login
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href="/signup" className='w-full'>
                          Sign Up
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <Menu className="h-6 w-6" />
            </Button>
          </div>
          {isMobileMenuOpen && (
            <div className="mt-4 md:hidden">
              <Link href="/" className="block py-2 text-sm font-medium hover:text-primary">Home</Link>
              <Link href="/rooms" className="block py-2 text-sm font-medium hover:text-primary">Rooms</Link>
              <Link href="/contact" className="block py-2 text-sm font-medium hover:text-primary">Contact</Link>
              {userRole ? (
                <>
                  <Link href='/profile'><Button variant="ghost" className="w-full justify-start py-2 text-sm font-medium hover:text-primary">Profile</Button></Link>
                  <Link href='/prfile/bookings'><Button variant="ghost" className="w-full justify-start py-2 text-sm font-medium hover:text-primary">Bookings</Button></Link>
                  <Link href='/profile/reviews'><Button variant="ghost" className="w-full justify-start py-2 text-sm font-medium hover:text-primary">Reviews</Button></Link>
                  {userRole === 'admin' && (
                    <Button variant="ghost" className="w-full justify-start py-2 text-sm font-medium hover:text-primary">Dashboard</Button>
                  )}
                  <Button variant="ghost" className="w-full justify-start py-2 text-sm font-medium hover:text-primary" onClick={handleLogout}>Log Out</Button>
                </>
              ) : (
                <>
                  <Link href='/login'><Button variant="ghost" className="w-full justify-start py-2 text-sm font-medium hover:text-primary">Login</Button></Link>
                  <Link href='/register'><Button variant="ghost" className="w-full justify-start py-2 text-sm font-medium hover:text-primary">Register</Button></Link>
                </>
              )}
            </div>
          )}
        </nav>
      </header>

  
  );
};

export default NavBar;