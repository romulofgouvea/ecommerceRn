import axios from "axios";

export const BASE_URL = "http://10.0.2.2:3333";

const api = axios.create({
    baseURL: BASE_URL,
    timeout: 10000
});

export default api;
