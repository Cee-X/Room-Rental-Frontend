'use client'
import React, {useEffect, useState} from 'react'
import { RoomTopProps, getRooms } from '../service/action';
import { Card,CardLocation, CardPrice, CardTitle } from '../utils/Card';
import Link from 'next/link'
import Pagination from '../ui/dashboard/pagination';
import { Button } from '../utils/Button'
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectScrollDownButton,
    SelectItem
} from '../utils/Select';
import { 
  Popover,
  PopoverTrigger,
  PopoverContent
 } from '@/components/ui/popover'
import { Slider } from '@/components/ui/slider';
import { ImageGallery } from '../ui/profile/imageGallery';
import { AdjustmentsVerticalIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
const Page = ({searchParams}: {
    searchParams? :{
    query? : string;
    page? : string;
    }
}) => {
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    console.log(query);
    console.log(currentPage);
    const [priceMin, setPriceMin] = useState<number>(0);
    const [priceMax, setPriceMax] = useState<number>(10000);
    const [keyword, setKeyword] = useState(''); 
    const [sort, setSort] = useState('price:asc');
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(0);
    const [isPopoverOpen , setIsPopoverOpen] = useState(false);
    
    const fetchRooms = async() => {
        try{
            const response = await getRooms(query, currentPage);
            setRooms(response.rooms);
            setTotalPages(response.totalPages);
            setLoading(false);
        }catch(error){
            console.error(error);
        }
    }
    useEffect(() => {
        fetchRooms();
    }, [query, currentPage]);

    const handleSearch = async (e : React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if(priceMin) params.append('priceMin', priceMin.toString());
        if(priceMax) params.append('priceMax', priceMax.toString());
        if(keyword) params.append('keyword', keyword);
        if(sort) params.append('sort', sort); 
        const query = params.toString();
        try{
            setLoading(true);
            const response = await getRooms(query, currentPage);
            setRooms(response.rooms);
            setTotalPages(response.totalPages);
            setLoading(false);
        }catch(error){
            console.error(error);
        }
    }
    if(loading){
        return(
        <div className="flex justify-center items-center h-screen bg-gradient-to-br from-[#E0F7FA] to-[#B3E5FC]">
          <p className="text-[#0D47A1]">Loading...</p>
        </div>
            
        )
    }
  if(!rooms){
    return(
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-[#E0F7FA] to-[#B3E5FC]">
        <p className="text-[rgb(13,71,161)]">No room found</p>
      </div>
    ) 
  }
  return (
    <div className=' min-h-screen'>
      <form onSubmit={handleSearch} className='bg-gradient-to-br from-blue-100 to-blue-200 py-4'>
            <div className="flex gap-2 justify-center">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by location"
                  className="bg-white px-4 py-2 border  border-[#90CAF9] outline-2 placeholder:text-gray-400 rounded-full w-64"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
                <MagnifyingGlassIcon className="absolute top-1/2 right-3 h-5 w-5 text-gray-400 transform -translate-y-1/2" />
              </div>
              <div className='flex justify-center items-center'>
                <Popover open= {isPopoverOpen} onOpenChange={() => setIsPopoverOpen}>
                  <PopoverTrigger onClick={() => setIsPopoverOpen(true)}>
                    <AdjustmentsVerticalIcon className="h-6 w-6 text-gray-500" /> 
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="text-sm">
                        <div className='font-semibold'>Filter by Price</div>
                        <div className='space-y-2 mt-4'>
                          <div>Min Price- {priceMin}</div>
                          <Slider min={0} max={10000} value={[priceMin]} onValueChange={([value]) => setPriceMin(value)} />
                        </div>
                        <div className='space-y-2 mt-4'>
                          <div>Max Price- {priceMax}</div>
                          <Slider min={0} max={30000} value={[priceMax]} onValueChange={([value]) => setPriceMax(value)}/>
                        </div>
                        <div className='mt-4'>
                          <Select value={sort} onValueChange={setSort}>
                            <SelectTrigger className="bg-white border-[#90CAF9] rounded-full">
                              <SelectValue placeholder="Sort" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectScrollDownButton />
                              <SelectItem value="price:asc">ASC</SelectItem>
                              <SelectItem value="price:des">DES</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className='mt-4 flex justify-center items-center'>
                          <Button 
                          className='bg-[#66BB6A] flex justify-center items-center text-white px-6 py-2 rounded-full w-full hover:bg-[#388E3C]'
                          onClick={() => setIsPopoverOpen(false)}
                          >
                            Apply
                          </Button>
                         </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <Button className="bg-[#66BB6A] text-white px-6 py-2 rounded-full hover:bg-[#388E3C]">
                Search
              </Button>
            </div>
      </form>
  
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-6 mt-10 px-10 md:px-24">
          {rooms?.length == 0 ?(
            <p className="text-lg font-semibold">No room found</p>
            ) :
            (rooms?.map((room: RoomTopProps) => (
                <Card key={room._id} className='w-full max-w-sm bg-[#E3F2FD] rounded-lg shadow-lg hover:shadow-xl hover:bg-[#BBDEFB] transition-all duration-200'>
                  <div className='w-full'>
                    <ImageGallery images={room.images} />
                  </div>
                  <CardTitle className='mt-4'>{room.title}</CardTitle>
                  <CardPrice>฿{room.price}</CardPrice>
                  <CardLocation>{room.location}</CardLocation>
                  <div className='px-3 mb-3'>
                    <Button className='bg-orange-500 hover:bg-orange-600'>
                      <Link href={`/room/${room._id}`}>View</Link>
                    </Button>
                  </div>
                </Card>
              ))
            ) 
          }
        </div>
        {
          rooms && (
            <div className="flex justify-center mt-10">
              <Pagination totalPages={totalPages} />
            </div>
          )
        }
  </div>
  )
}

export default Page
