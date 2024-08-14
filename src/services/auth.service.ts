import { AUTH_KEY, USER_KEY } from "@/constants/storageKey";
import { decodedToken } from "@/utils/jwt";
import { getFromLocalStorage, setToLocalStorage } from "@/utils/local-storage";

export const storeUserInfo = ({ accessToken }: { accessToken: string }) => {
  console.log(accessToken);
  setToLocalStorage(AUTH_KEY, accessToken as string);
};
export const storeUserId = ({ userId }: { userId: string }) => {
  setToLocalStorage(USER_KEY, userId as string);
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

export const isLoggedIn = () => {
  const authToken = getFromLocalStorage(AUTH_KEY);

  return !!authToken;
};

export const removeUserInfo = (key: string) => {
  return localStorage.removeItem(key);
};
