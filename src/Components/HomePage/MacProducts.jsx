import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import categoriesData from "./Data/mac.json";

const MacProducts = () => {
  const [hoveredStates, setHoveredStates] = useState({});

  const handleMouseEnter = (index) => {
    setHoveredStates((prev) => ({ ...prev, [index]: true }));
  };

  const handleMouseLeave = (index) => {
    setHoveredStates((prev) => ({ ...prev, [index]: false }));
  };

  return (
    <div className="w-full">
      <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 ">
        <div className="pb-4 sm:pb-6 lg:pb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-3xl font-semibold">
            If you can dream it,{" "}
            <span className="bg-gradient-to-r from-blue-600 to-pink-600 inline-block text-transparent bg-clip-text transition-all duration-700 ease-in-out hover:from-pink-600 hover:to-blue-600">
              Mac can do it
            </span>{" "}
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
            {categoriesData.map((category, productIndex) => (
              <SwiperSlide key={productIndex}>
                <div className="m-2 transform transition-all duration-300 hover:scale-103">
                  <div className="bg-white rounded-xl shadow-sm w-full p-5 transition-shadow duration-300 hover:shadow-md">
                    <div
                      className="w-full aspect-square group flex flex-col"
                      onMouseEnter={() => handleMouseEnter(productIndex)}
                      onMouseLeave={() => handleMouseLeave(productIndex)}
                    >
                      <a
                        href={category.href}
                        className="block flex-1 flex flex-col focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300"
                        aria-label={`View ${category.title} category`}
                      >
                        <div className="relative h-48 sm:h-60 md:h-72 overflow-hidden bg-white flex items-center justify-center">
                          <div className="absolute inset-0 w-full h-full transition-all duration-700 ease-in-out transform group-hover:scale-110">
                            <img
                              className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-700 ease-in-out ${
                                hoveredStates[productIndex]
                                  ? "opacity-0"
                                  : "opacity-100"
                              }`}
                              src={category.defaultImage}
                              alt={`${category.title} default view`}
                              loading="lazy"
                            />
                            <img
                              className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-700 ease-in-out ${
                                hoveredStates[productIndex]
                                  ? "opacity-100"
                                  : "opacity-0"
                              }`}
                              src={category.defaultHoverImage}
                              alt={`${category.title} hover view`}
                              loading="lazy"
                            />
                          </div>
                        </div>

                        <div className="text-center transform transition-transform duration-300">
                          <h3 className="text-md font-semibold text-shadow-lg text-gray-800 dark:text-white transition-colors duration-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                            {category.title}
                          </h3>
                        </div>
                      </a>
                      <div className="text-center">
                        <p className="mt-1 text-md font-semibold text-blue-500 dark:text-gray-300 transition-colors duration-300">
                          {category.price}
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
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default MacProducts;
