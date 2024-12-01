import axiosInstance from "./ApiClient";
import { getAuthData } from '../utils/encript';

const orderServices = {
  getAllOrders: async () => {
    try {
      const responce = await axiosInstance.get("/order/api/orders/allOrders");
      return responce;
    } catch (error) {
      if (error instanceof Error) {
        console.error("An error occurred:", error.message);
      } else {
        console.error("An unknown error occurred");
      }
    }
  },

  getOrderByUserId: async () => {
    try {
      const authData = getAuthData();
      const userId = authData?.user?._id;
      if (!userId) {
        throw new Error("User ID not found");
      }
      const response = await axiosInstance.get(
        `/order/api/orders/getOdersByUserId`
      );
      console.log("getOrderByUserId response:", response);
      return response;
    } catch (error) {
      console.error("Error in getOrderByUserId:", error);
      throw error;
    }
  },

  createOrder: async (order) => {
    try {
      const responce = await axiosInstance.post(
        "/order/api/orders/createOrder",
        order
      );
      return responce.data;
    } catch (error) {
      if (error instanceof Error) {
        console.error("An error occurred:", error.message);
      } else {
        console.error("An unknown error occurred");
      }
    }
  },
  createAddress: async (address) => {
    try {
      const response = await axiosInstance.post(
        "/order/api/orders/setAddress",
        address
      );
      return response.data;
    } catch (error) {
      // Properly handle and throw the error with message
      if (error.response) {
        // Server responded with error
        throw new Error(
          error.response.data.message || "Failed to save address"
        );
      } else if (error.request) {
        // Request made but no response
        throw new Error("No response from server");
      } else {
        // Other errors
        throw new Error(error.message || "An unknown error occurred");
      }
    }
  },

  getAddressById: async () => {
    try {
      const responce = await axiosInstance.get(
        "/order/api/orders/getAddressById"
      );
      return responce.data;
    } catch (error) {
      if (error instanceof Error) {
        console.error("An error occurred:", error.message);
      } else {
        console.error("An unknown error occurred");
      }
    }
  },

  deleteAddressByUserId: async (addressId) => {
    try {
      const responce = await axiosInstance.delete(
        `/order/api/orders/deleteAddress/${addressId}`
      );
      return responce.data;
    } catch (error) {
      if (error instanceof Error) {
        console.error("An error occurred:", error.message);
      } else {
        console.error("An unknown error occurred");
      }
    }
  },
changeDeleveryStatus:async (orderId) => {
    try {
      const responce = await axiosInstance.put(
        `/order/api/orders/deleveryStatusTrue/${orderId}`
      );
      return responce.data;
    } catch (error) {
      if (error instanceof Error) {
        console.error("An error occurred:", error.message);
      } else {
        console.error("An unknown error occurred");
      }
  }
}
};

export default orderServices;
