import { useState, useEffect } from "react";
import {
  ChevronDown,
  GridIcon,
  List,
  SlidersHorizontal,
  ShoppingCart,
  X,
  ExternalLink,
  Filter,
  Calendar,
} from "lucide-react";
import {
  useSearchParams,
  useParams,
  useNavigate,
  Link,
} from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import Footer from "../HomePage/Footer.jsx";
import { message } from "antd";
import productServices from "../../Services/product.services.js";
import { useCart } from "../../contexts/CartContext";

/**
 * Categories Component
 *
 * A comprehensive product catalog page that supports:
 * - Product filtering by category, color, and price
 * - Grid and list view layouts
 * - Sorting by various criteria
 * - Mobile-responsive design with a drawer for filters
 * - Integration with shopping cart
 *
 * @component
 */
const Categories = () => {
  // URL and navigation related states
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("search");
  const navigate = useNavigate();
  const { categoryName } = useParams();

  // Product data states
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [availableColors, setAvailableColors] = useState([]);

  // UI state management
  const [viewMode, setViewMode] = useState("grid");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Filter and sorting states
  const [priceRange, setPriceRange] = useState([0, 4000]);
  const [minMaxPrices, setMinMaxPrices] = useState({ min: 0, max: 4000 });
  const [selectedColor, setSelectedColor] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState(
    categoryName || "all"
  );
  const [resultsPerPage, setResultsPerPage] = useState(12);
  const [sortBy, setSortBy] = useState("relevance");

  // Cart context
  const { addToCart } = useCart();

  /**
   * Formats a date string into a localized format
   * @param {string} dateString - The date string to format
   * @returns {string} Formatted date string
   */
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  /**
   * Calculates the minimum and maximum prices from product list
   * @param {Array} products - Array of product objects
   * @returns {Object} Object containing min and max prices
   */
  const calculatePriceRange = (products) => {
    if (!products.length) return { min: 0, max: 4000 };
    const prices = products.reduce(
      (acc, product) => {
        acc.min = Math.min(acc.min, product.lowestPrice);
        acc.max = Math.max(acc.max, product.largestPrice);
        return acc;
      },
      { min: Infinity, max: -Infinity }
    );
    if (prices.min === Infinity) prices.min = 0;
    if (prices.max === -Infinity) prices.max = 4000;
    if (prices.min === prices.max) prices.max += 1000;
    return prices;
  };

  /**
   * Extracts unique colors from all products and formats them
   * @param {Array} products - Array of product objects
   * @returns {Array} Array of unique color objects
   */
  const extractUniqueColors = (products) => {
    const colorSet = new Set();
    products.forEach((product) => {
      const colors = JSON.parse(product.colors[0] || "[]");
      colors.forEach((color) => {
        if (color && color.trim()) {
          colorSet.add(color.trim());
        }
      });
    });
    return Array.from(colorSet).map((color) => ({
      value: color,
      name: color.charAt(0).toUpperCase() + color.slice(1).toLowerCase(),
    }));
  };

  /**
   * Handles mobile filter drawer open/close animation
   */
  const toggleMobileFilter = () => {
    if (isMobileFilterOpen) {
      setIsClosing(true);
      setTimeout(() => {
        setIsMobileFilterOpen(false);
        setIsClosing(false);
        document.body.style.overflow = "unset";
      }, 400);
    } else {
      setIsMobileFilterOpen(true);
      document.body.style.overflow = "hidden";
    }
  };

  // Cleanup body overflow on component unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  /**
   * Fetches all available product categories
   */
  const fetchCategories = async () => {
    try {
      const response = await productServices.getAllCategories();
      if (response && response.categories) {
        setCategories(response.categories);
      }
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  /**
   * Searches products based on search term
   * @param {string} term - Search term
   */
  const searchProducts = async (term) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await productServices.getAllProducts();

      if (response && response.products) {
        const searchResults = response.products.filter(
          (product) =>
            product.productTitle.toLowerCase().includes(term.toLowerCase()) ||
            product.categoryName.toLowerCase().includes(term.toLowerCase()) ||
            product.productDescription
              .toLowerCase()
              .includes(term.toLowerCase())
        );

        if (searchResults.length === 0) {
          setError("No products found matching your search.");
          setProducts([]);
          setFilteredProducts([]);
        } else {
          const parsedProducts = searchResults.map((product) => ({
            ...product,
            colors: JSON.parse(product.colors[0] || "[]"),
          }));

          const prices = calculatePriceRange(parsedProducts);
          setMinMaxPrices(prices);
          setPriceRange([prices.min, prices.max]);
          setProducts(parsedProducts);

          const uniqueColors = extractUniqueColors(searchResults);
          setAvailableColors(uniqueColors);

          applyFilters(parsedProducts);
        }
      }
    } catch (err) {
      console.error("Error searching products:", err);
      setError("Failed to search products. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Fetches products by category
   * @param {string} category - Category name or 'all'
   */
  const fetchProductsByCategory = async (category) => {
    try {
      setIsLoading(true);
      setError(null);
      let response;
      if (category === "all") {
        response = await productServices.getAllProducts();
      } else {
        response = await productServices.getProductsByCategoryName(category);
      }
      if (response && response.products) {
        const parsedProducts = response.products.map((product) => ({
          ...product,
          colors: JSON.parse(product.colors[0] || "[]"),
        }));
        const prices = calculatePriceRange(parsedProducts);
        setMinMaxPrices(prices);
        setPriceRange([prices.min, prices.max]);
        setProducts(parsedProducts);

        const uniqueColors = extractUniqueColors(response.products);
        setAvailableColors(uniqueColors);

        applyFilters(parsedProducts);
      } else {
        setProducts([]);
        setFilteredProducts([]);
        setError("No products found.");
      }
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to fetch products. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // Initial categories fetch
  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch products when search term or category changes
  useEffect(() => {
    if (searchTerm) {
      searchProducts(searchTerm);
    } else {
      fetchProductsByCategory(selectedCategory);
    }
  }, [searchTerm, selectedCategory]);

  /**
   * Applies all active filters and sorting to products
   * @param {Array} productsToFilter - Array of products to filter
   */
  const applyFilters = (productsToFilter) => {
    let tempProducts = [...productsToFilter];

    // Apply color filter
    if (selectedColor !== "all") {
      tempProducts = tempProducts.filter((product) =>
        product.colors.includes(selectedColor)
      );
    }

    // Apply price range filter
    tempProducts = tempProducts.filter(
      (product) =>
        product.lowestPrice >= priceRange[0] &&
        product.largestPrice <= priceRange[1]
    );

    // Apply sorting
    switch (sortBy) {
      case "price-low-high":
        tempProducts.sort((a, b) => a.lowestPrice - b.lowestPrice);
        break;
      case "price-high-low":
        tempProducts.sort((a, b) => b.lowestPrice - a.lowestPrice);
        break;
      case "name-a-z":
        tempProducts.sort((a, b) =>
          a.productTitle.localeCompare(b.productTitle)
        );
        break;
      case "name-z-a":
        tempProducts.sort((a, b) =>
          b.productTitle.localeCompare(a.productTitle)
        );
        break;
      case "newest-first":
        tempProducts.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        break;
      case "oldest-first":
        tempProducts.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
        break;
      default:
        break;
    }
    setFilteredProducts(tempProducts.slice(0, resultsPerPage));
  };

  // Apply filters when filter criteria change
  useEffect(() => {
    if (products.length > 0) {
      applyFilters(products);
    }
  }, [selectedColor, priceRange, sortBy, resultsPerPage, products]);

  /**
   * Handles category selection and URL update
   * @param {string} category - Selected category
   * @param {Event} e - Click event
   */
  const handleCategorySelect = (category, e) => {
    e.preventDefault();
    setSelectedCategory(category);
    if (isMobileFilterOpen) {
      toggleMobileFilter();
    }
    const newUrl =
      category === "all"
        ? "/categories"
        : `/categories/${encodeURIComponent(category)}`;
    navigate(newUrl, { replace: true });
  };

  /**
   * Handles color filter selection
   * @param {string} color - Selected color
   */
  const handleColorSelect = (color) => {
    setSelectedColor(color === selectedColor ? "all" : color);
  };

  /**
   * Handles price range slider change
   * @param {Event} e - Change event
   */
  const handlePriceRangeChange = (e) => {
    const newMax = parseInt(e.target.value);
    setPriceRange([minMaxPrices.min, newMax]);
  };

  /**
   * Handles adding product to cart
   * @param {Object} product - Product to add
   * @param {Event} e - Click event
   */
  const handleAddToCart = (product, e) => {
    e.stopPropagation();
    const cartItem = {
      id: product._id,
      name: product.productTitle,
      price: product.lowestPrice,
      image: product.images[0]?.url || "/placeholder.jpg",
      color: selectedColor !== "all" ? selectedColor : product.colors[0],
    };
    addToCart(cartItem);
    message.success("Added to cart");
  };

  /**
   * Navigates to product detail page
   * @param {string} productId - Product ID
   */
  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  /**
   * Filter sidebar content component
   * @component
   */
  const FilterContent = () => (
    <div className="p-4">
      {/* Categories Section */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3">Categories</h3>
        <div className="space-y-2">
          <button
            onClick={(e) => handleCategorySelect("all", e)}
            className={`w-full text-left px-3 py-2 rounded-lg transition ${
              selectedCategory === "all"
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-100"
            }`}
          >
            All Categories
          </button>
          {categories.map((category) => (
            <button
              key={category._id}
              onClick={(e) => handleCategorySelect(category.name, e)}
              className={`w-full text-left px-3 py-2 rounded-lg transition ${
                selectedCategory === category.name
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Colors Section */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3">Colors</h3>
        <div className="bg-transparent rounded-lg p-2">
          <div
            className="h-28 overflow-y-auto pr-2"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "#94A3B8 #E2E8F0",
            }}
          >
            <div className="grid grid-cols-5 gap-2">
              {availableColors.map((color) => (
                <button
                  key={color.value}
                  onClick={() => handleColorSelect(color.value)}
                  className={`w-8 h-8 rounded-full border-2 focus:outline-none ${
                    selectedColor === color.value
                      ? "ring-2 ring-gray-200 ring-offset-2"
                      : ""
                  }`}
                  style={{
                    backgroundColor: color.value,
                    border:
                      color.value.toLowerCase() === "#ffffff" ||
                      color.value.toLowerCase() === "white"
                        ? "1px solid #e5e7eb"
                        : "none",
                  }}
                  title={color.name}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Price Range Section */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3">Price Range</h3>
        <div className="space-y-4">
          <input
            type="range"
            min={minMaxPrices.min}
            max={minMaxPrices.max}
            value={priceRange[1]}
            onChange={handlePriceRangeChange}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>LKR {priceRange[0].toLocaleString()}</span>
            <span>LKR {priceRange[1].toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );

  /**
   * Renders products based on current view mode and loading state
   * @returns {JSX.Element} Rendered product grid or list
   */
  const renderProducts = () => {
    // Show loading spinner
    if (isLoading) {
      return (
        <div className="col-span-full flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      );
    }

    // Show error or empty state
    if (error || products.length === 0) {
      return (
        <div className="col-span-full flex flex-col items-center justify-center py-12 text-gray-500">
          <div className="text-6xl mb-4">😕</div>
          <h3 className="text-xl font-semibold mb-2">
            {error || "No Products Available"}
          </h3>
          <p>
            {searchTerm
              ? `No products found matching "${searchTerm}". Try a different search term.`
              : "There are no products available in this category at the moment."}
          </p>
        </div>
      );
    }

    // Grid view
    if (viewMode === "grid") {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              onClick={() => handleProductClick(product._id)}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200 cursor-pointer"
            >
              <div className="relative">
                <img
                  src={product.images[0]?.url || "/placeholder.jpg"}
                  alt={product.productTitle}
                  className="w-full h-48 object-contain"
                />
              </div>
              <div className="p-5 text-center">
                <h3 className="font-semibold text-lg mb-2 text-gray-800">
                  {product.productTitle}
                </h3>
                <p className="text-sm text-blue-600 font-semibold">
                  LKR {product.lowestPrice.toLocaleString()} - LKR{" "}
                  {product.largestPrice.toLocaleString()}
                </p>
                <div className="mt-4 flex items-center space-x-2">
                  <button
                    onClick={(e) => handleAddToCart(product, e)}
                    className="bg-blue-400 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition flex items-center gap-2 w-full justify-center"
                  >
                    <ShoppingCart size={20} />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }

    // List view
    return (
      <div className="space-y-4">
        {filteredProducts.map((product) => (
          <div
            key={product._id}
            onClick={() => handleProductClick(product._id)}
            className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200 cursor-pointer"
          >
            <div className="flex flex-col md:flex-row items-center gap-6 w-full p-4">
              <div className="w-48 h-48 flex-shrink-0 relative">
                <img
                  src={product.images[0]?.url || "/placeholder.jpg"}
                  alt={product.productTitle}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  {product.productTitle}
                </h3>
                <p className="text-blue-600 font-semibold">
                  LKR {product.lowestPrice.toLocaleString()} - LKR{" "}
                  {product.largestPrice.toLocaleString()}
                </p>
              </div>
              <div className="flex-shrink-0 w-full md:w-auto flex justify-center md:justify-end lg:mr-10 xl:mr-10 md:mr-10">
                <button
                  onClick={(e) => handleAddToCart(product, e)}
                  className="bg-blue-400 text-white px-6 py-2 rounded-lg hover:bg-blue-500 transition flex items-center gap-2"
                >
                  <ShoppingCart size={20} />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Main component render
  return (
    <div className="min-h-screen flex flex-col bg-gray-100/65 px-4 md:px-20 py-6 md:py-20 md:pb-3">
      <NavBar />

      {/* Mobile Filter Button */}
      <div className="md:hidden sticky top-0 z-20 bg-white shadow mb-4 rounded-lg">
        <button
          onClick={toggleMobileFilter}
          className="w-full p-4 flex items-center justify-center gap-2 text-gray-700"
        >
          <Filter size={20} />
          <span>Filter Products</span>
        </button>
      </div>

      {/* Mobile Filter Drawer */}
      <div
        className={`md:hidden fixed inset-0 z-50 transition-opacity duration-300 ${
          isMobileFilterOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div
          className="absolute inset-0 bg-black bg-opacity-50"
          onClick={toggleMobileFilter}
        ></div>
        <div
          className={`fixed inset-y-0 left-0 w-4/5 max-w-sm bg-white overflow-y-auto transform transition-transform duration-300 ease-in-out ${
            isMobileFilterOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
            <h2 className="text-lg font-semibold">Filters</h2>
            <button
              onClick={toggleMobileFilter}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <X size={24} />
            </button>
          </div>
          <FilterContent />
        </div>
      </div>

      <div className="flex flex-1 sm:mb-14 md:mb-14 lg:mb-14 xl:mb-14">
        {/* Desktop Filter Sidebar */}
        <aside className="hidden md:block w-64 transition-all duration-300 bg-white shadow-lg rounded-lg overflow-hidden">
          <FilterContent />
        </aside>

        <main className="flex-1 p-2 md:p-6 md:pt-0 md:pb-0">
          {/* Controls Bar */}
          <div className="bg-white rounded-lg shadow-sm mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between p-4 space-y-4 md:space-y-0">
              {/* Sort Controls */}
              <div className="w-full md:w-auto">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full md:w-auto border p-2 rounded-lg text-sm md:text-base"
                >
                  <option value="relevance">Relevance</option>
                  <option value="price-low-high">Price: Low to High</option>
                  <option value="price-high-low">Price: High to Low</option>
                  <option value="name-a-z">Name: A to Z</option>
                  <option value="name-z-a">Name: Z to A</option>
                  <option value="newest-first">Newly Listed </option>
                  <option value="oldest-first">Old Products</option>
                </select>
              </div>

              {/* View Controls */}
              <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
                <select
                  value={resultsPerPage}
                  onChange={(e) => setResultsPerPage(parseInt(e.target.value))}
                  className="border p-2 rounded-lg text-sm md:text-base"
                >
                  <option value="12">12 per page</option>
                  <option value="24">24 per page</option>
                  <option value="48">48 per page</option>
                </select>

                {/* View Toggle Buttons */}
                <div className="hidden md:flex items-center space-x-2">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === "grid"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                    aria-label="Grid View"
                  >
                    <GridIcon size={20} />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === "list"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                    aria-label="List View"
                  >
                    <List size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Search Results Info */}
          {searchTerm && (
            <div className="mb-4 bg-white p-4 rounded-lg">
              <p className="text-gray-600">
                Showing results for:{" "}
                <span className="font-semibold">{searchTerm}</span>
              </p>
            </div>
          )}

          {/* Product Grid/List */}
          {renderProducts()}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Categories;
