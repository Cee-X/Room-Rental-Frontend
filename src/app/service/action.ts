import request from './request'
export interface RoomTopProps {
    _id: string;
    title: string;
    roomType: string;
    roomNumber: string;
    description: string;
    price: number;
    location: string;
    address: string;
    images: string[];
    size: number;
    amenities: {
        General: string[];
        Bathroom: string[];
        Bedroom: string[];
        Kitchen: string[];
        View: string[];
    };
    rating: number;
    pets: boolean;
    capacity: number;
}
export interface RoomProps {
    _id: string;
    title: string;
    roomNumber: string;
    description: string;
    price: number;
    location: string;
    images: string[];
}

export const getTopOfferRooms = async () => {
    try{
        const response = await request.get('/room/topOffers');
        return response.data;
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

export type CreateRoomProps = {
    title: string;
    roomType: string;
    roomNumber: string;
    description: string;
    price: number;
    capacity: number;
    size: string;
    pets: boolean;
    location: string;
    address: string;
    images: File[];
    amenities: {
        General: string[];
        Bathroom: string[];
        Bedroom: string[];
        Kitchen: string[];
        View: string[];
    };
    rating: number;
    isTopOffer: boolean;
};


export const createRoom = async (data: FormData) => {
    try{
        const response = await request.post('/room', data);
        return response.data;
    }catch(error){
        throw error;
    }
    
}
export interface EditRoomProps {
    _id: string;
    title: string;
    roomType: string;
    roomNumber: string;
    description: string;
    price: number;
    capacity: number;
    size: string;
    pets: boolean;
    location: string;
    address: string;
    images: File[];
    amenities: {
        General: string[];
        Bathroom: string[];
        Bedroom: string[];
        Kitchen: string[];
        View: string[];
    };
    rating: string;
    isTopOffer: boolean;
    status: 'available' | 'booked';
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
    roomNumber: string;
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
    startDate: Date;
    endDate: Date;
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
    startDate: Date;
    endDate: Date;
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

interface RegisterDataProps {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export const registerUser = async (data: RegisterDataProps ) => {
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
        console.log(response.data)
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




export type RoomTableProps = {
    _id: string;
    title: string;
    roomNumber: number;
    roomType : string;
    description : string;
    price : number;
    capacity : number;
    size : number;
    pets : boolean;
    location : string;
    images : string[];
    amenities : string[];
    rating : number;
    isTopOffer : boolean;
    startDate : string;
    date : string;
    
  };

export const fetchFilteredRooms  = async (query: string, currentPage: number) => {
    try{
        const response = await request.get(`/dashboard/rooms?query=${query}&page=${currentPage}`);
        return response.data;
    }catch(error){
        throw error;
    }
}


export const fetchRoomPage = async ( query : string) => {
    try{
        const response = await request.get(`/dashboard/rooms/pages?query=${query}`);
        console.log(response.data);
        return response.data;
    }catch(error){
        throw error;
    }
}

export interface BookingTableProps {
    _id: string;
    room: {
      _id: string;
      title: string;
      images: string[];
    };
    user: {
      _id: string;
      name: string;
    };
    startDate: string;
    endDate: string;
    status: 'active' | 'upcoming' | 'completed';
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
    recentBookings: any[];
  }
  
  export const getDashboardData = async () => {
      try{
          const response = await request.get('/dashboard');
          return response.data;
      }catch(error){
          throw error;
      }
  }
  
  export const fetchFilteredBookings = async (query: string, currentPage: number) => {
    try {
      const response = await request.get(`/dashboard/bookings?query=${query}&page=${currentPage}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
  export const fetchBookingPages = async (query: string) => {
    try {
      const response = await request.get(`/dashboard/bookings/pages?query=${query}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  //Reviews
export const getReviews = async () => {
    try{
        const reponse  = await request.get('/review');
        return reponse.data;
    }catch(error){
        throw error;
    }
}

interface Review{
    room : string,
    rating : number,
    comment : string
}

export const createReview = async (data : Review) => {
    try{
        const response = await request.post('/review', data);
        return response.data;
    }catch(error){
        throw error;
    }
}

export const deleteReview = async (id : string) => {
    try{
        const response = await request.delete(`/review/${id}`);
        return response.data;
    }catch(error){
        throw error;
    }
}

  export interface ReviewTableProps {
    _id: string;
    room: {
      _id: string;
      title: string;
      images: string[];
    };
    user: {
      _id: string;
      name: string;
    };
    rating: number;
    comment: string;
    createdAt: string;
  }

export const fetchFilteredReviews = async (query: string, currentPage: number) => {
    try{
        const response = await request.get(`/dashboard/reviews?query=${query}&page=${currentPage}`);
        return response.data;
    }catch(error){
        throw error;
    }
}

export const fetchReviewPages = async (query: string) => {
    try{
        const response = await request.get(`/dashboard/reviews/pages?query=${query}`);
        return response.data;
    }catch(error){
        throw error;
    }
}

export const getRooms = async (query: string, currentPage: number) => {
    try{
        const response = await request.get(`/room?${query}&page=${currentPage}`);
        return response.data;
    }catch(error){
        throw error;
    }
}

export const sendEmail = async (data: FormData) => {
    try{
        const response = await request.post('/email', data);
        return response.data;
    }catch(error){
        throw error;
    }
}

export const subscribeEmail = async (data : {email : string} ) => {
    try {
        const response = await request.post('/email/subscribe', data);
        return response.data;
    } catch (error) {
        throw error;
    }
}



interface ChangePasswordProps {
    currentPassword : string;
    newPassword : string;
}

export const changePassword = async ( data : ChangePasswordProps )  => {
    try{ 
        const response = await request.put('/user/change-password', data);
        return response.data;
    }catch(error){
        throw error;
    }
}

export const deleteAccount = async () => {
    try{
        const response = await request.delete('/user');
        return response.data;
    }catch(error){
        throw error;
    }
}