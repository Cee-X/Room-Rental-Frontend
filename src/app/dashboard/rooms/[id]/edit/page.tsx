'use client'
import { EditRoomProps, getRoomById } from "@/app/service/action"
import EditRoom from "@/components/dashboard/edit-room"
import { useEffect, useState } from 'react'
const Page = ({params}: {params : {id : string}}) => {
  const {id} = params;
  const [room, setRoom] = useState<EditRoomProps | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  
    useEffect(() => {
      const fetchRoom = async () => {
        try {
          const response = await getRoomById(id);
          setRoom(response.room);
          setLoading(false);
        } catch (error) {
          console.error(error);
        }
      }
      fetchRoom();
    }, [id]);
  if (loading) {
    return <p>Loading...</p>
    }
  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
     {room && <EditRoom room={room} />}
    </div>
  )
}

export default Page
