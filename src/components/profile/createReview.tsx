
import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Star } from 'lucide-react'
import { useToast } from '@/components/hooks/use-toast';
import { createReview } from '@/app/service/action';
import { AxiosError } from 'axios';

const CreateReview = ({ id } : {id : string}) => {
    const [newReview , setNewReview ] = useState({
        room : id,
        rating : 0,
        comment : ''
    })
    const { toast } = useToast()
    const handleReviewChange = (e : React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewReview({...newReview, [e.target.name] : e.target.value})
    }
    const handleSubmitReview = async () => {
       try {
            await createReview(newReview)
            toast({
                title: "Review Submitted",
                description: "Your review has been successfully submitted.",
              })
            setNewReview({
                room : '',
                rating : 0,
                comment : ''
            })
       } catch (error) {
            if(error instanceof AxiosError){
                toast({
                    title: "Error",
                    description: error.response?.data.message,
                    variant: "destructive",
                  })
            }
       }
    }

    const handleRatingChange = (rating: number) => {
        setNewReview(prev => ({ ...prev, rating }))
      }

    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button>Write Review</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Write a Review</DialogTitle>
                        <DialogDescription>
                            Share your experience about your stay.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="flex items-center space-x-2">
                            <Label htmlFor="rating">Rating:</Label>
                            <div className="flex space-x-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                key={star}
                                type="button"
                                onClick={() => handleRatingChange(star)}
                                className={`text-2xl ${star <= newReview.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                >
                                    <Star fill={star <= newReview.rating ? 'currentColor' : 'none'} />
                                </button>
                                ))}
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="comment">Comment</Label>
                            <Textarea
                            id="comment"
                            name="comment"
                            value={newReview.comment}
                            onChange={handleReviewChange}
                            rows={3}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button 
                        onClick={() => {
                            handleSubmitReview()
                        }}>
                            Submit Review
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
export default CreateReview
