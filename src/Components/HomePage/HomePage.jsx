import NavBar from "../NavBar/NavBar";
import VideoFrame from "./videoFrame.jsx";
import PopularCategories from "./PopularCategories.jsx";
import NewProducts from "./NewProducts.jsx";
import ShoppingEvent from "./ShoppingEvent.jsx";
import Watch from "./Watch.jsx";
import AppleWatch from "./appleWatch.jsx";
import Tab from "./Tab.jsx";

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
      <div className="bg-gray-100 h-auto xl:p-24 xl:pt-0">
        <ShoppingEvent />
      </div>
      <div className="bg-black h-auto">
        <Watch />
      </div>
      <div className="bg-gray-100 h-auto xl:p-24 xl:pt-12">
        <AppleWatch />
      </div>
      <div className="bg-black h-screen">
        <Tab />
      </div>
    </div>
  );
};

export default HomePage;
