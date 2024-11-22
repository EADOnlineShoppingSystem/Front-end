// import React, { useState } from "react";
// import BreadCrumb from "../Components/ProductCard/BreadCrumb";
// import Meta from "../Components/ProductCard/Meta";
// //import ProductCard from "../Components/ProductCard/ProductCard";
// import Color from "../Components/ProductCard/Color";
// import Storage from "../Components/ProductCard/Storage";
// import Warranty from "../Components/ProductCard/Warranty";
// import { FaRegHeart } from "react-icons/fa";
// import { TbGitCompare } from "react-icons/tb";
// import Container from "../Components/ProductCard/Container";
// import { FaRegFaceGrinSquintTears } from "react-icons/fa6";
// import pro1 from "../../public/images/pro1.webp";
// import ReactStars from 'react-stars'
// import { FaCcVisa, FaCcMastercard, FaCcAmex, FaCcPaypal } from "react-icons/fa";

// const SingleProduct = () => {
//   const productImages = [
//     pro1,
//     // Add more image imports here if you have them
//   ];

//   //quantity
//   const [quantity, setQuantity] = useState(1);
//   const handleIncrement = () => {
//     if (quantity < 10) {
//       setQuantity(quantity + 1);
//     }
//   };
//   const handleDecrement = () => {
//     if (quantity > 1) {
//       setQuantity(quantity - 1);
//     }
//   };

//   // const [orderedProduct, setorderedProduct] = useState(true);
//   const [selectedImageIndex, setSelectedImageIndex] = useState(0);
//   const [isZoomed, setIsZoomed] = useState(false);
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

//   const handleImageMouseMove = (e) => {
//     if (!isZoomed) return;

//     const bounds = e.currentTarget.getBoundingClientRect();
//     const x = ((e.clientX - bounds.left) / bounds.width) * 100;
//     const y = ((e.clientY - bounds.top) / bounds.height) * 100;

//     setMousePosition({ x, y });
//   };

//   const handleImageMouseEnter = () => setIsZoomed(true);
//   const handleImageMouseLeave = () => setIsZoomed(false);

//   return (
//     <>
//       <Meta title={"Product Name"} />
//       <BreadCrumb title="Product Name" />
//       <Container class1="main-product-wrapper py-5 home-wrapper-4">
//         <div className="row">
//           <div className="col-6">
//             <div className="main-product-image">
//               <div
//                 className="image-container position-relative overflow-hidden"
//                 style={{ height: "600px" }}
//                 onMouseMove={handleImageMouseMove}
//                 onMouseEnter={handleImageMouseEnter}
//                 onMouseLeave={handleImageMouseLeave}
//               >
//                 <img
//                   src={pro1}
//                   alt="product"
//                   className="img-fluid w-100 h-100 object-fit-cover"
//                   style={{ objectPosition: "center" }}
//                 />
//                 {isZoomed && (
//                   <div
//                     className="zoomed-image position-absolute w-100 h-100"
//                     style={{
//                       backgroundImage: `url(${productImages[selectedImageIndex]})`,
//                       backgroundPosition: `${mousePosition.x}% ${mousePosition.y}%`,
//                       backgroundSize: "200%",
//                       backgroundRepeat: "no-repeat",
//                       top: 0,
//                       left: 0,
//                       zIndex: 1,
//                     }}
//                   />
//                 )}
//               </div>
//             </div>
//             <div
//               className=""
//               style={{ backgroundColor: "#ffffff", paddingBottom: "100px" }}
//             >
//               <div className="other-product-images d-flex flex-wrap gap-15 mt-3">
//                 {productImages.map((image, index) => (
//                   <div
//                     key={index}
//                     className={`cursor-pointer ${
//                       selectedImageIndex === index
//                         ? "border border-primary"
//                         : ""
//                     }`}
//                     style={{ width: "100px", height: "100px" }}
//                     onClick={() => setSelectedImageIndex(index)}
//                   >
//                     <img
//                       src={image}
//                       alt={`product thumbnail ${index + 1}`}
//                       className="img-fluid w-100 h-100 object-fit-cover"
//                     />
//                   </div>
//                 ))}
//               </div>

