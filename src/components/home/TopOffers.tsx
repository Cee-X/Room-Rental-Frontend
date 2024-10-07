'use client'
import { useEffect, useState } from 'react';
import { getTopOfferRooms, RoomProps } from "@/app/service/action";
import CardSkeleton from "@/components/room/CardSkeleton";
import RoomCard from "@/components/room/RoomCard";
const TopOffers = () => {
  const [topOfferRooms, setTopOfferRooms] = useState([]) // [1,2,3,4,5,6,7,8,9,10]
  const [loading, setLoading] = useState(true);
  const fetchTopOffers = async () => {
    try{
        const response = await getTopOfferRooms()
        setTopOfferRooms(response)
        setLoading(false)
    }catch(error){  
        setLoading(false)
    }
  }
  useEffect(() => {
    fetchTopOffers()
  }, [])

  return (
    <section className="py-12 md:py-16 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Top Offer Rooms</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              { loading ? (
                <>
                  {Array.from({ length: 3 }).map((_, index) => (
                    <CardSkeleton key={index} />
                  ))}
                </>
              ) : 
              ( topOfferRooms.length > 0 ? (
                topOfferRooms.map((room : RoomProps) => (  
                  <RoomCard key={room._id} room={room} />
                ))
              ) : (
                <div className="col-span-full text-center">
                  <p className="text-lg text-gray-600">No top offer rooms available at the moment.</p>
                </div>
              ))
            }
            </div>
          </div>
        </section>
  )
}

export default TopOffers
