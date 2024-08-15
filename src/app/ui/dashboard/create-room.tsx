'use client'
import React, {useState} from 'react'
import { createRoom, CreateRoomProps} from '@/app/service/action'
const CreateRoom = () => {
    const [formData, setFormData] = useState<CreateRoomProps>({
        title: '',
        roomNumber: '',
        description: '',
        price: '',
        capacity: '',
        size: '',
        pets: false,
        location: '',
        images: [],
        amenities: [],
        rating: '',
        isTopOffer: false,
        status: 'available'
    })

    const handleChange = (e: React.ChangeEvent) => {
        const {name, value, type, checked} = e.target as HTMLInputElement;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked :( name === 'amenities' ? value.split(',') : value)
        } as Pick<CreateRoomProps, keyof CreateRoomProps>
    ))
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, files} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: files
        } as Pick<CreateRoomProps, keyof CreateRoomProps>
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
                data.append(key, JSON.stringify(formData[key as keyof CreateRoomProps]));
            } else {
                data.append(key, formData[key as keyof CreateRoomProps] as any);
            }
        }
        try{
            const response = await createRoom(data);
            console.log(response);
        }catch(error){
            console.error(error);
        }
    }
  return (
    <form>
      <h1 className='text-2xl font-semibold mb-4'>Create Room</h1>
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
            <label htmlFor="location" className='mb-2 block text-sm font-medium'>Location</label>
            <div className='mt-2 rounded-md'>
                <input
                type="text"
                id="location"
                name="location"
                required
                placeholder='Enter Location'
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
        </div>
        <button
            type="submit"
            onClick={handleSubmit}
            className='bg-blue-600 text-white rounded-md px-4 py-2'
        >
            Create Room
        </button>
    </form>
  )
}

export default CreateRoom
