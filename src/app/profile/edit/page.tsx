'use client'
import { useState, useEffect } from "react";
import { ProfileProps, getProfile, updateProfile } from "@/app/service/action";
import { Button } from "@/app/utils/Button";
const Page = () => {
    const [profile, setProfile] = useState<ProfileProps | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [profilePic, setProfilePic] = useState<File | null>(null);
    const [updateUserData , setUpdateUserData] = useState({
        _id: profile?._id || '',
        name: profile?.name || '',
        email:profile?.email || '',
        phoneNumber: profile?.phoneNumber || ''
    });
    const fetchProfile = async () => {
        try{
            const profile = await getProfile();
            setProfile(profile);
            setUpdateUserData({
                _id: profile._id,
                name: profile.name,
                email: profile.email,
                phoneNumber: profile.phoneNumber
            });
            setProfilePic(profile.profilePic);
            setLoading(false);

        }catch(error){
            console.error(error);
        }
        }
    useEffect(() => {
        fetchProfile();
    }
    , []);


    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value, files} = e.target;
        setUpdateUserData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProfilePic(e.target.files?.[0] || null);
    }
   
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', updateUserData.name);
        formData.append('email', updateUserData.email);
        formData.append('phoneNumber', updateUserData.phoneNumber);
        if(profilePic){
            formData.append('profilePic', profilePic);
        }
        try{
            const response = await updateProfile(formData);
        }catch(error){
            console.error(error);
        }
        
    }
    if(loading){
        return <div>Loading...</div>
    }
  return (
    <div> 
        <div className="flex flex-col items-center max-w-sm md:max-w-md">
            <h1 className="text-md font-semibold"> Upadate User details</h1>
            <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                    <label
                        className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                        htmlFor="name"
                    >
                        Name
                    </label>
                    <div className="relative">
                        <input
                            className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-4 text-sm outline-2 placeholder:text-gray-500"
                            id="name"
                            type="text"
                            name="name"
                            value={updateUserData.name}
                            onChange={handleOnChange}
                        />
                    </div>
                </div>
                <div>
                    <label
                        className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                        htmlFor="email"
                    >
                        Email
                    </label>
                    <div className="relative">
                        <input
                            className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-4 text-sm outline-2 placeholder:text-gray-500"
                            id="email"
                            type="email"
                            name="email"
                            value={updateUserData.email}
                            onChange={handleOnChange}
                        />
                    </div>
                </div>
                <div>
                    <label
                        className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                        htmlFor="phoneNumber"
                    >
                        Phone number
                    </label>
                    <div className="relative">
                        <input
                            className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-4 text-sm outline-2 placeholder:text-gray-500"
                            id="phoneNumber"
                            type="text"
                            name="phoneNumber"
                            value={updateUserData.phoneNumber}
                            onChange={handleOnChange}
                        />
                    </div>
                </div>
                <div>
                    <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="profilePic">
                        Profile Picture
                    </label>
                    <div className="relative">
                        <input
                            className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-4 text-sm outline-2 placeholder:text-gray-500"
                            id="profilePic"
                            type="file"
                            name="profilePic"
                            onChange={handleFileChange}
                        />
                    </div>
                </div>
                <Button className='bg-[#00364D] w-full justify-center' type='submit'>Update</Button>
            </form>

        </div>
    </div>
  )
}

export default Page
