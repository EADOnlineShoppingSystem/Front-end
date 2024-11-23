import axiosInstance from "./ApiClient";

const orderServices={

    getAllOrders:async()=>{
        try {
            const responce =await axiosInstance.get("/order/api/orders/allOrders");
            return responce.data;
        } catch (error) {
             if (error instanceof Error) {
                console.error('An error occurred:', error.message);
            } else {
                console.error('An unknown error occurred');
            }
        }
    },
    getOrderByUserId:async(id)=>{
        try {
            const responce =await axiosInstance.get(`/orders/api/orders/getOdersByUserId/${id}`);
            return responce.data;
        } catch (error) {
             if (error instanceof Error) {
                console.error('An error occurred:', error.message);
            } else {
                console.error('An unknown error occurred');
            }
        }
    },
    createOrder :async(order)=>{
        try {
            const responce =await axiosInstance.post("/order/api/orders/createOrder",order);
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
export default orderServices;