import { axiosInstance } from "../../utils/axiosConfig";

const register = async (userData) => {
  try {
    const response = await axiosInstance.post("user/register", userData);
    if (response.data) {
      localStorage.setItem("customer", JSON.stringify(response.data));
      return response.data;
    }
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

const login = async (userData) => {
  try {
    const response = await axiosInstance.post("user/login", userData);
    if (response.data) {
      localStorage.setItem("customer", JSON.stringify(response.data));
      return response.data;
    }
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

const getUserWishlist = async () => {
  try {
    const response = await axiosInstance.get("user/wishlist");
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

const addToCart = async (cartData) => {
  try {
    const response = await axiosInstance.post("user/cart", cartData);
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// const getCart = async () => {
//   try {
//     const response = await axiosInstance.get("user/cart");
//     if (response.data) {
//       return response.data;
//     }
//   } catch (error) {
//     throw error.response?.data || error.message;
//   }
// };

const getCart = async () => {
  try {
    const response = await axiosInstance.get("user/cart");
    if (response.data && Array.isArray(response.data)) {
      return response.data;
    } else {
      return []; // Return an empty array if the response is not as expected
    }
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

const removeProductFromCart = async (cartItemId) => {
  try {
    const response = await axiosInstance.delete(
      `user/delete-product-cart/${cartItemId}`
    );
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

const updateProductFromCart = async (cartDetail) => {
  try {
    const response = await axiosInstance.put(
      `user/update-product-cart/${cartDetail.cartItemId}/${cartDetail.quantity}`
    );
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

const createOrder = async (orderDetail) => {
  try {
    const response = await axiosInstance.post(
      `user/cart/create-order`,
      orderDetail
    );
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    throw error.response?.data || error.message;
  }
};



const getUserOrders = async () => {
  try {
    const response = await axiosInstance.get("user/getmyorders");
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

const updateUser = async (data) => {
  try {
    const response = await axiosInstance.put("user/edit-user", data);
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

const forgotPassToken = async (data) => {
  try {
    const response = await axiosInstance.post("user/forgot-password-token", data);
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

const resetPass = async (data) => {
  try {
    const response = await axiosInstance.put( `user/reset-password/${data.token}`,
      { password: data.password });
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    throw error.response?.data || error.message;
  }
};


export const authService = {
  register,
  login,
  getUserWishlist,
  addToCart,
  getCart,
  removeProductFromCart,
  updateProductFromCart,
  createOrder,
  getUserOrders,
  updateUser,
  forgotPassToken,
  resetPass,
};

// import axios from "axios";
// import { base_url } from "../../utils/axiosConfig";

// const register = async(userData)=>{
//     const response = await axios.post(`${base_url}user/register`, userData);
//     if(response.data){
//         if (response.data) {
//             localStorage.setItem("customer", JSON.stringify(response.data));
//         return response.data;
//     }
// }
// };

// // const register = async(userData)=>{
// //     const response = await axios.post(`${base_url}user/register`, userData);
// //     if(response.data){
// //         localStorage.setItem("customer", JSON.stringify(response.data));
// //         return response.data;
// //     }
// // };

// const login = async(userData)=>{
//     const response = await axios.post(`${base_url}user/login`, userData);
//     if(response.data){
//         return response.data;
//     }
// };

// export const authService = {
//     register,
//     login,
// }
