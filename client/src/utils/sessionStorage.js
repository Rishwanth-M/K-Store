export const setItemSession = (key, value) => {
    if (value === undefined || value === null) return;
    sessionStorage.setItem(key, JSON.stringify(value));
};

export const getItemSession = (key) => {
    try {
        const value = sessionStorage.getItem(key);
        if (!value || value === "undefined") return null;
        return JSON.parse(value);
    } catch (error) {
        console.error("SessionStorage parse error:", error);
        return null;
    }
};

export const removeItemSession = (key) => {
    sessionStorage.removeItem(key);
};
