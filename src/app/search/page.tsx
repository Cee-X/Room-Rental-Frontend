'use client'
import SearchForm from "../ui/searchForm"
import { useState } from 'react'
import { RoomProps } from "../service/action"
import { Card, CardTitle, CardDescription, CardLocation, CardPrice } from "../utils/Card"
import Image from "next/image"
import Link from "next/link"
const Page = () => {
  const [rooms, setRooms] = useState<RoomProps[]>([]) 
  const [searched, setSearched] = useState(false)

  const handleSearch = (response: RoomProps[]) => {
    setRooms(response)
    setSearched(true)
  }
  return (
    <div className="">
      <div className="flex flex-col items-center my-6 gap-4">
        <h1 className=" text-xl sm:text-2xl md:text-3xl font-bold ">Search for an offer</h1>
        <p className="text-sm sm:text-xl">Choose from the most advantageous offers</p>
      </div>
 
      <div className="">
        <SearchForm OnSearch={handleSearch} />
      </div>
      <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-10 px-10  md:px-24">
        { searched && rooms.length == 0 ?(
          <p className="text-lg font-semibold">No room found</p>
          ) :
          (rooms.map((room: RoomProps) => (
            <Link href={`/room/${room._id}`} key={room._id} className="w-full">
              <Card key={room._id} className="w-full">
                <div className="w-full h-56 relative">
                   <Image src={room.images} alt="room" fill style={{objectFit: 'cover'}} sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"  />
                </div>
                <CardTitle>{room.title}</CardTitle>
                <CardDescription>{room.description}</CardDescription>
                <CardPrice>${room.price} / month</CardPrice>
                <CardLocation>{room.location}</CardLocation>
              </Card>
            </Link>
            ))
          ) 
        }
      </div>
    </div>
  )
}

export default Page
