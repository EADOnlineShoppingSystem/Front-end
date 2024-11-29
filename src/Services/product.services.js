import axiosInstance from "./ApiClient";

const productServices = {
  // Get all Products - Correct fetch (CategoryPage Page Data)
  getAllProducts: async () => {
    try {
      const response = await axiosInstance.get(
        "Product/api/products/all-products"
      );
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        console.error("An error occurred:", error.message);
      } else {
        console.error("An unknown error occurred");
      }
    }
  },

  // Get all Categories- Correct fetch (Popular categories Page Data)
  getAllCategories: async () => {
    try {
      const response = await axiosInstance.get(
        "/Product/api/products/categories"
      );
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        console.error("An error occurred:", error.message);
      } else {
        console.error("An unknown error occurred");
      }
    }
  },

  // Get all watches - Correct fetch (Watch Page Data)
  getAllWatches: async () => {
    try {
      const response = await axiosInstance.get(
        "/Product/api/products/getProducts/AppleWatch"
      );
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        console.error("An error occurred:", error.message);
      } else {
        console.error("An unknown error occurred");
      }
    }
  },

  // Get all iPhones - Correct fetch (iPhones Categroy Page)
  getAllIphones: async () => {
    try {
      const response = await axiosInstance.get(
        "/Product/api/products/getProducts/iPhone"
      );
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        console.error("An error occurred:", error.message);
      } else {
        console.error("An unknown error occurred");
      }
    }
  },

  // Get all iPads - Correct fetch (iPads Page Data)
  getAllIpads: async () => {
    try {
      const response = await axiosInstance.get(
        "/Product/api/products/getProducts/IPad"
      );
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        console.error("An error occurred:", error.message);
      } else {
        console.error("An unknown error occurred");
      }
    }
  },

  // Get all MacProducts - Correct fetch (MacProducts Page Data)
  getAllMacProducts: async () => {
    try {
      const response = await axiosInstance.get(
        "/Product/api/products/getProducts/MackBook"
      );
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        console.error("An error occurred:", error.message);
      } else {
        console.error("An unknown error occurred");
      }
    }
  },


  // Fetch Products by Category Name
  getProductsByCategoryName: async (categoryName) => {
    try {
      const response = await axiosInstance.get(
        `Product/api/products/getProducts/${categoryName}`
      );
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        console.error("An error occurred:", error.message);
      } else {
        console.error("An unknown error occurred");
      }
    }
  },

  // Fetch Product Details by Product ID
  getProductDetailsByProductId: async (productId) => {
    try {
      const response = await axiosInstance.get(
        `/Product/api/products/product/${productId}`
      );
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        console.error("An error occurred:", error.message);
      } else {
        console.error("An unknown error occurred");
      }
    }
  },
};

export default productServices;
