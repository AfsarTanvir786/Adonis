import { API_URI } from '@/config/env';
import axios from 'axios';

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL ?? 
    `${API_URI}/api`,
    withCredentials: true,
});
