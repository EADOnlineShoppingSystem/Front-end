import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import FlipClockCountdown from "@leenguyen/react-flip-clock-countdown";
import "@leenguyen/react-flip-clock-countdown/dist/index.css";

import sliderImages from "./Data/shoppingEvent1.json";

const ShoppingEvent = () => {
  const navigate = useNavigate();
  const countdownDate = new Date().getTime() + 24 * 3600 * 1000 + 5000;
  const [isHovered, setIsHovered] = useState(false);

  const handleAirPodsShopNow = () => {
    navigate("/product/674ad0179fdeb1eb423b9271");
  };

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
          {/* Top Right Image - Christmas Theme */}
          <div
            className="relative w-full h-[60%] rounded-xl overflow-hidden shadow-lg object-contain group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <img
              src="/shoppingEvent/L_18.jpg"
              alt="Top right"
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                isHovered ? "scale-110 brightness-90" : "scale-100"
              }`}
              loading="lazy"
            />

            {/* Festive overlay */}
            <div
              className={`absolute inset-0 bg-gradient-to-br from-red-900/30 via-transparent to-green-900/30 transition-opacity duration-500 ${
                isHovered ? "opacity-80" : "opacity-40"
              }`}
            />

            {/* Snow effect */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className={`absolute w-2 h-2 bg-white rounded-full animate-snowfall${
                    i + 1
                  } ${isHovered ? "opacity-70" : "opacity-30"}`}
                  style={{
                    left: `${15 + i * 20}%`,
                    animationDelay: `${i * 0.3}s`,
                    animationDuration: `${3 + i}s`,
                  }}
                />
              ))}
            </div>

            <div className="absolute top-0 left-0 right-0 p-4 sm:p-8 z-10">
              <div className="flex flex-col items-start">
                {/* Sale Badge */}
                <div
                  className={`transform transition-all duration-500 ${
                    isHovered
                      ? "translate-y-0 opacity-100"
                      : "-translate-y-4 opacity-0"
                  }`}
                >
                  <div className="bg-gradient-to-r from-red-500 to-green-800 text-white px-4 py-1.5 rounded-full text-sm font-semibold animate-pulse">
                    Holiday Special
                  </div>
                </div>

                <h1
                  className={`text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-green-600 text-gray-100 mb-3 transition-all duration-500 ${
                    isHovered ? "translate-y-0 scale-105" : "translate-y-2"
                  }`}
                >
                  Holiday AirPods Deal
                </h1>

                <div
                  className={`mb-3 transition-all duration-500 ${
                    isHovered
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                >
                  <p className="text-white text-sm font-medium">
                    Perfect Gift for Christmas 🎄
                  </p>
                </div>

                <div className="countdown-wrapper mb-4">
                  <FlipClockCountdown
                    to={countdownDate}
                    className="flip-clock-custom-christmas"
                    renderItem={(item) => (
                      <div className="flip-clock-item">{item}</div>
                    )}
                  />
                </div>

                <button
                  onClick={handleAirPodsShopNow}
                  className={`bg-gradient-to-r from-blue-400 to-blue-400 text-white text-sm font-semibold px-4 py-2 rounded-lg transform transition-all duration-500 
                    hover:scale-110 hover:shadow-xl hover:shadow-red-500/20 ${
                      isHovered
                        ? "translate-y-0 opacity-100"
                        : "translate-y-4 opacity-90"
                    }`}
                >
                  Save Now
                </button>
              </div>
            </div>

            {/* Decorative elements */}
            <div
              className={`absolute right-4 top-4 transition-opacity duration-500 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            >
              <span className="text-2xl">🎄</span>
            </div>
          </div>

          {/* Bottom Right Images */}
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
        /* Snowfall animations */
        @keyframes snowfall1 {
          0% { transform: translate(0, -10px) rotate(0deg); }
          100% { transform: translate(-20px, 100%) rotate(360deg); }
        }
        @keyframes snowfall2 {
          0% { transform: translate(0, -10px) rotate(0deg); }
          100% { transform: translate(20px, 100%) rotate(-360deg); }
        }
        @keyframes snowfall3 {
          0% { transform: translate(0, -10px) rotate(0deg); }
          100% { transform: translate(-15px, 100%) rotate(240deg); }
        }
        @keyframes snowfall4 {
          0% { transform: translate(0, -10px) rotate(0deg); }
          100% { transform: translate(15px, 100%) rotate(-240deg); }
        }
        @keyframes snowfall5 {
          0% { transform: translate(0, -10px) rotate(0deg); }
          100% { transform: translate(-25px, 100%) rotate(300deg); }
        }
        @keyframes snowfall6 {
          0% { transform: translate(0, -10px) rotate(0deg); }
          100% { transform: translate(25px, 100%) rotate(-300deg); }
        }

        .animate-snowfall1 { animation: snowfall1 3s linear infinite; }
        .animate-snowfall2 { animation: snowfall2 4s linear infinite; }
        .animate-snowfall3 { animation: snowfall3 5s linear infinite; }
        .animate-snowfall4 { animation: snowfall4 4.5s linear infinite; }
        .animate-snowfall5 { animation: snowfall5 3.5s linear infinite; }
        .animate-snowfall6 { animation: snowfall6 4.2s linear infinite; }

        /* Christmas themed countdown */
        .flip-clock-custom-christmas {
          --fcc-flip-duration: 0.5s;
          --fcc-digit-block-width: 30px;
          --fcc-digit-block-height: 44px;
          --fcc-digit-font-size: 30px;
          --fcc-digit-color: #fff;
          --fcc-label-font-size: 16px;
          --fcc-label-color: #fff;
          --fcc-background: rgba(220, 38, 38, 0.8);
          --fcc-divider-color: #fff;
          --fcc-divider-height: 1px;
          --fcc-separator-size: 6px;
          --fcc-separator-color: #fff;
        }

        /* Swiper styles */
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

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .flip-clock-custom-christmas {
            --fcc-digit-block-width: 24px;
            --fcc-digit-block-height: 36px;
            --fcc-digit-font-size: 24px;
            --fcc-label-font-size: 8px;
            --fcc-separator-size: 4px;
          }
          
          .swiper-custom .swiper-pagination {
            padding: 2px 5px;
          }
        }
      `}</style>
    </div>
  );
};

export default ShoppingEvent;
