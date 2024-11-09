
import NavBar from "../NavBar/NavBar";
import VideoFrame from "./videoFrame.jsx";
import PopularCategories from "./PopularCategories.jsx";
import NewProducts from "./NewProducts.jsx";

const HomePage = () => {
  

  return (
    <div className="w-screen h-screen flex flex-col overflow-y-auto overflow-x-hidden ">
      <div className="min-h-screen relative">
        <NavBar />
        <VideoFrame />
      </div>
      <div className="bg-gray-100 h-auto xl:p-24 xl:pt-10 xl:pb-0">
        <PopularCategories />
      </div>
      <div className="bg-gray-100 h-auto xl:p-24 xl:pt-0">
        <NewProducts />
      </div>
    </div>
  );
};

export default HomePage;
