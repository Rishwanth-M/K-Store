export const setItem = (key, data) => {
  if (typeof data === "string") {
    localStorage.setItem(key, data);
  } else {
    localStorage.setItem(key, JSON.stringify(data));
  }
};

export const getItem = (key) => {
  const value = localStorage.getItem(key);
  if (!value) return null;

  try {
    return JSON.parse(value); // objects, arrays
  } catch (err) {
    return value; // strings (JWT token)
  }
};

export const removeItem = (key) => {
  localStorage.removeItem(key);
};
