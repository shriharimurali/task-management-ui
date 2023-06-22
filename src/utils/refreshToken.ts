import { instance } from "./http";

export const getRefreshToken = async (refreshToken: string) => {
  const { data } = await instance.post("/refresh", { refreshToken });
  return data;
};
