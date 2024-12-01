import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import productServices from "../../services/product.services";

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

  const fetchNewProducts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await productServices.getAllProducts();

      if (response && response.products && response.products.length > 0) {
        const transformedProducts = response.products
          .map((product) => {
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

            const colors = parseColors(product.colors);
            const images = product.images || [];

            return {
              id: product._id,
              title: product.productTitle || "Unnamed Product",
              href: `/product/${product._id}`,
              defaultImage: images[0]?.url || "/placeholder.jpg",
              defaultHoverImage: images[1]?.url || "/placeholder.jpg",
              price: `LKR ${parseFloat(product.lowestPrice).toFixed(
                2
              )} - LKR ${parseFloat(product.largestPrice).toFixed(2)}`,
              createdAt: product.createdAt,
              updatedAt: product.createdAt
                ? new Date(product.createdAt).toLocaleDateString()
                : "No update date",
              variants: colors.map((color, index) => ({
                color: color,
                colorHex: color,
                variantImage: images[index]?.url || "/placeholder.jpg",
              })),
            };
          })
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
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
          <h2 data-testid="the-latest" className="text-xl sm:text-2xl md:text-3xl lg:text-3xl font-semibold">
            The latest. Take a look at{" "}
            <span data-testid="whats-new" className="bg-gradient-to-r from-blue-600 to-pink-600 inline-block text-transparent bg-clip-text">
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
              modules={[Navigation, Pagination]}
              navigation={false}
              pagination={false}
              slidesPerView={1.2}
              spaceBetween={8}
              className="overflow-visible pb-12"
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
                      <div className="bg-white rounded-xl shadow-lg w-full  min-h-[400px] sm:min-h-[450px] md:min-h-[450px] flex flex-col">
                        {/* Image Container */}
                        <div
                          className="relative w-full pt-[100%] sm:pt-[90%] md:pt-[100%] group overflow-hidden "
                          onMouseEnter={() => handleMouseEnter(productIndex)}
                          onMouseLeave={() => handleMouseLeave(productIndex)}
                        >
                          <a
                            href={product.href}
                            className="absolute inset-0 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            aria-label={`View ${product.title} category`}
                          >
                            <div className="absolute inset-0 flex items-center justify-center ">
                              <div className="w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-110 flex items-center justify-center">
                                {selectedVariant && (
                                  <img
                                    className="w-full h-full object-contain"
                                    src={selectedVariant.variantImage}
                                    alt={`${product.title} in ${selectedVariant.color}`}
                                    loading="lazy"
                                  />
                                )}
                                {hoveredStates[productIndex] &&
                                  !selectedVariant && (
                                    <img
                                      className="w-full h-full object-contain"
                                      src={product.defaultHoverImage}
                                      alt={`${product.title} hover view`}
                                      loading="lazy"
                                    />
                                  )}
                                {!hoveredStates[productIndex] &&
                                  !selectedVariant && (
                                    <img
                                      className="w-full h-full object-contain"
                                      src={product.defaultImage}
                                      alt={`${product.title} default view`}
                                      loading="lazy"
                                    />
                                  )}
                              </div>
                            </div>
                          </a>
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 flex flex-col px-4">
                          <a
                            href={product.href}
                            className="block focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                          >
                            <h3 className="text-base sm:text-lg font-medium text-gray-800 text-center line-clamp-2">
                              {product.title}
                            </h3>
                          </a>

                          {/* Color Selection */}
                          <div className="flex justify-center gap-1 sm:gap-2 mt-3">
                            {product.variants.map((variant, variantIndex) => (
                              <button
                                key={`${product.id}-${variant.colorHex}`}
                                onClick={() =>
                                  handleColorSelect(productIndex, variantIndex)
                                }
                                className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full cursor-pointer transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 ${
                                  selectedVariantIndex === variantIndex
                                    ? "ring-2 ring-gray-200 ring-offset-2"
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

                          {/* Price */}
                          <div className="text-center mt-3">
                            <p className="text-sm sm:text-md font-semibold text-blue-500">
                              {product.price}
                            </p>
                          </div>

                          {/* Add to Cart Button */}
                          <div className="mt-4 flex justify-center mb-10">
                            <button
                              type="button"
                              className="inline-flex items-center justify-center rounded-md border border-transparent px-3 py-2 sm:px-4 sm:py-2 bg-blue-500 text-sm font-medium text-white transition-all duration-300 hover:bg-blue-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                              <svg
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
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
        )}
      </div>
    </div>
  );
};

export default NewProducts;
