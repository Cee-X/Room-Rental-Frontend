import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from "next/image";

const ImageGallery = ({images}:{images:string[]}) => {
  return (
    <Carousel className="w-full">
      <CarouselContent className="-ml-1 ">
        {images.map((image, index) => {
          const isFirstChild = index === 0
          const isLastChild = index === images.length - 1

          const borderRadius = isFirstChild
            ? "rounded-l-lg"
            : isLastChild
            ? "rounded-r-lg"
            : ""
          return (
          <CarouselItem key={index} className={`pl-1 w-full md:basis-1/2 lg:basis-1/3 ` }>
            <div className={`relative flex-1 p-1 h-60 w-full flex aspect-square items-center justify-center border-slate-300  overflow-hidden  rounded-lg`}>
              <Image
                src={image} // Replace with your image paths
                layout="fill"
                objectFit="cover"
                alt={`Image ${index + 1}`}
              />
            </div>
          </CarouselItem>
        )
    })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

export default ImageGallery
