'use client';
import React from 'react'
import { deleteBooking } from '@/app/service/action'
import { 
    AlertDialog,
    AlertDialogTrigger, 
    AlertDialogContent, 
    AlertDialogHeader, 
    AlertDialogTitle, 
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction
 } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/hooks/use-toast';
import { AxiosError } from 'axios';

const BookingCancel = ({id}: {id : string}) => {
    const { toast } = useToast()
    const handleCancelBooking = async () => {
        try{
            await deleteBooking(id)
            toast({
                title: "Booking Cancelled",
                description: "Your booking has been successfully cancelled.",
              })
        }catch(error){
            if(error instanceof AxiosError){
                toast({
                    title: "Error",
                    description: error.response?.data.message,
                    variant: "destructive",
                  })
            }
        }
    }

  return (
    <div>
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive">Cancel Booking</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure you want to cancel this booking?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently cancel your booking.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>No, keep my booking</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleCancelBooking()}>
                        Yes, cancel booking
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    </div>
  )
}

export default BookingCancel
