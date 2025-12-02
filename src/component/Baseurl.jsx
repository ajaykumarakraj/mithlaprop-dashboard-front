// src/redux/services/api.js
import axios from "axios";

const api = axios.create({
    baseURL: "https://api.squarebigha.com",
});

// 🔹 Automatically add token to every request
api.interceptors.request.use((config) => {
    const user = JSON.parse(localStorage.getItem("user"));

    // console.log("check data", user)
    // console.log("check data", user.name)
    if (user) {
        config.headers.Authorization = `Bearer ${user?.token}`;
    }

    return config;
});

export default api;
