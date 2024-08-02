import axios from "axios";

const apiClient = axios.create({
    // baseURL: 'http://127.0.0.1:3000/',
    baseURL: 'https://paggo-case-backend.onrender.com/',
})

export default apiClient