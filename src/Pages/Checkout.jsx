import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdArrowBackIosNew, MdEdit } from "react-icons/md";
import { MdLocationPin } from "react-icons/md";
import pro1 from "../../public/images/pro1.webp";
//import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../utils/axiosConfig";
import { createAnOrder } from "../features/user/userSlice";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const { isLoading, isError, isSuccess, orderedProduct, user } = useSelector(
    (state) => state.auth
  );

  const cartState = useSelector((state) => state.auth.cartProducts);
  const [totalAmount, setTotalAmount] = useState(null);

  const [addresses, setAddresses] = useState([
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

  useEffect(() => {
    // Find and set the default address when component mounts
    const defaultAddress = addresses.find((addr) => addr.isDefault);
    setSelectedAddress(defaultAddress);
  }, [addresses]);

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      setError("Please select a delivery address");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const totalWithShipping = totalAmount + 350.0;

      const orderData = {
        user: user._id,
        shippingInfo: {
          fullName: selectedAddress.name,
          mobile: selectedAddress.phone,
          address: selectedAddress.street,
          city: selectedAddress.city,
          state: selectedAddress.state,
          country: "Sri Lanka",
          pincode: selectedAddress.zip,
        },
        orderItems: cartState.map((item) => ({
          product: item.productId._id,
          color: item.color._id,
          quantity: Number(item.quantity),
          price: Number(item.price),
          size: item.size,
        })),
        paymentInfo: {
          onepayOrderId: "PENDING",
          onepayPaymentId: "PENDING",
        },
        totalPrice: Number(totalWithShipping),
        totalPriceAfterDiscount: Number(totalWithShipping),
        orderStatus: "Ordered",
      };

      const result = await dispatch(createAnOrder(orderData)).unwrap();

      if (result) {
        const paymentData = {
          amount: totalWithShipping,
          fullName: selectedAddress.name,
          mobile: selectedAddress.phone,
          email: user.email,
          reference: result._id,
          additionalData: {
            orderId: result._id,
            shippingAddress: orderData.shippingInfo,
          },
        };

        const response = await axiosInstance.post(
          "user/order/checkout",
          paymentData
        );

        if (response.data.success && response.data.redirectUrl) {
          sessionStorage.setItem("pendingOrderId", result._id);
          window.location.href = response.data.redirectUrl;
        } else {
          throw new Error(
            response.data.error || "Failed to initialize payment"
          );
        }
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < cartState?.length; index++) {
      sum = sum + Number(cartState[index].quantity) * cartState[index].price;
      setTotalAmount(sum);
    }
  }, [cartState]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get("status");
    const orderId = sessionStorage.getItem("pendingOrderId");

    if (status && orderId) {
      const verifyPayment = async () => {
        try {
          const response = await axiosInstance.post(
            "user/order/paymentVerification",
            {
              status,
              orderId,
            }
          );

          if (response.data.success) {
            navigate("/order-success");
          } else {
            navigate("/order-failed");
          }
        } catch (err) {
          console.error("Payment verification failed:", err);
          navigate("/order-failed");
        } finally {
          sessionStorage.removeItem("pendingOrderId");
        }
      };

      verifyPayment();
    }
  }, []);

  useEffect(() => {
    if (isError) {
      setError("Failed to create order. Please try again.");
    }
  }, [isError]);

  return (
    // <Container class1="py-5">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-7">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-2xl font-semibold mb-4">HandFree</h3>
          <nav className="mb-6">
            <ol className="flex items-center text-sm">
              <li>
                <Link to="/cart" className="text-gray-600 hover:text-gray-800">
                  Cart
                </Link>
              </li>
              <span className="mx-2 text-gray-400">/</span>
              <li className="text-gray-800">Information</li>
              <span className="mx-2 text-gray-400">/</span>
              <li className="text-gray-400">Shipping</li>
              <span className="mx-2 text-gray-400">/</span>
              <li className="text-gray-400">Payment</li>
            </ol>
          </nav>

          <h4 className="text-lg font-medium mb-2">Contact Information</h4>
          <p className="text-gray-600 mb-6">
            Supun Ishara (supun20000207@gmail.com)
          </p>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-medium">Delivery Address</h4>
              <button
                onClick={() => navigate("/address")}
                className="flex items-center text-blue-600 hover:text-blue-700"
              >
                <MdEdit className="w-4 h-4 mr-1" />
                Change
              </button>
            </div>

            {selectedAddress ? (
              <div className="border rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <MdLocationPin className="w-5 h-5 text-gray-500 mt-1" />
                  <div>
                    <div className="flex items-center gap-2">
                      <h5 className="font-medium">{selectedAddress.name}</h5>
                      {selectedAddress.isDefault && (
                        <span className="px-2 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-full">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm mt-1">
                      {selectedAddress.street}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {`${selectedAddress.city}, ${selectedAddress.state} ${selectedAddress.zip}`}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {selectedAddress.phone}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <button
                onClick={() => navigate("/address")}
                className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-center hover:border-blue-500 hover:text-blue-500"
              >
                <span className="block font-medium">Add Delivery Address</span>
                <span className="text-sm text-gray-500">
                  Please add an address to continue
                </span>
              </button>
            )}
          </div>

          <div className="flex justify-between items-center pt-4">
            <Link
              to="/cart"
              className="flex items-center text-gray-600 hover:text-gray-800"
            >
              <MdArrowBackIosNew className="mr-2" /> Return to Cart
            </Link>
            <button
              onClick={handlePlaceOrder}
              disabled={loading || isLoading || !selectedAddress}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {loading || isLoading ? "Processing..." : "Place Order"}
            </button>
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}
        </div>
      </div>

      <div className="lg:col-span-5">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="border-b border-gray-200 pb-4">
            {cartState &&
              cartState?.map((item, index) => (
                <div key={index} className="flex items-center gap-4 mb-4">
                  <div className="relative w-24">
                    <span className="absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center bg-gray-500 text-white text-sm rounded-full">
                      {item?.quantity}
                    </span>
                    <img
                      src={item?.productId?.images?.[0]?.url || pro1}
                      alt="product"
                      className="w-full h-24 object-cover rounded-md"
                    />
                  </div>
                  <div className="flex-grow">
                    <h5 className="text-sm font-medium text-gray-800">
                      {item?.productId?.title}
                    </h5>
                    <div className="flex items-center mt-1 text-sm text-gray-600">
                      <span>{item?.size}</span>
                      <span className="mx-2">/</span>
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: item?.color?.title }}
                      ></div>
                    </div>
                  </div>
                  <div className="text-right">
                    <h5 className="text-sm font-medium text-gray-800">
                      LKR {item?.price * item?.quantity}
                    </h5>
                  </div>
                </div>
              ))}
          </div>

          <div className="border-b border-gray-200 py-4 space-y-3">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600">Subtotal</p>
              <p className="text-sm font-medium text-gray-800">
                LKR {totalAmount ? totalAmount : "0"}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600">Shipping</p>
              <p className="text-sm font-medium text-gray-800">LKR 350.00</p>
            </div>
          </div>

          <div className="flex justify-between items-center py-4">
            <h4 className="text-base font-medium text-gray-800">Total</h4>
            <h5 className="text-lg font-semibold text-gray-800">
              LKR {totalAmount ? totalAmount + 350.0 : "0"}
            </h5>
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
    // </Container>
  );
};

export default Checkout;

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
