import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

// Import category data from JSON file
import categoriesData from "./newProductsData.json";

const NewProducts = () => {
  const [hoveredStates, setHoveredStates] = useState({});
  const [selectedColors, setSelectedColors] = useState({});

  const handleMouseEnter = (index) => {
    setHoveredStates((prev) => ({ ...prev, [index]: true }));
  };

  const handleMouseLeave = (index) => {
    setHoveredStates((prev) => ({ ...prev, [index]: false }));
  };

  const handleColorSelect = (productIndex, variantIndex) => {
    setSelectedColors((prev) => ({ ...prev, [productIndex]: variantIndex }));
  };

  return (
    <div className="w-full">
      <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="pb-4 sm:pb-6 lg:pb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-3xl font-semibold">
            The latest. Take a look at{" "}
            <span className="bg-gradient-to-r from-blue-600 to-pink-600 inline-block text-transparent bg-clip-text">
              what's new,
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
            {categoriesData.map((category, productIndex) => {
              const selectedVariantIndex = selectedColors[productIndex];
              const selectedVariant = category.variants[selectedVariantIndex];

              return (
                <SwiperSlide key={productIndex}>
                  <div className="m-2">
                    <div className="bg-white rounded-xl shadow-lg w-full p-2">
                      <div
                        className="w-full aspect-square group flex flex-col mb-5"
                        onMouseEnter={() => handleMouseEnter(productIndex)}
                        onMouseLeave={() => handleMouseLeave(productIndex)}
                      >
                        <a
                          href={category.href}
                          className="block flex-1 flex flex-col focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                          aria-label={`View ${category.title} category`}
                        >
                          <div className="relative flex-1 overflow-hidden bg-white flex items-center justify-center">
                            <div className="transition-transform duration-900 ease-in-out group-hover:scale-110 w-full h-full flex items-center justify-center">
                              {/* Render only the appropriate image based on conditions */}
                              {selectedVariant && (
                                <img
                                  className="w-full h-full object-contain p-2"
                                  src={selectedVariant.variantImage}
                                  alt={`${category.title} in ${selectedVariant.color}`}
                                  loading="lazy"
                                />
                              )}
                              {hoveredStates[productIndex] &&
                                !selectedVariant && (
                                  <img
                                    className="w-full h-full object-contain p-2"
                                    src={category.defaultHoverImage}
                                    alt={`${category.title} hover view`}
                                    loading="lazy"
                                  />
                                )}
                              {!hoveredStates[productIndex] &&
                                !selectedVariant && (
                                  <img
                                    className="w-full h-full object-contain p-2"
                                    src={category.defaultImage}
                                    alt={`${category.title} default view`}
                                    loading="lazy"
                                  />
                                )}
                            </div>
                          </div>

                          <div className="mt-4 text-center">
                            <h3 className="text-lg font-medium text-gray-800 dark:text-white transition-colors duration-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                              {category.title}
                            </h3>
                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                              {selectedVariant
                                ? selectedVariant.color
                                : "Default"}
                            </p>
                          </div>
                        </a>

                        {/* Color Selection Circles */}
                        <div className="flex justify-center gap-2 mt-2 mb-4">
                          {category.variants.map((variant, variantIndex) => (
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
                            {category.price}
                          </p>
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
