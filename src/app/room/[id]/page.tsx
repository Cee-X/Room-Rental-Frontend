'use client';
import React, { useEffect, useState } from 'react'
import { getRoomById, RoomTopProps } from '../../service/action';
import ImageGallery from '@/app/ui/imageGallery';
import { MapPinIcon, StarIcon, CheckIcon, CalendarIcon } from '@heroicons/react/24/outline';
import { Button } from '@/app/utils/Button';
import { createBooking } from '../../service/action';
import { ExclamationCircleIcon, CheckCircleIcon, HomeModernIcon } from '@heroicons/react/24/outline'
import { PawPrint } from 'lucide-react';
import Link from 'next/link';

const Page = ({params}: {params: {id: string}}) => {
    const {id} = params;
    const [room, setRoom] = useState<RoomTopProps | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [bookingData , setBookingData] = useState({
            room: id,
            startDate: '',
            endDate: ''
        });
  
    useEffect(() => {
        const fetchRoom = async () => {
            try{
                const room = await getRoomById(id);
                setRoom(room);
                setLoading(false);
            }catch(error){
                console.error(error);
            }
        }
        fetchRoom();
    }, [id]);

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setBookingData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
            const response = await createBooking(bookingData);
            setSuccessMessage(response.message);

        }catch(error){
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
    return (
        <div className="min-h-screen bg-gray-100 ">
            {loading && <p className='flex justify-center items-center font-semibold text-md'>Loading...</p>}
            {/* Hero Section */}
            {room && (
                <>
                    <div className='relative w-full h-96 overflow-hidden'>
                        <div className='relative z-10 flex justify-center items-center px-24'>
                            <ImageGallery images={room.images} />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent">
                            <div className="absolute bottom-5 left-10 text-white">
                                <h1 className="text-4xl font-bold">{room.title}</h1>
                                <p className="text-xl">{room.address}{room.location}</p>
                            </div>
                        </div>
                    </div>
                    <div className="container mx-auto mt-10 px-6 md:px-12 lg:px-24">
                    <div className="flex flex-col md:flex-row gap-10 mb-4">
                        {/* Room Details */}
                        <div className="w-full md:w-2/3">
                            <h2 className="text-3xl font-semibold mb-4">Details</h2>
                            <p className="text-lg mb-6">{room.description}</p>
                            <div className="bg-white p-6 rounded-lg shadow-lg">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <h3 className="text-xl font-medium">Room no: {room.roomNumber}</h3>
                                        <p className="text-gray-600">Room size: {room.size}sqm</p>
                                        <p className="text-gray-600">Room type: {room.roomType}</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="flex items-center gap-1">
                                            <PawPrint className="h-5 w-5 text-green-500" />
                                            <div>{room.pets ? "Pets allowed" : "No pets"}</div>
                                        </div>
                                        <p className="text-yellow-500">Rating: {room.rating}/10</p>
                                    </div>
                                </div>

                            {/* Facilities */}
                            <h3 className="text-xl font-medium mb-4">Facilities</h3>
                            <div className="grid grid-cols-2 gap-4">
                                {room.amenities.map((facility, index) => (
                                    <div key={index} className="flex items-center">
                                        <CheckIcon className="h-5 w-5 text-green-500" />
                                        <span>{facility}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Booking Section */}
                    <div className="w-full h-fit md:w-1/3 bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">฿{room.price}/month</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700">Check-in</label>
                                <input 
                                type="date" 
                                className="w-full p-2 border rounded-lg cursor-pointer" 
                                name='startDate'
                                value={bookingData.startDate}
                                onChange={handleOnChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Check-out</label>
                                <input 
                                type="date" 
                                className="w-full p-2 border rounded-lg cursor-pointer"
                                name='endDate'
                                value={bookingData.endDate}
                                onChange={handleOnChange}
                                 />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Maximum: 2 guests</label>
                            </div>
                            <Button type='submit' className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">Book Now</Button>
                            <div
                            className="flex items-end space-x-1 mt-4"
                            aria-live="polite"
                            aria-atomic="true"
                            >
                            {errorMessage && (
                                <>
                                    <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                                    <p className="text-sm text-red-500">{errorMessage}</p>
                                </>
                            )}
                            {successMessage && (
                                <>
                                    <CheckCircleIcon className="h-5 w-5 text-green-500" />
                                    <p className="text-sm text-green-500">{successMessage}</p>
                                    <Button >
                                        <Link href="/profile/bookings">View Bookings</Link>
                                    </Button>
                                    </>
                            )}
                            </div>
                        </form>
                    </div>
                </div>
                </div>
                </>
            )}
        </div>
    )
}

export default Page;
