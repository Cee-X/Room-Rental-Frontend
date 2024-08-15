'use client';
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteRoom } from '../../service/action';

export function CreateRoom() {
  return (
    <Link
      href="/dashboard/rooms/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Room</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateRoom({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/rooms/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteRoom({ id }: { id: string }) {
    const deleteRoomWithId = async (e : React.FormEvent) => {
        e.preventDefault();
        try {
        await deleteRoom(id);
        
        } catch (error) {
        console.error(error);
        }
    };
  return (
    <form onSubmit={deleteRoomWithId}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}
