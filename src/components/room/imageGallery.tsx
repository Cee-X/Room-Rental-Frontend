import * as React from "react"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"

export const ImageGallery = ({ images }: { images: string[] }) => {
   
    return (
        <Carousel>
            <CarouselContent>
                {images.map((image, index) => (
                    <CarouselItem key={index} className="w-full h-40 relative">
                        <Image src={image} alt="room" layout="fill" objectFit="cover"/>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="left-1"/>
            <CarouselNext className="right-1"/>

        </Carousel>
    )
}