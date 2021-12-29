export const setStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getStorage = (key) => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : undefined;
};

export const removeStorage = (key) => {
  return localStorage.removeItem(key);
};

export const clearStorage = () => {
  return localStorage.clear();
};
