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
}
export default cartServices;