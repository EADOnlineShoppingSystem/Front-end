import { useRef, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";

const Mac = () => {
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
    <div className="relative w-full h-screen">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        muted
        autoPlay
        loop
      >
        <source src="/videos/mac.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <button
        className="absolute bottom-0 right-4 transform -translate-y-1/2 bg-white opacity-60  rounded-full p-2 w-10 h-10"
        onClick={handlePlayPause}
      >
        {isPlaying ? (
          <FontAwesomeIcon
            icon={faPause}
            className="text-gray-800 hover:text-blue-500"
          />
        ) : (
          <FontAwesomeIcon
            icon={faPlay}
            className="text-gray-800 hover:text-blue-500"
          />
        )}
      </button>
    </div>
  );
};

export default Mac;
