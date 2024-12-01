import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import productServices from "../../Services/product.services";

const AppleWatch = () => {
  const navigate = useNavigate();
  const [hoveredStates, setHoveredStates] = useState({});
  const [selectedColors, setSelectedColors] = useState({});
  const [watches, setWatches] = useState([]);
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

  const fetchWatches = async () => {
    try {
      setIsLoading(true);
      const response = await productServices.getAllWatches();

      if (response && response.products) {
        const transformedWatches = response.products.map((watch) => {
          // Parse colors array
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
            return [];
          };

          // Get the colors array
          const colors = parseColors(watch.colors);

          // Create variants array with colors and corresponding images
          const variants = colors.map((color, index) => ({
            color: color,
            colorHex: color,
            variantImage:
              watch.images && watch.images[index]
                ? watch.images[index].url
                : "/placeholder.jpg",
          }));

          return {
            ...watch,
            href: `/product/${watch._id}`,
            productPrice: `LKR ${parseFloat(watch.lowestPrice).toFixed(
              2
            )} - LKR ${parseFloat(watch.largestPrice).toFixed(2)}`,
            variants: variants,
            defaultImage:
              watch.images && watch.images[0]
                ? watch.images[0].url
                : "/placeholder.jpg",
            defaultHoverImage:
              watch.images && watch.images[1]
                ? watch.images[1].url
                : "/placeholder.jpg",
          };
        });

        setWatches(transformedWatches);
        setError(null);
      } else {
        throw new Error("No watches found");
      }
    } catch (error) {
      console.error("Error fetching watches:", error);
      setError("Failed to load watches");
    } finally {
      setIsLoading(false);
    }
  };

  const handleProductClick = (href) => {
    navigate(href);
  };

  useEffect(() => {
    fetchWatches();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="w-full">
      <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="pb-4 sm:pb-6 lg:pb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-3xl font-semibold">
            Apple Watch{" "}
            <span className="bg-gradient-to-r from-blue-600 to-pink-600 inline-block text-transparent bg-clip-text transition-all duration-700 ease-in-out hover:from-pink-600 hover:to-blue-600">
              The ultimate device
            </span>{" "}
            for a healthy life.
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
            {watches.map((watch, productIndex) => {
              const selectedVariantIndex = selectedColors[productIndex] || 0;
              const selectedVariant =
                watch.variants[selectedVariantIndex] || watch.variants[0];

              return (
                <SwiperSlide key={watch._id}>
                  <div
                    className="m-2 transform transition-all duration-300 hover:scale-103 cursor-pointer"
                    onClick={() => handleProductClick(watch.href)}
                  >
                    <div className="bg-white rounded-xl shadow-sm w-full p-5 transition-shadow duration-300 hover:shadow-md">
                      <div
                        className="w-full aspect-square group flex flex-col"
                        onMouseEnter={() => handleMouseEnter(productIndex)}
                        onMouseLeave={() => handleMouseLeave(productIndex)}
                      >
                        <div className="block flex-1 flex flex-col focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300">
                          <div className="relative h-48 sm:h-60 md:h-72 overflow-hidden bg-white flex items-center justify-center">
                            <div className="absolute inset-0 w-full h-full transition-all duration-700 ease-in-out transform group-hover:scale-110">
                              {selectedVariant && (
                                <img
                                  className="absolute inset-0 w-full h-full object-contain transition-opacity duration-700 ease-in-out"
                                  src={selectedVariant.variantImage}
                                  alt={`${watch.productTitle} in ${selectedVariant.color}`}
                                  loading="lazy"
                                />
                              )}
                              {hoveredStates[productIndex] &&
                                !selectedVariant && (
                                  <img
                                    className="absolute inset-0 w-full h-full object-contain transition-opacity duration-700 ease-in-out"
                                    src={watch.defaultHoverImage}
                                    alt={`${watch.productTitle} hover view`}
                                    loading="lazy"
                                  />
                                )}
                              {!hoveredStates[productIndex] &&
                                !selectedVariant && (
                                  <img
                                    className="absolute inset-0 w-full h-full object-contain transition-opacity duration-700 ease-in-out"
                                    src={watch.defaultImage}
                                    alt={`${watch.productTitle} default view`}
                                    loading="lazy"
                                  />
                                )}
                            </div>
                          </div>

                          <div className="text-center transform transition-transform duration-300">
                            <h3 className="text-md font-semibold text-shadow-lg text-gray-800 dark:text-white transition-colors duration-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                              {watch.productTitle}
                            </h3>
                            
                          </div>

                          <div className="flex justify-center gap-2 mt-2">
                            {watch.variants.map((variant, variantIndex) => (
                              <button
                                key={variantIndex}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleColorSelect(productIndex, variantIndex);
                                }}
                                className={`w-6 h-6 rounded-full m-1 cursor-pointer transition-transform duration-800 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 ${
                                  selectedVariantIndex === variantIndex
                                    ? "ring-2 ring-gray-200 ring-offset-2 focus:ring-gray-400"
                                    : ""
                                }`}
                                style={{
                                  backgroundColor: variant.colorHex,
                                  border:
                                    variant.colorHex === "#FFFFFF" ||
                                    variant.colorHex === "#F5F5F0"
                                      ? "1px solid #E5E5E5"
                                      : "none",
                                }}
                                aria-label={`Select ${variant.color} color`}
                              />
                            ))}
                          </div>

                          <div className="text-center">
                            <p className="mt-1 text-md font-semibold text-blue-500 dark:text-gray-300 transition-colors duration-300">
                              {watch.productPrice}
                            </p>
                          </div>

                          {/* <div className="w-full flex justify-center mt-2">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                // Add cart functionality here
                              }}
                              className="mt-3 mb-2 inline-flex items-center justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-sm font-medium text-white transition-all duration-300 ease-in-out transform hover:bg-blue-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 w-auto sm:w-auto"
                            >
                              <svg
                                className="h-4 w-4 transition-transform duration-300 ease-in-out group-hover:scale-110"
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
                          </div> */}
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

export default AppleWatch;
