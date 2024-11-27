import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import productServices from "../../Services/product.services";

const NewProducts = () => {
  const [hoveredStates, setHoveredStates] = useState({});
  const [selectedColors, setSelectedColors] = useState({});
  const [newProducts, setNewProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleMouseEnter = (index) => {
    setHoveredStates((prev) => ({ ...prev, [index]: true }));
  };

  const handleMouseLeave = (index) => {
    setHoveredStates((prev) => ({ ...prev, [index]: false }));
  };

  const handleColorSelect = (productIndex, variantIndex) => {
    setSelectedColors((prev) => ({ ...prev, [productIndex]: variantIndex }));
  };

  const getColorHex = (colorName) => {
    const colorMap = {
      Silver: "#C0C0C0",
      Graphite: "#383838",
      White: "#FFFFFF",
      Black: "#000000",
      Gray: "#808080",
      Blue: "#0000FF",
      Red: "#FF0000",
      Green: "#00FF00",
    };
    return colorMap[colorName] || "#000000";
  };

  // Fetch the newest products
  const fetchNewProducts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await productServices.getAllProducts();

      if (response && response.products && response.products.length > 0) {
        // Transform and sort products
        const transformedProducts = response.products
          .map((product) => ({
            id: product._id,
            title: product.productTitle || "Unnamed Product",
            href: `/product/${product._id}`,
            defaultImage:
              product.images && product.images.length > 0
                ? product.images[0]
                : "/placeholder.jpg",
            defaultHoverImage:
              product.images && product.images.length > 1
                ? product.images[1]
                : "/placeholder.jpg",
            price: `LKR ${parseFloat(product.lowestPrice).toFixed(
              2
            )} - LKR ${parseFloat(product.largestPrice).toFixed(2)}`,
            updatedAt: product.updatedAt
              ? new Date(product.updatedAt).toLocaleDateString()
              : "No update date",
            variants: product.colors
              ? product.colors.map((color, index) => ({
                  color: color,
                  colorHex: getColorHex(color),
                  variantImage:
                    product.images && product.images[index]
                      ? product.images[index]
                      : "/placeholder.jpg",
                }))
              : [],
          }))
          //Sort by most recently updated if updatedAt is available
          .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
          // Limit to top 10 newest products
          .slice(0, 10);

        setNewProducts(transformedProducts);
      } else {
        throw new Error("No products found");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to load products. Please try again later.");
      setNewProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNewProducts();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full text-center py-8">
        <div role="status">
          <svg
            aria-hidden="true"
            className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908 C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4859 97.8624 35.9016 97.0079 33.5492C95.2932 28.8109 92.871 24.3684 89.8167 20.3484C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8602 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
        <p className="mt-4 text-gray-600">Loading newest products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full text-center py-8">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={fetchNewProducts}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry Loading
        </button>
      </div>
    );
  }

  // no products state
  if (newProducts.length === 0) {
    return (
      <div className="w-full text-center py-8">
        <p className="text-gray-600">No products found.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="pb-4 sm:pb-6 lg:pb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-3xl font-semibold">
            The latest. Take a look at{" "}
            <span className="bg-gradient-to-r from-blue-600 to-pink-600 inline-block text-transparent bg-clip-text">
              what&apos;s new,
            </span>{" "}
            right now.
          </h2>
        </div>

        <div className="overflow-hidden">
          <Swiper
            slidesPerView={1.2}
            spaceBetween={8}
            className="overflow-visible"
            breakpoints={{
              300: { slidesPerView: 1, spaceBetween: 8 },
              320: { slidesPerView: 1, spaceBetween: 8 },
              400: { slidesPerView: 1, spaceBetween: 8 },
              540: { slidesPerView: 1, spaceBetween: 8 },
              680: { slidesPerView: 3, spaceBetween: 8 },
              768: { slidesPerView: 4, spaceBetween: 8 },
              1024: { slidesPerView: 4, spaceBetween: 8 },
              1280: { slidesPerView: 4, spaceBetween: 8 },
              1536: { slidesPerView: 4, spaceBetween: 8 },
            }}
          >
            {newProducts.map((product, productIndex) => {
              const selectedVariantIndex = selectedColors[productIndex] || 0;
              const selectedVariant =
                product.variants[selectedVariantIndex] || product.variants[0];

              return (
                <SwiperSlide key={product.id || productIndex}>
                  <div className="m-2">
                    <div className="bg-white rounded-xl shadow-lg w-full p-2">
                      <div
                        className="w-full aspect-square group flex flex-col mb-5"
                        onMouseEnter={() => handleMouseEnter(productIndex)}
                        onMouseLeave={() => handleMouseLeave(productIndex)}
                      >
                        <a
                          href={product.href}
                          className="block flex-1 flex flex-col focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                          aria-label={`View ${product.title} category`}
                        >
                          <div className="relative flex-1 overflow-hidden bg-white flex items-center justify-center">
                            <div className="transition-transform duration-900 ease-in-out group-hover:scale-110 w-full h-full flex items-center justify-center">
                              {selectedVariant && (
                                <img
                                  className="w-full h-full object-contain p-2"
                                  src={selectedVariant.variantImage}
                                  alt={`${product.title} in ${selectedVariant.color}`}
                                  loading="lazy"
                                />
                              )}
                              {hoveredStates[productIndex] &&
                                !selectedVariant && (
                                  <img
                                    className="w-full h-full object-contain p-2"
                                    src={product.defaultHoverImage}
                                    alt={`${product.title} hover view`}
                                    loading="lazy"
                                  />
                                )}
                              {!hoveredStates[productIndex] &&
                                !selectedVariant && (
                                  <img
                                    className="w-full h-full object-contain p-2"
                                    src={product.defaultImage}
                                    alt={`${product.title} default view`}
                                    loading="lazy"
                                  />
                                )}
                            </div>
                          </div>

                          <div className="mt-4 text-center">
                            <h3 className="text-lg font-medium text-gray-800 dark:text-white transition-colors duration-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                              {product.title}
                            </h3>
                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                              {selectedVariant
                                ? selectedVariant.color
                                : "Available Colors"}
                            </p>
                          </div>
                        </a>

                        {/* Color Selection Circles */}
                        <div className="flex justify-center gap-2 mt-2 mb-4">
                          {product.variants.map((variant, variantIndex) => (
                            <button
                              key={variant.color}
                              onClick={() =>
                                handleColorSelect(productIndex, variantIndex)
                              }
                              className={`w-6 h-6 rounded-full m-1 cursor-pointer transition-transform duration-800 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 ${
                                selectedVariantIndex === variantIndex
                                  ? "ring-2 ring-gray-200 ring-offset-2 focus:ring-gray-400"
                                  : ""
                              }`}
                              style={{
                                backgroundColor: variant.colorHex,
                                border:
                                  variant.colorHex === "#FFFFFF"
                                    ? "1px solid #E5E5E5"
                                    : "none",
                              }}
                              aria-label={`Select ${variant.color} color`}
                            />
                          ))}
                        </div>
                        <div className="text-center">
                          <p className="mt-1 text-md font-semibold text-blue-500 dark:text-gray-300">
                            {product.price}
                          </p>
                        </div>
                        <div className="w-full flex justify-center mt-2">
                          <button
                            type="button"
                            className="mt-3 mb-2 inline-flex items-center justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-sm font-medium text-white transition-all duration-300 ease-in-out transform hover:bg-blue-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 w-auto sm:w-auto"
                          >
                            <svg
                              className="h-4 w-4 transition-transform duration-300 ease-in-out group-hover:scale-110"
                              fill="none"
                              viewBox=" 0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                              />
                            </svg>
                            <span className="ml-2">Add to Cart</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default NewProducts;