//               <div className="d-flex align-items-center gap-15 comapare-wishlist">
//                 <div className="compare-div">
//                   <a
//                     href="/compare"
//                     className="compare d-flex align-items-center"
//                   >
//                     <TbGitCompare className="fs-5 me-2" /> Compare
//                   </a>
//                 </div>
//                 <div className="wishlist-div">
//                   <a
//                     href="/wishlist"
//                     className="add-wishlist d-flex align-items-center"
//                   >
//                     <FaRegHeart className="fs-5 me-2" /> Add to Wishlist
//                   </a>
//                 </div>
//               </div>

//               <div className="product-info">
//                 {/* People Watching Notification */}
//                 <div className="watching-notification d-flex align-items-center justify-content-center p-2 mt-3 mb-3">
//                   <span
//                     style={{
//                       fontSize: "20px",
//                       fontWeight: "bold",
//                       marginRight: "5px",
//                     }}
//                   >
//                     16
//                   </span>
//                   People watching this product now!
//                 </div>

//                 {/* Payment Methods */}
//                 <div className="payment-methods d-flex align-items-center">
//                   <h6 style={{ marginRight: "10px", fontWeight: "bold" }}>
//                     Payment Methods :
//                   </h6>
//                   <div className="d-flex gap-2">
//                     <div
//                       style={{
//                         backgroundColor: "#4267B2",
//                         borderRadius: "5px",
//                         padding: "5px",
//                       }}
//                     >
//                       <FaCcVisa color="white" size="20px" />
//                     </div>
//                     <div
//                       style={{
//                         backgroundColor: "#ff5f00",
//                         borderRadius: "5px",
//                         padding: "5px",
//                       }}
//                     >
//                       <FaCcMastercard color="white" size="20px"/>
//                     </div>
//                     <div
//                       style={{
//                         backgroundColor: "#0077C0",
//                         borderRadius: "5px",
//                         padding: "5px",
//                       }}
//                     >
//                       <FaCcAmex color="white" size="20px" />
//                     </div>
//                     <div
//                       style={{
//                         backgroundColor: "#003087",
//                         borderRadius: "5px",
//                         padding: "5px",
//                       }}
//                     >
//                       <FaCcPaypal color="white" size="20px" />
//                     </div>
//                     {/* Add more icons as needed */}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="col-6">
//             <div className="main-product-details">
//               <div className="border-bottom">
//                 <h3 className="title ml-2">iPhone 16 pro max</h3>
//                 <p className="price ml-2">LKR 400,000.00 - 500,000.00</p>
//                 <div className="d-flex align-items-center gap-2 ml-2">
//                   <span className="fw-bold">Rating :</span>
//                   <ReactStars
//                     count={5}
//                     size={24}
//                     value={4}
//                     edit={false}
//                     activeColor="#ffd700"
//                   />
//                   <span className="mb-0 t-review">(5 Reviews)</span>
//                 </div>
//               </div>
//               <div className="py-3">
//                 <div className="d-flex flex-column align-items-start gap-2 mt-4 mb-3 ml-2">
//                   <h3 className="product-heading mb-0">
//                     <span className="fw-bold">Storage</span> : 256GB
//                   </h3>
//                   <div
//                     className="d-flex gap-2 mt-1"
//                     style={{ cursor: "pointer" }}
//                   >
//                     <span className="badge border border-1 bg-white text-dark border-secondary fs-6">
//                       64GB
//                     </span>
//                     <span className="badge border border-1 bg-white text-dark border-secondary fs-6">
//                       128GB
//                     </span>
//                     <span className="badge border border-1 bg-white text-dark border-secondary fs-6">
//                       256GB
//                     </span>
//                     <span className="badge border border-1 bg-white text-dark border-secondary fs-6">
//                       512GB
//                     </span>
//                     <span className="badge border border-1 bg-white text-dark border-secondary fs-6">
//                       1TB
//                     </span>
//                   </div>
//                 </div>

//                 <div className="d-flex gap-10 align-items-center mt-4 mb-3 ml-2">
//                   <h3 className="product-heading">
//                     <span className="fw-bold">Color</span> :{" "}
//                   </h3>
//                   <div className="product-color">
//                     <Color />
//                   </div>
//                 </div>

