import axios from "axios";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

console.log("BASE URL:", import.meta.env.VITE_API_URL);

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      toast.error("Session expired. Please login again");

      setTimeout(() => {
        window.location.href = "/Login";
      }, 1000);
    }

    if (status === 403) {
      toast.error("Access denied");
    }

    if (status >= 500) {
      toast.error("Server error. Try again later");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;