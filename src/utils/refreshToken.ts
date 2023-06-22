import { getTokens } from "api/auth";
import { instance } from "./http";

export const getRefreshToken = async () => {
  const { refreshToken } = getTokens();
  console.log({ refreshToken });
  const { data } = await instance.post("/refresh", {
    refreshToken: refreshToken!,
  });
  return data;
};
