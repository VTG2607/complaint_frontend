import axios from "axios";

// Create an axios instance
const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE || "http://127.0.0.1:8000/", // your Django backend
    headers: {
        "Content-Type": "application/json",
    },
});

// Add a request interceptor to attach token automatically
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("authToken");
        if (token) {
            config.headers.Authorization = `Token ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;
