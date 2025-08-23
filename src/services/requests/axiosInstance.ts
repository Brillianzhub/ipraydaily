import axios from "axios";
import Cookies from "js-cookie";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // optional: 10s timeout
});

// Request interceptor to add token to headers
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      Cookies.remove('auth_token');
      Cookies.remove('user_data');
      
      // Redirect to login page
      if (typeof window !== 'undefined') {
        window.location.href = '/auth';
      }
    }
    return Promise.reject(error);
  }
);

// Export Cookies for use in components
export { Cookies };