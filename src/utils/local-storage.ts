export const setToLocalStorage = (key: string, value: string) => {
  if (!key || typeof window === "undefined") {
    return "";
  } else {
    return localStorage.setItem(key, value);
  }
};

export const getFromLocalStorage = (key: string) => {
  if (!key || typeof window === "undefined") {
    return "";
  } else {
    return localStorage.getItem(key);
  }
};
