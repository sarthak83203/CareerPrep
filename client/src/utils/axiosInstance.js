import axios from "axios";
import {BASE_URL} from "./apiPaths";
const axiosInstance=axios.create({
    baseURL:BASE_URL,
    timeout:80000,
    headers:{
        "Content-Type":"application/json",
        Accept:"application/json",
    },
})

//Request 
axiosInstance.interceptors.request.use(
    (config)=>{
        const accessToken=localStorage.getItem("token");
        if(accessToken){
            config.headers.Authorization=`Bearer ${accessToken}`;
        }
        return config;
    },
    (error)=>{
        return Promise.reject(error);
    }
)

//Response Interpretor
axiosInstance.interceptors.response.use(
    (response)=>{
        return response;
    },
    (error)=>{
        //Handle common error globally
        if(error.response.status===401){
            //Go to login page
            window.location.href="/";
        }else if(error.response.status===500){
            console.error("Server error. Try again later");
        }else if(error.code==="ECONNABORTED"){
            console.error("Request time out . Try again later");
        }
        return Promise.reject(error);
    }
)
export default axiosInstance;