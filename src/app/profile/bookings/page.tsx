'use client'
import { getBookings } from '@/app/service/action'
import BookingSkeleton from '@/components/profile/BookingSkeleton'
import getBookingStatus from '@/app/utils/getBookingStatus'
import BookingCancel from '@/components/profile/bookingCancel'
import CreateReview from '@/components/profile/createReview'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarX } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
interface UserBookingProps {
  _id: string;
  room: {
    _id: string;
    title: string;
    capacity: number;
  };
  startDate: string; // Assuming these are strings, adjust if they are Date objects
  endDate: string;
  status: 'active' | 'upcoming' | 'completed'; // Add the status property
}
export default function BookingsPage() {
  const [bookings, setBookings] = useState<UserBookingProps[]>([])
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUserBookings = async () => {
      try {
        const response = await getBookings()
        const bookingsWithStatus = response.map((booking : UserBookingProps
        ) => ({
          ...booking,
          status : getBookingStatus(new Date(booking.startDate), new Date(booking.endDate))
        })
        )
        setBookings(bookingsWithStatus)
        setLoading(false)
      }catch(error){
        console.error(error)
      }
    }
    fetchUserBookings()
  }, [])



  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-yellow-500'
      case 'upcoming': return 'bg-blue-500'
      case 'completed': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Bookings</h1>
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Bookings</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        {['all','active', 'upcoming', 'completed'].map((tab) => (
          <TabsContent key={tab} value={tab}>
            <div className="grid gap-4">
              {loading ? (
                  <BookingSkeleton />
                ) : (
                  <>
                    {bookings.filter(booking => tab === 'all' || booking.status === tab).length === 0 ? (
                      <Card>
                        <CardContent className="flex flex-col items-center justify-center py-10">
                          <CalendarX className="w-16 h-16 text-gray-400 mb-4" />
                          <p className="text-xl font-semibold text-gray-700">No bookings found</p>
                          <p className="text-gray-500 mt-2">You don&apos;t have any {tab !== 'all' ? tab : ''} bookings at the moment.</p>
                        </CardContent>
                      </Card>
                    ) : (
                      bookings
                        .filter(booking => tab === 'all' || booking.status === tab)
                        .map((booking : UserBookingProps) => (
                          <Card key={booking._id}>
                            <CardHeader>
                              <CardTitle>{booking.room.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="flex justify-between items-center">
                                <div>
                                  <p>Check-in: {new Date(booking.startDate).toLocaleDateString()}</p>
                                  <p>Check-out: {new Date(booking.endDate).toLocaleDateString()}</p>
                                  <p>Guests: {booking.room.capacity}</p>
                                </div>
                                <Badge className={getStatusColor(booking.status)}>
                                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                </Badge>
                              </div>
                              <div className="mt-4 flex">
                                <Link href={`/rooms/${booking.room._id}`}>
                                <Button variant="outline" className="mr-2">View Details</Button>
                                </Link>
                                {booking.status === 'upcoming' && (
                                  <BookingCancel id={booking._id} />
                                )}
                                {booking.status === 'completed' && (
                                  <CreateReview id={booking.room._id} />
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        ))
                    )}
                  </>
                )
              }
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}