//                 <div className="d-flex flex-column align-items-start gap-2 mt-4 mb-3 ml-2">
//                   <h3 className="product-heading">
//                     <span style={{ fontWeight: "bold" }}>Warranty</span> : 1
//                     Year Apple Care Warranty
//                   </h3>
//                   <div
//                     className="d-flex gap-2 mt-1"
//                     style={{ cursor: "pointer" }}
//                   >
//                     <span className="badge border border-1 bg-white text-dark border-secondary fs-6">
//                       1 Year Apple Care Warranty
//                     </span>
//                   </div>
//                 </div>

//                 <div className="d-flex flex-column mt-5 mb-3 ml-2">
//                   <h3 className="product-heading">
//                     <span style={{ fontWeight: "bold" }}>Quantity </span> : 1
//                   </h3>
//                   <div className="d-flex align-items-center mt-2 ms-2 gap-1">
//                     <button
//                       className="btn btn-outline-secondary"
//                       onClick={handleDecrement}
//                       style={{
//                         width: "40px",
//                         height: "40px",
//                         backgroundColor: "#f5f5f5",
//                         border: "none",
//                       }}
//                     >
//                       -
//                     </button>
//                     <input
//                       type="text"
//                       className="form-control text-center"
//                       value={quantity}
//                       readOnly
//                       style={{ width: "63px" }}
//                     />
//                     <button
//                       className="btn btn-outline-secondary"
//                       onClick={handleIncrement}
//                       style={{
//                         width: "40px",
//                         height: "40px",
//                         backgroundColor: "#f5f5f5",
//                         border: "none",
//                       }}
//                     >
//                       +
//                     </button>
//                   </div>
//                 </div>

//                 <div
//                   className="d-flex flex-column align-items-center gap-3 ms-5"
//                   style={{ marginTop: "100px" }}
//                 >
//                   <div>
//                     <button className="button1 add-cart border-0" type="button">
//                       Add To Cart
//                     </button>
//                   </div>
//                   <div>
//                     <button className="button1 buy-now">Buy Now</button>
//                   </div>
//                 </div>

//                 <div className="d-flex gap-15 flex-column my-3">
//                   <div className="accordion d-flex align-items-center">
//                     <li>
//                       <input type="checkbox" className="accordion" id="first" />
//                       <label className="label-colspan" for="first">
//                         Delivery Information :{" "}
//                       </label>
//                       <p className="product-data">
//                         We partner with trusted and reliable courier services to
//                         ensure your order is delivered safely and on time. All
//                         domestic orders are typically delivered within 4-8
//                         business days, with deliveries taking place from Monday
//                         to Saturday (excluding Sundays and public holidays).
//                         Please note that delivery charges apply.
//                         <br />
//                         <br />
//                         While we strive to accommodate any special delivery
//                         instructions, doing so may cause slight delays beyond
//                         our standard delivery timeframe.
//                         <br />
//                         We aim to meet our delivery deadlines, but unforeseen
//                         circumstances may occasionally cause delays. If this
//                         happens, we sincerely apologize and will work to get
//                         your order to you as quickly as possible.
//                       </p>
//                     </li>
//                   </div>
//                 </div>
//                 <div className="d-flex gap-10 align-items-center my-2">
// <h3 className="product-heading">Send a message </h3>

// {/* <form
//   action="/submit"
//   method="POST"
//   enctype="multipart/form-data"
// >
//   <input
//     type="text"
//     id="name"
//     name="name"
//     placeholder="Enter please your name"
//     required
//   />

//   <input
//     type="email"
//     id="email"
//     name="email"
//     placeholder="Enter please your email address"
//     required
//   />

//   <input
//     type="tel"
//     id="phone"
//     name="phone"
//     placeholder="Enter please your phone number"
//     required
//   />

//   <textarea
//     id="message"
//     name="message"
//     placeholder="Enter please your message"
//     required
//   ></textarea>

//   {/* Image upload field
//   <label htmlFor="image" className="file-label">
//     Upload an image (optional):
//   </label>
//   <input
//     type="file"
//     id="image"
//     name="image"
//     accept="image/*"
//   />

