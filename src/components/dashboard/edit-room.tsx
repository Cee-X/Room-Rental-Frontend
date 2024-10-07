'use client'
import React, { useState } from 'react'
import { EditRoomProps, updateRoom } from '@/app/service/action'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/hooks/use-toast"
import { AxiosError } from 'axios'

const EditRoom = ({ room }: { room: EditRoomProps }) => {  
  const [formData, setFormData] = useState<EditRoomProps>(room);
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files
    } as Pick<EditRoomProps, keyof EditRoomProps>))
  };


  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, roomType: value }))
  }
  
  type AmenityCategory = 'General' | 'Bathroom' | 'Bedroom' | 'Kitchen' | 'View';
  const handleAmenityChange = (category: AmenityCategory, amenity: string) => {
    setFormData((prev) => {
      const updatedAmenities = { ...prev.amenities };
      if (!updatedAmenities[category]) {
        updatedAmenities[category] = [];
      }
      const index = updatedAmenities[category].indexOf(amenity);
      if (index > -1) {
        updatedAmenities[category] = updatedAmenities[category].filter(item => item !== amenity);
      } else {
        updatedAmenities[category] = [...updatedAmenities[category], amenity];
      }
      return { ...prev, amenities: updatedAmenities };
    });
  };

  const isAmenityChecked = (category: AmenityCategory, amenity: string) => {
    return formData.amenities[category]?.includes(amenity) || false;
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
    try {
      await updateRoom(formData._id, data);
      toast({
        title: "Room updated",
        description: "Your room has been successfully updated.",
      })
    } catch (error) {
      if (error instanceof AxiosError) {
        toast({
          title: "Error",
          description: error.response?.data.message,
        })
      }
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto mb-8">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Edit Room</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">Apartment Name</Label>
              <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="roomNumber">Room Number</Label>
              <Input id="roomNumber" name="roomNumber" value={formData.roomNumber} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input id="price" name="price" type="number" value={formData.price} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="capacity">Capacity</Label>
              <Input id="capacity" name="capacity" type="number" value={formData.capacity} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="size">Size</Label>
              <Input id="size" name="size" value={formData.size} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">City</Label>
              <Input id="location" name="location" value={formData.location} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="roomType">Room Type</Label>
              <Select name="roomType" value={formData.roomType} onValueChange={handleSelectChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select room type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">Single</SelectItem>
                  <SelectItem value="double">Double</SelectItem>
                  <SelectItem value="suite">Suite</SelectItem>
                  <SelectItem value="apartment">Apartment</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="rating">Rating</Label>
              <Input id="rating" name="rating" type="number" value={formData.rating} onChange={handleChange} required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" value={formData.description} onChange={handleChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Full Address</Label>
            <Input id="address" name="address" value={formData.address} onChange={handleChange} required />
          </div>
          <div className="space-y-2">
            <Label>Amenities</Label>
            <Tabs defaultValue="general">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="bathroom">Bathroom</TabsTrigger>
                <TabsTrigger value="bedroom">Bedroom</TabsTrigger>
                <TabsTrigger value="kitchen">Kitchen</TabsTrigger>
                <TabsTrigger value="view">View</TabsTrigger>
              </TabsList>
              {/* Amenities content similar to create-room.tsx */}
              {/* ... */}
              <TabsContent value="general">
                    <div className='mt-2 rounded-md flex flex-col gap-2'>
                        <input
                            type="checkbox"
                            id="wifi"
                            name="wifi"
                            checked={isAmenityChecked('General', 'wifi')}
                            onChange={() => handleAmenityChange('General', 'wifi')}
                            className=' peer  rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500'
                        /> <label htmlFor="wifi" className='mb-2  text-sm font-medium'>Wifi</label>
                        <input
                            type="checkbox"
                            id="tv"
                            name="tv"
                            checked={isAmenityChecked('General', 'tv')}
                            onChange={() => handleAmenityChange('General', 'tv')}
                            className=' peer  rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500'
                        /> <label htmlFor="tv" className='mb-2  text-sm font-medium'>Tv</label>
                        <input
                            type="checkbox"
                            id="airConditioning"       
                            name="airConditioning"
                            checked={isAmenityChecked('General', 'airConditioning')}
                            onChange={() => handleAmenityChange('General', 'airConditioning')}
                            className=' peer  rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500'
                        /> <label htmlFor="airConditioning" className='mb-2  text-sm font-medium'>Air Conditioning</label>
                        <input
                            type="checkbox"
                            id="heating"           
                            name="heating"
                            checked={isAmenityChecked('General', 'heating')}
                            onChange={() => handleAmenityChange('General', 'heating')}
                            className=' peer  rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500'
                        /> <label htmlFor="heating" className='mb-2  text-sm font-medium'>Heating</label> 
                        <input
                            type="checkbox"
                            id="balcony"           
                            name="balcony"
                            checked={isAmenityChecked('General', 'balcony')}
                            onChange={() => handleAmenityChange('General', 'balcony')}
                            className=' peer  rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500'
                        /> <label htmlFor="balcony" className='mb-2  text-sm font-medium'>Balcony</label>
                        <input
                            type="checkbox"
                            id="elevator"           
                            name="elevator"
                            checked={isAmenityChecked('General', 'elevator')}
                            onChange={() => handleAmenityChange('General', 'elevator')}
                            className=' peer  rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500'
                        /> <label htmlFor="elevator" className='mb-2  text-sm font-medium'>Elevator</label>
                    </div>
                </TabsContent >
                <TabsContent value="bathroom">
                    <div className='mt-2 rounded-md flex flex-col gap-2'>
                        <input
                            type="checkbox"
                            id="hairDryer"
                            name="hairDryer"
                            checked={isAmenityChecked('Bathroom', 'hairDryer')}
                            onChange={() => handleAmenityChange('Bathroom', 'hairDryer')}
                            className=' peer  rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500'
                        /> <label htmlFor="hairDryer" className='mb-2  text-sm font-medium'>Hair Dryer</label>
                        <input
                            type="checkbox"
                            id="toiletries"
                            name="toiletries"
                            checked={isAmenityChecked('Bathroom', 'toiletries')}
                            onChange={() => handleAmenityChange('Bathroom', 'toiletries')}
                            className=' peer  rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500'
                        /> <label htmlFor="toiletries" className='mb-2  text-sm font-medium'>Toiletries</label>
                        <input
                            type="checkbox" 
                            id="bathtub"
                            name="bathtub"
                            checked={isAmenityChecked('Bathroom', 'bathtub')}
                            onChange={() => handleAmenityChange('Bathroom', 'bathtub')}
                            className=' peer  rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500'
                        /> <label htmlFor="bathtub" className='mb-2  text-sm font-medium'>Bathtub</label>
                        <input
                            type="checkbox" 
                            id="shower"     
                            name="shower"
                            checked={isAmenityChecked('Bathroom', 'shower')}
                            onChange={() => handleAmenityChange('Bathroom', 'shower')}
                            className=' peer  rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500'
                        /> <label htmlFor="shower" className='mb-2  text-sm font-medium'>Shower</label>
                    </div>
                </TabsContent>
                <TabsContent value="bedroom">
                    <div className='mt-2 rounded-md flex flex-col gap-2'>
                        <input
                            type="checkbox"             
                            id="extraBed"
                            name="extraBed"
                            checked={isAmenityChecked('Bedroom', 'extraBed')}
                            onChange={() => handleAmenityChange('Bedroom', 'extraBed')}
                            className=' peer  rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500'
                        /> <label htmlFor="extraBed" className='mb-2  text-sm font-medium'>Extra Bed</label>
                        <input
                            type="checkbox"
                            id="extraTowel"
                            name="extraTowel"
                            checked={isAmenityChecked('Bedroom', 'extraTowel')}
                            onChange={() => handleAmenityChange('Bedroom', 'extraTowel')}
                            className=' peer  rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500'
                        /> <label htmlFor="extraTowel" className='mb-2  text-sm font-medium'>Extra Towel</label>
                        <input
                            type="checkbox"
                            id="extraPillow"
                            name="extraPillow"
                            checked={isAmenityChecked('Bedroom', 'extraPillow')}
                            onChange={() => handleAmenityChange('Bedroom', 'extraPillow')}
                            className=' peer  rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500'
                        /> <label htmlFor="extraPillow" className='mb-2  text-sm font-medium'>Extra Pillow</label>
                        <input
                            type="checkbox"
                            id="extraBlanket"
                            name="extraBlanket"
                            checked={isAmenityChecked('Bedroom', 'extraBlanket')}
                            onChange={() => handleAmenityChange('Bedroom', 'extraBlanket')}
                            className=' peer  rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500'
                        /> <label htmlFor="extraBlanket" className='mb-2  text-sm font-medium'>Extra Blanket</label>
                        <input
                            type="checkbox"
                            id="extraBedsheet"
                            name="extraBedsheet"
                            checked={isAmenityChecked('Bedroom', 'extraBedsheet')}
                            onChange={() => handleAmenityChange('Bedroom', 'extraBedsheet')}
                            className=' peer  rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500'
                        /> <label htmlFor="extraBedsheet" className='mb-2  text-sm font-medium'>Extra Bedsheet</label>
                    </div>
                </TabsContent> 
                <TabsContent value="kitchen">
                    <div className='mt-2 rounded-md flex flex-col gap-2'>
                        <input
                            type="checkbox"
                            id="refrigerator"
                            name="refrigerator"
                            checked={isAmenityChecked('Kitchen', 'refrigerator')}
                            onChange={() => handleAmenityChange('Kitchen', 'refrigerator')}
                            className=' peer  rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500'
                        /> <label htmlFor="refrigerator" className='mb-2  text-sm font-medium'>Refrigerator</label>
                        <input
                            type="checkbox"
                            id="microwave"
                            name="microwave"
                            checked={isAmenityChecked('Kitchen', 'microwave')}
                            onChange={() => handleAmenityChange('Kitchen', 'microwave')}
                            className=' peer  rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500'
                        /> <label htmlFor="microwave" className='mb-2  text-sm font-medium'>Microwave</label>
                        <input
                            type="checkbox"
                            id="coffeeMaker"
                            name="coffeeMaker"
                            checked={isAmenityChecked('Kitchen', 'coffeeMaker')}
                            onChange={() => handleAmenityChange('Kitchen', 'coffeeMaker')}
                            className=' peer  rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500'
                        /> <label htmlFor="coffeeMaker" className='mb-2  text-sm font-medium'>Coffee Maker</label>
                        <input
                            type="checkbox"
                            id="kitchenware"
                            name="kitchenware"
                            checked={isAmenityChecked('Kitchen', 'kitchenware')}
                            onChange={() => handleAmenityChange('Kitchen', 'kitchenware')}  
                            className=' peer  rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500'
                        /> <label htmlFor="kitchenware" className='mb-2  text-sm font-medium'>Kitchenware</label>
                    </div>
                </TabsContent>
                <TabsContent value="view">
                    <div className='mt-2 rounded-md flex flex-col gap-2'>
                        <input
                            type="checkbox"
                            id="seaView"
                            name="seaView"
                            checked={isAmenityChecked('View', 'seaView')}
                            onChange={() => handleAmenityChange('View', 'seaView')}
                            className=' peer  rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500'
                        /> <label htmlFor="seaView" className='mb-2  text-sm font-medium'>Sea View</label>
                        <input
                            type="checkbox"
                            id="mountainView"
                            name="mountainView"
                            checked={isAmenityChecked('View', 'mountainView')}
                            onChange={() => handleAmenityChange('View', 'mountainView')}
                            className=' peer  rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500'
                        /> <label htmlFor="mountainView" className='mb-2  text-sm font-medium'>Mountain View</label>
                        <input
                            type="checkbox"
                            id="cityView"
                            name="cityView"
                            checked={isAmenityChecked('View', 'cityView')}
                            onChange={() => handleAmenityChange('View', 'cityView')}
                            className=' peer  rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500'
                        /> <label htmlFor="cityView" className='mb-2  text-sm font-medium'>City View</label>
                    </div>
                </TabsContent>
            </Tabs>
          </div>
          <div className="space-y-2">
            <Label htmlFor="images">Images</Label>
            <Input id="images" name="images" type="file" multiple onChange={handleFileChange} />
          </div>
          <div className="flex space-x-4">
            <div className="flex items-center space-x-2">
              <Checkbox id="pets" name="pets" checked={formData.pets} onCheckedChange={(checked) => handleChange({ target: { name: 'pets', type: 'checkbox', checked } } as any)} />
              <Label htmlFor="pets">Pets Allowed</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="isTopOffer" name="isTopOffer" checked={formData.isTopOffer} onCheckedChange={(checked) => handleChange({ target: { name: 'isTopOffer', type: 'checkbox', checked } } as any)} />
              <Label htmlFor="isTopOffer">Top Offer</Label>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button type="submit" className="w-full" onClick={handleSubmit}>Update Room</Button>
      </CardFooter>
    </Card>
  )
}

export default EditRoom
