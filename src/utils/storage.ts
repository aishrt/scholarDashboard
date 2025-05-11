const storagePrefix = 'trux_';

const storage = {
  setToken: (token: string) => {
    window.localStorage.setItem(`${storagePrefix}token`, JSON.stringify(token));
  },
  getToken: () => {
    const token = window.localStorage.getItem(`${storagePrefix}token`);
    if (!token) return null;
    try {
      return JSON.parse(token);
    } catch (error) {
      return token; // Return raw token if JSON parsing fails
    }
  },
  clearToken: () => {
    window.localStorage.removeItem(`${storagePrefix}token`);
  },

  setEmail: (token: string) => {
    window.localStorage.setItem(`${storagePrefix}email`, JSON.stringify(token));
  },
  getEmail: () => {
    const email = window.localStorage.getItem(`${storagePrefix}email`);
    if (!email) return null;
    try {
      return JSON.parse(email);
    } catch (error) {
      return null; // Return null if email is invalid
    }
  },
  clearEmail: () => {
    window.localStorage.removeItem(`${storagePrefix}email`);
  },
};

export default storage;
