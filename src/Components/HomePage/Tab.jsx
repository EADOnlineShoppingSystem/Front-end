import { useRef, useEffect } from "react";

const Tab = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.loop = true;
    }
  }, []);

  return (
    <div className="relative w-full">
      <video
        ref={videoRef}
        className="w-full h-auto object-cover"
        muted
        autoPlay
        loop
      >
        <source src="/videos/Tab.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Tab;