//   <button type="submit">SUBMIT</button>
// </form> */}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </Container>
//       {/* <Container class1="reviews-wrapper py-5 home-wrapper-4">
//         <div className="row">
//           <div className="col-12">
//             <div className="review-inner-wrapper">
//             <div className="review-head d-flex justify-content-between align-items-end">
//               <div>
//                 <h4 className="mb-2">Customer Reviews</h4>
//                 <div className="d-flex align-items-center gap-10">
//                 <ReactStars
//                 count={5}
//                 size={24}
//                 value={4}
//                 edit={false}
//                 activeColor='#ffd700'
//                 />
//                 <p className="mb-0">(5 Reviews)</p>
//                 </div>
//               </div>
//               {
//                 orderedProduct && (
//                   <div>
//                 <a href="" className="text-dark text-decoration-underline">Write a Review</a>
//               </div>
//                 )
//               }
//             </div>
//             </div>
//           </div>
//         </div>
//       </Container> */}
//       <Container class1="description-wrapper py-5 home-wrapper-4">
//         <div className="row">
//           <div className="col-12">
//             <h4>Description & Product Information</h4>
//             <div className="bg-white p-3">
//               <p>
// The iPhone 16 Pro Max is Apple's latest powerhouse, offering
// significant advancements in photography, video quality, and
// processing. The device features a 48MP Fusion camera with
// ultra-wide and telephoto capabilities, allowing for crisp,
// detailed shots, even in low light. It supports 4K video
// recording at an impressive 120 frames per second in Dolby
// Vision, setting a new standard for cinematic quality on a
// smartphone. The A18 Pro chip enhances performance and energy
// efficiency, while new AI-driven tools like “Apple Intelligence”
// make Siri more intuitive and secure, adapting to personal needs.
// With USB-C fast charging and up to 5x optical zoom, the iPhone
// 16 Pro Max is crafted for users who demand top-tier creativity
// and functionality in a sleek design.
//               </p>
//               <p className="note">
// <strong>PLEASE NOTE -</strong> Please note that the actual
// product color may vary slightly from the image due to lighting
// conditions or differences in display settings. We appreciate
// your understanding, as achieving an exact color match in product
// images is beyond our control.
//               </p>
//             </div>
//           </div>
//         </div>
//       </Container>
//       {/* <Container class1="popular-wrapper py-5 home-wrapper-4">
//         <div className="row">
//           <div className="col-12">
//             <h3 className="section-heading">Our Popular Dresses</h3>
//           </div>
//         </div>
//         <div className="row">
//           <ProductCard data={popularProduct} />
//         </div>
//       </Container> */}
//     </>
//   );
// };

// export default SingleProduct;

import React, { useState } from "react";
import BreadCrumb from "../Components/ProductCard/BreadCrumb";
import Meta from "../Components/ProductCard/Meta";
import Color from "../Components/ProductCard/Color";
import { FaRegHeart } from "react-icons/fa";
import { TbGitCompare } from "react-icons/tb";
import Container from "../Components/ProductCard/Container";
import pro1 from "../../public/images/pro1.webp";
import ReactStars from "react-stars";
import { FaCcVisa, FaCcMastercard, FaCcAmex, FaCcPaypal } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

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
      <Meta title="Product Name" />
      <BreadCrumb title="Product Name" />
      <div className="bg-[rgba(206,227,231,0.3)] py-5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="ml-1">
            <nav
              className="flex items-center text-sm text-gray-500"
              aria-label="Breadcrumb"
            >
              <ol className="flex items-center space-x-2">
                <li>
                  <Link
                    to="/cart"
                    className="text-gray-800 hover:text-gray-900"
                  >
                    <FontAwesomeIcon icon={faAngleLeft} aria-hidden="true" />{" "}
                    Apple
                  </Link>
                </li>
                <span className="text-gray-400">/</span>
                <li>
                  <Link
                    to="/shipping"
                    className="text-gray-800 hover:text-gray-900"
                  >
                    iPhone
                  </Link>
                </li>
                <span className="text-gray-400">/</span>
                <li className="text-gray-800 font-medium" aria-current="page">
                  iPhone 16 pro max
                </li>
              </ol>
            </nav>
          </div>

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

