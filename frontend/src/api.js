import axios from "axios";

const API = axios.create({
  baseURL: "https://aerivana.onrender.com", // 👈 fix backend URL
});

API.interceptors.request.use((req) => {
  const user = localStorage.getItem("userInfo");
  if (user) {
    req.headers.Authorization = `Bearer ${JSON.parse(user).token}`;
  }
  return req;
});

export default API;
