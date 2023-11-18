import axios from "axios";
import { getToken } from "../authorization";

export const BASE_URL = 'http://localhost:8080';

export const myAxios = axios.create({
    baseURL:BASE_URL
});

export const privateAxios = axios.create({
    baseURL:BASE_URL
});

privateAxios.interceptors.request.use((config) => {

    const token = getToken();
    console.log("getting token in helper.js: ", token);

    config.headers = config.headers || {};

    if(token)
    {
        config.headers.Authorization = `Bearer ${token}`;
        console.log("with the bearer: ", config )
        return config;
    }
    else {
        console.log("token is undefined or missing");
        return Promise.reject(new Error("Token is missing"));
    }

}, error => {
    console.log("Interceptor error: ", error);
    return Promise.reject(error);
});