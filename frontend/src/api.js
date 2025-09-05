import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // dynamic from .env
});

// Example auth token attach (if needed)
API.interceptors.request.use((req) => {
  const user = localStorage.getItem("userInfo");
  if (user) {
    req.headers.Authorization = `Bearer ${JSON.parse(user).token}`;
  }
  return req;
});

export default API;
