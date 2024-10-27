import axios from 'axios';
import router from './router';

const apiUrl = import.meta.env.VITE_API_BASE_URL; // Use the environment variable

console.log(apiUrl);

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
});

axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

axiosClient.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response && error.response.status === 401) { //unauthorized
        router.navigate('/login');
        return error;
    }
    throw error;

});


export default axiosClient;
