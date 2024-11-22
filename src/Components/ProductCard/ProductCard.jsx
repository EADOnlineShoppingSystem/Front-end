// import React from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import wish from "../images/wish.svg";
// import watch from "../images/watch.jpg";
// import watch2 from "../images/watch-1.jpg";
// import addcart from "../images/add-cart.svg";
// import view from "../images/view.svg";
// import { useDispatch, useSelector } from "react-redux";
// import { addToWishlist } from "../features/products/productSlice";
// import { toast } from "react-toastify";
// import { FaRegHeart } from "react-icons/fa6";

// const ProductCard = (props) => {
//   const { grid, data } = props;
//   return (
//     <>
//         return (
//           <div
//             key={index}
//             className={` ${
//               location.pathname === "/product" ? `gr-${grid}` : "col-3"
//             } `}
//           >
//             <Link
//               to={`${
//                 location.pathname === "/"
//                   ? "/product/" + item?._id
//                   : location.pathname === "/product/" + item?._id
//                   ? "/product/" + item?._id
//                   : item?._id
//               }`}
//               className="product-card position-relative"
//             >
//               <div className="wishlist-icon position-absolute">
//                 <button
//                   className="border-0 bg-transparent"
//                   onClick={(e) => {
//                     e.preventDefault();
//                     handleAddToWishlist(item?._id);
//                   }}
//                 >
//                   <FaRegHeart size={19} className="wishlist-icon-img" />
//                 </button>
//               </div>
//               <div className="product-image">
//                 <img
//                   src={item?.images[0].url ? item?.images[0].url : { watch }}
//                   className="img-fluid mx-auto"
//                   alt={item?.title || "Product Image"}
//                   width={160}
//                 />
//                 <img
//                   src={watch2}
//                   className="img-fluid mx-auto"
//                   alt={item?.title || "Product Image"}
//                   width={160}
//                 />
//               </div>
//               <div className="product-details">
//                 <h5 className="product-title">
//                   {item?.title || "Product Title"}
//                 </h5>
//                 <p
//                   className={`description ${
//                     grid === 12 ? "d-block" : "d-none"
//                   }`}
//                   dangerouslySetInnerHTML={{ __html: item?.description || "" }}
//                 />
//                 <p className="price">LKR {item?.price || "N/A"}</p>
//               </div>
//               <div className="action-bar position-absolute">
//                 <div className="d-flex flex-column gap-15">
//                   <button className="border-0 bg-transparent">
//                     <img src={prodcompare} alt="Compare Product" />
//                   </button>
//                   <button className="border-0 bg-transparent">
//                     <img
//                       onClick={() => navigate("/product/" + item?._id)}
//                       src={view}
//                       alt="View Product"
//                     />
//                   </button>
//                   <button className="border-0 bg-transparent">
//                     <img src={addcart} alt="Add to Cart" />
//                   </button>
//                 </div>
//               </div>
//             </Link>
//           </div>
//         );
//       })}
//     </>
//   );
// };

// export default ProductCard;


// import React from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import wish from "../images/wish.svg";
// import watch from "../images/watch.jpg";
// import watch2 from "../images/watch-1.jpg";
// import addcart from "../images/add-cart.svg";
// import view from "../images/view.svg";
// import { useDispatch, useSelector } from "react-redux";
// import { addToWishlist } from "../features/products/productSlice";
// import { toast } from "react-toastify";
// import { FaRegHeart } from "react-icons/fa6";

// const ProductCard = (props) => {
//   const { grid, data } = props;
//   const location = useLocation();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { user } = useSelector((state) => state.auth);

//   if (!Array.isArray(data)) {
//     console.error("Product data is not an array:", data);
//     return null; // Render nothing or an appropriate placeholder
//   }

//   const handleAddToWishlist = async (id) => {
//     if (!user) {
//       toast.error("Please login to add items to wishlist");
//       return;
//     }

//     try {
//       await dispatch(addToWishlist(id)).unwrap();
//       toast.success("Product added to wishlist");
//     } catch (error) {
//       toast.error(error?.message || "Failed to add to wishlist");
//     }
//   };

//   //  const products = Array.isArray(data) ? data : [];
//   // if (!Array.isArray(data)) {
//   //   return null; // or return a loading state/placeholder
//   // }

//   return (
//     <>
//       {data?.map((item, index) => {
//         // const imageUrl =
//         //   item?.images && item.images.length > 0 ? item.images[0].url : {watch};
//         return (
//           <div
//             key={index}
//             className={` ${
//               location.pathname === "/product" ? `gr-${grid}` : "col-3"
//             } `}
//           >
//             <Link
//               to={`${
//                 location.pathname === "/"
//                   ? "/product/" + item?._id
//                   : location.pathname === "/product/" + item?._id
//                   ? "/product/" + item?._id
//                   : item?._id
//               }`}
//               className="product-card position-relative"
//             >
//               <div className="wishlist-icon position-absolute">
//                 <button
//                   className="border-0 bg-transparent"
//                   onClick={(e) => {
//                     e.preventDefault();
//                     handleAddToWishlist(item?._id);
//                   }}
//                 >
//                   <FaRegHeart size={19} className="wishlist-icon-img" />
//                   {/* <img src={wish} alt="wishlist" /> */}
//                 </button>
//               </div>
//               <div className="product-image">
//                 <img
//                   src={item?.images[0].url ? item?.images[0].url : { watch }}
//                   className="img-fluid mx-auto"
//                   alt={item?.title || "Product Image"}
//                   width={160}
//                 />
//                 <img
//                   src={watch2}
//                   className="img-fluid mx-auto"
//                   alt={item?.title || "Product Image"}
//                   width={160}
//                 />
//               </div>
//               <div className="product-details">
//                 <h5 className="product-title">
//                   {item?.title || "Product Title"}
//                 </h5>
//                 <p
//                   className={`description ${
//                     grid === 12 ? "d-block" : "d-none"
//                   }`}
//                   dangerouslySetInnerHTML={{ __html: item?.description || "" }}
//                 />
//                 <p className="price">LKR {item?.price || "N/A"}</p>
//               </div>
//               <div className="action-bar position-absolute">
//                 <div className="d-flex flex-column gap-15">
//                   {/* <button className="border-0 bg-transparent">
//                     <img src={prodcompare} alt="Compare Product" />
//                   </button> */}
//                   <button className="border-0 bg-transparent">
//                     <img
//                       onClick={() => navigate("/product/" + item?._id)}
//                       src={view}
//                       alt="View Product"
//                     />
//                   </button>
//                   {/* <button className="border-0 bg-transparent">
//                     <img src={addcart} alt="Add to Cart" />
//                   </button> */}
//                 </div>
//               </div>
//             </Link>
//           </div>
//         );
//       })}
//     </>
//   );
// };

// export default ProductCard;
