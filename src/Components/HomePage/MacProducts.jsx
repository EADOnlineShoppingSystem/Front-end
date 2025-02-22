import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import productServices from "../../Services/product.services";

const MacProducts = () => {
  const navigate = useNavigate();
  const [hoveredStates, setHoveredStates] = useState({});
  const [selectedColors, setSelectedColors] = useState({});
  const [macs, setMacs] = useState([]);
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

  const fetchMacs = async () => {
    try {
      setIsLoading(true);
      const response = await productServices.getAllMacProducts();

      if (response && response.products) {
        const transformedMacs = response.products.map((mac) => {
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
          const colors = parseColors(mac.colors);

          // Create variants array with colors and corresponding images
          const variants = colors.map((color, index) => ({
            color: color,
            colorHex: color,
            variantImage:
              mac.images && mac.images[index]
                ? mac.images[index].url
                : "/placeholder.jpg",
          }));

          return {
            ...mac,
            href: `/product/${mac._id}`,
            productPrice: `LKR ${parseFloat(mac.lowestPrice).toFixed(
              2
            )} - LKR ${parseFloat(mac.largestPrice).toFixed(2)}`,
            variants: variants,
            defaultImage:
              mac.images && mac.images[0]
                ? mac.images[0].url
                : "/placeholder.jpg",
            defaultHoverImage:
              mac.images && mac.images[1]
                ? mac.images[1].url
                : "/placeholder.jpg",
          };
        });

        setMacs(transformedMacs);
        setError(null);
      } else {
        throw new Error("No products found");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to load products");
    } finally {
      setIsLoading(false);
    }
  };

  const handleProductClick = (href) => {
    navigate(href);
  };

  useEffect(() => {
    fetchMacs();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="w-full">
      <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="pb-4 sm:pb-6 lg:pb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-3xl font-semibold">
            If you can dream it,{" "}
            <span className="bg-gradient-to-r from-blue-600 to-pink-600 inline-block text-transparent bg-clip-text transition-all duration-700 ease-in-out hover:from-pink-600 hover:to-blue-600">
              Mac can do it
            </span>
            .
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
            {macs.map((mac, productIndex) => {
              const selectedVariantIndex = selectedColors[productIndex] || 0;
              const selectedVariant =
                mac.variants[selectedVariantIndex] || mac.variants[0];

              return (
                <SwiperSlide key={mac._id}>
                  <div
                    className="m-2 transform transition-all duration-300 hover:scale-103 cursor-pointer"
                    onClick={() => handleProductClick(mac.href)}
                  >
                    <div className="bg-white rounded-xl shadow-lg w-full p-2">
                      <div
                        className="w-full aspect-square group flex flex-col mb-5"
                        onMouseEnter={() => handleMouseEnter(productIndex)}
                        onMouseLeave={() => handleMouseLeave(productIndex)}
                      >
                        <div className="block flex-1 flex flex-col focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                          <div className="relative flex-1 overflow-hidden bg-white flex items-center justify-center">
                            <div className="transition-transform duration-900 ease-in-out group-hover:scale-110 w-full h-full flex items-center justify-center">
                              {selectedVariant && (
                                <img
                                  className="w-full h-full object-contain p-2"
                                  src={selectedVariant.variantImage}
                                  alt={`${mac.productTitle} in ${selectedVariant.color}`}
                                  loading="lazy"
                                />
                              )}
                              {hoveredStates[productIndex] &&
                                !selectedVariant && (
                                  <img
                                    className="w-full h-full object-contain p-2"
                                    src={mac.defaultHoverImage}
                                    alt={`${mac.productTitle} hover view`}
                                    loading="lazy"
                                  />
                                )}
                              {!hoveredStates[productIndex] &&
                                !selectedVariant && (
                                  <img
                                    className="w-full h-full object-contain p-2"
                                    src={mac.defaultImage}
                                    alt={`${mac.productTitle} default view`}
                                    loading="lazy"
                                  />
                                )}
                            </div>
                          </div>

                          <div className="mt-4 text-center">
                            <h3 className="text-lg font-medium text-gray-800 dark:text-white transition-colors duration-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                              {mac.productTitle}
                            </h3>
                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                              Available Colors
                            </p>
                          </div>

                          <div className="flex justify-center gap-2 mt-2 mb-2">
                            {mac.variants.map((variant, variantIndex) => (
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
                            <p className="mt-1 text-md font-semibold text-blue-500 dark:text-gray-300">
                              {mac.productPrice}
                            </p>
                          </div>

                          <div className="w-full flex justify-center mt-2">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleProductClick(mac.href);
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
                              <span className="ml-2">Shop Now</span>
                            </button>
                          </div>
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

export default MacProducts;
