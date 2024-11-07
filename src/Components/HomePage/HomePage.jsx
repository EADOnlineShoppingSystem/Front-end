
import NavBar from "../NavBar/NavBar";
import VideoFrame from "./videoFrame.jsx";

const HomePage = () => {
  

  return (
    <div className="w-screen h-screen flex flex-col overflow-y-auto">
      <div className="min-h-screen relative">
        <NavBar />
        <VideoFrame />
      </div>

      <div className="bg-red-400 min-h-screen">df</div>
    </div>
  );
};

export default HomePage;
