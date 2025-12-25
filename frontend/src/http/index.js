import axios from "axios";

//without login
const API=axios.create({
    baseURL : import.meta.env.VITE_API_URL || 'http://localhost:3000/',
    headers :{
        'Content-Type' : 'application/json',
        'Accept' : 'application/json'
    }
})

//authenticate user
const APIAuthenticated=axios.create({
    baseURL : import.meta.env.VITE_API_URL || 'http://localhost:3000/',
    headers :{
        'Content-Type' : 'application/json',
        'Accept' : 'application/json'
    }
})

APIAuthenticated.interceptors.request.use((config)=>{
    const token= localStorage.getItem('token');
    if(token){
        config.headers.Authorization=token;
    }
    return config;
}, (error)=> Promise.reject(error)
)

export {API, APIAuthenticated}