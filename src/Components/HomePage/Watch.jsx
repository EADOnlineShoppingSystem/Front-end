import { useRef, useEffect } from "react";

const Watch = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.loop = true;
    }
  }, []);

  return (
    <div className="relative w-full">
      <div className="bg-black flex items-center justify-center pt-14 pb-5">
        <img
          src="/icons/watchLogo.png"
          alt="watch logo"
          className="max-w-full max-h-full w-1/3 h-auto sm:w-1/3 md:w-1/4 lg:w-1/3 xl:w-1/5"
        />
      </div>
      <video
        ref={videoRef}
        className="w-full h-auto object-cover"
        muted
        autoPlay
        loop
      >
        <source src="/videos/watch.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Watch;
