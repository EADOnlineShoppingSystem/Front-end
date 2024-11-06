import { useState } from "react";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="bg-white">
      <header>
        <div className="bg-black border-b border-gray-200 ">
          <div className="px-4 mx-auto sm:px-6 lg:px-8">
            <nav className="relative flex items-center justify-between h-14 lg:h-14">
              <div className="flex-shrink-0">
                <a href="#" title="" className="flex">
                  <img
                    className="w-auto h-5 lg:h-6"
                    src="/public/icons/logo.png"
                    alt=""
                  />
                </a>
              </div>

              <div className="hidden lg:flex lg:items-center lg:space-x-10">
                <a
                  href="#"
                  title=""
                  className="text-sm text-white relative group py-1"
                >
                  Home
                  <span
                    className="absolute left-0 right-0 bottom-0 h-0.5 bg-gradient-to-r from-pink-500 to-orange-500 
    origin-left scale-x-0 transition-transform duration-700 ease-out lg:group-hover:scale-x-100"
                  ></span>
                </a>
                <a
                  href="#"
                  title=""
                  className="text-sm text-white relative group py-1"
                >
                  <span className="inline-block relative group py-1">
                    iPhone
                    <span
                      className="absolute left-0 right-0 bottom-0 h-0.5 bg-gradient-to-r from-pink-500 to-orange-500 
    origin-left scale-x-0 transition-transform duration-700 ease-out lg:group-hover:scale-x-100"
                    ></span>
                  </span>
                  <FontAwesomeIcon
                    className="mx-1 text-gray-500 opacity-90"
                    icon={faAngleDown}
                  />
                </a>
                <a
                  href="#"
                  title=""
                  className="text-sm text-white relative group py-1"
                >
                  <span className="inline-block relative group py-1">
                    Mac
                    <span
                      className="absolute left-0 right-0 bottom-0 h-0.5 bg-gradient-to-r from-pink-500 to-orange-500
    origin-left scale-x-0 transition-transform duration-700 ease-out lg:group-hover:scale-x-100"
                    ></span>
                  </span>
                  <FontAwesomeIcon
                    className="mx-1 text-gray-500 opacity-90"
                    icon={faAngleDown}
                  />
                </a>
                <a
                  href="#"
                  title=""
                  className="text-sm text-white relative group py-1"
                >
                  <span className="inline-block relative group py-1">
                    iPad
                    <span
                      className="absolute left-0 right-0 bottom-0 h-0.5 bg-gradient-to-r from-pink-500 to-orange-500
    origin-left scale-x-0 transition-transform duration-700 ease-out lg:group-hover:scale-x-100"
                    ></span>
                  </span>
                  <FontAwesomeIcon
                    className="mx-1 text-gray-500 opacity-90"
                    icon={faAngleDown}
                  />
                </a>
                <a
                  href="#"
                  title=""
                  className="text-sm text-white relative group py-1"
                >
                  <span className="inline-block relative group py-1">
                    Watch
                    <span
                      className="absolute left-0 right-0 bottom-0 h-0.5 bg-gradient-to-r from-pink-500 to-orange-500
    origin-left scale-x-0 transition-transform duration-700 ease-out lg:group-hover:scale-x-100"
                    ></span>
                  </span>
                  <FontAwesomeIcon
                    className="mx-1 text-gray-500 opacity-90"
                    icon={faAngleDown}
                  />
                </a>
                <a
                  href="#"
                  title=""
                  className="text-sm text-white relative group py-1"
                >
                  <span className="inline-block relative group py-1">
                    AirPods
                    <span
                      className="absolute left-0 right-0 bottom-0 h-0.5 bg-gradient-to-r from-pink-500 to-orange-500
    origin-left scale-x-0 transition-transform duration-700 ease-out lg:group-hover:scale-x-100"
                    ></span>
                  </span>
                  <FontAwesomeIcon
                    className="mx-1 text-gray-500 opacity-90"
                    icon={faAngleDown}
                  />
                </a>
                <a
                  href="#"
                  title=""
                  className="text-sm text-white relative group py-1"
                >
                  <span className="inline-block relative group py-2">
                    Accessories
                    <span
                      className="absolute left-0 right-0 bottom-0 h-0.5 bg-gradient-to-r from-pink-500 to-orange-500
    origin-left scale-x-0 transition-transform duration-700 ease-out lg:group-hover:scale-x-100"
                    ></span>
                  </span>
                  <FontAwesomeIcon
                    className="mx-1 text-gray-500 opacity-90"
                    icon={faAngleDown}
                  />
                </a>
              </div>

              <div className="hidden lg:flex lg:items-center lg:space-x-5 mr-10">
                <a href="#" title="" className=" text-white ">
                  <SearchOutlined />
                </a>

                <div className="inline-flex relative">
                  {/* Avatar container */}
                  <a href="http://">
                    {" "}
                    <div className="w-8 h-8 text-white flex items-center justify-center rounded">
                      {/* Shopping cart icon */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="9" cy="21" r="1" />
                        <circle cx="20" cy="21" r="1" />
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                      </svg>
                    </div>
                  </a>

                  {/* Badge */}
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">1</span>
                  </div>
                </div>
                <a href="http://">
                  <Avatar icon={<UserOutlined />} />
                </a>
              </div>

              <button
                type="button"
                className="inline-flex p-2 ml-5 text-black transition-all duration-200 rounded-md lg:hidden focus:bg-gray-100 hover:bg-gray-100"
                onClick={toggleMenu}
              >
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              </button>
            </nav>
          </div>
        </div>

        {/* xs to lg */}
        <nav
          className={`py-4 bg-black lg:hidden ${
            isMenuOpen ? "block" : "hidden"
          } `}
        >
          <div className="px-4 mx-auto sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">
                Menu
              </p>

              <button
                type="button"
                className="inline-flex p-2 text-black transition-all duration-200 rounded-md focus:bg-gray-100 hover:bg-gray-100"
                onClick={toggleMenu}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="mt-6">
              <div className="flex flex-col space-y-2">
                <a
                  href="#"
                  title=""
                  className="py-2 text-base font-medium text-white transition-all duration-200 focus:text-blue-600"
                >
                  Home
                </a>

                <a
                  href="#"
                  title=""
                  className="py-2 text-base font-medium text-white transition-all duration-200 focus:text-blue-600"
                >
                  iPhone
                </a>

                <a
                  href="#"
                  title=""
                  className="py-2 text-base font-medium text-white transition-all duration-200 focus:text-blue-600"
                >
                  Mac
                </a>

                <a
                  href="#"
                  title=""
                  className="py-2 text-base font-medium text-white transition-all duration-200 focus:text-blue-600"
                >
                  iPad
                </a>
                <a
                  href="#"
                  title=""
                  className="py-2 text-base font-medium text-white transition-all duration-200 focus:text-blue-600"
                >
                  Watch
                </a>
                <a
                  href="#"
                  title=""
                  className="py-2 text-base font-medium text-white transition-all duration-200 focus:text-blue-600"
                >
                  AirPods
                </a>
                <a
                  href="#"
                  title=""
                  className="py-2 text-base font-medium text-white transition-all duration-200 focus:text-blue-600"
                >
                  Accessories
                </a>
              </div>

              <hr className="my-4 border-gray-200" />

              <div className="flex flex-col space-y-2">
                <a
                  href="#"
                  title=""
                  className="py-2 text-base font-medium text-white transition-all duration-200 focus:text-blue-600"
                >
                  Sign up
                </a>

                <a
                  href="#"
                  title=""
                  className="py-2 text-base font-medium text-white transition-all duration-200 focus:text-blue-600"
                >
                  Sign in
                </a>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default NavBar;
