'use client'
import RoomFilter from '@/components/room/FilterControl'
import RoomCard from '@/components/room/RoomCard'
import { useEffect, useState } from 'react'
import Pagination from "../../components/dashboard/pagination"
import LoadingSkeleton from "../../components/room/CardSkeleton"
import { getRooms, RoomProps } from "../service/action"

export default function RoomsPage({searchParams}: {
  searchParams?: {
    query?: string;
    page?: string;
  }
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const [rooms, setRooms] = useState<RoomProps[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [ErrorMessage, setErrorMessage] = useState<string | null>(null);
  const fetchRooms = async (filters?: any) => {
    try {
      setLoading(true);
      setErrorMessage(null);
      const response = await getRooms(filters ? filters : query, currentPage);
      if(response.rooms){
        setRooms(response.rooms);
        setTotalPages(response.totalPages);
      }else{
        setRooms([]);
        setTotalPages(0);
        setErrorMessage(response.message);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setRooms([]);
      setTotalPages(0);
      setErrorMessage('Something went wrong');
      setLoading(false);
    }

  }
  useEffect(() => {
    fetchRooms();
  }, [query, currentPage]);

  const handleFilterChange = (filters: {
    searchTerm: string;
    roomType: string;
    minPrice: number;
    maxPrice: number;
  }) => {
    const params = new URLSearchParams();
    if (filters.searchTerm) params.append('searchTerm', filters.searchTerm);
    if (filters.roomType) params.append('roomType', filters.roomType);
    if (filters.minPrice) params.append('priceMin', filters.minPrice.toString());
    if (filters.maxPrice) params.append('priceMax', filters.maxPrice.toString());
    fetchRooms(params.toString());
  }

  return (
    <div className="container mx-auto px-4 py-4">
      <RoomFilter onFilterChange={handleFilterChange} />
      
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-4 sm:gap-6">
          {Array.from({length: 6}).map((_, index) => (
            <LoadingSkeleton key={index} />
          ))}
        </div>
      )}

      {!loading && ErrorMessage && (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-2">No Rooms Found</h2>
          <p className="text-muted-foreground">
            We couldn&apos;t find any rooms matching your search criteria. Please try adjusting your filters.
          </p>
        </div>
      )}

      {!loading && !ErrorMessage && rooms && rooms.length > 0 && (
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ">
          {rooms.map((room) => (
            <RoomCard key={room._id} room={room} />
          ))}
        </div>
      )}

      {totalPages > 0 && (
        <div className="flex justify-center mt-8">
          <Pagination totalPages={totalPages} />
        </div>
      )}
    </div>
  )
}