'use client'
import { Card,CardTitle, CardDescription, CardPrice, CardLocation } from "../utils/Card"
import { Button } from "../utils/Button"
import { useState, useEffect } from 'react'
import Image from "next/image"
import { getTopOfferRooms, RoomProps } from "../service/action"
import Link from "next/link"
import { ImageGallery } from "../ui/profile/imageGallery"
const TopOffers = () => {
  const [rooms, setRooms] = useState([]) // [1,2,3,4,5,6,7,8,9,10]
  const fetchTopOffers = async () => {
    try{
        const response = await getTopOfferRooms()
        setRooms(response)
    }catch(error){  
        console.log(error)
    }
  }
  useEffect(() => {
    fetchTopOffers()
  }, [])

  return (
    <div className="p-6 md:p-16 ">
        <h2 className="text-3xl font-bold text-gray-900">Top Offers</h2>
        <p className="mt-2 text-lg text-gray-600">Prime rooms near the university, tailored for students seeking convenience and comfort.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-6 mt-10">
          {rooms? rooms.map((room: RoomProps) => (
              <Card key={room._id} className='w-full max-w-sm bg-[#E3F2FD] rounded-lg shadow-lg hover:shadow-xl hover:bg-[#BBDEFB] transition-all duration-200'>
                  <div className='w-full'>
                    <ImageGallery images={room.images} />
                  </div>
                  <CardTitle className="mt-4">{room.title}</CardTitle>
                  <CardPrice >${room.price}</CardPrice>
                  <CardLocation>{room.location}</CardLocation>
                  <div className='px-3 mb-3'>
                    <Button className="bg-orange-500 hover:bg-orange-600">
                      <Link href={`/room/${room._id}`}>View</Link>
                    </Button>
                  </div>
          </Card>
          ))
          : <p>Loading....</p>}
        </div>
    </div>
  )
}

export default TopOffers
