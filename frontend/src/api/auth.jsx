import axios from "axios";

const API=axios.create({
    baseURL:import.meta.env.VITE_BACKEND_BASEURL,
    headers:{
        "Content-Type":"application/json"
    }
});

export const signup=(data)=>{
    return API.post(
        "/v1/auth/signup",
        data
    );
};

export const login=(email,password)=>{
    return API.post(
        "/v1/auth/login",
        {
            email,
            password
        }
    );
};

export const getMe=(token)=>{
    return API.get(
        "/v1/auth/me",
        {
            headers:{
                Authorization:`Bearer ${token}`
            }
        }
    );
};

export default API;