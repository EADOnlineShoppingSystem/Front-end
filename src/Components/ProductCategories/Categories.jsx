import { useState, useEffect } from "react";
import {
  ChevronDown,
  GridIcon,
  List,
  SlidersHorizontal,
  X,
} from "lucide-react";
import NavBar from "../NavBar/NavBar";
import sampleProducts from "./Data/sampleProducts.json";
import categories from "./Data/categories.json";
import Footer from "../HomePage/Footer.jsx";
import { useCart } from "../../contexts/CartContext";
import { message } from "antd";


const Categories = () => {
  const [products, setProducts] = useState(sampleProducts);
  const [viewMode, setViewMode] = useState("grid");
  const [priceRange, setPriceRange] = useState([0, 4000]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSubCategory, setSelectedSubCategory] = useState("all");
  const [selectedColor, setSelectedColor] = useState("all");
  const [resultsPerPage, setResultsPerPage] = useState(12);
  const [sortBy, setSortBy] = useState("relevance");
  const [expandedCategories, setExpandedCategories] = useState({});
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const { addToCart, cartItems } = useCart();
  const handleAddToCart = (product) => {
    console.log('Adding product to cart:', product); // Debug log

    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: getVariantImage(product, selectedColor),
      color: selectedColor !== 'all' ? selectedColor : product.color,
      brand: product.brand || 'No Brand', // Fallback if brand is undefined
      storage: product.storage || 'N/A', // Fallback if storage is undefined
      quantity: 1
    };

    console.log('Formatted cart item:', cartItem); // Debug log
    addToCart(cartItem);
    console.log('Current cart items:', cartItems); // Debug log
    message.info("Add to cart"); 
  };


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

  // find the variant image based on selected color
  const getVariantImage = (product, color) => {
    if (product.variants) {
      const variant = product.variants.find(
        (v) => v.color.toLowerCase() === color.toLowerCase()
      );
      if (variant) {
        return variant.variantImage;
      }
    }
    return product.image; 
  };

  useEffect(() => {
    let filteredProducts = [...sampleProducts];
    if (selectedCategory !== "all") {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === selectedCategory
      );
    }
    if (selectedSubCategory !== "all") {
      filteredProducts = filteredProducts.filter(
        (product) => product.subCategory === selectedSubCategory
      );
    }
    if (selectedColor !== "all") {
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.color?.toLowerCase() === selectedColor.toLowerCase()
      );
    }
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    switch (sortBy) {
      case "price-low-high":
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case "price-high-low":
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case "name-a-z":
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-z-a":
        filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }

    setProducts(filteredProducts.slice(0, resultsPerPage));
  }, [
    priceRange,
    sortBy,
    selectedCategory,
    selectedSubCategory,
    selectedColor,
    resultsPerPage,
  ]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedSubCategory("all");
    toggleCategory(category);
  };

  const handleSubCategorySelect = (subCategory) => {
    setSelectedSubCategory(subCategory);
    if (window.innerWidth < 768) {
      setIsMobileFilterOpen(false);
    }
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color === selectedColor ? "all" : color);
  };

  const toggleCategory = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const FilterSidebar = () => (
    <div className="p-4">
      <div className="pb-2">
        <h2 className="text-xl font-semibold">Product categories</h2>
      </div>
      <div className="flex justify-between items-center md:hidden mb-4">
        <button
          onClick={() => setIsMobileFilterOpen(false)}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold mb-3">Colors</h3>
        <div className="grid grid-cols-5 gap-2">
          {colorOptions.map((color) => (
            <button
              key={color.name}
              onClick={() => handleColorSelect(color.name)}
              className={`w-8 h-8 rounded-full border-2 focus:outline-none ${
                selectedColor === color.name
                  ? "ring-2 ring-blue-500 ring-offset-2"
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
        {selectedColor !== "all" && (
          <button
            onClick={() => setSelectedColor("all")}
            className="mt-2 text-sm text-blue-600 hover:text-blue-700"
          >
            Clear color
          </button>
        )}
      </div>

      <div className="mb-6">
        <h3 className="font-semibold mb-3">Price Range</h3>
        <div className="space-y-2">
          <input
            type="range"
            min="0"
            max="4000"
            value={priceRange[1]}
            onChange={(e) =>
              setPriceRange([priceRange[0], parseInt(e.target.value)])
            }
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>LKR {priceRange[0]}.00</span>
            <span>LKR {priceRange[1]}.00</span>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold mb-3">Categories</h3>
        <button
          onClick={() => {
            setSelectedCategory("all");
            setSelectedSubCategory("all");
          }}
          className={`w-full text-left p-2 mb-2 rounded ${
            selectedCategory === "all"
              ? "bg-blue-50 text-blue-600"
              : "hover:bg-gray-50"
          }`}
        >
          All Products
        </button>
        {Object.entries(categories).map(([key, category]) => (
          <div key={key} className="mb-2">
            <button
              onClick={() => handleCategorySelect(key)}
              className={`flex items-center justify-between w-full p-2 text-left rounded ${
                selectedCategory === key
                  ? "bg-blue-50 text-blue-600"
                  : "hover:bg-gray-50"
              }`}
            >
              <span>{category.name}</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  expandedCategories[key] ? "rotate-180" : ""
                }`}
              />
            </button>
            {expandedCategories[key] && (
              <div className="ml-4 mt-1 space-y-1">
                {category.subCategories.map((sub) => (
                  <button
                    key={sub}
                    onClick={() => handleSubCategorySelect(sub)}
                    className={`block w-full text-left p-1.5 text-sm rounded ${
                      selectedSubCategory === sub
                        ? "bg-blue-50 text-blue-600 font-medium"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 px-4 md:px-20 py-6 md:py-20 md:pb-3">
      <div>
        <NavBar />
      </div>
      <div className="flex flex-1">
        {/* Desktop Sidebar */}
        <aside
          className={`hidden md:block ${
            isFilterOpen ? "w-64" : "w-0"
          } transition-all duration-300 bg-white shadow-lg overflow-hidden`}
        >
          <FilterSidebar />
        </aside>

        {/* Mobile Filter Overlay */}
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden transition-opacity ${
            isMobileFilterOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setIsMobileFilterOpen(false)}
        />

        {/* Mobile Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 w-80 bg-white shadow-lg z-50 md:hidden transform transition-transform duration-300 ${
            isMobileFilterOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <FilterSidebar />
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-2 md:p-6 md:pt-0 md:pb-0">
          {/* Controls Bar */}
          <div className="bg-white rounded-lg shadow-sm mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between p-4 space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => {
                    if (window.innerWidth >= 768) {
                      setIsFilterOpen(!isFilterOpen);
                    } else {
                      setIsMobileFilterOpen(true);
                    }
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <SlidersHorizontal className="w-5 h-5" />
                </button>
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
              </div>
              <div className="flex items-center justify-between md:justify-end space-x-4">
                <select
                  value={resultsPerPage}
                  onChange={(e) => setResultsPerPage(parseInt(e.target.value))}
                  className="border p-2 rounded-lg text-sm md:text-base"
                >
                  <option value="12">12 per page</option>
                  <option value="24">24 per page</option>
                  <option value="48">48 per page</option>
                </select>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-lg ${
                      viewMode === "grid" ? "bg-gray-100" : "hover:bg-gray-100"
                    }`}
                  >
                    <GridIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-lg ${
                      viewMode === "list" ? "bg-gray-100" : "hover:bg-gray-100"
                    }`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid/List */}
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
                : "space-y-4"
            }
          >
            {products.map((product) => (
              <div
                key={product.id}
                className={`bg-white rounded-lg shadow-sm overflow-hidden ${
                  viewMode === "list" ? "flex flex-col md:flex-row" : ""
                } hover:shadow-md transition-shadow duration-200`}
              >
                <img
                  src={getVariantImage(product, selectedColor)} // Use getVariantImage
                  alt={product.name}
                  className={`${
                    viewMode === "list"
                      ? "w-full md:w-48 h-48 object-contain"
                      : "w-full h-48 object-contain"
                  }`}
                />
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-semibold text-lg mb-2 text-gray-800">
                    {product.name}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 flex-1">
                    Color: <span className="text-gray-900 font-semibold">{product.color}</span>
                  </p>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-auto space-y-2 sm:space-y-0">
                    <span className="font-bold text-lg text-gray-900">
                      LKR {product.price.toFixed(2)}
                    </span>
                    <button
                    
                    onClick={() => {
                      console.log('Add to cart clicked for product:', product); // Debug log
                      handleAddToCart(product);
                    }}
                    className="w-full sm:w-auto bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 hover:shadow-md transition-colors duration-200">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
};

export default Categories;