// import React, { useEffect, useState } from "react";
// import BreadCrumb from "../Components/ProductCard/BreadCrumb";
// import Meta from "../Components/ProductCard/Meta";
// //import ProductCard from "../Components/ProductCard/ProductCard";
// // import ReactImageZoom from "react-image-zoom";
// import Color from "../Components/ProductCard/Color";
// import { AiOutlineHeart } from "react-icons/ai";
// import { TbGitCompare } from "react-icons/tb";
// import Container from "../Components/ProductCard/Container";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// //import { getAllProducts, getAProduct } from "../features/products/productSlice";
// import { toast } from "react-toastify";
// //import { addProductToCart, getUserCart } from "../features/user/userSlice";

// const SingleProduct = () => {
//   const [selectedColor, setSelectedColor] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const [alreadyAdded, setAlreadyAdded] = useState(false);
//   const [popularProduct, setPopularProduct] = useState([]);

//   const [selectedImageIndex, setSelectedImageIndex] = useState(0);
//   const [isZoomed, setIsZoomed] = useState(false);
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

//   const location = useLocation();
//   const navigate = useNavigate();
//   const getProductId = location.pathname.split("/")[2];
//   const dispatch = useDispatch();
//   const productState = useSelector((state) => state?.product?.singleproduct);
//   const productsState = useSelector((state) => state?.product?.product);
//   const cartState = useSelector((state) => state?.auth?.cartProducts);
//   useEffect(() => {
//     dispatch(getAProduct(getProductId));
//     dispatch(getUserCart());
//     dispatch(getAllProducts())
//   }, [dispatch, getProductId]);

//   useEffect(() => {
//     if (cartState && cartState.length > 0) {
//       for (let index = 0; index < cartState?.length; index++) {
//         if (getProductId === cartState[index]?.productId?._id) {
//           setAlreadyAdded(true);
//           break;
//         }
//       }
//     }
//   }, [cartState, getProductId]);

//   const handleImageMouseMove = (e) => {
//     if (!isZoomed) return;

//     const bounds = e.currentTarget.getBoundingClientRect();
//     const x = ((e.clientX - bounds.left) / bounds.width) * 100;
//     const y = ((e.clientY - bounds.top) / bounds.height) * 100;

//     setMousePosition({ x, y });
//   };

//   const handleImageMouseEnter = () => setIsZoomed(true);
//   const handleImageMouseLeave = () => setIsZoomed(false);

//   const uploadCart = () => {
//     if (selectedColor === null) {
//       toast.error("Please Choose Color");
//       return false;
//     } else {
//       dispatch(
//         addProductToCart({
//           productId: productState?._id,
//           quantity,
//           color: selectedColor,
//           price: productState?.price,
//         })
//       );
//       navigate("/cart");
//     }
//   };

//   useEffect(() => {
//     let data = [];
//     for (let index = 0; index < productsState.length; index++) {
//       const element = productsState[index];
//       if (element.tags === "popular") {
//         data.push(element);
//       }
//       setPopularProduct(data);
//     }
//   }, [productsState]);

