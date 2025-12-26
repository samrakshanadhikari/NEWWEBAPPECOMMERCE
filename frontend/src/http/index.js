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
    // If FormData, let browser set Content-Type with boundary
    if (config.data instanceof FormData) {
        delete config.headers['Content-Type'];
    }
    return config;
}, (error)=> Promise.reject(error)
)

// Add response interceptor to handle token expiration
APIAuthenticated.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle 401 (Unauthorized) or 403 (Forbidden) - token invalid/expired
        if (error.response?.status === 401 || error.response?.status === 403) {
            // Clear invalid token
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            // Optionally redirect to login (if not already there)
            if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export {API, APIAuthenticated}