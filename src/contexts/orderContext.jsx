"use client";

import { createContext, useReducer, useEffect } from "react";
import { saveOrderData,getOrderData } from "../utils/encript"; // Reuse or create encryption utilities

// Initial state for order data
const initialOrderState = {
  order: null,
};

// Reducer to manage order state
const orderReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ORDER": {
      const newState = {
        order: action.payload,
      };
      saveOrderData("orderData", newState); // Save encrypted order data in session storage
      return newState;
    }
    case "CLEAR_ORDER": {
      sessionStorage.removeItem("orderData");
      return initialOrderState;
    }
    default:
      return state;
  }
};

// Create context for order data
export const OrderContext = createContext(null);

// Context provider component
export const OrderContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(orderReducer, initialOrderState);

  useEffect(() => {
    console.log("OrderContextProvider useEffect");
    const storedState = getOrderData("orderData");
    console.log("getData ",storedState) // Retrieve encrypted order data
    if (storedState && storedState.order) {
      dispatch({
        type: "ADD_ORDER",
        payload: {
          order: storedState.order,
        },
      });
    }
  }, []);

  console.log("OrderContextProvider state:", state);

  return (
    <OrderContext.Provider value={{ state, dispatch }}>
      {children}
    </OrderContext.Provider>
  );
};
