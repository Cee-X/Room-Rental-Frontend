"use client"
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { DropdownMenu,DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "../utils/DropDownMenu";
import { UserIcon } from '@heroicons/react/16/solid';
import { useAuth } from '../auth/AuthProvider';
import { lusitana } from './font';

const NavBar = () => {
  const router = useRouter();
  const { logout, userRole} = useAuth();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex">
              <Link href="/" className={`${lusitana.className} text-xl font-bold  inline-flex items-center`}>
                Room Rental
              </Link>
            </div>
            <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
              <Link href="/" className="text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium">
                Home
              </Link>
              <Link href="/room" className="text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium">
                Rooms
              </Link>
              <Link href="/contact" className="text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium">
                Contact
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {userRole ? (
              <div className="ml-3 relative ">
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <div
                            className="max-w-xs bg-gray-800 text-white flex items-center text-sm rounded-full focus:outline-none"
                        >
                            <span className="sr-only">Open user menu</span>
                            <UserIcon className="h-8 w-8 rounded-full" />
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent  className="min-w-[160px] z-50  bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade">
                        <DropdownMenuItem>
                            <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700">
                                Profile
                            </Link>
                        </DropdownMenuItem>
                        {userRole === 'admin' && (
                            <>
                                <DropdownMenuItem>
                                    <Link href="/dashboard" className="block px-4 py-2 text-sm text-gray-700">
                                        Dashboard
                                    </Link>
                                </DropdownMenuItem>
                            </>
                        )}
                        <DropdownMenuItem>
                            <button onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700">
                                Logout
                            </button>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div>
                <Link href="/login" className="text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium">
                  Login
                </Link>
                <Link href="/register" className="text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium">
                 Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
