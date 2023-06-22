import axios from "axios";

import { getTokens } from "api/auth";
import { getRefreshToken } from "./refreshToken";

export const instance = axios.create({
  baseURL: "http://localhost:4000/api/users",
  headers: {
    "Content-type": "application/json",
  },
  withCredentials: true,
});

instance.interceptors.request.use((config) => {
  const { accessToken } = getTokens();

  if (accessToken) {
    config.headers["authorization"] = `Bearer ${accessToken}`;
  }
  return config;
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      const res = await getRefreshToken();
      axios.defaults.headers["authorization"] = `Bearer ${res.accessToken}`;
      return instance(originalRequest);
    }

    if (error.response.status === 403) {
      window.location.replace("http://localhost:3000/");
    }
    return Promise.reject(error);
  }
);
