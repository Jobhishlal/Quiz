import axios from 'axios';
import API_CONFIG from '../config/api';
import { store } from '../store/store';

// Create a configured Axios instance
const apiClient = axios.create({
    baseURL: API_CONFIG.baseURL,
    timeout: API_CONFIG.timeout,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Important for Cookies (Refresh Token)
});

// Request Interceptor to add Access Token from Redux
apiClient.interceptors.request.use(
    (config) => {
        const state = store.getState();
        const token = state.auth.accessToken;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Interceptors (Optional: for global error handling)
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle global errors here (e.g., logging, redirect on 401)
        return Promise.reject(error);
    }
);

export default apiClient;
