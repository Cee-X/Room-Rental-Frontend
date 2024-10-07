import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ImageGallery } from "@/components/room/imageGallery"
import { RoomProps } from "@/app/service/action"

const RoomCard = ({ room }: { room: RoomProps }) => {
  return (
    <Card key={room._id} className="flex flex-col h-full">
        <CardHeader>
            <CardTitle>{room.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
            <ImageGallery images={room.images} />
            <p className="text-lg font-semibold mt-3">฿{room.price}/month</p>
            <p className="text-lg font-semibold">{room.location}</p>
        </CardContent>
        <CardFooter>
            <Link href={`/rooms/${room._id}`} className='w-full'>
                <Button className="w-full">
                    Book Now
                </Button>
            </Link>
        </CardFooter>
    </Card>

  )
}

export default RoomCard