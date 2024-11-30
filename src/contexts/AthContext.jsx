"use client";

import { createContext, useReducer, useEffect, useContext } from "react";
import { saveAuthData, getAuthData, getAuthToken } from "../utils/encript";

// Initial state for authentication
const initialState = {
  user: null,
  token: null,
  isLoggedIn: false,
};

// Reducer to manage authentication state
const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN": {
      const newState = {
        user: action.payload.user,
        token: action.payload.token,
        isLoggedIn: true,
      };
      saveAuthData(newState);
      return newState;
    }
    case "LOGOUT": {
      sessionStorage.removeItem("authData");
      return {
        user: null,
        token: null,
        isLoggedIn: false,
      };
    }
    case "UPDATE":{
      const newState = {
        user: action.payload.user,
        token: getAuthToken(),
        isLoggedIn: true,
      };
      saveAuthData(newState);
      return newState;
    }
    default:
      return state;
  }
};

// Create context for authentication
export const AuthContext = createContext(null);

// Custom hook for using auth context
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuthContext must be used within an AuthContextProvider"
    );
  }
  return context;
};

// Context provider component
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const storedState = getAuthData();
    if (
      storedState &&
      storedState.user !== null && 
      storedState.token !== null
    ) {
      dispatch({
        type: "LOGIN",
        payload: {
          user: storedState.user,
          token: storedState.token,
        },
      });
    }
  }, []);

  console.log("AuthContextProvider state:", state);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
