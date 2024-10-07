'use client'
import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Star } from 'lucide-react'
import { getReviews } from '@/app/service/action'
interface Room {
  _id: string;
  title: string;
}
interface Review {
  _id: string;
  comment: string;
  createdAt: string;
  rating: number;
  room : Room; 
}

export default function ReviewPage() {
  const [reviews, setReviews] = useState<Review[]>([])

  const fetchReviews = async () => {
    try {
      const review =  await getReviews()
      setReviews(review)
    } catch (error) {
      console.error(error)
      
    }
  }
  useEffect(() => {
    fetchReviews()
  }
  , [])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Reviews</h1>
      <h2 className="text-2xl font-bold mb-4">Your Past Reviews</h2>
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-10">
              <Star className="w-16 h-16 text-gray-400 mb-4" />
              <p className="text-xl font-semibold text-gray-700">No reviews found</p>
              <p className="text-gray-500 mt-2">You haven&apos;t written any reviews yet.</p>
            </CardContent>
          </Card>
        ) : (
          reviews.map(review => (
            <Card key={review._id}>
              <CardHeader>
                <CardTitle>{review.room.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      className={`${star <= review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill={star <= review.rating ? 'currentColor' : 'none'}
                    />
                  ))}
                </div>
                <p>{review.comment}</p>
                <p className="text-sm text-gray-500 mt-2">Reviewed on {review.createdAt}</p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}