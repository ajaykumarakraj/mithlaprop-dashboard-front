// src/redux/services/api.js
import axios from "axios";

const instance = axios.create({
    baseURL: "https://api.squarebigha.com/api",
    headers: {
        Authorization: "Bearer <your-token-here>",
    },
});

export default instance;
