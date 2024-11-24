import { useState } from "react";
import Color from "../Components/ProductCard/Color";
import { FaRegHeart } from "react-icons/fa";
import { TbGitCompare } from "react-icons/tb";
import pro1 from "/images/pro1.webp";
import ReactStars from "react-stars";
import { FaCcVisa, FaCcMastercard, FaCcAmex, FaCcPaypal } from "react-icons/fa";
import NavBar from "../Components/NavBar/NavBar";

const SingleProduct = () => {
  const productImages = [pro1];
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleIncrement = () => {
    if (quantity < 10) setQuantity(quantity + 1);
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
                    src={pro1}
                    alt="product"
                    className="w-full h-full object-cover"
                  />
                  {isZoomed && (
                    <div
                      className="absolute inset-0 w-full h-full"
                      style={{
                        backgroundImage: `url(${productImages[selectedImageIndex]})`,
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
                  {productImages.map((image, index) => (
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
                        src={image}
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
                <h3 className="text-xl font-semibold">iPhone 16 pro max</h3>
                <p className="text-blue-600 text-xl font-semibold mt-2">
                  LKR 400,000.00 - 500,000.00
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
                  <h3 className="font-bold mb-2">Storage : 256GB</h3>
                  <div className="flex gap-2">
                    {["64GB", "128GB", "256GB", "512GB", "1TB"].map((size) => (
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
                  <Color />
                </div>

                <div>
                  <h3 className="font-bold mb-2">
                    Warranty : 1 Year Apple Care Warranty
                  </h3>
                  <span className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 cursor-pointer">
                    1 Year Apple Care Warranty
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
                  <h3 className="font-bold mb-2">Availability : 10</h3>
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
                      Delivery Information
                    </summary>
                    <div className="p-4 text-sm text-gray-600">
                      We partner with trusted and reliable courier services to
                      ensure your order is delivered safely and on time. All
                      domestic orders are typically delivered within 4-8
                      business days, with deliveries taking place from Monday to
                      Saturday (excluding Sundays and public holidays). Please
                      note that delivery charges apply.
                      <br />
                      <br />
                      While we strive to accommodate any special delivery
                      instructions, doing so may cause slight delays beyond our
                      standard delivery timeframe.
                      <br />
                      We aim to meet our delivery deadlines, but unforeseen
                      circumstances may occasionally cause delays. If this
                      happens, we sincerely apologize and will work to get your
                      order to you as quickly as possible.
                    </div>
                  </details>
                  <div>
                    <h3 className="product-heading">Send a message </h3>

                    <form
                      action="/submit"
                      method="POST"
                      enctype="multipart/form-data"
                    >
                      <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Enter please your name"
                        required
                      />

                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter please your email address"
                        required
                      />

                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder="Enter please your phone number"
                        required
                      />

                      <textarea
                        id="message"
                        name="message"
                        placeholder="Enter please your message"
                        required
                      ></textarea>

                      <label htmlFor="image" className="file-label">
                        Upload an image (optional):
                      </label>
                      <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                      />

                      <button type="submit">SUBMIT</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[rgba(206,227,231,0.3)] py-5">
        <div className="max-w-7xl mx-auto px-4">
          <h4 className="text-2xl font-semibold mb-4">
            Description & Product Information
          </h4>
          <div className="bg-white p-6 rounded-lg">
            <p className="text-gray-600 text-sm">
              The iPhone 16 Pro Max is Apple's latest powerhouse, offering
              significant advancements in photography, video quality, and
              processing. The device features a 48MP Fusion camera with
              ultra-wide and telephoto capabilities, allowing for crisp,
              detailed shots, even in low light. It supports 4K video recording
              at an impressive 120 frames per second in Dolby Vision, setting a
              new standard for cinematic quality on a smartphone. The A18 Pro
              chip enhances performance and energy efficiency, while new
              AI-driven tools like “Apple Intelligence” make Siri more intuitive
              and secure, adapting to personal needs. With USB-C fast charging
              and up to 5x optical zoom, the iPhone 16 Pro Max is crafted for
              users who demand top-tier creativity and functionality in a sleek
              design.
            </p>
            <p className="text-sm mt-4">
              <strong>PLEASE NOTE -</strong> Please note that the actual product
              color may vary slightly from the image due to lighting conditions
              or differences in display settings. We appreciate your
              understanding, as achieving an exact color match in product images
              is beyond our control.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
