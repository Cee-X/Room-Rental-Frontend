'use client'
import { getRoomById, EditRoomProps } from "@/app/service/action"
import EditRoom from "@/app/ui/dashboard/edit-room"
import React, {useState, useEffect} from 'react'
const Page = ({params}: {params : {id : string}}) => {
  const {id} = params;
  const [room, setRoom] = useState<EditRoomProps | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const fetchRoom = async () => {
    try {
      const room = await getRoomById(id);
      setRoom(room);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }
    useEffect(() => {
        fetchRoom();
    }, [id]);
  if (loading) {
    return <p>Loading...</p>
    }
  return (
    <div>
     {room && <EditRoom room={room} />}
    </div>
  )
}

export default Page
