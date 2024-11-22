import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const PopularCategories = () => {
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
      title: "HomePod",
      href: "/category/laptops",
      numOfProducts: 100,
    },
    {
      image: "/popular/10.png",
      title: "Accessories",
      href: "/category/laptops",
      numOfProducts: 100,
    },
  ];

  return (
    <div className="w-full max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
      <div className="pb-4 sm:pb-6 lg:pb-8">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-3xl font-semibold">
          Categories
        </h2>
      </div>

      <Swiper
        slidesPerView={1.2}
        spaceBetween={12}
        className="w-full"
        breakpoints={{
          300: { slidesPerView: 2, spaceBetween: 12 },
          320: { slidesPerView: 2, spaceBetween: 12 },
          400: { slidesPerView: 2, spaceBetween: 50 },
          540: { slidesPerView: 2, spaceBetween: 16 },
          680: { slidesPerView: 2.5, spaceBetween: 20 },
          768: { slidesPerView: 6, spaceBetween: 10 },
          1024: { slidesPerView: 4, spaceBetween: 10 },
          1280: { slidesPerView: 6, spaceBetween: 24 },
          1536: { slidesPerView: 6, spaceBetween: 24 },
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
                <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
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
  );
};

export default PopularCategories;
