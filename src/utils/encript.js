import CryptoJS from "crypto-js";

const SECRET_KEY = "your_secret_key";

// Function to encrypt authentication data
export const encryptData = (data) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

// Function to decrypt authentication data
export const decryptData = (encryptedData) => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

// Save authentication data in session storage
export const saveAuthData = (data) => {
  const encryptedData = encryptData(data);
  sessionStorage.setItem("authData", encryptedData);
};

// Retrieve authentication data from session storage
export const getAuthData = () => {
  const encryptedData = sessionStorage.getItem("authData");
  if (encryptedData) {
    try {
      return decryptData(encryptedData);
    } catch (error) {
      console.error("Failed to decrypt session data:", error);
      return null;
    }
  }
  return null;
};

// Clear authentication data from session storage
export const clearAuthData = () => {
  sessionStorage.removeItem("authData");
};

// Retrieve only the token from authentication data
export const getAuthToken = () => {
  const authData = getAuthData();
  return authData?.token || null;
};
