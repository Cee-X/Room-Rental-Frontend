'use client'
import { 
    Select, 
    SelectGroup, 
    SelectValue, 
    SelectTrigger,
    SelectContent, 
    SelectItem, 
    SelectLabel, 
    SelectScrollDownButton, 
    SelectScrollUpButton, 
    SelectSeparator } from "../utils/Select";
    import { Button } from "../utils/Button";
import { useState } from 'react';
import { getSearchRooms } from "../service/action";
import { RoomProps } from "../service/action";
const SearchForm = ({OnSearch}: { OnSearch: (response: RoomProps[]) => void }) => {
    const [priceMin, setPriceMin] = useState('')
    const [priceMax, setPriceMax] = useState('')
    const [location, setLocation] = useState('')
    const [sort, setSort] = useState('')
    
    const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if(priceMin) params.append('priceMin', priceMin);
        if(priceMax) params.append('priceMax', priceMax);
        if(location) params.append('location', location);
        if(sort)  params.append('sort', sort)
        try{
            const response = await getSearchRooms(params);
            console.log(response);
            OnSearch(response);
        }catch(error){
            console.log(error);
    }
}
  return (
    <form onSubmit={handleSearch} className="p-10 bg-[#F3F3FA]">
        <div className="flex  gap-2  justify-center mb-10">
            <input 
            type="text" 
            placeholder="Enter the location"  
            className="bg-whtie px-3 py-2 shadow-sm border-slate-400 placeholder:text-slate-400 rounded-md" 
            value={location} 
            onChange={(e) => setLocation(e.target.value)} 
            />
            <Button>Search</Button>
        </div>
        <div className="flex flex-row justify-around gap-2 sm:gap-4 ">
            <Select value={priceMin} onValueChange={setPriceMin}>
                <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Price Min" />
                </SelectTrigger>
                <SelectContent>
                    <SelectScrollDownButton />
                    <SelectItem value="4000" >4000</SelectItem>
                    <SelectItem value="5000">5000</SelectItem>
                    <SelectItem  value="6000">6000</SelectItem>
                    <SelectItem value="7000">7000</SelectItem>
                    <SelectItem value="8000">8000</SelectItem>
                </SelectContent>
            </Select>
            <Select value={priceMax} onValueChange={setPriceMax}>
                <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Price Max" />
                </SelectTrigger>
                <SelectContent>
                    <SelectScrollDownButton />
                    <SelectItem value="8000" >8000</SelectItem>
                    <SelectItem value="9000">9000</SelectItem>
                    <SelectItem  value="10000">10000</SelectItem>
                    <SelectItem value="11000">11000</SelectItem>
                    <SelectItem value="12000">12000</SelectItem>
                </SelectContent>
            </Select>
            <Select value={sort} onValueChange={setSort}>
                <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent>
                    <SelectScrollDownButton />
                    <SelectItem value="price:asc" >ASC</SelectItem>
                    <SelectItem value="price:des">DES</SelectItem>
                </SelectContent>
            </Select>
        </div>
    </form>
  )
}

export default SearchForm
