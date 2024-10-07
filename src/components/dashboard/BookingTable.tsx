import getBookingStatus from '@/app/utils/getBookingStatus';
import { DeleteBooking } from '@/components/dashboard/button';
import { Badge } from '@/components/ui/badge';
import { formatDateToLocal } from '@/lib/utils';
import Image from 'next/image';
import { BookingTableProps, fetchFilteredBookings } from '@/app/service/action';
export default async function BookingsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const bookings = await fetchFilteredBookings(query, currentPage);
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Room
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Guest
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Check-in
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Check-out
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {bookings?.map((booking: BookingTableProps) => (
                <tr
                  key={booking._id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <Image
                        src={booking.room.images[0]}
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt={`${booking.room.title}'s image`}
                      />
                      <p>{booking.room.title}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {booking.user.name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(booking.startDate)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(booking.endDate)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <Badge>{getBookingStatus(new Date(booking.startDate), new Date(booking.endDate))}</Badge>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <DeleteBooking id={booking._id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}