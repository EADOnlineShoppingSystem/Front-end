import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const NewProducts = () => {
  const categories = [
    {
      image: "/popular/1.png",
      title: "iPhone",
      href: "/category/accessories",
      numOfProducts: 100,
    },
    {
      image: "/popular/3.png",
      title: "iPad",
      href: "/category/smartphones",
      numOfProducts: 100,
    },
    {
      image: "/popular/2.png",
      title: "Mac",
      href: "/category/laptops",
      numOfProducts: 100,
    },
    {
      image: "/popular/4.png",
      title: "Apple Watch",
      href: "/category/smartphones",
      numOfProducts: 100,
    },
    {
      image: "/popular/5.png",
      title: "Apple Vision Pro",
      href: "/category/laptops",
      numOfProducts: 100,
    },
    {
      image: "/popular/6.png",
      title: "AirPods",
      href: "/category/smartphones",
      numOfProducts: 100,
    },
    {
      image: "/popular/7.png",
      title: "AirTag",
      href: "/category/laptops",
      numOfProducts: 100,
    },
    {
      image: "/popular/8.png",
      title: "Apple TV 4K",
      href: "/category/laptops",
      numOfProducts: 100,
    },
    {
      image: "/popular/9.png",
      title: "HomePad",
      href: "/category/laptops",
      numOfProducts: 100,
    },
    {
      image: "/popular/10.png",
      title: "Accessories",
      href: "/category/laptops",
      numOfProducts: 100,
    },
    {
      image: "/popular/11.png",
      title: "Apple Gift Cards",
      href: "/category/laptops",
      numOfProducts: 100,
    },
  ];

  return (
    <div className="relative w-full">
      {/* Content container with max width */}
      <div className="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="pb-4 sm:pb-6 lg:pb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-3xl font-semibold">
            The latest. Take a look at{" "}
            <span className="bg-gradient-to-r from-blue-600 to-pink-600 inline-block text-transparent bg-clip-text">
              what's new,
            </span>{" "}
            right now.
          </h2>
        </div>
      </div>

      {/* Overflow container */}
      <div className="relative w-screen left-1/2 right-1/2 -mx-[50vw]">
        <div className="max-w-[2000px] mx-auto">
          <Swiper
            slidesPerView={1.2}
            spaceBetween={12}
            className="px-4 sm:px-6 lg:px-8"
            breakpoints={{
              300: { slidesPerView: 2.2, spaceBetween: 12 },
              320: { slidesPerView: 2.2, spaceBetween: 12 },
              400: { slidesPerView: 2.2, spaceBetween: 50 },
              540: { slidesPerView: 2.5, spaceBetween: 16 },
              680: { slidesPerView: 3.5, spaceBetween: 20 },
              768: { slidesPerView: 4.5, spaceBetween: 10 },
              1024: { slidesPerView: 5.5, spaceBetween: 10 },
              1280: { slidesPerView: 6.5, spaceBetween: 24 },
              1536: { slidesPerView: 7.5, spaceBetween: 24 },
            }}
          >
            {categories.map((category, index) => (
              <SwiperSlide key={index}>
                <div className="w-full group">
                  <a
                    href={category.href}
                    className="block focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg"
                    aria-label={`View ${category.title} category`}
                  >
                    {/* Responsive image container */}
                    <div className="relative aspect-square overflow-hidden bg-gray-100">
                      <div className="absolute inset-0 transition-transform duration-300 group-hover:scale-110">
                        <img
                          className="h-full w-full object-contain transition-all duration-300 group-hover:brightness-105"
                          src={category.image}
                          alt={category.title}
                          loading="lazy"
                        />
                      </div>
                    </div>

                    {/* Text content */}
                    <div className="mt-3 sm:mt-4 text-center">
                      <h3 className="text-sm sm:text-base font-medium text-gray-800 dark:text-white transition-colors duration-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        {category.title}
                      </h3>
                      <p className="mt-1 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                        {category.numOfProducts} Products
                      </p>
                    </div>
                  </a>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default NewProducts;
