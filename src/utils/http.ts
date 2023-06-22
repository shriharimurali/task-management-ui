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

instance.interceptors.request.use(
  async (config) => {
    const { accessToken } = getTokens();

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },

  async (error) => {
    const { refreshToken } = getTokens();
    const config = error?.config;
    if (error.response) {
      if (error.response.status === "401" && !config.sent) {
        config.sent = true;

        const { accessToken, refreshToken: refToken } = await getRefreshToken(
          refreshToken!
        );

        if (accessToken) {
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refToken);
          config.headers = {
            ...config.headers,
            authorization: `Bearer ${accessToken}`,
          };
        }

        return config;
      }

      if (error.response.status === "401") {
        window.location.reload();
      }

      return axios(config);
    }
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);
