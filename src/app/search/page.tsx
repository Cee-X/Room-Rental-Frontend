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
    <div>
      <div className="flex flex-col items-center my-6 gap-4">
        <h1 className=" text-xl sm:text-2xl md:text-3xl font-bold ">Search for an offer</h1>
        <p className="text-sm sm:text-xl">Choose from the most advantageous offers</p>
      </div>
 
      <div className="">
        <SearchForm OnSearch={handleSearch} />
      </div>
      <div className="flex flex-col sm:flex sm:flex-row sm:justify-between justify-center gap-10 mt-10 p-10">
        { searched && rooms.length == 0 ?(
          <p className="text-lg font-semibold">No room found</p>
          ) :
          (rooms.map((room: RoomProps) => (
            <Link href={`/room/${room._id}`} key={room._id}>
              <Card key={room._id} className="w-auto">
                <Image src={room.images} alt="room" width={350} height={220} />
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
