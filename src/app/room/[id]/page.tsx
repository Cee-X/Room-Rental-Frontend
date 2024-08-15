'use client';
import React, { useEffect, useState } from 'react'
import { getRoomById, RoomTopProps } from '../../service/action';
import ImageGallery from '@/app/ui/imageGallery';
import {MapPinIcon, StarIcon, CheckIcon } from '@heroicons/react/24/outline'
import { Button } from '@/app/utils/Button';
import { createBooking } from '../../service/action';
import { ExclamationCircleIcon, CheckCircleIcon } from '@heroicons/react/24/outline'
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
        <div className=' md:px-24 md:py-14 p-10 sm:p-16'>
            {loading && <p>Loading...</p>}
            {room && (
                <div>
                    <div className='flex justify-center items-center'>
                        <ImageGallery images={room.images} />
                    </div>
                    <div className=' grid grid-cols-1 md:grid-cols-2 md:items-start items-center md:justify-start justify-center'>
                        <div className=''>
                            <div className='flex flex-col justify-start my-5'>
                                <h1 className='font-bold text-xl sm:text-lg md:text-2xl '>{room.title}</h1>
                                <p className='font-light text-sm sm:text-xl tracking-tight'>{room.description}</p>
                            </div>

                            <div className='lg:mt-10 md:mt-5 mt-3'>
                                <h1 className='font-bold text-xl sm:text-lg md:text-2xl '>VIP Dormitory Type A</h1>
                                <h1 className='font-bold text-xl sm:text-lg md:text-2xl '>Street No. #165 Building #4</h1>
                                <div className='flex items-center gap-3 my-4'>
                                    <Button className='bg-[#00364D] '>woman</Button>
                                    <div className='flex gap-1'>
                                        <MapPinIcon className="h-5 w-5" />
                                        <p className='font-semibold text-sm'>{room.location}</p>
                                    </div>
                                    <div className='flex gap-1'>
                                        <StarIcon className="h-5 w-5" />
                                        <p className='font-semibold text-sm'>{room.rating}</p>
                                    </div> 
                                </div>
                                <p className='text-sm font-semibold mb-4'>฿{room.price}<span className='inline font-light'>/month</span></p>   
                            </div>

                          <div className='border-slate-300 rounded-lg shadow-lg p-4 inline-block' >
                                <h3 className='text-lg font-semibold'>Facilities</h3>
                                <div className='flex flex-row gap-4 mt-4'>
                                    {room.amenities.map((amenity, index) => (
                                        <div key={index} className='flex gap-1'>
                                            <CheckIcon className="h-5 w-5" />
                                            <p className='text-sm font-semibold'>{amenity}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className='mt-10 '>
                            <h1 className='font-bold text-lg sm:text-2xl md:text-3xl '>Booking</h1>
                            <div className=' mt-4'>
                                <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
                                    <div className='flex flex-col gap-1'>
                                        <label htmlFor='startDate' className='text-sm font-semibold'>Start Date</label>
                                        <input type='date' id='startDate' name='startDate'  value={bookingData.startDate} onChange={handleOnChange} className='border border-slate-300 rounded-lg p-2' />
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                        <label htmlFor='endDate' className='text-sm font-semibold'>End Date</label>
                                        <input type='date' id='endDate' name='endDate' value={bookingData.endDate} onChange={handleOnChange} className='border border-slate-300 rounded-lg p-2' />
                                    </div>
                                   
                                    <Button className='bg-[#00364D] justify-center' type='submit'>Book Now</Button>
                                    <div
                                        className="flex h-8 items-end space-x-1"
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
                                            </>
                                        )}
                                        </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            
        </div>
    )
}

export default Page;
