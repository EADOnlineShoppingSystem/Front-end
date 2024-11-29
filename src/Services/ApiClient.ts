
import axios, { AxiosError, AxiosInstance, AxiosResponse }from "axios"

const API_BASE_URL = "http://localhost:3500"

const axiosInstance:AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
})

axiosInstance.interceptors.request.use(
    (config)=>{
        
        const token = sessionStorage.getItem("token")
        if(token){
            config.headers["Authorization"] = `Bearer ${token}`
        }
        return config
    },
    (error)=>{
        return Promise.reject(error)
    }
)

axiosInstance.interceptors.response.use(
    (response:AxiosResponse)=>response,
    (error:AxiosError)=>{
        if(error.response){
            switch(error.response.status){
                case 401:
                    console.error('Unauthorized access');
                    break;
                case 404:
                    console.error('Resource not found');
                    break;
                case 500:
                    console.error('Internal server error');
                    break;
                default:
                  console.error('An error occurred:', error.message);     
            }
        }
        else if(error.request){
            console.error('An error occurred:', error.message);
        }
        else{
            console.error('An error occurred:', error.message);
        }
        return Promise.reject(error)
    }
)
export default axiosInstance