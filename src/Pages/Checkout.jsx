import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdArrowBackIosNew, MdEdit, MdLocationPin } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { createAnOrder } from "../features/user/userSlice";
import orderServices from "../Services/order.services";
import md5 from "md5";
import { useOrder } from "../contexts/orderContext";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [totalAmount, setTotalAmount] = useState(null);

  const { isLoading, isError, user } = useSelector((state) => state.auth);
  const cartState = useSelector((state) => state.auth.cartProducts);

  const [addresses] = useState([
    {
      id: 1,
      name: "John Doe",
      street: "123 Main St",
      city: "San Francisco",
      state: "CA",
      zip: "94105",
      phone: "(555) 123-4567",
      isDefault: true,
    },
  ]);

  // Payment configuration
  const orderId = "123456";
  const name = "Iphone16";
  const amount = 1000;
  const merchantId = "1228659";
  const merchantSecret = "MjY0OTk5MTk1MjI3MzM3MDY5NDIyODQ5ODU0NDM5MjAwOTMxMzEwNg==";
  const currency = "LKR";

  const hashedSecret = md5(merchantSecret).toString().toUpperCase();
  const amountFormated = parseFloat(amount).toLocaleString("en-us", { minimumFractionDigits: 2 }).replaceAll(",", "");
  const hash = md5(merchantId + orderId + amountFormated + currency + hashedSecret).toString().toUpperCase();

  const paymentData = {
    sandbox: true,
    merchant_id: merchantId,
    return_url: "http://localhost:5173",
    cancel_url: "http://sample.com/cancel",
    notify_url: "http://sample.com/notify",
    order_id: orderId,
    items: name,
    amount: amount,
    currency: currency,
    first_name: "kanishka",
    last_name: "udayanga",
    email: "mskanihskaudayang@gmail.com",
    phone: "0784657729",
    address: "kurunda",
    city: "city",
    country: "Lanka",
    hash: hash,
  };

  useEffect(() => {
    const defaultAddress = addresses.find((addr) => addr.isDefault);
    setSelectedAddress(defaultAddress);
  }, [addresses]);

  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < cartState?.length; index++) {
      sum = sum + Number(cartState[index].quantity) * cartState[index].price;
      setTotalAmount(sum);
    }
  }, [cartState]);

  useEffect(() => {
    window.payhere.onCompleted = function onCompleted(paymentId) {
      console.log("Payment completed. Payment Id:" + paymentId);
      const orderData = {
        productId: "12334",
        userId: "633333",
        quantity: 2,
        price: 2333333
      };
      orderServices.createOrder(orderData);
    };

    window.payhere.onDismissed = function onDismissed() {
      console.log("Payment dismissed");
    };

    window.payhere.onError = function onError(error) {
      console.log("Error:" + error);
    };
  }, []);

  const payment = () => {
    window.payhere.startPayment(paymentData);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Checkout Information */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
              {/* Contact Info */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Contact Information</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700">Supun Ishara (supun20000207@gmail.com)</p>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Delivery Address</h3>
                  <button
                    onClick={() => navigate("/address")}
                    className="flex items-center text-blue-600 hover:text-blue-700"
                  >
                    <MdEdit className="w-4 h-4 mr-1" />
                    <span>Change</span>
                  </button>
                </div>

                {selectedAddress ? (
                  <div className="bg-white border border-gray-200 rounded-xl p-4 hover:border-blue-500 transition-colors">
                    <div className="flex gap-4">
                      <MdLocationPin className="w-6 h-6 text-blue-600 flex-shrink-0" />
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{selectedAddress.name}</h4>
                          {selectedAddress.isDefault && (
                            <span className="px-2 py-1 text-xs font-medium text-blue-700 bg-blue-50 rounded-full">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm">{selectedAddress.street}</p>
                        <p className="text-gray-600 text-sm">
                          {`${selectedAddress.city}, ${selectedAddress.state} ${selectedAddress.zip}`}
                        </p>
                        <p className="text-gray-600 text-sm">{selectedAddress.phone}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => navigate("/address")}
                    className="w-full p-6 border-2 border-dashed border-gray-300 rounded-xl text-center hover:border-blue-500 hover:text-blue-500 transition-all"
                  >
                    <span className="block font-medium">Add Delivery Address</span>
                    <span className="text-sm text-gray-500">Please add an address to continue</span>
                  </button>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between items-center pt-6">
                <Link
                  to="/cart"
                  className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <MdArrowBackIosNew className="mr-2" />
                  Back
                </Link>
                <button
                  onClick={payment}
                  disabled={loading || isLoading || !selectedAddress}
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loading || isLoading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    "Place Order"
                  )}
                </button>
              </div>

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-xl shadow-sm p-6 space-y-6 sticky top-8">
              <h3 className="text-xl font-semibold border-b border-gray-200 pb-4">Order Summary</h3>
              
              <div className="space-y-4">
                {cartState?.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-lg overflow-hidden bg-white">
                        {item?.productId?.images?.[0]?.url ? (
                          <img
                            src={item.productId.images[0].url}
                            alt={item.productId.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "/api/placeholder/96/96";
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-100">
                            <span className="text-gray-400">No image</span>
                          </div>
                        )}
                      </div>
                      <span className="absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center bg-gray-900 text-white text-sm rounded-full">
                        {item?.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 truncate">{item?.productId?.title}</h4>
                      <div className="flex items-center mt-1 text-sm text-gray-600">
                        <span>{item?.size}</span>
                        <span className="mx-2">/</span>
                        <div
                          className="w-4 h-4 rounded-full border border-gray-200"
                          style={{ backgroundColor: item?.color?.title }}
                          title={item?.color?.title}
                        ></div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">LKR {item?.price * item?.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">LKR {totalAmount || "0"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">LKR 350.00</span>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-4">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-lg font-semibold">LKR {totalAmount ? totalAmount + 350.0 : "0"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
// import { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { MdArrowBackIosNew, MdEdit } from "react-icons/md";
// import { MdLocationPin } from "react-icons/md";
// import pro1 from "../../public/images/pro1.webp";
// //import Container from "../components/Container";
// import { useDispatch, useSelector } from "react-redux";
// import { axiosInstance } from "../utils/axiosConfig";
// import { createAnOrder } from "../features/user/userSlice";
// import orderServices from "../Services/order.services"
// import md5 from "md5";
// import { useOrder } from "../contexts/orderContext";

// const Checkout = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [selectedAddress, setSelectedAddress] = useState(null);

//   const { isLoading, isError, isSuccess, orderedProduct, user } = useSelector(
//     (state) => state.auth
//   );

//   const cartState = useSelector((state) => state.auth.cartProducts);
//   const [totalAmount, setTotalAmount] = useState(null);

//   const [addresses, setAddresses] = useState([
//     {
//       id: 1,
//       name: "John Doe",
//       street: "123 Main St",
//       city: "San Francisco",
//       state: "CA",
//       zip: "94105",
//       phone: "(555) 123-4567",
//       isDefault: true,
//     },
//   ]);

//   useEffect(() => {
//     // Find and set the default address when component mounts
//     const defaultAddress = addresses.find((addr) => addr.isDefault);
//     setSelectedAddress(defaultAddress);
//   }, [addresses]);

//   const handlePlaceOrder = async () => {
//     if (!selectedAddress) {
//       setError("Please select a delivery address");
//       return;
//     }

//     try {
//       setLoading(true);
//       setError(null);

//       const totalWithShipping = totalAmount + 350.0;

//       const orderData = {
//         user: user._id,
//         shippingInfo: {
//           fullName: selectedAddress.name,
//           mobile: selectedAddress.phone,
//           address: selectedAddress.street,
//           city: selectedAddress.city,
//           state: selectedAddress.state,
//           country: "Sri Lanka",
//           pincode: selectedAddress.zip,
//         },
//         orderItems: cartState.map((item) => ({
//           product: item.productId._id,
//           color: item.color._id,
//           quantity: Number(item.quantity),
//           price: Number(item.price),
//           size: item.size,
//         })),
//         paymentInfo: {
//           onepayOrderId: "PENDING",
//           onepayPaymentId: "PENDING",
//         },
//         totalPrice: Number(totalWithShipping),
//         totalPriceAfterDiscount: Number(totalWithShipping),
//         orderStatus: "Ordered",
//       };

//       const result = await dispatch(createAnOrder(orderData)).unwrap();

//       if (result) {
//         const paymentData = {
//           amount: totalWithShipping,
//           fullName: selectedAddress.name,
//           mobile: selectedAddress.phone,
//           email: user.email,
//           reference: result._id,
//           additionalData: {
//             orderId: result._id,
//             shippingAddress: orderData.shippingInfo,
//           },
//         };

//         const response = await axiosInstance.post(
//           "user/order/checkout",
//           paymentData
//         );

//         if (response.data.success && response.data.redirectUrl) {
//           sessionStorage.setItem("pendingOrderId", result._id);
//           window.location.href = response.data.redirectUrl;
//         } else {
//           throw new Error(
//             response.data.error || "Failed to initialize payment"
//           );
//         }
//       }
//     } catch (err) {
//       setError(
//         err.response?.data?.message ||
//           err.message ||
//           "Something went wrong. Please try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     let sum = 0;
//     for (let index = 0; index < cartState?.length; index++) {
//       sum = sum + Number(cartState[index].quantity) * cartState[index].price;
//       setTotalAmount(sum);
//     }
//   }, [cartState]);

//   useEffect(() => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const status = urlParams.get("status");
//     const orderId = sessionStorage.getItem("pendingOrderId");

//     if (status && orderId) {
//       const verifyPayment = async () => {
//         try {
//           const response = await axiosInstance.post(
//             "user/order/paymentVerification",
//             {
//               status,
//               orderId,
//             }
//           );

//           if (response.data.success) {
//             navigate("/order-success");
//           } else {
//             navigate("/order-failed");
//           }
//         } catch (err) {
//           console.error("Payment verification failed:", err);
//           navigate("/order-failed");
//         } finally {
//           sessionStorage.removeItem("pendingOrderId");
//         }
//       };

//       verifyPayment();
//     }
//   }, []);

//   useEffect(() => {
//     if (isError) {
//       setError("Failed to create order. Please try again.");
//     }
//   }, [isError]);

//   const {orderData} = useOrder();
// console.log("context data ",orderData);
//   const orderId = "123456";
//   const name = "Iphone16";
//   const amount = 1000;
//   const merchantId = "1228659";
//   const merchantSecret = "MjY0OTk5MTk1MjI3MzM3MDY5NDIyODQ5ODU0NDM5MjAwOTMxMzEwNg==";

//   const hashedSecret = md5(merchantSecret).toString().toUpperCase();
//   const amountFormated = parseFloat(amount)
//      .toLocaleString("en-us", { minimumFractionDigits: 2 })
//      .replaceAll(",", "");
//   const currency = "LKR";

//   const hash = md5(
//     merchantId + orderId + amountFormated + currency + hashedSecret
//   )
//     .toString()
//     .toUpperCase();



//   const paymentData = {
//     sandbox: true,
//     merchant_id: "1228659",
//     return_url: "http://localhost:5173",
//     cancel_url: "http://sample.com/cancel",
//     notify_url: "http://sample.com/notify",
//     order_id: orderId,
//     items: name,
//     amount: amount,
//     currency: currency,
//     first_name: "kanishka",
//     last_name: "udayanga",
//     email: "mskanihskaudayang@gmail.com",
//     phone: "0784657729",
//     address: "kurunda",
//     city: "city",
//     country: "Lanka",
//     hash: hash,
//   };

//   const oderCompleteApi = async (oderData) => {
//     const res = await orderServices.createOrder(oderData);
//   }

 
// useEffect(() => {
//    window.payhere.onCompleted = function onCompleted(paymentId) {
//     console.log("Payment completed. Payment Id:" + paymentId);
//       const oderData={
//       productId:"12334",
//       userId:"633333",   
//       quantity:2,
//       price:2333333
//     }
//     oderCompleteApi(oderData);
  
  
//   };


//   window.payhere.onDismissed = function onDismissed() {
//     console.log("Payment dismissed");
//   };

//   window.payhere.onError = function onError(error) {
//     console.log("Error:" + error);
//   };

// }, []);
 

//  const paymentDone = () => {
//   console.log("paymentDone");
//     window.payhere.startPayment(paymentData);
//   };
  
//   const payment = async () => {
//     console.log("payment");
//     paymentDone();
//   }

//   return (
//     // <Container class1="py-5">
//     <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
//       <div className="lg:col-span-7">
//         <div className="bg-white p-6 rounded-lg shadow-sm">
//           <h3 className="text-2xl font-semibold mb-4">HandFree</h3>
//           <nav className="mb-6">
//             <ol className="flex items-center text-sm">
//               <li>
//                 <Link to="/cart" className="text-gray-600 hover:text-gray-800">
//                   Cart
//                 </Link>
//               </li>
//               <span className="mx-2 text-gray-400">/</span>
//               <li className="text-gray-800">Information</li>
//               <span className="mx-2 text-gray-400">/</span>
//               <li className="text-gray-400">Shipping</li>
//               <span className="mx-2 text-gray-400">/</span>
//               <li className="text-gray-400">Payment</li>
//             </ol>
//           </nav>

//           <h4 className="text-lg font-medium mb-2">Contact Information</h4>
//           <p className="text-gray-600 mb-6">
//             Supun Ishara (supun20000207@gmail.com)
//           </p>

//           <div className="mb-6">
//             <div className="flex justify-between items-center mb-4">
//               <h4 className="text-lg font-medium">Delivery Address</h4>
//               <button
//                 onClick={() => navigate("/address")}
//                 className="flex items-center text-blue-600 hover:text-blue-700"
//               >
//                 <MdEdit className="w-4 h-4 mr-1" />
//                 Change
//               </button>
//             </div>

//             {selectedAddress ? (
//               <div className="border rounded-lg p-4">
//                 <div className="flex items-start gap-3">
//                   <MdLocationPin className="w-5 h-5 text-gray-500 mt-1" />
//                   <div>
//                     <div className="flex items-center gap-2">
//                       <h5 className="font-medium">{selectedAddress.name}</h5>
//                       {selectedAddress.isDefault && (
//                         <span className="px-2 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-full">
//                           Default
//                         </span>
//                       )}
//                     </div>
//                     <p className="text-gray-600 text-sm mt-1">
//                       {selectedAddress.street}
//                     </p>
//                     <p className="text-gray-600 text-sm">
//                       {`${selectedAddress.city}, ${selectedAddress.state} ${selectedAddress.zip}`}
//                     </p>
//                     <p className="text-gray-600 text-sm">
//                       {selectedAddress.phone}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             ) : (
//               <button
//                 onClick={() => navigate("/address")}
//                 className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-center hover:border-blue-500 hover:text-blue-500"
//               >
//                 <span className="block font-medium">Add Delivery Address</span>
//                 <span className="text-sm text-gray-500">
//                   Please add an address to continue
//                 </span>
//               </button>
//             )}
//           </div>

//           <div className="flex justify-between items-center pt-4">
//             <Link
//               to="/cart"
//               className="flex items-center text-gray-600 hover:text-gray-800"
//             >
//               <MdArrowBackIosNew className="mr-2" /> Return to Cart
//             </Link>
//             <button
//               onClick={payment}
//               disabled={loading || isLoading || !selectedAddress}
//               className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
//             >
//               {loading || isLoading ? "Processing..." : "Place Order"}
//             </button>
//           </div>

//           {error && (
//             <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
//               <p className="text-sm text-red-600">{error}</p>
//             </div>
//           )}
//         </div>
//       </div>

//       <div className="lg:col-span-5">
//         <div className="bg-white p-6 rounded-lg shadow-sm">
//           <div className="border-b border-gray-200 pb-4">
//             {cartState &&
//               cartState?.map((item, index) => (
//                 <div key={index} className="flex items-center gap-4 mb-4">
//                   <div className="relative w-24">
//                     <span className="absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center bg-gray-500 text-white text-sm rounded-full">
//                       {item?.quantity}
//                     </span>
//                     <img
//                       src={item?.productId?.images?.[0]?.url || pro1}
//                       alt="product"
//                       className="w-full h-24 object-cover rounded-md"
//                     />
//                   </div>
//                   <div className="flex-grow">
//                     <h5 className="text-sm font-medium text-gray-800">
//                       {item?.productId?.title}
//                     </h5>
//                     <div className="flex items-center mt-1 text-sm text-gray-600">
//                       <span>{item?.size}</span>
//                       <span className="mx-2">/</span>
//                       <div
//                         className="w-4 h-4 rounded-full"
//                         style={{ backgroundColor: item?.color?.title }}
//                       ></div>
//                     </div>
//                   </div>
//                   <div className="text-right">
//                     <h5 className="text-sm font-medium text-gray-800">
//                       LKR {item?.price * item?.quantity}
//                     </h5>
//                   </div>
//                 </div>
//               ))}
//           </div>

//           <div className="border-b border-gray-200 py-4 space-y-3">
//             <div className="flex justify-between items-center">
//               <p className="text-sm text-gray-600">Subtotal</p>
//               <p className="text-sm font-medium text-gray-800">
//                 LKR {totalAmount ? totalAmount : "0"}
//               </p>
//             </div>
//             <div className="flex justify-between items-center">
//               <p className="text-sm text-gray-600">Shipping</p>
//               <p className="text-sm font-medium text-gray-800">LKR 350.00</p>
//             </div>
//           </div>

//           <div className="flex justify-between items-center py-4">
//             <h4 className="text-base font-medium text-gray-800">Total</h4>
//             <h5 className="text-lg font-semibold text-gray-800">
//               LKR {totalAmount ? totalAmount + 350.0 : "0"}
//             </h5>
//           </div>

//           {error && (
//             <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
//               <p className="text-sm text-red-600">{error}</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//     // </Container>
//   );
// };

// export default Checkout;

//withbackend
// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { MdArrowBackIosNew, MdEdit  } from "react-icons/md";
// import pro1 from "../../public/images/pro1.webp";
// //import Container from "../components/Container";
// import { useDispatch, useSelector } from "react-redux";
// import { axiosInstance } from "../utils/axiosConfig";
// import { createAnOrder } from "../features/user/userSlice";

// const Checkout = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [selectedAddress, setSelectedAddress] = useState(null);

//   const { isLoading, isError, isSuccess, orderedProduct, user } = useSelector(
//     (state) => state.auth
//   );

//   const cartState = useSelector((state) => state.auth.cartProducts);
//   const [totalAmount, setTotalAmount] = useState(null);

//   const [addresses, setAddresses] = useState([
//     {
//       id: 1,
//       name: "John Doe",
//       street: "123 Main St",
//       city: "San Francisco",
//       state: "CA",
//       zip: "94105",
//       phone: "(555) 123-4567",
//       isDefault: true,
//     }
//   ]);

//   useEffect(() => {
//     // Find and set the default address when component mounts
//     const defaultAddress = addresses.find(addr => addr.isDefault);
//     setSelectedAddress(defaultAddress);
//   }, [addresses]);

//   const handlePlaceOrder = async () => {
//     if (!selectedAddress) {
//       setError("Please select a delivery address");
//       return;
//     }

//     try {
//       setLoading(true);
//       setError(null);

//       const totalWithShipping = totalAmount + 350.0;

//       const orderData = {
//         user: user._id,
//         shippingInfo: {
//           fullName: selectedAddress.name,
//           mobile: selectedAddress.phone,
//           address: selectedAddress.street,
//           city: selectedAddress.city,
//           state: selectedAddress.state,
//           country: "Sri Lanka",
//           pincode: selectedAddress.zip,
//         },
//         orderItems: cartState.map((item) => ({
//           product: item.productId._id,
//           color: item.color._id,
//           quantity: Number(item.quantity),
//           price: Number(item.price),
//           size: item.size,
//         })),
//         paymentInfo: {
//           onepayOrderId: "PENDING",
//           onepayPaymentId: "PENDING",
//         },
//         totalPrice: Number(totalWithShipping),
//         totalPriceAfterDiscount: Number(totalWithShipping),
//         orderStatus: "Ordered",
//       };

//       const result = await dispatch(createAnOrder(orderData)).unwrap();

//       if (result) {
//         const paymentData = {
//           amount: totalWithShipping,
//           fullName: selectedAddress.name,
//           mobile: selectedAddress.phone,
//           email: user.email,
//           reference: result._id,
//           additionalData: {
//             orderId: result._id,
//             shippingAddress: orderData.shippingInfo,
//           },
//         };

//         const response = await axiosInstance.post(
//           "user/order/checkout",
//           paymentData
//         );

//         if (response.data.success && response.data.redirectUrl) {
//           sessionStorage.setItem("pendingOrderId", result._id);
//           window.location.href = response.data.redirectUrl;
//         } else {
//           throw new Error(response.data.error || "Failed to initialize payment");
//         }
//       }
//     } catch (err) {
//       setError(
//         err.response?.data?.message ||
//         err.message ||
//         "Something went wrong. Please try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     let sum = 0;
//     for (let index = 0; index < cartState?.length; index++) {
//       sum = sum + Number(cartState[index].quantity) * cartState[index].price;
//       setTotalAmount(sum);
//     }
//   }, [cartState]);

//   useEffect(() => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const status = urlParams.get("status");
//     const orderId = sessionStorage.getItem("pendingOrderId");

//     if (status && orderId) {
//       const verifyPayment = async () => {
//         try {
//           const response = await axiosInstance.post(
//             "user/order/paymentVerification",
//             {
//               status,
//               orderId,
//             }
//           );

//           if (response.data.success) {
//             navigate("/order-success");
//           } else {
//             navigate("/order-failed");
//           }
//         } catch (err) {
//           console.error("Payment verification failed:", err);
//           navigate("/order-failed");
//         } finally {
//           sessionStorage.removeItem("pendingOrderId");
//         }
//       };

//       verifyPayment();
//     }
//   }, []);

//   useEffect(() => {
//     if (isError) {
//       setError("Failed to create order. Please try again.");
//     }
//   }, [isError]);

//   return (
//     // <Container class1="py-5">
//       <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
//       <div className="lg:col-span-7">
//           <div className="bg-white p-6 rounded-lg shadow-sm">
//             <h3 className="text-2xl font-semibold mb-4">NextGen Dresses</h3>
//             <nav className="mb-6">
//               <ol className="flex items-center text-sm">
//                 <li>
//                   <Link to="/cart" className="text-gray-600 hover:text-gray-800">
//                     Cart
//                   </Link>
//                 </li>
//                 <span className="mx-2 text-gray-400">/</span>
//                 <li className="text-gray-800">Information</li>
//                 <span className="mx-2 text-gray-400">/</span>
//                 <li className="text-gray-400">Shipping</li>
//                 <span className="mx-2 text-gray-400">/</span>
//                 <li className="text-gray-400">Payment</li>
//               </ol>
//             </nav>

//             <h4 className="text-lg font-medium mb-2">Contact Information</h4>
//             <p className="text-gray-600 mb-6">
//               Supun Ishara (supun20000207@gmail.com)
//             </p>

//             <div className="mb-6">
//               <div className="flex justify-between items-center mb-4">
//                 <h4 className="text-lg font-medium">Delivery Address</h4>
//                 <button
//                   onClick={() => navigate('/address')}
//                   className="flex items-center text-blue-600 hover:text-blue-700"
//                 >
//                   <MdEdit className="w-4 h-4 mr-1" />
//                   Change
//                 </button>
//               </div>

//               {selectedAddress ? (
//                 <div className="border rounded-lg p-4">
//                   <div className="flex items-start gap-3">
//                     <MapPin className="w-5 h-5 text-gray-500 mt-1" />
//                     <div>
//                       <div className="flex items-center gap-2">
//                         <h5 className="font-medium">{selectedAddress.name}</h5>
//                         {selectedAddress.isDefault && (
//                           <span className="px-2 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-full">
//                             Default
//                           </span>
//                         )}
//                       </div>
//                       <p className="text-gray-600 text-sm mt-1">
//                         {selectedAddress.street}
//                       </p>
//                       <p className="text-gray-600 text-sm">
//                         {`${selectedAddress.city}, ${selectedAddress.state} ${selectedAddress.zip}`}
//                       </p>
//                       <p className="text-gray-600 text-sm">{selectedAddress.phone}</p>
//                     </div>
//                   </div>
//                 </div>
//               ) : (
//                 <button
//                   onClick={() => navigate('/address')}
//                   className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-center hover:border-blue-500 hover:text-blue-500"
//                 >
//                   <span className="block font-medium">Add Delivery Address</span>
//                   <span className="text-sm text-gray-500">
//                     Please add an address to continue
//                   </span>
//                 </button>
//               )}
//             </div>

//             <div className="flex justify-between items-center pt-4">
//               <Link
//                 to="/cart"
//                 className="flex items-center text-gray-600 hover:text-gray-800"
//               >
//                 <MdArrowBackIosNew className="mr-2" /> Return to Cart
//               </Link>
//               <button
//                 onClick={handlePlaceOrder}
//                 disabled={loading || isLoading || !selectedAddress}
//                 className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
//               >
//                 {loading || isLoading ? "Processing..." : "Place Order"}
//               </button>
//             </div>

//             {error && (
//               <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
//                 <p className="text-sm text-red-600">{error}</p>
//               </div>
//             )}

//           </div>
//         </div>

//         <div className="lg:col-span-5">
//           <div className="bg-white p-6 rounded-lg shadow-sm">
//             <div className="border-b border-gray-200 pb-4">
//               {cartState &&
//                 cartState?.map((item, index) => (
//                   <div key={index} className="flex items-center gap-4 mb-4">
//                     <div className="relative w-24">
//                       <span className="absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center bg-gray-500 text-white text-sm rounded-full">
//                         {item?.quantity}
//                       </span>
//                       <img
//                         src={item?.productId?.images?.[0]?.url || pro1}
//                         alt="product"
//                         className="w-full h-24 object-cover rounded-md"
//                       />
//                     </div>
//                     <div className="flex-grow">
//                       <h5 className="text-sm font-medium text-gray-800">
//                         {item?.productId?.title}
//                       </h5>
//                       <div className="flex items-center mt-1 text-sm text-gray-600">
//                         <span>{item?.size}</span>
//                         <span className="mx-2">/</span>
//                         <div
//                           className="w-4 h-4 rounded-full"
//                           style={{ backgroundColor: item?.color?.title }}
//                         ></div>
//                       </div>
//                     </div>
//                     <div className="text-right">
//                       <h5 className="text-sm font-medium text-gray-800">
//                         LKR {item?.price * item?.quantity}
//                       </h5>
//                     </div>
//                   </div>
//                 ))}
//             </div>

//             <div className="border-b border-gray-200 py-4 space-y-3">
//               <div className="flex justify-between items-center">
//                 <p className="text-sm text-gray-600">Subtotal</p>
//                 <p className="text-sm font-medium text-gray-800">
//                   LKR {totalAmount ? totalAmount : "0"}
//                 </p>
//               </div>
//               <div className="flex justify-between items-center">
//                 <p className="text-sm text-gray-600">Shipping</p>
//                 <p className="text-sm font-medium text-gray-800">LKR 350.00</p>
//               </div>
//             </div>

//             <div className="flex justify-between items-center py-4">
//               <h4 className="text-base font-medium text-gray-800">Total</h4>
//               <h5 className="text-lg font-semibold text-gray-800">
//                 LKR {totalAmount ? totalAmount + 350.0 : "0"}
//               </h5>
//             </div>

//             {error && (
//               <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
//                 <p className="text-sm text-red-600">{error}</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     // </Container>
//   );
// };

// export default Checkout;

//old

// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { MdArrowBackIosNew, MdEdit  } from "react-icons/md";
// import watch from "../images/watch.jpg";
// import Container from "../components/Container";
// import { useDispatch, useSelector } from "react-redux";
// import { useFormik } from "formik";
// import * as yup from "yup";
// import { axiosInstance } from "../utils/axiosConfig";
// import { createAnOrder } from "../features/user/userSlice";

// const shippingSchema = yup.object({
//   fullName: yup.string().required("First Name is Required."),
//   mobile: yup.string().required("Mobile No is Required."),
//   address: yup.string().required("Address is Required."),
//   state: yup.string().required("State(province) is Required."),
//   city: yup.string().required("City is Required."),
//   country: yup.string().required("Country is Required."),
//   pincode: yup.number().required("Zip Code is Required."),
// });

// const Checkout = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const { isLoading, isError, isSuccess, orderedProduct, user } = useSelector(
//     (state) => state.auth
//   );

//   const cartState = useSelector((state) => state.auth.cartProducts);
//   const [totalAmount, setTotalAmount] = useState(null);

//   const formik = useFormik({
//     initialValues: {
//       fullName: "",
//       mobile: "",
//       address: "",
//       state: "",
//       city: "",
//       country: "Sri Lanka",
//       pincode: "",
//       other: "",
//     },
//     validationSchema: shippingSchema,
//     onSubmit: async (values) => {
//       try {
//         setLoading(true);
//         setError(null);

//         const totalWithShipping = totalAmount + 350.0;

//         const orderData = {
//           user: user._id,
//           shippingInfo: {
//             fullName: values.firstName,
//             mobile: values.mobile,
//             address: values.address,
//             city: values.city,
//             state: values.state,
//             country: values.country,
//             pincode: values.pincode,
//             other: values.other,
//           },
//           orderItems: cartState.map((item) => ({
//             product: item.productId._id,
//             color: item.color._id,
//             quantity: Number(item.quantity),
//             price: Number(item.price),
//             size: item.size,
//           })),
//           paymentInfo: {
//             onepayOrderId: "PENDING",
//             onepayPaymentId: "PENDING",
//           },
//           totalPrice: Number(totalWithShipping),
//           totalPriceAfterDiscount: Number(totalWithShipping),
//           orderStatus: "Ordered",
//         };

//         const result = await dispatch(createAnOrder(orderData)).unwrap();

//         if (result) {
//           const paymentData = {
//             amount: totalWithShipping,
//             fullName: values.firstName,
//             mobile: values.mobile,
//             email: values.email,
//             reference: result._id,
//             additionalData: {
//               orderId: result._id,
//               shippingAddress: orderData.shippingInfo,
//             },
//           };

//           const response = await axiosInstance.post(
//             "user/order/checkout",
//             paymentData
//           );

//           if (response.data.success && response.data.redirectUrl) {
//             sessionStorage.setItem("pendingOrderId", result._id);
//             window.location.href = response.data.redirectUrl;
//           } else {
//             throw new Error(
//               response.data.error || "Failed to initialize payment"
//             );
//           }
//         }
//       } catch (err) {
//         setError(
//           err.response?.data?.message ||
//             err.message ||
//             "Something went wrong. Please try again."
//         );

//         if (err.response?.data?.orderId) {
//           try {
//             await axiosInstance.post("order/cancel", {
//               orderId: err.response.data.orderId,
//             });
//           } catch (cancelError) {
//             console.error("Failed to cancel order:", cancelError);
//           }
//         }
//       } finally {
//         setLoading(false);
//       }
//     },
//   });

//   useEffect(() => {
//     let sum = 0;
//     for (let index = 0; index < cartState?.length; index++) {
//       sum = sum + Number(cartState[index].quantity) * cartState[index].price;
//       setTotalAmount(sum);
//     }
//   }, [cartState]);

//   useEffect(() => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const status = urlParams.get("status");
//     const orderId = sessionStorage.getItem("pendingOrderId");

//     if (status && orderId) {
//       const verifyPayment = async () => {
//         try {
//           const response = await axiosInstance.post(
//             "user/order/paymentVerification",
//             {
//               status,
//               orderId,
//             }
//           );

//           if (response.data.success) {
//             navigate("/order-success");
//           } else {
//             navigate("/order-failed");
//           }
//         } catch (err) {
//           console.error("Payment verification failed:", err);
//           navigate("/order-failed");
//         } finally {
//           sessionStorage.removeItem("pendingOrderId");
//         }
//       };

//       verifyPayment();
//     }
//   }, []);

//   useEffect(() => {
//     if (isError) {
//       setError("Failed to create order. Please try again.");
//     }
//   }, [isError]);

//   return (
//     <Container class1="py-5">
//       <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
//         <div className="lg:col-span-7">
//           <div className="bg-white p-6 rounded-lg shadow-sm">
//             <h3 className="text-2xl font-semibold mb-4">NextGen Dresses</h3>
//             <nav className="mb-6">
//               <ol className="flex items-center text-sm">
//                 <li>
//                   <Link
//                     to="/cart"
//                     className="text-gray-600 hover:text-gray-800"
//                   >
//                     Cart
//                   </Link>
//                 </li>
//                 <span className="mx-2 text-gray-400">/</span>
//                 <li className="text-gray-800">Information</li>
//                 <span className="mx-2 text-gray-400">/</span>
//                 <li className="text-gray-400">Shipping</li>
//                 <span className="mx-2 text-gray-400">/</span>
//                 <li className="text-gray-400">Payment</li>
//               </ol>
//             </nav>

//             <h4 className="text-lg font-medium mb-2">Contact Information</h4>
//             <p className="text-gray-600 mb-6">
//               Supun Ishara (supun20000207@gmail.com)
//             </p>

//             <h4 className="text-lg font-medium mb-4">Shipping Address</h4>
//             <form onSubmit={formik.handleSubmit} className="space-y-4">
//               <div>
//                 <select
//                   name="country"
//                   className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   value={formik.values.country}
//                   onChange={formik.handleChange("country")}
//                   onBlur={formik.handleBlur("country")}
//                 >
//                   <option value="" disabled>
//                     Select Country
//                   </option>
//                   <option value="Sri Lanka">Sri Lanka</option>
//                 </select>
//                 {formik.touched.country && formik.errors.country && (
//                   <p className="mt-1 text-sm text-red-600">
//                     {formik.errors.country}
//                   </p>
//                 )}
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <input
//                     type="text"
//                     placeholder="Full Name"
//                     className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     name="fullName"
//                     value={formik.values.fullName}
//                     onChange={formik.handleChange("fullName")}
//                     onBlur={formik.handleBlur("fullName")}
//                   />
//                   {formik.touched.fullName && formik.errors.fullName && (
//                     <p className="mt-1 text-sm text-red-600">
//                       {formik.errors.fullName}
//                     </p>
//                   )}
//                 </div>
//               </div>

//               <div>
//                 <input
//                   type="tel"
//                   placeholder="Mobile Number"
//                   className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   name="mobile"
//                   value={formik.values.mobile}
//                   onChange={formik.handleChange("mobile")}
//                   onBlur={formik.handleBlur("mobile")}
//                 />
//                 {formik.touched.mobile && formik.errors.mobile && (
//                   <p className="mt-1 text-sm text-red-600">
//                     {formik.errors.mobile}
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <input
//                   type="text"
//                   placeholder="Address"
//                   className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   name="address"
//                   value={formik.values.address}
//                   onChange={formik.handleChange("address")}
//                   onBlur={formik.handleBlur("address")}
//                 />
//                 {formik.touched.address && formik.errors.address && (
//                   <p className="mt-1 text-sm text-red-600">
//                     {formik.errors.address}
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <input
//                   type="text"
//                   placeholder="Apartment, Suite, etc"
//                   className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   name="other"
//                   value={formik.values.other}
//                   onChange={formik.handleChange("other")}
//                   onBlur={formik.handleBlur("other")}
//                 />
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <div>
//                   <input
//                     type="text"
//                     placeholder="City"
//                     className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     name="city"
//                     value={formik.values.city}
//                     onChange={formik.handleChange("city")}
//                     onBlur={formik.handleBlur("city")}
//                   />
//                   {formik.touched.city && formik.errors.city && (
//                     <p className="mt-1 text-sm text-red-600">
//                       {formik.errors.city}
//                     </p>
//                   )}
//                 </div>

//                 <div>
//                   <select
//                     name="state"
//                     className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     value={formik.values.state}
//                     onChange={formik.handleChange("state")}
//                     onBlur={formik.handleBlur("state")}
//                   >
//                     <option value="" disabled>
//                       Select State
//                     </option>
//                     <option value="western">Western</option>
//                   </select>
//                   {formik.touched.state && formik.errors.state && (
//                     <p className="mt-1 text-sm text-red-600">
//                       {formik.errors.state}
//                     </p>
//                   )}
//                 </div>

//                 <div>
//                   <input
//                     type="text"
//                     placeholder="Zipcode"
//                     className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     name="pincode"
//                     value={formik.values.pincode}
//                     onChange={formik.handleChange("pincode")}
//                     onBlur={formik.handleBlur("pincode")}
//                   />
//                   {formik.touched.pincode && formik.errors.pincode && (
//                     <p className="mt-1 text-sm text-red-600">
//                       {formik.errors.pincode}
//                     </p>
//                   )}
//                 </div>
//               </div>

//               <div className="flex justify-between items-center pt-4">
//                 <Link
//                   to="/cart"
//                   className="flex items-center text-gray-600 hover:text-gray-800"
//                 >
//                   <MdArrowBackIosNew className="mr-2" /> Return to Cart
//                 </Link>
//                 <button
//                   type="submit"
//                   disabled={loading || isLoading}
//                   className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
//                 >
//                   {loading || isLoading ? "Processing..." : "Place Order"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>

//         <div className="lg:col-span-5">
//           <div className="bg-white p-6 rounded-lg shadow-sm">
//             <div className="border-b border-gray-200 pb-4">
//               {cartState &&
//                 cartState?.map((item, index) => (
//                   <div key={index} className="flex items-center gap-4 mb-4">
//                     <div className="relative w-24">
//                       <span className="absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center bg-gray-500 text-white text-sm rounded-full">
//                         {item?.quantity}
//                       </span>
//                       <img
//                         src={item?.productId?.images?.[0]?.url || watch}
//                         alt="product"
//                         className="w-full h-24 object-cover rounded-md"
//                       />
//                     </div>
//                     <div className="flex-grow">
//                       <h5 className="text-sm font-medium text-gray-800">
//                         {item?.productId?.title}
//                       </h5>
//                       <div className="flex items-center mt-1 text-sm text-gray-600">
//                         <span>{item?.size}</span>
//                         <span className="mx-2">/</span>
//                         <div
//                           className="w-4 h-4 rounded-full"
//                           style={{ backgroundColor: item?.color?.title }}
//                         ></div>
//                       </div>
//                     </div>
//                     <div className="text-right">
//                       <h5 className="text-sm font-medium text-gray-800">
//                         LKR {item?.price * item?.quantity}
//                       </h5>
//                     </div>
//                   </div>
//                 ))}
//             </div>

//             <div className="border-b border-gray-200 py-4 space-y-3">
//               <div className="flex justify-between items-center">
//                 <p className="text-sm text-gray-600">Subtotal</p>
//                 <p className="text-sm font-medium text-gray-800">
//                   LKR {totalAmount ? totalAmount : "0"}
//                 </p>
//               </div>
//               <div className="flex justify-between items-center">
//                 <p className="text-sm text-gray-600">Shipping</p>
//                 <p className="text-sm font-medium text-gray-800">LKR 350.00</p>
//               </div>
//             </div>

//             <div className="flex justify-between items-center py-4">
//               <h4 className="text-base font-medium text-gray-800">Total</h4>
//               <h5 className="text-lg font-semibold text-gray-800">
//                 LKR {totalAmount ? totalAmount + 350.0 : "0"}
//               </h5>
//             </div>

//             {error && (
//               <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
//                 <p className="text-sm text-red-600">{error}</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </Container>
//   );
// };

// export default Checkout;
