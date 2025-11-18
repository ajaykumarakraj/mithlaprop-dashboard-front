// src/redux/services/api.js
import axios from "axios";

const Api = axios.create({
    baseURL: "https://api.squarebigha.com",
});

export default Api;
