import { useState } from "react";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import {
  ShoppingBag,
  Heart,
  User,
  ShoppingCart,
  MapPin,
  LogOut,
} from "lucide-react";
import { Avatar } from "antd";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import SignInDrawer from  "./SignInDrawer";
import AuthModal from "../Auth/AuthModal";
import { useCart } from "../../contexts/CartContext";

const NavBar = () => {
  const { getCartCount } = useCart();
  const [isLoggedIn] = useState(false);
  const [user] = useState({
    name: "John Doe",
    email: "john@example.com",
  });
  
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalView, setAuthModalView] = useState("signin");

  const handleAuthAction = (view) => {
    setAuthModalView(view);
    setIsAuthModalOpen(true);
    setIsDrawerOpen(false); // Close the drawer when opening auth modal
  };

  const handleClose = () => {
    setIsAuthModalOpen(false);
    setAuthModalView('signin');
  };


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

  const getAccountNavItems = () => {
    if (isLoggedIn) {
      return [
        {
          label: "My Orders",
          href: "/orders",
          icon: (
            <ShoppingBag className="w-5 h-5 sm:w-5 sm:h-5 text-black opacity-90" />
          ),
        },
        {
          label: "Wish List",
          href: "/wishlist",
          icon: (
            <Heart className="w-5 h-5 sm:w-5 sm:h-5 text-black opacity-90" />
          ),
        },
        {
          label: "My Profile",
          href: "/myprofile",
          icon: (
            <User className="w-5 h-5 sm:w-5 sm:h-5 text-black opacity-90" />
          ),
        },
        {
          label: "Addresses",
          href: "/address",
          icon: (
            <MapPin className="w-5 h-5 sm:w-5 sm:h-5 text-black opacity-90" />
          ),
        },
        {
          label: <span className="text-red-500">Logout</span>,
          href: "/",
          icon: (
            <LogOut className="w-5 h-5 sm:w-5 sm:h-5 text-red-500 opacity-90" />
          ),
        },
      ];
    }
    return [
      {
        label: "Sign in",
        href: "#",
        icon: <User className="w-5 h-5 sm:w-5 sm:h-5 text-white opacity-90" />,
      },
      {
        label: "Register",
        href: "#",
        icon: (
          <UserOutlined className="w-5 h-5 sm:w-5 sm:h-5 text-white opacity-90" />
        ),
      },
    ];
  };

  const menuItems = [
    {
      name: "iPhone",
      items: [
        "iPhone 16 Pro Max",
        "iPhone 16 Pro",
        "iPhone 16 plus",
        "iPhone 16",
        "iPhone 15 Pro Max",
        "iPhone 15 Pro",
        "iPhone 15 plus",
        "iPhone 15",
      ],
    },
    {
      name: "Mac",
      items: [
        "MacBook Pro M4",
        "MacBook Pro M3",
        "MacBook Pro 13″ M2",
        "Macbook Air M3 2024",
        'MacBook Air 15" M2',
      ],
    },
    {
      name: "iPad",
      items: [
        "iPad Mini 7",
        "iPad Air M2",
        "iPad Pro M4",
        "iPad ( 10th Gen )",
        "iPad Pro M2",
      ],
    },
    {
      name: "Watch",
      items: [
        "Apple Watch Series 8",
        "Apple Watch SE - 2nd",
        "Apple Watch Ultra",
        "Apple Watch Series 7",
      ],
    },
    {
      name: "AirPods",
      items: ["AirPods", "AirPods 2", "AirPods 3", "AirPods 4"],
    },
    {
      name: "HomePod",
      items: ["HomePod 2023", "HomePod mini"],
    },
    {
      name: "AirTag",
      items: ["Apple Airtag 4 pack", "AirTag"],
    },
    {
      name: "Accessories",
      items: [
        "Apple Vision Pro",
        "iPad Accessories",
        "iPhone Accessories",
        "Mac Accessories",
        "Smart Watch Accessories",
      ],
    },
  ];

  const MobileMenuItem = ({ item, index }) => (
    <div className="w-full">
      <button
        onClick={() => toggleDropdown(index)}
        className="w-full py-2 text-base font-medium text-white flex items-center justify-between"
      >
        {item.name}
        {item.items?.length > 0 && (
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

      {item.items?.length > 0 && openDropdown === index && (
        <div className="ml-4 mt-2 space-y-2">
          {item.items.map((subItem, subIndex) => (
            <a
              key={subIndex}
              href="/categories"
              className="block py-2 text-sm text-gray-200 hover:text-white transition-colors duration-200"
            >
              {subItem}
            </a>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <>
    <div className="fixed top-0 left-0 w-full z-50 bg-transparent">
      <header>
        <nav className="relative flex items-center justify-between h-12 lg:h-12 bg-gray-900 bg-opacity-60">
          <div className="flex-shrink-0 ml-10">
            <a href="/" className="flex">
              <img className="w-auto h-5 lg:h-6" src="/icons/logo.png" alt="" />
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-7">
            {menuItems.map((item, index) => (
              <div key={index} className="relative group">
                <a
                  href="/categories"
                  className="text-sm text-white relative py-1 group"
                >
                  <span className="inline-block relative py-1">
                    {item.name}
                    <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-gradient-to-r from-purple-500 to-orange-500 origin-left scale-x-0 transition-transform duration-800 ease-out group-hover:scale-x-100"></span>
                  </span>
                </a>
                {/* Dropdown Menu */}
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out">
                  <div className="py-2">
                    {item.items.map((subItem, subIndex) => (
                      <a
                        key={subIndex}
                        href="/categories"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:bg-gradient-to-r from-purple-500 to-orange-500 hover:bg-clip-text hover:text-transparent hover:font-semibold"
                      >
                        {subItem}
                      </a>
                    ))}
                  </div>
                </div>
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
            <button className="text-white" onClick={handleSearchClick}>
              <SearchOutlined />
            </button>

            <div className="inline-flex relative">
              <a href="/cart">
                <div className="w-8 h-8 text-white flex items-center justify-center rounded">
                  <ShoppingCart className="w-5 h-5" />
                </div>
              </a>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">{getCartCount()}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button onClick={openDrawer} className="flex items-center gap-2">
                <Avatar icon={<UserOutlined />} />
                {isLoggedIn && (
                  <span className="text-white text-sm">
                    Welcome, {user.name}
                  </span>
                )}
              </button>
            </div>
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

        {/* Mobile Navigation */}
        <nav
          className={`py-4 bg-gradient-to-b from-transparent to-gray-900 bg-opacity-40 lg:hidden ${
            isMenuOpen ? "block" : "hidden"
          }`}
        >
          <div className="px-4 mx-auto sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <p className="text-md font-semibold tracking-widest text-gray-100 uppercase">
                {isLoggedIn ? `Welcome, ${user.name}` : "Menu"}
              </p>

              <button
                type="button"
                className="inline-flex p-2 text-white transition-all duration-200 rounded-md hover:bg-gray-800"
                onClick={toggleMenu}
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            <div className="mt-2">
              <div className="flex flex-col space-y-1">
                {menuItems.map((item, index) => (
                  <MobileMenuItem key={index} item={item} index={index} />
                ))}
              </div>

              <hr className="my-1 border-gray-300" />

              <div className="grid grid-cols-3 grid-rows-2 gap-2 sm:gap-4 p-2 sm:p-4 max-w-2xl">
                {getAccountNavItems().map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className="flex items-center justify-start gap-1 sm:gap-2 p-2 sm:p-3 text-white hover:bg-gray-700 rounded-lg transition-all duration-200"
                  >
                    {item.icon}
                    <span className="text-xs sm:text-sm font-medium whitespace-nowrap">
                      {item.label}
                    </span>
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
        className="relative z-50"
      >
        <DialogBackdrop transition className="fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0" />
        <div className="fixed inset-0">
          <div className="absolute inset-0">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <DialogPanel transition className="pointer-events-auto relative w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700">
                <TransitionChild>
                  <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 duration-500 ease-in-out data-[closed]:opacity-0 sm:-ml-10 sm:pr-4">
                    <button
                      type="button"
                      onClick={closeDrawer}
                      className="relative rounded-md text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                    >
                      <span className="absolute -inset-2.5" />
                      <span className="sr-only">Close panel</span>
                      <XMarkIcon className="h-6 w-6" />
                    </button>
                  </div>
                </TransitionChild>
                <div className="flex h-full flex-col justify-center overflow-hidden bg-white py-6 shadow-xl">
                  <div className="relative flex-1 px-4 sm:px-6">

                    {isLoggedIn ? (
                      <div className="flex flex-col items-center gap-4">
                        <Avatar size={64} icon={<UserOutlined />} />
                        <h2 className="text-xl font-semibold">
                          Welcome, {user.name}
                        </h2>
                        <p className="text-gray-600">{user.email}</p>
                        <div className="w-full space-y-2">
                          {getAccountNavItems().map((item, index) => (
                            <a
                              key={index}
                              href={item.href}
                              className="flex items-center gap-2 p-3 hover:bg-gray-100 rounded-lg transition-all duration-200"
                            >
                              {item.icon}
                              <span>{item.label}</span>
                            </a>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <SignInDrawer onAuthAction={handleAuthAction} />
                    )}

                  </div>
                </div>
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
    <AuthModal
    isOpen={isAuthModalOpen}
    onClose={handleClose}
    initialView={authModalView}
  />
  </>
  );
};

export default NavBar;
