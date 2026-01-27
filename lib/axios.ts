import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { cookies } from "next/headers";

const x_axios = axios.create({
  baseURL: process.env.API_URL + "/api",
  timeout: 0,
  withCredentials: true,
});

x_axios.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const cookieStore = await cookies();
    const token = cookieStore.get("x-jwt")?.value;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // console log the request url and method
    console.log(`${config.method} ${config.baseURL} ${config.url}`);

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

x_axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      const cookieStore = await cookies();
      cookieStore.delete("x-jwt");
    }

    return Promise.reject(error);
  }
);

export default x_axios;
