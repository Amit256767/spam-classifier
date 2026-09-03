import axios from 'axios';
import cors from 'cors'

const api = axios.create({
    baseURL: "https://spam-classifier-tagz.onrender.com",
    headers:{
        "Content-Type": "application/json"
    }
})

export default api;