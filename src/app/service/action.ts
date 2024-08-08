

import request from './request'
import Dashboard from '../components/dashboard/DataCard';

export interface RoomTopProps {
    _id: string;
    title: string;
    description: string;
    price: number;
    location: string;
    images: string[];
    size: number;
    amenities: string[];
    rating: number;
    pets: boolean;
    capacity: number;
}
export interface RoomProps {
    _id: string;
    title: string;
    description: string;
    price: number;
    location: string;
    images: string;
}

export const getTopOfferRooms = async () => {
    try{
        const response = await request.get('/room/topOffers');
        return response.data.map((room: RoomTopProps) => ({
            ...room,
            images: room.images[0]? room.images[0] : []
        })
        );
    }catch(error){
        throw error;
    }
}

export const getSearchRooms = async (params: URLSearchParams) => {
    try{
        const response = await request.get(`/room/search?${params.toString()}`);
        return response.data.map((room: RoomTopProps) => ({
            ...room,
            images: room.images[0]? room.images[0] : []
        })
        );
    }catch(error){
        throw error;
    }
}


export const getRoomById = async (id: string) => {
    try{
        const response = await request.get(`/room/${id}`);
        return response.data;
    }catch(error){
        throw error;
    }
}

export const createRoom = async (data: FormData) => {
    try{
        const response = await request.post('/room', data);
        return response.data;
    }catch(error){
        throw error;
    }
}

export const updateRoom = async (id: string, data: FormData) => {
    try{
        const response = await request.put(`/room/${id}`, data);
        return response.data;
    }catch(error){
        throw error;
    }
}

export const deleteRoom = async (id: string) => {
    try{
        const response = await request.delete(`/room/${id}`);
        return response.data;
    }catch(error){
        throw error;
    }
}


export interface Room {
    _id: string;
    title: string;
    description: string;
    price: number;
    capacity: number;
    size: number;
    pets: boolean;
    location: string;
    images: string[];
    amenities: string[];
    rating: number;
    isTopOffer: boolean;
}

export interface UserBookingProps {
    _id: string;
    room: Room;
    user: string;
    startDate: string;
    endDate: string;
    totalPrice: number;
}  


export const getBookings = async () => {
    try{
        const response = await request.get('/booking/user');
        return response.data;
    }catch(error){
        throw error;
    }
}

export interface CreateBookingProps {
    room: string;
    startDate: string;
    endDate: string;
    
}
export const createBooking = async (data: CreateBookingProps) => {
    try{
        const response = await request.post('/booking', data);
        return response.data;
    }catch(error){
        throw error;
    }
}

export const deleteBooking = async (id: string) => {
    try{
        const response = await request.delete(`/booking/${id}`);
        return response.data;
    }catch(error){
        throw error;
    }
}

export const registerUser = async (data: LoginDataProps) => {
    try{
        const response = await request.post('/auth/register', data);
        return response.data;
    }catch(error){
        throw error;
    }
}
interface LoginDataProps {
    email: string;
    password: string;

}

export const loginUser = async (data: LoginDataProps) => {
    try{
        const response = await request.post('/auth/login', data);
        return response.data;
    }catch(error){
        throw error;
    }
}

export const logoutUser = async () => {
    try{
        const response = await request.post('/auth/logout');
        return response.data;
    }catch(error){
        throw error;
    }
}

export const getUser = async () => {
    try{
        const response = await request.get('/auth/user');
        return response.data;
    }catch(error){
        throw error;
    }
}

export const createAdmin = async (data: FormData) => {
    try{
        const response = await request.post('/auth/create-admin', data);
        return response.data;
    }catch(error){
        throw error;
    }
}

export interface ProfileProps{
    _id: string;
    name: string;
    email: string;
    profilePic : string;
    phoneNumber: string;
}


export const getProfile = async () => {
    try{
        const respone = await request.get('/user')
        return respone.data;
    }catch(error){
        throw error;
    }
}

export const updateProfile = async (data:FormData) => {
    try{
        const response = await request.put('/user', data);
        return response.data;
    }catch(error){
        throw error;
    }
}


export interface MonthlyData {
  month: string;
  totalRevenue: number;
  totalBookings: number;
}

export interface DashboardDataProps {
  totalRooms: number;
  totalBookings: number;
  totalUsers: number;
  totalRevenue: number;
  currentBookings: number;
  revenueIncreaseRate: number;
  bookingIncreaseRate: number;
  monthlyData: MonthlyData[];
}

export const getDashboardData = async () => {
    try{
        const response = await request.get('/dashboard');
        return response.data;
    }catch(error){
        throw error;
    }
}
