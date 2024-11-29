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
} from "lucide-react";
import NavBar from "../NavBar/NavBar";
import Footer from "../HomePage/Footer.jsx";
import { message } from "antd";
import productServices from "../../Services/product.services.js";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";

const Categories = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [viewMode, setViewMode] = useState("grid");
  const [priceRange, setPriceRange] = useState([0, 4000]);
  const [minMaxPrices, setMinMaxPrices] = useState({ min: 0, max: 4000 });
  const [selectedColor, setSelectedColor] = useState("all");
  const [resultsPerPage, setResultsPerPage] = useState(12);
  const [sortBy, setSortBy] = useState("relevance");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { categoryName } = useParams();
  const { addToCart } = useCart();
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(
    categoryName || "all"
  );

  const colorOptions = [
    { name: "Silver", value: "#C0C0C0" },
    { name: "Yellow", value: "#FFC955" },
    { name: "Space Gray", value: "#34303A" },
    { name: "Blue", value: "#447690" },
    { name: "Purple", value: "#BCB5E7" },
    { name: "Red", value: "#FB1533" },
    { name: "Green", value: "#AEBFAC" },
    { name: "White", value: "#F9F9F9" },
    { name: "Pink", value: "#E7D1CF" },
  ];

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

  useEffect(() => {
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

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

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProductsByCategory(selectedCategory);
  }, [selectedCategory]);

  const applyFilters = (productsToFilter) => {
    let tempProducts = [...productsToFilter];
    if (selectedColor !== "all") {
      tempProducts = tempProducts.filter((product) =>
        product.colors.includes(selectedColor)
      );
    }
    tempProducts = tempProducts.filter(
      (product) =>
        product.lowestPrice >= priceRange[0] &&
        product.largestPrice <= priceRange[1]
    );
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
      default:
        break;
    }
    setFilteredProducts(tempProducts.slice(0, resultsPerPage));
  };

  useEffect(() => {
    if (products.length > 0) {
      applyFilters(products);
    }
  }, [selectedColor, priceRange, sortBy, resultsPerPage, products]);

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

  const handleColorSelect = (color) => {
    setSelectedColor(color === selectedColor ? "all" : color);
  };

  const handlePriceRangeChange = (e) => {
    const newMax = parseInt(e.target.value);
    setPriceRange([minMaxPrices.min, newMax]);
  };

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
    message.info("Added to cart");
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const FilterContent = () => (
    <div className="p-4">
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

      <div className="mb-6">
        <h3 className="font-semibold mb-3">Colors</h3>
        <div className="grid grid-cols-5 gap-2">
          {colorOptions.map((color) => (
            <button
              key={color.name}
              onClick={() => handleColorSelect(color.value)}
              className={`w-8 h-8 rounded-full border-2 focus:outline-none ${
                selectedColor === color.value
                  ? "ring-2 ring-gray-200 ring-offset-2"
                  : ""
              }`}
              style={{
                backgroundColor: color.value,
                border: color.name === "White" ? "1px solid #e5e7eb" : "none",
              }}
              title={color.name}
            />
          ))}
        </div>
      </div>

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

  const renderProducts = () => {
    if (isLoading) {
      return (
        <div className="col-span-full flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      );
    }

    if (products.length === 0) {
      return (
        <div className="col-span-full flex flex-col items-center justify-center py-12 text-gray-500">
          <div className="text-6xl mb-4">😕</div>
          <h3 className="text-xl font-semibold mb-2">No Products Available</h3>
          <p>There are no products available in this category at the moment.</p>
        </div>
      );
    }

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
                  Price: LKR {product.lowestPrice.toLocaleString()} - LKR{" "}
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
    } else {
      return (
        <div className="space-y-4">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              onClick={() => handleProductClick(product._id)}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200 cursor-pointer"
            >
              <div className="flex flex-col md:flex-row items-center gap-6 w-full">
                {/* Image - centered on mobile, left on desktop */}
                <div className="w-48 h-48 flex-shrink-0">
                  <img
                    src={product.images[0]?.url || "/placeholder.jpg"}
                    alt={product.productTitle}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Product Info - centered text on mobile */}
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">
                    {product.productTitle}
                  </h3>
                  <p className="text-blue-600 font-semibold">
                    Price: LKR {product.lowestPrice.toLocaleString()} - LKR{" "}
                    {product.largestPrice.toLocaleString()}
                  </p>
                </div>

                {/* Button - centered on mobile, right on desktop */}
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
    }
  };

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

      <div className="flex flex-1 sm:mb-14 md:mb-14 lg:mb-14 lx:mb-14">
        {/* Desktop Filter Sidebar */}
        <aside className="hidden md:block w-64 transition-all duration-300 bg-white shadow-lg overflow-hidden">
          <FilterContent />
        </aside>

        <main className="flex-1 p-2 md:p-6 md:pt-0 md:pb-0">
          <div className="bg-white rounded-lg shadow-sm mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between p-4 space-y-4 md:space-y-0">
              {/* View Toggle Buttons - Only show on tablet and desktop */}
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

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border p-2 rounded-lg text-sm md:text-base flex-1 md:flex-none"
              >
                <option value="relevance">Relevance</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="name-a-z">Name: A to Z</option>
                <option value="name-z-a">Name: Z to A</option>
              </select>

              <select
                value={resultsPerPage}
                onChange={(e) => setResultsPerPage(parseInt(e.target.value))}
                className="border p-2 rounded-lg text-sm md:text-base"
              >
                <option value="12">12 per page</option>
                <option value="24">24 per page</option>
                <option value="48">48 per page</option>
              </select>
            </div>
          </div>

          {/* Products Grid/List View */}
          {renderProducts()}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Categories;
