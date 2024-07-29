'use client';
import React,{useState} from 'react'
import { deleteBooking } from '@/app/service/action'
import { AlertDialog, 
    AlertDialogTrigger, 
    AlertDialogPortal, 
    AlertDialogOverlay, 
    AlertDialogContent, 
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogCancel,
    AlertDialogAction,
 } from '@/app/utils/AlertDialog'
import { Button } from '@/app/utils/Button'


const BookingCancel = ({id}: {id : string}) => {
    
    const [success, setSuccess] = useState(false)
    const [open, setOpen] = useState(false)
    const [responseMessage, setResponseMessage] = useState('')

    const handleDeleteBooking = async () => {
        try{
            const response = await deleteBooking(id)
            if(response){
                setSuccess(true)
                setOpen(false)
            }
            setResponseMessage(response.message)
        }catch(error){
            console.error(error)
        }
    }
  return (
    <div>
        <AlertDialog open={open} onOpenChange={() => setOpen(!open)} >
            <AlertDialogTrigger>
                <Button className="bg-red-500 hover:bg-red-400">Cancel Booking</Button>
            </AlertDialogTrigger>
            <AlertDialogPortal>
                <AlertDialogOverlay  className='bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0'/>
                <AlertDialogContent>
                    <AlertDialogTitle >Cancel Booking</AlertDialogTitle>
                    <AlertDialogDescription>Are you sure you want to cancel this booking?</AlertDialogDescription>
                    <div className='flex justify-end gap-4'>
                        <AlertDialogCancel>
                            <Button className='text-blue-700 bg-white border hover:text-white border-slate-300'>Cancel</Button>
                        </AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteBooking}>
                            <Button className='bg-red-500 hover:bg-red-400'>Yes</Button>
                        </AlertDialogAction>
                    </div> 
                </AlertDialogContent>
            </AlertDialogPortal>
        </AlertDialog>
        {success && 
            <AlertDialog open={success} onOpenChange={() => setSuccess(!success)} >
                <AlertDialogPortal>
                    <AlertDialogOverlay  className='bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0'/>
                    <AlertDialogContent>
                        <AlertDialogTitle >Success</AlertDialogTitle>
                        <AlertDialogDescription className='text-green-500'>{responseMessage}</AlertDialogDescription>
                        <div className='flex justify-end gap-4'>
                            <AlertDialogAction>
                                <Button>Ok</Button>
                            </AlertDialogAction>
                        </div> 
                    </AlertDialogContent>
                </AlertDialogPortal>
            </AlertDialog>
        }
    </div>
  )
}

export default BookingCancel
