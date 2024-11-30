import axiosInstance from "./ApiClient";

const cartServices={

    getCartDetailsByUserID:async()=>{
        try {
            console.log("get data from api");
            const responce =await axiosInstance.get("/order/api/cart/getCartsByuser");
            console.log(responce.data);
            return responce.data;
        } catch (error) {
             if (error instanceof Error) {
                console.error('An error occurred:', error.message);
            } else {
                console.error('An unknown error occurred');
            }
        }
    },
    addToCart:async(cartdata)=>{
        try {
            const responce =await axiosInstance.post("/order/api/cart/addtocart",cartdata);
            return responce.data;
        } catch (error) {
             if (error instanceof Error) {
                console.error('An error occurred:', error.message);
            } else {
                console.error('An unknown error occurred');
            }
        }
    },
  deleteFromCart:async(cartId)=>{
    try {
        console.log("remove from cart");
        const responce =await axiosInstance.delete(`/order/api/cart/deleteCart/${cartId}`);
        console.log(responce.data);
        return responce.data;
       
    } catch (error) {
         if (error instanceof Error) {
            console.error('An error occurred:', error.message);
        } else {
            console.error('An unknown error occurred');
        }
    }
  },

  getAllQuantityByUsers:async()=>{
    try {
        console.log("get all quantity");
        const responce =await axiosInstance.get("/order/api/cart/getAllQuantityByUsers");
        console.log("get all quantity",responce.data);
        return responce.data;
       
    } catch (error) {
         if (error instanceof Error) {
            console.error('An error occurred:', error.message);
        } else {
            console.error('An unknown error occurred');
        }
    }
      
  },

  updateCartQuantity:async(cartId,quantity)=>{
    try {
        console.log("remove from cart");
        const responce =await axiosInstance.put(`/order/api/cart/updateCart/`,quantity);
        console.log("updated quentitu",responce.data);
        return responce.data;
       
    } catch (error) {
         if (error instanceof Error) {
            console.error('An error occurred:', error.message);
        } else {
            console.error('An unknown error occurred');
        }
    }
  }


}
export default cartServices;