import useSWR from "swr";
import { instance } from "utils/http";

const fetchUserInfo = async (accessToken: string) => {
  if (!accessToken) return null;
  const res = await instance.get("/userInfo");
  return res;
};

export const useUserInfo = (accessToken: string) => {
  const { data, error } = useSWR(accessToken, fetchUserInfo, {
    suspense: false,
    revalidateOnFocus: false,
  });

  return { user: data?.data, error, loading: !error && !data };
};
