'use client';
import { getProfile, ProfileProps } from "../service/action"
import { useEffect, useState } from "react";
import { UserIcon } from "@heroicons/react/24/outline";
import { UpdateUser } from "../utils/Button";
import Image from "next/image";
const Page = () => {
    const [profile, setProfile] = useState<ProfileProps | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchProfile = async () => {
        try{
            const profile = await getProfile();
            setProfile(profile);
            setLoading(false);
        }catch(error){
            console.error(error);
        }
        }
    useEffect(() => {
        fetchProfile();
    }
    , []);
    if(loading){
        return <div>Loading...</div>
    }
  return (
    <div>
        <h1 className="text-md font-semibold mb-3">User details</h1>
        <div className="flex flex-col gap-4 items-center max-w-sm md:max-w-md">
            <div className="p-6 w-full bg-white rounded-xl  shadow-md hover:shadow-2xl flex items-center">
                <div className="shrink-0">
                    {profile?.profilePic ? (
                        <div className="h-12 w-12 rounded-full overflow-hidden">
                            <Image width={12} height={12} className="h-12 w-12" src={profile.profilePic} alt="ChitChat Logo" />
                        </div>
                    ) : (
                        <UserIcon className="h-12 w-12" />
                    )    
                    }
                </div>
                <div className="ml-2">
                    <div className="text-md font-medium">Name</div>
                    <p className="text-md text-slate-700">{profile?.name}</p>
                </div>
                <div className="ml-auto  rounded-md hover:bg-gray-100 p-2">
                    <UpdateUser />
                </div>
            </div>
            <div className="p-6 w-full  bg-white rounded-xl shadow-md hover:shadow-2xl flex items-center ">
                <div>
                    <div className="text-md font-medium ">Email</div>
                    <p className="text-slate-700 text-md">{profile?.email}</p>
                </div>
                <div className="ml-auto  rounded-md hover:bg-gray-100 p-2">
                    <UpdateUser />
                </div>
            </div>
            <div className="p-6 w-full  bg-white rounded-xl shadow-md hover:shadow-2xl flex items-center">
                <div>
                    <div className="text-md font-medium">Phone number</div>
                    <p className="text-slate-700 text-md">{profile?.phoneNumber}</p>
                </div>
                <div className="ml-auto rounded-md hover:bg-gray-100 p-2">
                    <UpdateUser />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Page

