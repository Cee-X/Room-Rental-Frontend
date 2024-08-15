
import Image from 'next/image';
import { UpdateRoom, DeleteRoom } from '@/app/ui/dashboard/button';
import RoomStatus from '@/app/ui/dashboard/status';
import { formatDateToLocal, formatCurrency } from '@/lib/utils';
import { fetchFilteredRooms,RoomTableProps} from '../../service/action';


export default async function RoomTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const Rooms = await fetchFilteredRooms(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {Rooms?.map((room: RoomTableProps ) => (
              <div
                key={room._id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <Image
                        src={room.images[0]}
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={`${room.title}'s profile picture`}
                      />
                      <p>{room.title}</p>
                    </div>
                    <p className="text-sm text-gray-500">{room.roomNumber}</p>
                  </div>
                  <RoomStatus status={room.status} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {formatCurrency(room.price)}
                    </p>
                    <p>{room.location}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateRoom id={room._id} />
                    <DeleteRoom id={room._id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Room Number
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Price
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                   Location
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
              {Rooms?.map((room: RoomTableProps) => (
                <tr
                  key={room._id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <Image
                        src={room.images[0]}
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt={`${room.title}'s profile picture`}
                      />
                      <p>{room.title}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {room.roomNumber}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatCurrency(room.price)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {room.location}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <RoomStatus status={room.status} />
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateRoom id={room._id} />
                      <DeleteRoom id={room._id} />
                    </div>
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
