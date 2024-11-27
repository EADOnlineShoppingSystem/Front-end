import { useState, useEffect } from "react";
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

  // Fetch the newest products
const fetchNewProducts = async () => {
  try {
    setIsLoading(true);
    setError(null);
    const response = await productServices.getAllProducts();

    if (response && response.products && response.products.length > 0) {
      // Transform and sort products
      const transformedProducts = response.products
        .map((product) => {
          // Robust color parsing
          const parseColors = (colors) => {
            if (Array.isArray(colors)) {
              return colors.flatMap((color) => {
                try {
                  const parsed = JSON.parse(color);
                  return Array.isArray(parsed) ? parsed : [parsed];
                } catch {
                  return color.startsWith("#") ? [color] : [];
                }
              });
            }
            if (typeof colors === "string") {
              try {
                const parsed = JSON.parse(colors);
                return Array.isArray(parsed) ? parsed : [parsed];
              } catch {
                return colors.startsWith("#") ? [colors] : [];
              }
            }
            return [];
          };

          // Parse colors and images
          const colors = parseColors(product.colors);
          const images = product.images || [];

          return {
            id: product._id,
            title: product.productTitle || "Unnamed Product",
            href: `/product/${product._id}`,
            defaultImage:
              images.length > 0
                ? images[0].url || "/placeholder.jpg"
                : "/placeholder.jpg",
            defaultHoverImage:
              images.length > 1
                ? images[1].url || "/placeholder.jpg"
                : "/placeholder.jpg",
            price: `LKR ${parseFloat(product.lowestPrice).toFixed(
              2
            )} - LKR ${parseFloat(product.largestPrice).toFixed(2)}`,
            createdAt: product.createdAt, // Include createdAt for sorting
            updatedAt: product.createdAt
              ? new Date(product.createdAt).toLocaleDateString()
              : "No update date",
            variants: colors.map((color, index) => ({
              color: color,
              colorHex: color, // Directly use the color code
              variantImage: images[index]
                ? images[index].url
                : "/placeholder.jpg",
            })),
          };
        })
        // most recently created products first
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        // top 10 newest products
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
      <div className="w-full flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="w-full text-center py-12 text-red-500">{error}</div>;
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

        {newProducts.length === 0 ? (
          <div className="w-full text-center py-12 text-gray-500">
            No new products available
          </div>
        ) : (
          <div className="overflow-hidden">
            <Swiper
              slidesPerView={1.2}
              spaceBetween={8}
              className="overflow-visible"
              breakpoints={{
                300: { slidesPerView: 1, spaceBetween: 8 },
                320: { slidesPerView: 1, spaceBetween: 8 },
                400: { slidesPerView: 1.2, spaceBetween: 8 },
                540: { slidesPerView: 2, spaceBetween: 8 },
                680: { slidesPerView: 3, spaceBetween: 8 },
                768: { slidesPerView: 3, spaceBetween: 8 },
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
                      <div className="bg-white rounded-xl shadow-lg w-full p-2 h-[450px] flex flex-col">
                        <div
                          className="w-full h-[250px] group flex flex-col mb-2 overflow-hidden"
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
                                    className="max-w-full max-h-full object-contain p-2"
                                    src={selectedVariant.variantImage}
                                    alt={`${product.title} in ${selectedVariant.color}`}
                                    loading="lazy"
                                  />
                                )}
                                {hoveredStates[productIndex] &&
                                  !selectedVariant && (
                                    <img
                                      className="max-w-full max-h-full object-contain p-2"
                                      src={product.defaultHoverImage}
                                      alt={`${product.title} hover view`}
                                      loading="lazy"
                                    />
                                  )}
                                {!hoveredStates[productIndex] &&
                                  !selectedVariant && (
                                    <img
                                      className="max-w-full max-h-full object-contain p-2"
                                      src={product.defaultImage}
                                      alt={`${product.title} default view`}
                                      loading="lazy"
                                    />
                                  )}
                              </div>
                            </div>

                            <div className="mt-2 text-center">
                              <h3 className="text-lg font-medium text-gray-800 dark:text-white transition-colors duration-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                                {product.title}
                              </h3>
                              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                Available Colors
                              </p>
                            </div>
                          </a>
                        </div>

                        {/* Color Selection Circles */}
                        <div className="flex justify-center gap-2 mt-2 mb-2">
                          {product.variants.map((variant, variantIndex) => (
                            <button
                              key={`${product.id}-${variant.colorHex}`}
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
                        <div className="text-center mt-2">
                          <p className="text-md font-semibold text-blue-500 dark:text-gray-300">
                            {product.price}
                          </p>
                        </div>
                        <div className="w-full flex justify-center mt-2">
                          <button
                            type="button"
                            className="mt-auto inline-flex items-center justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-sm font-medium text-white transition-all duration-300 ease-in-out transform hover:bg-blue-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 w-auto sm:w-auto"
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
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewProducts;
