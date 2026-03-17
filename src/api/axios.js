import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1',
});

// Automatically attach token to every request
API.interceptors.request.use((config) => {
    const user = localStorage.getItem('sf_user');
    if (user) {
        const parsed = JSON.parse(user);
        if (parsed.token) {
            config.headers.Authorization = `Bearer ${parsed.token}`;
        }
    }
    return config;
});

export const OTPAPI = axios.create({
    baseURL: import.meta.env.VITE_OTP_API_URL || 'http://localhost:8000/api/v1/mailer',
});

export default API;
