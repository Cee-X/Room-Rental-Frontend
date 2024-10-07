import axios from 'axios';
import { getCookie } from 'cookies-next';
const baseURL = process.env.NEXT_PUBLIC_API_URL;
const getToken = () => {
   return getCookie('token') || '';
}

const apiService = axios.create({
    baseURL: baseURL,
});

apiService.interceptors.request.use(config => {
    const token = getToken();

    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    // Set Content-Type based on the request data
    if (config.data && config.data instanceof FormData) {
        config.headers['Content-Type'] = 'multipart/form-data';
    } else {
        config.headers['Content-Type'] = 'application/json';
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default apiService;