//   return (
//     <>
//       <Meta title={"Product Name"} />
//       <BreadCrumb title={productState?.title}/>
//       <Container class1="main-product-wrapper py-5 home-wrapper-4">
//         <div className="row">
//           <div className="col-6">
//           <div className="main-product-image">
//               <div
//                 className="image-container position-relative overflow-hidden"
//                 style={{ height: "600px" }}
//                 onMouseMove={handleImageMouseMove}
//                 onMouseEnter={handleImageMouseEnter}
//                 onMouseLeave={handleImageMouseLeave}
//               >
//                 {productState?.images?.[selectedImageIndex]?.url && (
//                   <>
//                     <img
//                       src={productState.images[selectedImageIndex].url}
//                       alt="product"
//                       className="img-fluid w-100 h-100 object-fit-cover"
//                       style={{ objectPosition: "center" }}
//                     />
//                     {isZoomed && (
//                       <div
//                         className="zoomed-image position-absolute w-100 h-100"
//                         style={{
//                           backgroundImage: `url(${productState.images[selectedImageIndex].url})`,
//                           backgroundPosition: `${mousePosition.x}% ${mousePosition.y}%`,
//                           backgroundSize: "200%",
//                           backgroundRepeat: "no-repeat",
//                           top: 0,
//                           left: 0,
//                           zIndex: 1,
//                         }}
//                       />
//                     )}
//                   </>
//                 )}
//               </div>
//             </div>
//             <div className="other-product-images d-flex flex-wrap gap-15 mt-3">
//               {productState?.images?.map((item, index) => (
//                 <div
//                   key={index}
//                   className={`cursor-pointer ${
//                     selectedImageIndex === index ? "border border-primary" : ""
//                   }`}
//                   style={{ width: "100px", height: "100px" }}
//                   onClick={() => setSelectedImageIndex(index)}
//                 >
//                   <img
//                     src={item?.url}
//                     alt={`product-${index}`}
//                     className="img-fluid w-100 h-100 object-fit-cover"
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>
//           <div className="col-6">
//             <div className="main-product-details">
//               <div className="border-bottom">
//                 <h3 className="title">{productState?.title}</h3>
//               </div>
//               <div className="border-bottom py-3">
//                 <p className="price">LKR {productState?.price}</p>
//               </div>
//               <div className="py-3">
//                 <div className="d-flex gap-10 align-items-center my-2">
//                   <h3 className="product-heading">Type : </h3>
//                   <p className="product-data">Prom Dress</p>
//                 </div>
//                 <div className="d-flex gap-10 align-items-center my-2">
//                   <h3 className="product-heading">Category : </h3>
//                   <p className="product-data">{productState?.category}</p>
//                 </div>
//                 <div className="d-flex gap-10 align-items-center my-2">
//                   <h3 className="product-heading">Tags : </h3>
//                   <p className="product-data">{productState?.tags}</p>
//                 </div>
//                 <div className="d-flex gap-10 align-items-center my-2">
//                   <h3 className="product-heading">SKU : </h3>
//                   <p className="product-data">{productState?.sku}</p>
//                 </div>
//                 <div className="d-flex gap-10 align-items-center my-2">
//                   <h3 className="product-heading">Availability : </h3>
//                   <p className="product-data">In Stock</p>
//                 </div>
//                 {/* <div className="d-flex gap-10 align-items-center mt-2 mb-3">
//                   <h3 className="product-heading">Size : </h3>
//                   <div className="d-flex flex-wrap gap-15">
//                     {productState?.size?.map((size, index) => (
//                       <span
//                         key={index}
//                         className={`badge border border-1 bg-white text-dark border-secondary ${
//                           selectedSize === size ? "active" : ""
//                         }`}
//                         onClick={() => setSelectedSize(size)} // Set selected size
//                         style={{ cursor: "pointer" }}
//                       >
//                         {size}
//                       </span>
//                     ))}
//                   </div>
//                 </div> */}

//                 {alreadyAdded === false && (
//                   <>
//                     <div className="d-flex gap-10 align-items-center mt-2 mb-3">
//                       <h3 className="product-heading">Color : </h3>
//                       <div className="product-color">
//                         <Color
//                           setColor={setSelectedColor}
//                           colorData={productState?.color}
//                           selectedColor={selectedColor}
//                         />
//                       </div>
//                     </div>
//                   </>
//                 )}

