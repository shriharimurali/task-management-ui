import { instance } from "utils/http";

export const getTokens = () => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  return { accessToken, refreshToken };
};

export const login = async (payload: { email: string; password: string }) => {
  const { data } = await instance.post("/login", payload);
  localStorage.setItem("accessToken", data.accessToken);
  localStorage.setItem("refreshToken", data.refreshToken);
  return data;
};

export const register = (data = {}) => {
  return instance.post("/register", data);
};
