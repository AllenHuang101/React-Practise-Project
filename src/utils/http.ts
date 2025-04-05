import { message } from "antd";
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
  console.log("config", config.data);
  return config;
});

// 響應攔截器
http.interceptors.response.use((response: AxiosResponse) => {
  console.log("response", response);
  const res = response.data;
  if (res.code != 200) {
    message.error(res.code + ":" + res.message);
    return Promise.reject(new Error(res.message));
  }
  return response.data;
});

export default http;
