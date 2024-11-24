import axiosInstance from "./ApiClient";

const cartServices={

    getCartDetailsByUserID:async()=>{
        try {
            const responce =await axiosInstance.get("/orders/api/cart/getCartsByuser/:userId");
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
            console.log("data",cartdata);
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
}
export default cartServices;