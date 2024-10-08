'use client';
import React from 'react'
import { useState, useEffect } from 'react';
import { getBookings, UserBookingProps } from '@/app/service/action';
import { Card, CardDescription, CardTitle, CardLocation, CardPrice } from '@/app/utils/Card';
import { ImageGallery } from '@/app/ui/profile/imageGallery';
import BookingCancel from '@/app/ui/profile/bookingCancel';

const Page = () => {
   const [bookings, setBookings] = useState([]);
   const [loading, setLoading] = useState(true);

   const fetchUserBookings = async () => {
      try{
          const response = await getBookings();
          setBookings(response);
          setLoading(false);
      }catch(error){
          console.error(error);
      }
   }

    useEffect(() => {
        fetchUserBookings();
    }, []);

  return (
    <div>
      <h1 className="text-md font-semibold">Bookings</h1>
      <div className='mt-6 md:mt-10'>
        {bookings.length === 0 && <p className='text-md font-semibold'>No bookings found</p>}
        {loading ? <p>Loading...</p> : (
          <div className='flex md:justify-start justify-center flex-wrap items-center gap-6'>
            {bookings.map((booking: UserBookingProps) => (
              <Card key={booking._id} className='w-full max-w-xs  bg-[#E3F2FD] rounded-lg shadow-lg hover:shadow-xl hover:bg-[#BBDEFB] transition-all duration-200'>
                <div className='w-full'>
                  <ImageGallery images={booking.room.images} />
                </div>
                <CardTitle className='text-[#0D47A1]'>{booking.room.title}</CardTitle>
                <CardPrice className='text-gray-500'>${booking.totalPrice}</CardPrice>
                <CardDescription className='text-gray-500'>{new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}</CardDescription>
                <CardLocation className='text-gray-500'>{booking.room.location}</CardLocation>
                <div className='px-3 py-2'>
                  <BookingCancel id={booking._id}/>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Page;
