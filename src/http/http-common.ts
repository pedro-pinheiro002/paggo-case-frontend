import axios from "axios";

const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:3000/',
})

export default apiClient