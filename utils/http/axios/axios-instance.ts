"use client";
import axios from "axios";
const axiosInstance = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_REACT_APP_BASE_URL_DEV ||
    process.env.NEXT_PUBLIC_REACT_APP_BASE_URL,

  // timeout: 10000
});

if (typeof window !== "undefined") {
  let token = JSON.parse(localStorage.getItem("persist:root")!)?.auth
    ? JSON.parse(JSON.parse(localStorage.getItem("persist:root")!)?.auth)?.user
        ?.token
    : null;

  // Add a request interceptor
  const persistRoot = localStorage.getItem("persist:root");
  if (persistRoot) {
    const auth = JSON.parse(persistRoot)?.auth;
    if (auth) {
      const user = JSON.parse(auth)?.user;
      if (user) {
        token = user.token;
      }
    }
  }

  axiosInstance.interceptors.request.use((config) => {
    // Do something before request is sent
    // config.params = config.params || {}
    // config.params['auth'] = 'iazadur'
    // console.log(config);
    // console.log(config.headers);
    config.headers["Authorization"] = token ? "Bearer " + token : null;
    // config.headers['Content-Type'] = token ? 'multipart/form-data' : 'application/json'
    return config;
  });
}

export default axiosInstance;
