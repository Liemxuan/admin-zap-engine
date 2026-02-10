import axios from 'axios';
import { STORAGE_KEYS } from '../utils/const';

const httpClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || '/api-proxy',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'X-Language': 'vi',
        'Accept-Language': 'vi'
    },
});

httpClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

httpClient.interceptors.response.use(
    (response) => response.data,
    (error) => {
        const errorData = error.response?.data || {};
        const errorMessage = errorData.Message || errorData.message || 'An unexpected error occurred';

        if (error.response?.status === 401) {
            localStorage.removeItem(STORAGE_KEYS.TOKEN);
            // Only redirect if not already on login page
            if (!window.location.pathname.includes('/login')) {
                window.location.href = '/login';
            }
        }

        // Create a new error with the extracted message
        const parsedError = new Error(errorMessage);
        parsedError.status = error.response?.status;
        parsedError.data = errorData;

        return Promise.reject(parsedError);
    }
);

export default httpClient;
