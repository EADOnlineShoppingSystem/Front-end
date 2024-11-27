import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import productServices  from "../services/product.services";
import { FaRegHeart } from "react-icons/fa";
import { TbGitCompare } from "react-icons/tb";
import ReactStars from "react-stars";
import { FaCcVisa, FaCcMastercard, FaCcAmex, FaCcPaypal } from "react-icons/fa";
import NavBar from "../Components/NavBar/NavBar";

const SingleProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch product details
  const fetchProductDetails = async () => {
    if (!id) {
      setError("Invalid Product ID");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await productServices.getProductDetailsByProductId(id);

      if (response && response.product) {
        setProduct(response.product);
        setError(null);
      } else {
        throw new Error("Product not found");
      }
    } catch (err) {
      console.error("Error fetching product details:", err);
      setError("Failed to load product details");
      // Optionally redirect if product not found
      // navigate('/products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  const handleIncrement = () => {
    if (product && quantity < product.quantity) setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleImageMouseMove = (e) => {
    if (!isZoomed) return;
    const bounds = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - bounds.left) / bounds.width) * 100;
    const y = ((e.clientY - bounds.top) / bounds.height) * 100;
    setMousePosition({ x, y });
  };

  // Parse storage and color options
  const parseStorages = () => {
    try {
      return JSON.parse(product.storages[0] || "[]");
    } catch {
      return [];
    }
  };

  const parseColors = () => {
    try {
      return JSON.parse(product.colors[0] || "[]");
    } catch {
      return [];
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">{error}</h2>
          <button
            onClick={() => navigate("/products")}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Go to Products
          </button>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        No product found
      </div>
    );
  }

  return (
    <>
      <div className="bg-[rgba(206,227,231,0.3)] py-5">
        <div className="mb-5">
          <NavBar />
        </div>
        <div className="max-w-7xl mx-auto p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column - Product Images */}
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-lg">
                <div
                  className="relative overflow-hidden h-[600px] border border-gray-200"
                  onMouseMove={handleImageMouseMove}
                  onMouseEnter={() => setIsZoomed(true)}
                  onMouseLeave={() => setIsZoomed(false)}
                >
                  <img
                    src={product.images[selectedImageIndex]?.url || ""}
                    alt="product"
                    className="w-full h-full object-cover"
                  />
                  {isZoomed && (
                    <div
                      className="absolute inset-0 w-full h-full"
                      style={{
                        backgroundImage: `url(${
                          product.images[selectedImageIndex]?.url || ""
                        })`,
                        backgroundPosition: `${mousePosition.x}% ${mousePosition.y}%`,
                        backgroundSize: "200%",
                        backgroundRepeat: "no-repeat",
                      }}
                    />
                  )}
                </div>
              </div>

              <div className="bg-white p-5">
                <div className="flex flex-wrap gap-4">
                  {product.images.map((image, index) => (
                    <div
                      key={index}
                      className={`w-24 h-24 cursor-pointer ${
                        selectedImageIndex === index
                          ? "border-2 border-blue-500"
                          : ""
                      }`}
                      onClick={() => setSelectedImageIndex(index)}
                    >
                      <img
                        src={image.url}
                        alt={`thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-center gap-8 mt-8">
                  <a
                    href="/compare"
                    className="flex items-center text-gray-800 hover:text-blue-600"
                  >
                    <TbGitCompare className="text-xl mr-2" /> Compare
                  </a>
                  <a
                    href="/wishlist"
                    className="flex items-center text-gray-800 hover:text-blue-600"
                  >
                    <FaRegHeart className="text-xl mr-2" /> Add to Wishlist
                  </a>
                </div>

                <div className="mt-6">
                  <div className="bg-blue-50 p-4 rounded-lg text-center mb-4">
                    <span className="text-xl font-bold mr-2">16</span>
                    People watching this product now!
                  </div>

                  <div className="flex items-center">
                    <h6 className="font-bold mr-3">Payment Methods :</h6>
                    <div className="flex gap-2">
                      <div className="bg-[#4267B2] p-2 rounded">
                        <FaCcVisa className="text-white text-xl" />
                      </div>
                      <div className="bg-[#ff5f00] p-2 rounded">
                        <FaCcMastercard className="text-white text-xl" />
                      </div>
                      <div className="bg-[#0077C0] p-2 rounded">
                        <FaCcAmex className="text-white text-xl" />
                      </div>
                      <div className="bg-[#003087] p-2 rounded">
                        <FaCcPaypal className="text-white text-xl" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Product Details */}
            <div className="bg-white p-6 rounded-lg">
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-xl font-semibold">
                  {product.productTitle}
                </h3>
                <p className="text-blue-600 text-xl font-semibold mt-2">
                  LKR {parseFloat(product.lowestPrice).toFixed(2)} - LKR{" "}
                  {parseFloat(product.largestPrice).toFixed(2)}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="font-bold">Rating :</span>
                  <ReactStars
                    count={5}
                    size={24}
                    value={4}
                    edit={false}
                    activeColor="#ffd700"
                  />
                  <span className="text-gray-600">(5 Reviews)</span>
                </div>
              </div>

              <div className="py-4 space-y-6">
                <div>
                  <h3 className="font-bold mb-2">
                    Storage : {parseStorages()[0] || "N/A"}
                  </h3>
                  <div className="flex gap-2">
                    {parseStorages().map((size) => (
                      <span
                        key={size}
                        className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 cursor-pointer"
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-bold mb-2">Color :</h3>
                  <div className="flex gap-2">
                    {parseColors().map((color) => (
                      <div
                        key={color}
                        className="w-8 h-8 rounded-full border"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-bold mb-2">
                    Warranty : {product.warranty} Year Warranty
                  </h3>
                  <span className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 cursor-pointer">
                    {product.warranty} Year Warranty
                  </span>
                </div>

                <div>
                  <h3 className="font-bold mb-2">Quantity : {quantity}</h3>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleDecrement}
                      className="w-10 h-10 bg-gray-100 flex items-center justify-center rounded"
                    >
                      -
                    </button>
                    <input
                      type="text"
                      className="w-16 text-center border border-gray-200 rounded"
                      value={quantity}
                      readOnly
                    />
                    <button
                      onClick={handleIncrement}
                      className="w-10 h-10 bg-gray-100 flex items-center justify-center rounded"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold mb-2">
                    Availability : {product.quantity}
                  </h3>
                </div>

                <div className="flex flex-col gap-4 mt-8">
                  <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-full hover:bg-blue-700 transition-colors">
                    Add To Cart
                  </button>
                  <button className="w-full border-2 border-blue-600 text-blue-600 py-3 px-6 rounded-full hover:bg-blue-600 hover:text-white transition-colors">
                    Buy Now
                  </button>
                </div>

                <div className="mt-6">
                  <details className="bg-white rounded-lg shadow-sm">
                    <summary className="cursor-pointer p-4 font-medium">
                      Product Description
                    </summary>
                    <div className="p-4 text-sm text-gray-600">
                      {product.productDescription}
                    </div>
                  </details>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
