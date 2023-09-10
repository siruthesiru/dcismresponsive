import axios from 'axios'
import Cookies from 'js-cookie'

const TOKEN = Cookies.get('access_token');

const API = axios.create({
    baseURL: "https://localhost:8000/api/",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
    },
});

export default API;