import React, { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Filter } from "lucide-react"

interface RoomFilterProps {
  onFilterChange: (filters: {
    searchTerm: string;
    roomType: string;
    minPrice: number;
    maxPrice: number;
  }) => void;
}

const FilterContent: React.FC<{
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  roomType: string;
  setRoomType: (value: string) => void;
  minPrice: string;
  setMinPrice: (value: string) => void;
  maxPrice: string;
  setMaxPrice: (value: string) => void;
  handleSearch: () => void;
  handleReset: () => void;
}> = ({
  searchTerm,
  setSearchTerm,
  roomType,
  setRoomType,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  handleSearch,
  handleReset,
}) => (
  <div className="space-y-3">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <Input
          id="keyword"
          placeholder="Search rooms..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div >
        <Select value={roomType} onValueChange={setRoomType}>
          <SelectTrigger id="roomType">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="single">Single</SelectItem>
            <SelectItem value="double">Double</SelectItem>
            <SelectItem value="suite">Suite</SelectItem>
            <SelectItem value="family">Family</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
    
    <div className="space-y-1">
      <Label className="text-sm font-medium">Price Range</Label>
      <div className="flex space-x-2">
        <Input
          type="number"
          placeholder="Min"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="w-full"
        />
        <Input
          type="number"
          placeholder="Max"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="w-full"
        />
      </div>
    </div>
    
    <div className="flex space-x-2">
      <Button onClick={handleSearch} className="flex-1">Search</Button>
      <Button onClick={handleReset} variant="outline" className="flex-1">Reset</Button>
    </div>
  </div>
)

const RoomFilter: React.FC<RoomFilterProps> = ({ onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [roomType, setRoomType] = useState('')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  const handleSearch = () => {
    onFilterChange({
      searchTerm,
      roomType,
      minPrice: Number(minPrice) || 0,
      maxPrice: Number(maxPrice) || Infinity,
    })
  }

  const handleReset = () => {
    setSearchTerm('')
    setRoomType('')
    setMinPrice('')
    setMaxPrice('')
    onFilterChange({
      searchTerm: '',
      roomType: '',
      minPrice: 0,
      maxPrice: Infinity,
    })
  }

  return (
    <>
      {/* Mobile filter button */}
      <div className="md:hidden mb-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="h-[100vh]">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <FilterContent
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              roomType={roomType}
              setRoomType={setRoomType}
              minPrice={minPrice}
              setMinPrice={setMinPrice}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              handleSearch={handleSearch}
              handleReset={handleReset}
            />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop filter */}
      <div className="w-full mb-6 hidden md:block bg-gray-50 p-4 rounded-lg">
          <FilterContent
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            roomType={roomType}
            setRoomType={setRoomType}
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            handleSearch={handleSearch}
            handleReset={handleReset}
          />
      </div>
    </>
  )
}

export default RoomFilter