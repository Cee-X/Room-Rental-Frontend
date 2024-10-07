import { HomeIcon } from '@heroicons/react/24/outline';
import { lusitana } from './font';


export default function HomeLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <HomeIcon className="h-12 w-12 rotate-[15deg]" />
      <p className="text-[44px] font-bold">Room Rental</p>
    </div>
  );
}