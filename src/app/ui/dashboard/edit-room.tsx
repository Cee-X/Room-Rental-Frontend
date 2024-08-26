'use client'
import { EditRoomProps, updateRoom } from '@/app/service/action'
import React,{useState} from 'react'
import { ExclamationCircleIcon, CheckCircleIcon } from '@heroicons/react/24/outline'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
const EditRoom = ({room}: {room: EditRoomProps}) => {
  const [formData, setFormData] = useState<EditRoomProps>({
    _id: room._id,
    title: room.title,
    roomNumber: room.roomNumber,
    roomType: room.roomType,
    description: room.description,
    price: room.price,
    capacity: room.capacity,
    size: room.size,
    pets: room.pets,
    location: room.location,
    address: room.address,
    images: room.images,
    amenities: room.amenities,
    rating: room.rating,
    isTopOffer: room.isTopOffer,
    status: room.status
  });
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const handleChange = (e: React.ChangeEvent) => {
    const {name, value, type, checked} = e.target as HTMLInputElement;
    setFormData((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked :( name === 'amenities' ? value.split(',') : value)
    } as Pick<EditRoomProps, keyof EditRoomProps>
))
}

const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;
    setFormData((prev) => ({
        ...prev,
        [name]: files
    } as Pick<EditRoomProps, keyof EditRoomProps>
))
};

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
        if (key === 'images') {
            for (const file of formData.images) {
                data.append('images', file);
            }
        } else if (key === 'amenities') {
            data.append(key, JSON.stringify(formData[key as keyof EditRoomProps]));
        } else {
            data.append(key, formData[key as keyof EditRoomProps] as any);
        }
    }
    try{
        const response = await updateRoom(formData._id, data);
        setSuccessMessage(response.message);
    }catch(error){
        if (typeof error === 'object' && error !== null && 'response' in error) {
            const axiosError = error as { response: { data: { message: string } } };
            if (axiosError.response && axiosError.response.data && axiosError.response.data.message) {
              setErrorMessage(axiosError.response.data.message);
            } else {
              setErrorMessage("An unexpected error occurred");
            }
          } else {
            setErrorMessage("An unexpected error occurred");
          }
    }
 }
  return (
    <form>
        <h1 className='text-2xl font-semibold mb-4'>Edit Room</h1>

        <div className='mb-4'>
            <label htmlFor="title" className='mb-2 block text-sm font-medium'>Appartment Name</label>
            <div className='mt-2 rounded-md'>
                <input
                type="text"
                id="title"
                name="title"
                required
                placeholder='Enter Appartment Name'
                value={formData.title}
                onChange={handleChange}
                className=' peer block w-full rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500'
                />
            </div>
        </div>

        <div className='mb-4'>
            <label htmlFor="roomNumber" className='mb-2 block text-sm font-medium'>Room Number</label>
            <div className='mt-2 rounded-md'>
                <input
                type="text"
                id="roomNumber"
                name="roomNumber"
                required
                placeholder='Enter Room Number'
                value={formData.roomNumber}
                onChange={handleChange}
                className=' peer block w-full rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500'
                />
            </div>
        </div>

        <div className='mb-4'>
            <label htmlFor="description" className='mb-2 block text-sm font-medium'>Description</label>
            <div className='mt-2 rounded-md'>
                <textarea
                id="description"
                name="description"
                required
                placeholder='Enter Description'
                value={formData.description}
                onChange={handleChange}
                className=' peer block w-full rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500'
                />
            </div>
        </div>

        <div className='mb-4'>
            <label htmlFor="price" className='mb-2 block text-sm font-medium'>Price</label>
            <div className='mt-2 rounded-md'>
                <input
                type="text"
                id="price"
                name="price"
                required
                placeholder='Enter Price'
                value={formData.price}
                onChange={handleChange}
                className=' peer block w-full rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500'
                />
            </div>
        </div>

        <div className='mb-4'>
            <label htmlFor="capacity" className='mb-2 block text-sm font-medium'>Capacity</label>
            <div className='mt-2 rounded-md'>
                <input
                type="text"
                id="capacity"
                name="capacity"
                required
                placeholder='Enter Capacity'
                value={formData.capacity}
                onChange={handleChange}
                className=' peer block w-full rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500'
                />
            </div>
        </div>

        <div className='mb-4'>
            <label htmlFor="size" className='mb-2 block text-sm font-medium'>Size</label>
            <div className='mt-2 rounded-md'>
                <input
                type="text"
                id="size"
                name="size"
                required
                placeholder='Enter Size'
                value={formData.size}
                onChange={handleChange}
                className=' peer block w-full rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500'
                />
            </div>
        </div>
        <div className='mb-4'>
            <label htmlFor='address' className='mb-2 block text-sm font-medium'>Full Address</label>
            <div className='mt-2 rounded-md'>
                <input
                type="text"
                id="address"
                name="address"
                required
                placeholder='Enter Full Address'
                value={formData.address}
                onChange={handleChange}
                className=' peer block w-full rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500'
                />
            </div>
        </div>
        <div className='mb-4'>
            <label htmlFor="location" className='mb-2 block text-sm font-medium'>City</label>
            <div className='mt-2 rounded-md'>
                <input
                type="text"
                id="location"
                name="location"
                required
                placeholder='Enter City'
                value={formData.location}
                onChange={handleChange}
                className=' peer block w-full rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500'
                />
            </div>
        </div>

        <div className='mb-4'>
            <label htmlFor="amenities" className='mb-2 block text-sm font-medium'>Amenities</label>
            <div className='mt-2 rounded-md'>
                <input
                type="text"
                id="amenities"
                name="amenities"
                placeholder='Enter Amenities'
                value={formData.amenities}
                onChange={handleChange}
                className=' peer block w-full rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500'
                />
            </div>
        </div>

        <div className='mb-4'>
            <label htmlFor="rating" className='mb-2 block text-sm font-medium'>Rating</label>
            <div className='mt-2 rounded-md'>
                <input
                type="text"
                id="rating"
                name="rating"
                placeholder='Enter Rating'
                value={formData.rating}
                onChange={handleChange}
                className=' peer block w-full rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500'
                />
            </div>
        </div>

        <div className='mb-4'>
            <label htmlFor="images" className='mb-2 block text-sm font-medium'>Images</label>
            <div className='mt-2 rounded-md'>
                <input
                type="file"
                id="images"
                name="images"
                multiple
                required
                onChange={handleFileChange}
                className=' peer block w-full rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500'
                />
            </div>
        </div>

        <div className='flex gap-4' >
            <div className='mb-4'>
                <input
                    type="checkbox"
                    id="pets"
                    name="pets"
                    checked={formData.pets}
                    onChange={handleChange}
                    className=' peer  rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500'
                /> <label htmlFor="pets" className='mb-2  text-sm font-medium'>Pets Allow</label>
            </div>
            <div className='mb-4'>
                <input
                    type="checkbox"
                    id="isTopOffer"
                    name="isTopOffer"
                    checked={formData.isTopOffer}
                    onChange={handleChange}
                    className=' peer  rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500'
                /> <label htmlFor="isTopOffer" className='mb-2  text-sm font-medium'>Is Top Offer</label>
            </div>
            <div className='mb-4'>
                <select name="roomType" id="roomType" onChange={handleChange} value={formData.roomType} className='peer rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500'>
                    <option value={formData.roomType}>{formData.roomType}</option>
                    <option value="studio">Studio</option>
                    <option value="single">Single Bedroom</option>
                    <option value="double">Double Bedrooms</option>
                    <option value="family">Family</option>
                </select>
            </div>
        </div>
        <button
            type="submit"
            onClick={handleSubmit}
            className='bg-blue-600 text-white rounded-md px-4 py-2'
        >
            Update Room
        </button>
        <div
            className="flex items-end space-x-1 mt-4"
            aria-live="polite"
            aria-atomic="true"
            >
            {errorMessage && (
                <>
                    <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                    <p className="text-sm text-red-500">{errorMessage}</p>
                </>
            )}
            {successMessage && (
                <>
                    <CheckCircleIcon className="h-5 w-5 text-green-500" />
                    <p className="text-sm text-green-500">{successMessage}</p>
                    <Button >
                        <Link href='/dashboard/rooms'>View Rooms</Link>
                    </Button>
                </>
            )}
        </div>
    </form>
  )
}

export default EditRoom
