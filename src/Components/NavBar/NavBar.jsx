import { useState } from "react";
import {
  SearchOutlined,
  UserOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Avatar } from "antd";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import SignInDrawer from "../HomePage/SignInDrawer";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleSearchClick = () => {
    setShowSearchInput(!showSearchInput);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setOpenDropdown(null);
  };

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const menuItems = [
    {
      name: "Home",
      items: [],
    },
    {
      name: "iPhone",
      items: ["iPhone 15 Pro", "iPhone 15", "iPhone 14"],
    },
    {
      name: "Mac",
      items: ["MacBook Pro", "MacBook Air", "iMac", "Mac mini"],
    },
    {
      name: "iPad",
      items: ["iPad Pro", "iPad Air", "iPad", "iPad mini"],
    },
    {
      name: "Watch",
      items: ["Apple Watch Ultra", "Apple Watch Series 9", "Apple Watch SE"],
    },
    {
      name: "AirPods",
      items: ["AirPods Pro", "AirPods", "AirPods Max"],
    },
    {
      name: "Accessories",
      items: ["Cases", "Power & Cables", "Bands", "Protection", "Audio"],
    },
  ];

  const accountNavItems = [
    {
      label: "Cart",
      href: "#",
      icon: <ShoppingCartOutlined className="w-5 h-5 text-white opacity-90" />,
    },
    { label: "Sign up", href: "#" },
    { label: "Sign in", href: "#" },
  ];

  const MobileMenuItem = ({ item, index }) => (
    <div className="w-full">
      <button
        onClick={() => toggleDropdown(index)}
        className="w-full py-2 text-base font-medium text-white flex items-center justify-between"
      >
        {item.name}
        {item.items.length > 0 && (
          <svg
            className={`w-4 h-4 transition-transform duration-200 ${
              openDropdown === index ? "rotate-180" : ""
            }`}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 9l-7 7-7-7"></path>
          </svg>
        )}
      </button>

      {/* Mobile dropdown menu */}
      {item.items.length > 0 && openDropdown === index && (
        <div className="ml-4 mt-2 space-y-2">
          {item.items.map((subItem, subIndex) => (
            <a
              key={subIndex}
              href="#"
              className="block py-2 text-sm text-gray-400 hover:text-white transition-colors duration-200"
            >
              {subItem}
            </a>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-transparent">
      <header className="">
        <div className="mx-auto">
          {/* Desktop Navigation */}
          <nav className="relative flex items-center justify-between h-12 lg:h-12 bg-gray-900 bg-opacity-50">
            <div className="flex-shrink-0 ml-10">
              <a href="#" title="" className="flex">
                <img
                  className="w-auto h-5 lg:h-6"
                  src="/icons/logo.png"
                  alt=""
                />
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex lg:items-center lg:space-x-7">
              {menuItems.map((item, index) => (
                <div key={index} className="relative group">
                  <a href="#" className="text-sm text-white  relative py-1">
                    <span className="inline-block relative py-1">
                      {item.name}
                      <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-gradient-to-r from-purple-500 to-orange-500 origin-left scale-x-0 transition-transform duration-800 ease-out group-hover:scale-x-100 opacity-100"></span>
                    </span>
                    {item.items.length > 0 && (
                      <svg
                        className="w-4 h-4 ml-1 inline-block text-gray-300 opacity-80"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M19 9l-7 7-7-7"></path>
                      </svg>
                    )}
                  </a>

                  {item.items.length > 0 && (
                    <>
                      <div className="absolute h-5 w-full" />
                      <div className="absolute left-0 w-48 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out">
                        <div className="pt-5">
                          <div className="py-1 bg-white bg-opacity-95 rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                            {item.items.map((subItem, subIndex) => (
                              <a
                                key={subIndex}
                                href="#"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:bg-gradient-to-r from-purple-500 to-orange-500 hover:bg-clip-text hover:text-transparent hover:font-semibold"
                                role="menuitem"
                              >
                                {subItem}
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>

            <div className="hidden lg:flex lg:items-center lg:space-x-5 mr-10">
              {showSearchInput && (
                <input
                  type="text"
                  placeholder="Search"
                  className="px-5 py-1 rounded bg-transparent text-white border border-gray-200 focus:outline-none focus:ring-1 focus:ring-white"
                />
              )}
              <a
                href="#"
                title=""
                className="text-white"
                onClick={handleSearchClick}
              >
                <SearchOutlined />
              </a>

              <div className="inline-flex relative">
                <a href="http://">
                  <div className="w-8 h-8 text-white flex items-center justify-center rounded">
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

                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">1</span>
                </div>
              </div>
              <a href="#" onClick={openDrawer}>
                <Avatar icon={<UserOutlined />} />
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="inline-flex p-2 ml-5 text-white bg-transparent transition-all duration-200 rounded-md lg:hidden focus:bg-transparent"
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

        {/* Mobile Navigation (Hidden by default) */}
        <nav
          className={`py-4 bg-gradient-to-b from-transparent to-gray-900 bg-opacity-40 lg:hidden ${
            isMenuOpen ? "block" : "hidden"
          }`}
        >
          <div className="px-4 mx-auto sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">
                Menu
              </p>

              {/* Mobile Menu Close Button */}
              <button
                type="button"
                className="inline-flex p-2 text-white transition-all duration-200 rounded-md hover:bg-gray-800"
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

            {/* Mobile Menu Items */}
            <div className="mt-6">
              <div className="flex flex-col space-y-2">
                {menuItems.map((item, index) => (
                  <MobileMenuItem key={index} item={item} index={index} />
                ))}
              </div>

              {/* Mobile Menu Separator */}
              <hr className="my-4 border-gray-700" />

              {/* Mobile Account Navigation */}
              <div className="flex flex-col space-y-2">
                {accountNavItems.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className="py-2 text-base font-medium text-white transition-all duration-200 focus:text-gray-400"
                  >
                    {item.icon}
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* User Drawer */}
      <Dialog
        open={isDrawerOpen}
        onClose={closeDrawer}
        className="relative z-50 "
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
        />

        <div className="fixed inset-0">
          <div className="absolute inset-0">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <DialogPanel
                transition
                className="pointer-events-auto relative w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
              >
                <TransitionChild>
                  <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 duration-500 ease-in-out data-[closed]:opacity-0 sm:-ml-10 sm:pr-4">
                    <button
                      type="button"
                      onClick={closeDrawer}
                      className="relative rounded-md text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                    >
                      <span className="absolute -inset-2.5" />
                      <span className="sr-only">Close panel</span>
                      <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                    </button>
                  </div>
                </TransitionChild>
                <div className="flex h-full flex-col justify-center  overflow-hidden bg-white py-6 shadow-xl">
                  <div className="relative flex-1 px-4 sm:px-6">
                    <SignInDrawer />
                  </div>
                </div>
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default NavBar;
