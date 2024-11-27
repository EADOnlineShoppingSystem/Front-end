import axiosInstance from "./ApiClient";

const cartServices={

    getCartDetailsByUserID:async(userId)=>{
        try {
            const responce =await axiosInstance.get(`/order/api/cart/getCartsByuser/${userId}`);
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
    deleteCart:async(cartId)=>{
        try {
            const responce =await axiosInstance.delete(`/order/api/cart/deleteCart/${cartId}`);
            console.log("llllllllll",responce);
            return responce.data;
        } catch (error) {
             if (error instanceof Error) {
                console.error('An error occurred:', error.message);
            } else {
                console.error('An unknown error occurred');
            }
        }
    },
}
export default cartServices;