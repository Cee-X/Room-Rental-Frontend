'use client'
import {
  TicketIcon,
  UserIcon,
  StarIcon,

} from '@heroicons/react/24/outline';
import NavLinks from '@/app/ui/profile/nav-link';
import { useAuth } from '@/app/auth/AuthProvider';
const userLinks = [
  { name: 'profile', href: '/profile', icon: UserIcon },
  {
    name: 'booking', href: '/profile/bookings',icon: TicketIcon,
  },
  { name: 'Reviews', href: '/profile/reviews', icon: StarIcon  },
];



export default function SideNav() {

  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks links={userLinks} />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
      </div>
    </div>
  );
}
