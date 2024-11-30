import { useState, useEffect, useRef } from "react";
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
import SignInDrawer from "./SignInDrawer";
import AuthModal from "../Auth/AuthModal";
import { useCart } from "../../contexts/CartContext";
import { useNavigate, useLocation } from "react-router-dom";
import productServices from "../../Services/product.services";

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchContainerRef = useRef(null);
 // const { getCartCount } = useCart();
  const [isLoggedIn] = useState(false);
  const [user] = useState({
    name: "John Doe",
    email: "john@example.com",
  });

  const [categories, setCategories] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState({});
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalView, setAuthModalView] = useState("signin");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState(null);

  useEffect(() => {
    fetchCategoriesAndProducts();

    // Add click outside listener
    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target) &&
        !searchTerm // Only hide if there's no search term
      ) {
        setShowSearchInput(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchTerm]);

  // Reset search when changing routes
  useEffect(() => {
    if (!location.pathname.includes("/categories")) {
      setShowSearchInput(false);
      setSearchTerm("");
      setSearchResults([]);
      setSearchError(null);
    }
  }, [location]);

  const fetchCategoriesAndProducts = async () => {
    try {
      const categoriesResponse = await productServices.getAllCategories();
      if (categoriesResponse && categoriesResponse.categories) {
        setCategories(categoriesResponse.categories);

        const productsResponse = await productServices.getAllProducts();
        if (productsResponse && productsResponse.products) {
          const productsByCategory = {};

          productsResponse.products.forEach((product) => {
            if (!productsByCategory[product.categoryName]) {
              productsByCategory[product.categoryName] = [];
            }
            productsByCategory[product.categoryName].push(product);
          });

          Object.keys(productsByCategory).forEach((category) => {
            productsByCategory[category] = productsByCategory[category]
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .slice(0, 10);
          });

          setCategoryProducts(productsByCategory);
        }
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const performSearch = async (term) => {
    if (!term.trim()) {
      setSearchResults([]);
      setSearchError(null);
      return;
    }

    setIsSearchLoading(true);
    setSearchError(null);

    try {
      const response = await productServices.getAllProducts();
      if (response && response.products) {
        const results = response.products
          .filter(
            (product) =>
              product.productTitle.toLowerCase().includes(term.toLowerCase()) ||
              product.categoryName.toLowerCase().includes(term.toLowerCase()) ||
              product.productDescription
                .toLowerCase()
                .includes(term.toLowerCase())
          )
          .slice(0, 5); // Limit to 5 quick results

        if (results.length === 0) {
          setSearchError("No products found matching your search.");
        }

        setSearchResults(results);
      } else {
        setSearchError("No products found matching your search.");
      }
    } catch (err) {
      console.error("Search error:", err);
      setSearchError("An error occurred while searching. Please try again.");
    } finally {
      setIsSearchLoading(false);
    }
  };

  const handleSearchInputChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    performSearch(term);
  };

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      navigate(`/categories?search=${encodeURIComponent(searchTerm.trim())}`);
      setShowSearchInput(false);
      setSearchTerm("");
      setSearchResults([]);
      setSearchError(null);
    }
  };

  const handleSearchClick = () => {
    if (showSearchInput && searchTerm.trim()) {
      navigate(`/categories?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm("");
      setShowSearchInput(false);
      setSearchResults([]);
      setSearchError(null);
    } else {
      setShowSearchInput(!showSearchInput);
    }
  };

  const handleSearchResultClick = (productId) => {
    setShowSearchInput(false);
    setSearchTerm("");
    setSearchResults([]);
    setSearchError(null);
    navigate(`/product/${productId}`);
  };

  // Rest of your existing functions...
  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleAuthAction = (view) => {
    setAuthModalView(view);
    setIsAuthModalOpen(true);
    setIsDrawerOpen(false);
  };

  const handleClose = () => {
    setIsAuthModalOpen(false);
    setAuthModalView("signin");
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

  const MobileMenuItem = ({ item, index }) => {
    const products = categoryProducts[item.name] || [];

    return (
      <div className="w-full">
        <button
          onClick={() => toggleDropdown(index)}
          className="w-full py-2 text-base font-medium text-white flex items-center justify-between"
        >
          {item.name}
          {products.length > 0 && (
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

        {products.length > 0 && openDropdown === index && (
          <div className="ml-4 mt-2 space-y-2">
            {products.map((product) => (
              <a
                key={product._id}
                onClick={() => handleProductClick(product._id)}
                className="block py-2 text-sm text-gray-200 hover:text-white transition-colors duration-200 cursor-pointer"
              >
                {product.productTitle}
              </a>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50 bg-transparent">
        <header>
          <nav className="relative flex items-center justify-between h-12 lg:h-12 bg-gray-900 bg-opacity-60">
            <div className="flex-shrink-0 ml-10">
              <a href="/" className="flex">
                <img
                  className="w-auto h-5 lg:h-6"
                  src="/icons/logo.png"
                  alt=""
                />
              </a>
            </div>

            <div className="hidden lg:flex lg:items-center lg:space-x-7">
              {categories.map((category, index) => (
                <div key={index} className="relative group">
                  <a
                    href={`/categories/${category.name}`}
                    className="text-sm text-white relative py-1 group"
                  >
                    <span className="inline-block relative py-1">
                      {category.name}
                      <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-gradient-to-r from-purple-500 to-orange-500 origin-left scale-x-0 transition-transform duration-800 ease-out group-hover:scale-x-100"></span>
                    </span>
                  </a>
                  <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out">
                    <div className="py-2">
                      {categoryProducts[category.name]?.map((product) => (
                        <a
                          key={product._id}
                          onClick={() => handleProductClick(product._id)}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:bg-gradient-to-r from-purple-500 to-orange-500 hover:bg-clip-text hover:text-transparent hover:font-semibold cursor-pointer"
                        >
                          {product.productTitle}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="hidden lg:flex lg:items-center lg:space-x-5 mr-10">
              {/* Updated Search Container */}
              <div
                ref={searchContainerRef}
                className="relative flex items-center"
              >
                <div className="relative flex items-center">
                  {showSearchInput && (
                    <div className="flex items-center bg-transparent border border-gray-200 rounded overflow-hidden">
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchInputChange}
                        onKeyPress={handleSearch}
                        onFocus={() => setIsSearchFocused(true)}
                        onBlur={() => {
                          setTimeout(() => setIsSearchFocused(false), 200);
                        }}
                        placeholder="Search products..."
                        className="px-4 py-1 bg-transparent text-white focus:outline-none w-64"
                        autoFocus
                      />
                      <button
                        className="px-3 py-1 text-white transition-colors duration-200 h-full flex items-center"
                        onClick={handleSearchClick}
                        aria-label="Search"
                      >
                        <SearchOutlined />
                      </button>
                    </div>
                  )}
                  {!showSearchInput && (
                    <button
                      className="text-white p-1"
                      onClick={handleSearchClick}
                      aria-label="Search"
                    >
                      <SearchOutlined />
                    </button>
                  )}
                </div>

                {/* Search Results Dropdown */}
                {isSearchFocused && searchTerm && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-md shadow-lg z-50">
                    {isSearchLoading ? (
                      <div className="p-4 text-center text-gray-500">
                        Loading...
                      </div>
                    ) : searchError ? (
                      <div className="p-4 text-center text-red-500 flex flex-col items-center">
                        <div className="text-4xl mb-2">😞</div>
                        <p>{searchError}</p>
                      </div>
                    ) : searchResults.length > 0 ? (
                      <>
                        {searchResults.map((product) => (
                          <div
                            key={product._id}
                            onClick={() => handleSearchResultClick(product._id)}
                            className="p-2 hover:bg-gray-100 cursor-pointer flex items-center"
                          >
                            <img
                              src={product.images[0]?.url || "/placeholder.jpg"}
                              alt={product.productTitle}
                              className="w-10 h-10 object-contain mr-2"
                            />
                            <div>
                              <p className="text-sm text-gray-800">
                                {product.productTitle}
                              </p>
                              <p className="text-xs text-gray-500">
                                LKR {product.lowestPrice.toLocaleString()}
                              </p>
                            </div>
                          </div>
                        ))}
                        <div
                          onClick={() => {
                            if (searchTerm.trim()) {
                              navigate(
                                `/categories?search=${encodeURIComponent(
                                  searchTerm.trim()
                                )}`
                              );
                              setShowSearchInput(false);
                              setSearchTerm("");
                              setSearchResults([]);
                              setSearchError(null);
                            }
                          }}
                          className="p-2 text-center text-blue-500 hover:bg-gray-100 cursor-pointer border-t"
                        >
                          View all results
                        </div>
                      </>
                    ) : (
                      <div className="p-4 text-center text-gray-500">
                        No results found 😞
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="inline-flex relative">
                <a href="/cart">
                  <div className="w-8 h-8 text-white flex items-center justify-center rounded">
                    <ShoppingCart className="w-5 h-5" />
                  </div>
                </a>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">1</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={openDrawer}
                  className="flex items-center gap-2"
                >
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

              {/* Mobile Search */}
              <div className="mt-4 mb-2">
                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchInputChange}
                    onKeyPress={handleSearch}
                    placeholder="Search products..."
                    className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-1 focus:ring-white"
                  />
                  {searchTerm && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-md shadow-lg z-50">
                      {isSearchLoading ? (
                        <div className="p-4 text-center text-gray-500">
                          Loading...
                        </div>
                      ) : searchError ? (
                        <div className="p-4 text-center text-red-500 flex flex-col items-center">
                          <div className="text-4xl mb-2">😞</div>
                          <p>{searchError}</p>
                        </div>
                      ) : searchResults.length > 0 ? (
                        <>
                          {searchResults.map((product) => (
                            <div
                              key={product._id}
                              onClick={() =>
                                handleSearchResultClick(product._id)
                              }
                              className="p-2 hover:bg-gray-100 cursor-pointer flex items-center"
                            >
                              <img
                                src={
                                  product.images[0]?.url || "/placeholder.jpg"
                                }
                                alt={product.productTitle}
                                className="w-10 h-10 object-contain mr-2"
                              />
                              <div>
                                <p className="text-sm text-gray-800">
                                  {product.productTitle}
                                </p>
                                <p className="text-xs text-gray-500">
                                  LKR {product.lowestPrice.toLocaleString()}
                                </p>
                              </div>
                            </div>
                          ))}
                          <div
                            onClick={() => {
                              if (searchTerm.trim()) {
                                navigate(
                                  `/categories?search=${encodeURIComponent(
                                    searchTerm.trim()
                                  )}`
                                );
                                setShowSearchInput(false);
                                setSearchTerm("");
                                setSearchResults([]);
                                setSearchError(null);
                                toggleMenu();
                              }
                            }}
                            className="p-2 text-center text-blue-500 hover:bg-gray-100 cursor-pointer border-t"
                          >
                            View all results
                          </div>
                        </>
                      ) : (
                        <div className="p-4 text-center text-gray-500">
                          No results found 😞
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <div className="flex flex-col space-y-1">
                  {categories.map((category, index) => (
                    <MobileMenuItem key={index} item={category} index={index} />
                  ))}
                </div>

                <hr className="my-4 border-gray-600" />

                <div className="grid grid-cols-3 gap-2 sm:gap-4 p-2 sm:p-4 max-w-2xl">
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

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={handleClose}
        initialView={authModalView}
      />
    </>
  );
};

export default NavBar;
