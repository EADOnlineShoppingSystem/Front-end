import { OrderContext } from "../contexts/orderContext";
import { useContext } from "react";

export function useOrderContext() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("orderContext must be used within an OrderContextProvider");
  }
  return context;
}
