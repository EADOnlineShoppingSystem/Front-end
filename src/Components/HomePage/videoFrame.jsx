import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

const VideoHero = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          loop
          muted
          autoPlay
          playsInline
        >
          <source src="/videos/apple.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />


      <div
        className="absolute bottom-16 md:bottom-24 lg:bottom-32 left-0 right-0 
        flex flex-col items-center justify-center px-4 text-center"
      >
        <h1 data-testid="explore-latest-lineup"
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl 
          text-white font-medium mb-6 md:mb-8 
          opacity-0 animate-[fadeIn_1s_ease-out_forwards] 
          max-w-4xl mx-auto"
        >
          Explore Latest Lineup
        </h1>

        <button data-testid="see-more-button-one"
          className="group relative p-[2px] overflow-hidden rounded-full
          animate-[float_3s_ease-in-out_infinite]
          w-auto"
        >
          {/* Rotating gradient border */}
          <div data-testid="rotating-gradient-border"
            className="absolute inset-0 bg-gradient-to-r 
            from-purple-600 via-pink-600 to-blue-600
            animate-[spin_3s_linear_infinite]"
          />

          {/* Button content - Responsive Padding */}
          <div data-testid="see-more-button-content"
            className="relative flex items-center gap-2 
            px-4 sm:px-6 py-2 sm:py-2.5 rounded-full
            bg-black/80 hover:bg-black/60 backdrop-blur-sm
            text-white text-base sm:text-lg 
            transition-all duration-300
            group-hover:bg-black/40"
          >
            <span>See More</span>
            <FontAwesomeIcon
              icon={faChevronDown}
              className="w-3 h-3 sm:w-4 sm:h-4 
              transform group-hover:translate-y-1 
              transition-transform duration-300"
            />
          </div>
        </button>
      </div>

      {/* Play/Pause Button - Responsive Positioning and Sizing */}
      <button data-testid="play-pause-button"
        onClick={handlePlayPause}
        className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8
        w-10 h-10 sm:w-12 sm:h-12 rounded-full
        bg-white/60 hover:bg-white/80
        flex items-center justify-center
        transition-all duration-300
        focus:outline-none focus:ring-2 focus:ring-white/50"
        aria-label={isPlaying ? "Pause video" : "Play video"}
      >
        <FontAwesomeIcon
          icon={isPlaying ? faPause : faPlay}
          className="w-4 h-4 sm:w-5 sm:h-5 text-gray-900"
        />
      </button>
    </div>
  );
};

export default VideoHero;
