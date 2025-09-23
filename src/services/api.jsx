import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE || "http://127.0.0.1:8000/",
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("authToken");

        // Only add Authorization if token exists AND it's not login/registration
        if (
            token &&
            !config.url.includes("login/") &&
            !config.url.includes("registration/")
        ) {
            config.headers.Authorization = `Token ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

export default api;