//                 <div className="d-flex align-items-center gap-15 flex-row mt-2 mb-3">
//                   {alreadyAdded === false && (
//                     <>
//                       <h3 className="product-heading">Quantity : </h3>
//                       <div className="">
//                         <input
//                           type="number"
//                           name=""
//                           min={1}
//                           max={10}
//                           className="form-control"
//                           style={{ width: "63px" }}
//                           id=""
//                           onChange={(e) => setQuantity(e.target.value)}
//                           value={quantity}
//                         />
//                       </div>
//                     </>
//                   )}
//                   <div className={"d-flex align-items-center gap-30 ms-5"}>
//                     {/* //alreadyAdded? "ms-0" : "ms-5" + */}
//                     <button
//                       className="button1 border-0"
//                       type="button"
//                       onClick={() => {
//                         alreadyAdded ? navigate("/cart") : uploadCart();
//                       }}
//                     >
//                       {alreadyAdded ? "Go To Cart" : "Add to Cart"}
//                     </button>
//                     <button className="button1 signup">Buy Now</button>
//                   </div>
//                 </div>
//                 <div className="d-flex align-items-center gap-15">
//                   {/* <div>
//                     <a href="/compare">
//                       <TbGitCompare className="fs-5 me-2" /> Add to Compare
//                     </a>
//                   </div> */}
//                   <div>
//                     <a href="/wishlist">
//                       <AiOutlineHeart className="fs-5 me-2" /> Add to Wishlist
//                     </a>
//                   </div>
//                 </div>
//                 <div className="d-flex gap-15 flex-column my-3">
//                   <div className="accordion d-flex align-items-center">
//                     <li>
//                       <input type="checkbox" className="accordion" id="first" />
//                       <label className="label-colspan" for="first">
//                         Delivery Information :{" "}
//                       </label>
//                       <p className="product-data">
//                         We partner with trusted and reliable courier services to
//                         ensure your order is delivered safely and on time. All
//                         domestic orders are typically delivered within 4-8
//                         business days, with deliveries taking place from Monday
//                         to Saturday (excluding Sundays and public holidays).
//                         Please note that delivery charges apply.
//                         <br />
//                         <br />
//                         While we strive to accommodate any special delivery
//                         instructions, doing so may cause slight delays beyond
//                         our standard delivery timeframe.
//                         <br />
//                         We aim to meet our delivery deadlines, but unforeseen
//                         circumstances may occasionally cause delays. If this
//                         happens, we sincerely apologize and will work to get
//                         your order to you as quickly as possible.
//                       </p>
//                     </li>
//                   </div>
//                 </div>
//                 <div className="d-flex gap-15 flex-column my-3">
//                   <div className="accordion d-flex align-items-center">
//                     <li>
//                       <input
//                         type="checkbox"
//                         className="accordion"
//                         id="second"
//                       />
//                       <label className="label-colspan" for="second">
//                         Size Chart :{" "}
//                       </label>
//                       <div className="content">
//                         <img
//                           src={sizechart}
//                           alt="sizechart"
//                           className="img-fluid"
//                         />
//                       </div>
//                     </li>
//                   </div>
//                 </div>
//                 <div className="d-flex gap-10 align-items-center my-2">
//                   <h3 className="product-heading">Send a message </h3>

//                   {/* <form
//                     action="/submit"
//                     method="POST"
//                     enctype="multipart/form-data"
//                   >
//                     <input
//                       type="text"
//                       id="name"
//                       name="name"
//                       placeholder="Enter please your name"
//                       required
//                     />

//                     <input
//                       type="email"
//                       id="email"
//                       name="email"
//                       placeholder="Enter please your email address"
//                       required
//                     />

//                     <input
//                       type="tel"
//                       id="phone"
//                       name="phone"
//                       placeholder="Enter please your phone number"
//                       required
//                     />

//                     <textarea
//                       id="message"
//                       name="message"
//                       placeholder="Enter please your message"
//                       required
//                     ></textarea>

//                     {/* Image upload field
//                     <label htmlFor="image" className="file-label">
//                       Upload an image (optional):
//                     </label>
//                     <input
//                       type="file"
//                       id="image"
//                       name="image"
//                       accept="image/*"
//                     />

//                     <button type="submit">SUBMIT</button>
//                   </form> */}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </Container>
//       <Container class1="description-wrapper py-5 home-wrapper-4">
//         <div className="row">
//           <div className="col-12">
//             <h4>Description & Product Information</h4>
//             <div className="bg-white p-3">
//               <p
//                 dangerouslySetInnerHTML={{ __html: productState?.description }}
//               ></p>
//               <p className="note">
//                 <strong>PLEASE NOTE -</strong> Please note that the actual
//                 product color may vary slightly from the image due to lighting
//                 conditions or differences in display settings. We appreciate
//                 your understanding, as achieving an exact color match in product
//                 images is beyond our control.
//               </p>
//             </div>
//           </div>
//         </div>
//       </Container>
//       {/* <section className='reviews-wrapper py-5 home-wrapper-4'>
//       <div className='container-xxl'>
//         <div className='row'>
//           <div className='col-12'>
//             <div className='review-head d-flex justify-content-between align-items-end'>
//               <div></div>
//               <div></div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section> */}
//       <Container class1="popular-wrapper py-5 home-wrapper-4">
//         <div className="row">
//           <div className="col-12">
//             <h3 className="section-heading">Our Popular Dresses</h3>
//           </div>
//         </div>
//         <div className="row">
//           <ProductCard data={popularProduct} />
//         </div>
//       </Container>
//     </>
//   );
// };

// export default SingleProduct;
