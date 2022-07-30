import axios from 'axios';
import { API_URI } from './config';
// create axios instance with base url of api service 
const API = axios.create({
    baseURL:API_URI,
    headers:{
        'Content-Type':"application/json",
    }
})
export default API