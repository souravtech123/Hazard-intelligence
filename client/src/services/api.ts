import axios from "axios";

const api = axios.create({
  baseURL:
    "https://hazard-intelligence.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

export default api;