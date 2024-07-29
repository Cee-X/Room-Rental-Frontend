'use client'
import { Card,CardTitle, CardDescription, CardPrice, CardLocation } from "../utils/Card"
import { Button } from "../utils/Button"
import { useState, useEffect } from 'react'
import Image from "next/image"
import { getTopOfferRooms, RoomProps } from "../service/action"
import Link from "next/link"
const TopOffers = () => {
  const [offers, setOffers] = useState([]) // [1,2,3,4,5,6,7,8,9,10]
  const fetchTopOffers = async () => {
    try{
        const response = await getTopOfferRooms()
        setOffers(response)
    }catch(error){  
        console.log(error)
    }
  }
  useEffect(() => {
    fetchTopOffers()
  }, [])

  return (
    <div>
      <div className="flex justify-between">
        <div className=" flex-grow-0">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">Top Offers</h1>
            <p className="text-sm  md:text-xl  font-light">Prime rooms near the university, tailored for students seeking convenience and comfort.</p>
        </div>
        <div className="flex-shrink-0">
            <Button className="">View All Offers</Button>
        </div>
      </div>
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-10">
        {offers? offers.map((offer: RoomProps) => (
          <Link href={`/room/${offer._id}`} key={offer._id}>
            <Card key={offer._id} className="w-full">
                <div className="w-full h-56 relative">
                  <Image src={offer.images} alt="room" layout="fill" objectFit="cover"/>
                </div>
                <CardTitle>{offer.title}</CardTitle>
                <CardDescription>{offer.description}</CardDescription>
                <CardPrice>${offer.price} / month</CardPrice>
                <CardLocation>{offer.location}</CardLocation>
            </Card>
          </Link>
        ))
        : <p>Loading....</p>}
      </div>
    </div>
  )
}

export default TopOffers
