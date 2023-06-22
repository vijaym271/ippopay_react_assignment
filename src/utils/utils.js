export const setItemToSession = (key, value) => {
    sessionStorage.setItem(key, JSON.stringify(value));
}

export const getItemFromSession = (key) => {
    const value = sessionStorage.getItem(key);
    return JSON.parse(value);
}

export const removeItemFromSession = (key) => {
    sessionStorage.removeItem(key);
}

export const clearSession = () => {
    sessionStorage.clear();
}