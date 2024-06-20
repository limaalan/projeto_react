import axios from "axios";
import { errorInterceptor, responseInterceptor } from "./interceptors";

const Api = axios.create({
  baseURL: process.env.REACT_APP_URL_BASE,
//   headers: {
    // Authorization: `Bearer ${localStorage.getItem("APP_ACCESS_TOKEN")}`,
    // Authorization:`Bearer ${JSON.parse(localStorage.getItem('APP_ACCESS_TOKEN') || '' )} `
//   },
});

Api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("APP_ACCESS_TOKEN") || "";
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

Api.interceptors.response.use(
  (response) => responseInterceptor(response),
  (error) => errorInterceptor(error)
);

export { Api };
