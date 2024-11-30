import NavBar from "../NavBar/NavBar";
import VideoFrame from "./videoFrame.jsx";
import PopularCategories from "./PopularCategories.jsx";
import NewProducts from "./NewProducts.jsx";
import ShoppingEvent from "./ShoppingEvent.jsx";
import Watch from "./Watch.jsx";
import AppleWatch from "./appleWatch.jsx";
import Tab from "./Tab.jsx";
import IPads from "./IPads.jsx";
import Mac from "./Mac.jsx";
import MacProducts from "./MacProducts.jsx";
import Footer from "./Footer.jsx";

const HomePage = () => {
  return (
    <div className="w-screen h-screen flex flex-col overflow-y-auto overflow-x-hidden ">
      <div className="min-h-screen relative">
        <NavBar data-testid="navbar" />
        <VideoFrame data-testid="videoframe" />
      </div>
      <div className="bg-gray-100 h-auto xl:p-24 xl:pt-10 xl:pb-0">
        <PopularCategories data-testid="popularcategories" />
      </div>
      <div className="bg-gray-100 h-auto xl:p-24 xl:pt-0">
        <NewProducts data-testid="newproducts" />
      </div>
      <div className="bg-gray-100 h-auto xl:p-24 xl:pt-0">
        <ShoppingEvent data-testid="shoppingevent" />
      </div>
      <div className="bg-black h-auto">
        <Watch data-testid="watch" />
      </div>
      <div className="bg-gray-100 h-auto xl:p-24 xl:pt-12">
        <AppleWatch data-testid="applewatch" />
      </div>
      <div className="bg-black h-screen">
        <Tab data-testid="tab" />
      </div>
      <div className="bg-gray-100 h-auto xl:p-24 xl:pt-0">
        <IPads data-testid="ipads" />
      </div>
      <div className="bg-black h-screen">
        <Mac data-testid="mac" />
      </div>
      <div className="bg-gray-100 h-auto xl:p-24 xl:pt-12">
        <MacProducts data-testid="macproducts" />
      </div>
      <div className="bg-gray-100 h-auto xl:p-24 xl:pt-0 xl:pb-2">
        <Footer data-testid="footer" />
      </div>
    </div>
  );
};

export default HomePage;
