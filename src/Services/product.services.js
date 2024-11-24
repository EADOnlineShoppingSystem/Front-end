import axiosInstance from "./ApiClient";

const productServices = {
  // Add a new category
  // addCategory: async (category) => {
  //   try {
  //     const response = await axiosInstance.post(
  //       "/products/api/categories/add-category",
  //       category
  //     );
  //     return response.data;
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       console.error("An error occurred:", error.message);
  //     } else {
  //       console.error("An unknown error occurred");
  //     }
  //   }
  // },

  // // Add a new product
  // addProduct: async (product) => {
  //   try {
  //     const response = await axiosInstance.post(
  //       "/products/api/products/add-product",
  //       product
  //     );
  //     return response.data;
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       console.error("An error occurred:", error.message);
  //     } else {
  //       console.error("An unknown error occurred");
  //     }
  //   }
  // },

  // //Get all  Category
  // getAllCategories: async () => {
  //   try {
  //     const response = await axiosInstance.get("/products/api/categories");
  //     return response.data;
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       console.error("An error occurred:", error.message);
  //     } else {
  //       console.error("An unknown error occurred");
  //     }
  //   }
  // },


  // // Fetch Products by Category Id
  // getProductsByCategoryId: async (categoryId) => {
  //   try {
  //     const response = await axiosInstance.get(
  //       `/products/api/products/category/${categoryId}`
  //     );
  //     return response.data;
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       console.error("An error occurred:", error.message);
  //     } else {
  //       console.error("An unknown error occurred");
  //     }
  //   }
  // },

  // // Fetch Product Details by Product ID
  // getProductDetailsByProductId: async (productId) => {
  //   try {
  //     const response = await axiosInstance.get(
  //       `/products/api/products/product/${productId}`
  //     );
  //     return response.data;
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       console.error("An error occurred:", error.message);
  //     } else {
  //       console.error("An unknown error occurred");
  //     }
  //   }
  // },
};

export default productServices;
