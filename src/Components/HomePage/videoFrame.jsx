import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";

const VideoFrame = () => {
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
    <div>
      <video data-testid="apple-video-one"
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover"
        loop
        muted
        autoPlay
      >
        <source src="/videos/apple.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <button data-testid="play-pause-button"
        className="absolute bottom-0 right-4 transform -translate-y-1/2 bg-white opacity-60  rounded-full p-2 w-10 h-10"
        onClick={handlePlayPause}
      >
        {isPlaying ? (
          <FontAwesomeIcon icon={faPause} className="text-gray-800" />
        ) : (
          <FontAwesomeIcon icon={faPlay} className="text-gray-800" />
        )}
      </button>
    </div>
  );
};

export default VideoFrame;
