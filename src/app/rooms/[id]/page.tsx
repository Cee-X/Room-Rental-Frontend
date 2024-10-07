'use client';
import { useAuth } from '@/components/auth/AuthProvider';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CircleAlert, CircleCheck, Coffee, PawPrint, Star, Tv, User, Users, Wifi, Wind, XCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { formatDateToLocal } from '../../../lib/utils';
import { createBooking, getRoomById, RoomTopProps } from '../../service/action';


interface Review {
    _id: string;
    room: string;
    user : {
        _id: string;
        name: string;
    }
    rating: number;
    comment: string;
    createdAt: string;
}
const Page = ({params}: {params: {id: string}}) => {
    const router = useRouter();
    const { id } = params;
    const [roomData, setRoomData] = useState<RoomTopProps | null>(null);
    const [Reviews, setReviews] = useState<Review[]>([])
    const [loading, setLoading] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [guests, setGuests] = useState(1)
    const [currentImage, setCurrentImage] = useState(0)
    const [selectedDates, setSelectedDates] = useState<{from: Date; to: Date | undefined}>({
        from: new Date(),
        to: undefined,
      })

    useEffect(() => {
        const fetchRoom = async () => {
            try{
                const response = await getRoomById(id);
                setRoomData(response.room);
                setReviews(response.reviews);
                setLoading(false);
            }catch(error){
                console.error(error);
            }
        }
        fetchRoom();
    }, [id]);

    const { isAuthenticated } = useAuth();

    const handleBooking = async () => {
        if (!isAuthenticated) {
            router.push('/login');
            return;
        }

        if (!selectedDates.from || !selectedDates.to) {
            setErrorMessage('Please select booking dates.');
            return;
        }
        const bookingData = {
            room: id,
            startDate : selectedDates.from,
            endDate : selectedDates.to,
        };
        try {
            await createBooking(bookingData);
            setSuccessMessage('Booking successful! Check your bookings in the profile page.');
        } catch(error){
            if (typeof error === 'object' && error !== null && 'response' in error) {
                const axiosError = error as { response: { data: { message: string } } };
                if (axiosError.response && axiosError.response.data && axiosError.response.data.message) {
                  setErrorMessage(axiosError.response.data.message);
                } else {
                  setErrorMessage("An unexpected error occurred");
                }
              } else {
                setErrorMessage("An unexpected error occurred");
              }
        }
    }
    const renderStars = (rating: number) => {
        return Array(5).fill(0).map((_, i) => (
          <Star key={i} className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
        ))
      }

    return (
        <div className="min-h-screen bg-gray-50">
            
        {roomData && (
         <>
            <div className="relative">
            {/* Hero Section */}
                <div className="relative h-[70vh] min-h-[400px]">
                    <Image
                    src={roomData.images[4]}
                    alt={roomData.title}
                    layout="fill"
                    objectFit="cover"
                    priority
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
                        <div className="container mx-auto px-4 py-8 text-white">
                            <h1 className="text-4xl md:text-5xl font-bold mb-2">{roomData.title}</h1>
                            <p className="text-lg">{roomData.location}</p>
                        </div>
                    </div>
                </div>
   
            {/* Quick Info Bar */}
                <Card className="sticky top-0 z-10 -mt-16 mx-auto max-w-5xl shadow-lg">
                    <div className="flex flex-wrap items-center justify-between p-4">
                        <div className="flex items-center space-x-4">
                            <div className="text-2xl font-bold">${roomData.price} <span className="text-sm font-normal">per night</span></div>
                            <div className="flex items-center">
                                <Users className="w-5 h-5 mr-1" />
                                <span>Up to {roomData.capacity} guests</span>
                            </div>
                            <div className="flex items-center">
                                {roomData.pets ? (
                                    <span className="text-green-500 flex items-center">
                                    <PawPrint className="w-5 h-5 mr-1" /> Pets Allowed
                                    </span>
                                ) : (
                                    <span className="text-red-500 flex items-center">
                                    <XCircle className="w-5 h-5 mr-1" /> No Pets
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Wifi className="w-5 h-5" />
                            <Tv className="w-5 h-5" />
                            <Wind className="w-5 h-5" />
                        </div>
                    <Button size="lg" onClick={handleBooking}>Book Now</Button>
                    </div>
                </Card>
            </div>
    
            <div className="container mx-auto px-4 py-8">
            <Link href="/rooms">
                <Button variant="ghost" className="mb-4">
                    &larr; Back to Rooms
                </Button>
            </Link>
    
            <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                {/* Image Gallery */}
                <div className="mb-8">
                    <div className="aspect-video relative overflow-hidden rounded-lg mb-4">
                    <Image
                        src={roomData.images[currentImage]}
                        alt={`Room image ${currentImage + 1}`}
                        layout="fill"
                        objectFit="cover"
                    />
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                    {roomData.images.slice(0, 4).map((image, index) => (
                        <button
                        key={index}
                        className={`aspect-video relative overflow-hidden rounded-lg ${
                            index === currentImage ? 'ring-2 ring-primary' : ''
                        }`}
                        onClick={() => setCurrentImage(index)}
                        >
                        <Image
                            src={image}
                            alt={`Room thumbnail ${index + 1}`}
                            layout="fill"
                            objectFit="cover"
                        />
                        </button>
                    ))}
                    </div>
                </div>
   
                {/* Room Details Tabs */}
                <Tabs defaultValue="description" className="mb-8">
                    <TabsList>
                    <TabsTrigger value="description">Description</TabsTrigger>
                    <TabsTrigger value="amenities">Amenities</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                    </TabsList>

                    <TabsContent value="description">
                    <Card>
                        <CardHeader>
                        <CardTitle>About this room</CardTitle>
                        </CardHeader>
                        <CardContent>
                        <p>{roomData.description}</p>
                        <div className="mt-4 grid grid-cols-2 gap-4">
                            <div>
                            <strong>Room size:</strong> {roomData.size}
                            </div>
                            <div>
                            <strong>Max capacity:</strong> {roomData.capacity} guests
                            </div>
                        </div>
                        </CardContent>
                    </Card>
                    </TabsContent>

                    <TabsContent value="amenities">
                    <Card>
                        <CardHeader>
                        <CardTitle>Amenities</CardTitle>
                        </CardHeader>
                        <CardContent>
                        {Object.entries(roomData.amenities).map(([category, items]) => (
                            <div key={category} className="mb-4">
                            <h3 className="font-semibold mb-2">{category}</h3>
                            <ul className="grid grid-cols-2 gap-2">
                                {items.map((item, index) => (
                                <li key={index} className="flex items-center">
                                    <Coffee className="w-4 h-4 mr-2" />
                                    {item}
                                </li>
                                ))}
                            </ul>
                            </div>
                        ))}
                        </CardContent>
                    </Card>
                    </TabsContent>

                    <TabsContent value="reviews">
                    <Card>
                        <CardHeader>
                        <CardTitle>Guest Reviews</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {Reviews.length > 0 ? ( Reviews.map((Review) => (
                                <div key={Review._id} className="mb-4 pb-4 border-b last:border-b-0">
                                    <div className="flex items-center mb-2">
                                    <Avatar className="h-10 w-10 mr-2">
                                        <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${Review.user}`} />
                                        <AvatarFallback><User /></AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="font-semibold">{Review.user.name}</div>
                                        <div className="text-sm text-gray-500">{formatDateToLocal(Review.createdAt)}</div>
                                    </div>
                                    <div className="ml-auto flex">
                                        {renderStars(Review.rating)}
                                    </div>
                                    </div>
                                    <p className="text-gray-700">{Review.comment}</p>
                                </div>
                                ))
                            ) : (
                                <p>No reviews yet</p>
                            )
                            }
                        </CardContent>
                    </Card>
                    </TabsContent>
                </Tabs>
                </div>
    
                <div>
                {/* Booking Form */}
                <Card>
                    <CardHeader>
                    <CardTitle>Book Your Stay</CardTitle>
                    </CardHeader>
                    <CardContent>
                    <form onSubmit={(e) => { e.preventDefault(); handleBooking(); }} className="space-y-4">
                        <div>
                        <Label htmlFor="dates">Select Dates</Label>
                        <Calendar
                            mode="range"
                            selected={selectedDates}
                            onSelect={setSelectedDates as any}
                            className="rounded-md border"
                        />
                        </div>
                        <div>
                        <Label htmlFor="guests">Number of Guests</Label>
                        <div className="flex items-center">
                            <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => setGuests(Math.max(1, guests - 1))}
                            >
                            -
                            </Button>
                            <Input
                            id="guests"
                            type="number"
                            value={guests}
                            onChange={(e) => setGuests(Number(e.target.value))}
                            min={1}
                            max={roomData.capacity}
                            className="w-20 mx-2 text-center"
                            />
                            <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => setGuests(Math.min(roomData.capacity, guests + 1))}
                            >
                            +
                            </Button>
                            <Users className="ml-2" />
                            <span className="ml-1">Max {roomData.capacity}</span>
                        </div>
                        </div>
                        <Button type="submit" className="w-full">
                            Book Now - ${roomData.price} / night
                        </Button>
                        <div
                            className="flex items-center space-x-2 mt-4"
                            aria-live="polite"
                            aria-atomic="true"
                            >
                            {errorMessage && (
                                <>
                                    <CircleAlert className="h-5 w-5 text-red-500" />
                                    <p className="text-sm text-red-500">{errorMessage}</p>
                                </>
                            )}
                            {successMessage && (
                                <>
                                    <CircleCheck className="h-5 w-5 text-green-500" />
                                    <p className="text-sm text-green-500">{successMessage}</p>
                                    <Button variant="outline" size="sm">
                                         <Link href='/profile/bookings'>View Rooms</Link>
                                    </Button>
                                </>
                            )}
                        </div>
                    </form>
                    </CardContent>
                </Card>
                </div>
            </div>
            </div>
            </>
    )}
      </div>
    )
}

export default Page;
