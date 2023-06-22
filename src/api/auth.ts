import { instance } from "utils/http";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  fname: string;
  lname: string;
  email: string;
  password: string;
}

export const getTokens = () => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  return { accessToken, refreshToken };
};

export const login = async (payload: LoginPayload) => {
  const { data } = await instance.post("/login", payload);
  localStorage.setItem("accessToken", data.accessToken);
  localStorage.setItem("refreshToken", data.refreshToken);
  return data;
};

export const signUp = (payload: RegisterPayload) => {
  return instance.post("/register", payload);
};
