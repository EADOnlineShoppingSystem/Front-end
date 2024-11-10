import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import FlipClockCountdown from "@leenguyen/react-flip-clock-countdown";
import "@leenguyen/react-flip-clock-countdown/dist/index.css";

import sliderImages from "./Data/shoppingEvent1.json";

const ShoppingEvent = () => {
  const countdownDate = new Date().getTime() + 24 * 3600 * 1000 + 5000;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
        {/* Left Side Slider*/}
        <div className="lg:w-1/2 w-full h-[500px] sm:h-[600px] bg-transparent rounded-xl shadow-lg overflow-hidden group relative">
          {/* Fixed Header Content */}
          <div className="absolute top-0 left-0 right-0 p-4 sm:p-8 z-10 bg-gradient-to-b from-black/50 via-black/30 to-transparent">
            <div className="text-left">
              <h1 className="sm:text-4xl font-bold text-white mb-2 sm:mb-5 text-4xl">
                Apple Shopping Event
              </h1>
              <p className="text-white mb-2 sm:mb-4">
                Shop great deals on MacBook, iPad, iPhone and more.
              </p>
              <button className="bg-gradient-to-r text-sm from-blue-400 to-pink-400 text-white text-semibold px-3 py-2 rounded-lg ease-in-out transform hover:scale-105 hover:shadow-lg duration-500">
                Shop Now
              </button>
            </div>
          </div>

          <Swiper
            modules={[Navigation, Pagination]}
            slidesPerView={1}
            spaceBetween={8}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            pagination={{
              clickable: true,
              bulletClass:
                "swiper-pagination-bullet !bg-gray-400 hover:!bg-gray-600",
              bulletActiveClass: "swiper-pagination-bullet-active !bg-gray-600",
            }}
            className="w-full h-full swiper-custom"
          >
            {sliderImages.map((slide) => (
              <SwiperSlide key={slide.id} className="h-full">
                <div className="relative w-full h-full">
                  <img
                    src={slide.imageUrl}
                    alt={slide.alt}
                    className="absolute inset-0 w-full h-full object-cover rounded-lg bg-transparent"
                    loading="lazy"
                  />
                </div>
              </SwiperSlide>
            ))}
            {/* Custom Navigation Buttons */}
            <div className="swiper-button-prev !hidden group-hover:!flex !w-10 !h-10 sm:!w-14 sm:!h-14 !bg-white/50 hover:!bg-white !rounded-full !left-4 items-center justify-center z-20">
              <span className="!text-gray-800 text-3xl sm:text-4xl flex items-center justify-center h-full w-full -translate-y-[2px]">
                ‹
              </span>
            </div>
            <div className="swiper-button-next !hidden group-hover:!flex !w-10 !h-10 sm:!w-14 sm:!h-14 !bg-white/50 hover:!bg-white !rounded-full !right-4 items-center justify-center z-20">
              <span className="!text-gray-800 text-3xl sm:text-4xl flex items-center justify-center h-full w-full -translate-y-[2px]">
                ›
              </span>
            </div>
          </Swiper>
        </div>

        {/* Right Side Content*/}
        <div className="lg:w-1/2 w-full flex flex-col gap-4 lg:gap-6 h-[500px] sm:h-[600px]">
          {/* Top Right Image*/}
          <div className="relative w-full h-[60%] rounded-xl overflow-hidden shadow-lg object-contain">
            <img
              src="/shoppingEvent/L_13.png"
              alt="Top right"
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute top-0 left-0 right-0 p-4 sm:p-8 z-10">
              <div className="flex flex-col items-start">
                <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-400 mb-5">
                  Aurora Headset
                </h1>
                <div className="countdown-wrapper mb-4">
                  <FlipClockCountdown
                    to={countdownDate}
                    className="flip-clock-custom"
                    renderItem={(item) => (
                      <div className="flip-clock-item">{item}</div>
                    )}
                  />
                </div>
                <button className="bg-blue-400 text-white text-sm text-semibold px-3 py-2 rounded-lg ease-in-out transform hover:scale-105 hover:shadow-lg duration-500">
                  Shop Now
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Right Image*/}
          <div className="flex gap-4 lg:gap-6 h-[40%]">
            <div className="relative w-1/2 rounded-xl overflow-hidden shadow-lg">
              <img
                src="/shoppingEvent/L_4.jpeg"
                alt="Bottom left"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="relative w-1/2 rounded-xl overflow-hidden shadow-lg">
              <img
                src="/shoppingEvent/L_12.jpeg"
                alt="Bottom right"
                className="absolute inset-0 object-center w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .swiper-custom .swiper-button-next::after,
        .swiper-custom .swiper-button-prev::after {
          display: none;
        }

        .swiper-custom .swiper-pagination {
          background: rgba(255, 255, 255, 0.9);
          width: auto !important;
          left: 50% !important;
          transform: translateX(-50%);
          border-radius: 20px;
          padding: 5px 10px;
          bottom: 20px !important;
          z-index: 20;
          pointer-events: auto;
        }

        .swiper-custom .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          margin: 0 4px;
          opacity: 1;
          cursor: pointer;
        }

        .swiper-custom .swiper-button-next,
        .swiper-custom .swiper-button-prev {
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .swiper-custom .swiper-button-next span,
        .swiper-custom .swiper-button-prev span {
          font-size: 24px;
          line-height: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
        }

        /* Countdown styles */
        .countdown-wrapper {
          transform: scale(1);
          transform-origin: left top;
        }

        .flip-clock-custom {
          --fcc-flip-duration: 0.5s;
          --fcc-digit-block-width: 30px;
          --fcc-digit-block-height: 44px;
          --fcc-digit-font-size: 30px;
          --fcc-digit-color: #000;
          --fcc-label-font-size: 16px;
          --fcc-label-color: #000;
          --fcc-background: #fff;
          --fcc-divider-color: #fff;
          --fcc-divider-height: 1px;
          --fcc-separator-size: 6px;
          --fcc-separator-color: #000;
        }

        @media (max-width: 768px) {
          .swiper-custom .swiper-pagination {
            padding: 2px 5px;
          }

          .flip-clock-custom {
            --fcc-digit-block-width: 24px;
            --fcc-digit-block-height: 36px;
            --fcc-digit-font-size: 24px;
            --fcc-label-font-size: 8px;
            --fcc-separator-size: 4px;
          }
        }
      `}</style>
    </div>
  );
};

export default ShoppingEvent;
