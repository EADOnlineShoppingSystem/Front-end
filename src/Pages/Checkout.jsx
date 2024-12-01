import { useEffect, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdArrowBackIosNew, MdEdit, MdLocationPin } from "react-icons/md";
import { useSelector } from "react-redux";
import orderServices from "../Services/order.services";
import md5 from "md5";
import { useCart } from "../contexts/CartContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { message } from "antd";
import { m } from "framer-motion";

const Checkout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalAmount, setTotalAmount] = useState(null);
  const { isLoading, isError } = useSelector((state) => state.auth);
  const cartState = useSelector((state) => state.auth.cartProducts);
  const [addresses, setAddresses] = useState([]);
     const [AddressId, setAddressId] = useState(null);
     const [selectedAddress, setSelectedAddress] = useState(null);

  const [email, setEmail] = useState("");

  const { state: stt } = useAuthContext();
  const { user: LoggedUser } = stt;
  useEffect(() => {
    if (LoggedUser && LoggedUser.email) {
      console.log("user", LoggedUser.email);
      const email = LoggedUser.email;
      // setEmail(email);
      console.log("email", email);
      setEmail(email);
      // setEmail(LoggedUser.email);
    }
  }, [LoggedUser]);
  const { cartItem } = useCart();


  const {state} =useAuthContext();
  const {user} =state;
 

  const [orderDataArray, setOrderDataArray] = useState([]);

  useEffect(() => {
    if (cartItem && cartItem.length > 0) {
      console.log("cartItem", AddressId);
      const mappedOrders = cartItem.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,

        price: item.productDetails.product.lowestPrice,
        addressId: AddressId,
        delevered: false,
      }));

      setOrderDataArray(mappedOrders);
    }
  }, [cartItem,AddressId]);

  console.log("orderDataArray", orderDataArray);
  // Calculate cart summary
  const cartSummary = useMemo(() => {
    const subtotal = cartItem.reduce(
      (sum, item) =>
        sum + item.productDetails.product.lowestPrice * item.quantity,
      0
    );
    const shippingFee = cartItem.length > 0 ? 280 : 0;
    const total = subtotal + shippingFee;

    return {
      subtotal,
      shippingFee,
      total,
    };
  }, [cartItem]);

//fetch address from database
  const fetchAddresses = async () => {
    try {
      setLoading(true);
      const response = await orderServices.getAddressById();
      setAddresses(response);
      console.log("Fetched addresses:", response);
    } catch (error) {
      console.error("Error fetching addresses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  // Payment configuration
  const orderId = "123456";
  const name = email;
  const amount = 1000;
  const merchantId = "1228659";
  const merchantSecret =
    "MjY0OTk5MTk1MjI3MzM3MDY5NDIyODQ5ODU0NDM5MjAwOTMxMzEwNg==";
  const currency = "LKR";

  const hashedSecret = md5(merchantSecret).toString().toUpperCase();
  const amountFormated = parseFloat(amount)
    .toLocaleString("en-us", { minimumFractionDigits: 2 })
    .replaceAll(",", "");
  const hash = md5(
    merchantId + orderId + amountFormated + currency + hashedSecret
  )
    .toString()
    .toUpperCase();

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
    email: email,
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
    try {
      if (orderDataArray && orderDataArray.length > 0) {
        window.payhere.onCompleted = function onCompleted(paymentId) {
          console.log("Payment completed. Payment Id:" + paymentId);
          console.log("Order Data Array", orderDataArray);
          const response = orderServices.createOrder(orderDataArray);
          if (response) {
            message.success("Order Placed Successfully");
            navigate("/");
          }
        };
      }
      window.payhere.onDismissed = function onDismissed() {
        console.log("Payment dismissed");
      };

      window.payhere.onError = function onError(error) {
        console.log("Error:" + error);
      };
    } catch (error) {
      message.error("Error in Payment");
    }
  }, [orderDataArray]);

  const payment = () => {
    window.payhere.startPayment(paymentData);
  };


  const handleAddressSelection = (address) => {
    setSelectedAddress(address);
    setAddressId(address._id);
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
                  <p className="text-gray-700">Supun Ishara ({email})</p>
                </div>
              </div>

              {/* Delivery Address */}
              {/* Delivery Address */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Delivery Address</h3>
                  <button
                    onClick={() => navigate("/address")}
                    className="flex items-center text-blue-600 hover:text-blue-700"
                  >
                    <MdEdit className="w-4 h-4 mr-1" />
                    <span>Manage Addresses</span>
                  </button>
                </div>

                {addresses.length > 0 ? (
                  <div className="space-y-4">
                    {addresses.map((address) => (
                      <div
                        key={address.id}
                        className={`relative bg-white border-2 rounded-xl p-4 cursor-pointer transition-all duration-200 ${
                          selectedAddress?.id === address.id
                            ? "border-blue-500 bg-blue-50 shadow-md"
                            : "border-gray-200 hover:border-blue-300"
                        }`}
                        onClick={() => handleAddressSelection(address)}
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex items-center h-5">
                            <input
                              type="radio"
                              name="address"
                              onChange={() => handleAddressSelection(address)}
                              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                            />
                          </div>

                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium">{address.name}</h4>
                              {address.isDefault && (
                                <span className="px-2 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-full">
                                  Default
                                </span>
                              )}
                            </div>
                            <p className="text-gray-600 text-sm">
                              {address.street}
                            </p>
                            <p className="text-gray-600 text-sm">
                              {`${address.city}, ${address.state} ${address.zip}`}
                            </p>
                            <p className="text-gray-600 text-sm">
                              {address.phone}
                            </p>
                          </div>
                        </div>

                        {selectedAddress?.id === address.id && (
                          <div className="absolute top-2 right-2">
                            <span className="text-blue-600">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <button
                    onClick={() => navigate("/address")}
                    className="w-full p-6 border-2 border-dashed border-gray-300 rounded-xl text-center hover:border-blue-500 hover:text-blue-500 transition-all"
                  >
                    <span className="block font-medium">
                      Add Delivery Address
                    </span>
                    <span className="text-sm text-gray-500">
                      Please add an address to continue
                    </span>
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
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
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
              <h3 className="text-xl font-semibold border-b border-gray-200 pb-4">
                Order Summary
              </h3>

              <div className="space-y-4">
                {cartState?.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
                  >
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
                      <h4 className="font-medium text-gray-900 truncate">
                        {item?.productId?.title}
                      </h4>
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
                      <p className="font-medium">
                        LKR {item?.price * item?.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">
                    Rs. {cartSummary.subtotal || "0"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    Rs. {cartSummary.shippingFee}
                  </span>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-4">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-lg font-semibold">
                    Rs. {cartSummary.total}
                  </span>
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
