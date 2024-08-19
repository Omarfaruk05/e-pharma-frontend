import { AUTH_KEY, EXPIRE_KEY, USER_KEY } from "@/constants/storageKey";
import { instance as axiosInstance } from "@/helpers/axios/axiosInstance";
import { decodedToken } from "@/utils/jwt";
import { getFromLocalStorage, setToLocalStorage } from "@/utils/local-storage";

export const storeUserInfo = ({ accessToken }: { accessToken: string }) => {
  setToLocalStorage(AUTH_KEY, accessToken as string);
};
export const storeUserId = ({ userId }: { userId: string }) => {
  setToLocalStorage(USER_KEY, userId as string);
};
export const storeExpriedOTPTime = ({ expiresAt }: { expiresAt: string }) => {
  setToLocalStorage(EXPIRE_KEY, expiresAt as string);
};

export const getUserInfo = () => {
  const authToken = getFromLocalStorage(AUTH_KEY);

  if (authToken) {
    const decodedData = decodedToken(authToken);

    return decodedData;
  } else {
    return "";
  }
};
export const getUserId = () => {
  const userId = getFromLocalStorage(USER_KEY);

  if (userId) {
    return userId;
  } else {
    return "";
  }
};
export const getOTPTime = () => {
  const expiresAt = getFromLocalStorage(EXPIRE_KEY);

  if (expiresAt) {
    return expiresAt;
  } else {
    return "";
  }
};

export const isLoggedIn = () => {
  const authToken = getFromLocalStorage(AUTH_KEY);

  return !!authToken;
};

export const removeUserInfo = (key: string) => {
  return localStorage.removeItem(key);
};

export const getNewAccessToken = async () => {
  console.log("dfsadf");
  return await axiosInstance({
    url: `https://e-pharma-backend.vercel.app/api/v1/auth/refresh-token`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
};
