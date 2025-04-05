import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

const http: AxiosInstance = axios.create({
  baseURL: "https://www.demo.com",
  timeout: 5000,
});

// 請求攔截器
http.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  console.log("config", config);
  return config;
});

// 響應攔截器
http.interceptors.response.use((response: AxiosResponse) => {
  console.log("response", response);
  return response;
});

export default http;
