import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdArrowBackIosNew } from "react-icons/md";
import watch from "../images/watch.jpg";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import { axiosInstance } from "../utils/axiosConfig"; // Import axiosInstance
import { createAnOrder } from "../features/user/userSlice";

const shippingSchema = yup.object({
  firstName: yup.string().required("First Name is Required."),
  lastName: yup.string().required("Last Name is Required."),
  mobile: yup.string().required("Mobile No is Required."),
  address: yup.string().required("Address is Required."),
  state: yup.string().required("State(province) is Required."),
  city: yup.string().required("City is Required."),
  country: yup.string().required("Country is Required."),
  pincode: yup.number().required("Zip Code is Required."),
});

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Get order state from Redux
  const { isLoading, isError, isSuccess, orderedProduct,  user } = useSelector(
    (state) => state.auth
  );

  const cartState = useSelector((state) => state.auth.cartProducts);
  const [totalAmount, setTotalAmount] = useState(null);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      mobile: "",
      address: "",
      state: "",
      city: "",
      country: "Sri Lanka",
      pincode: "",
      other: "",
    },
    validationSchema: shippingSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        setError(null);
        
        const totalWithShipping = totalAmount + 350.0;

        // Create order first
        const orderData = {
          user: user._id,
          shippingInfo: {
            firstName: values.firstName,
            lastName: values.lastName,
            mobile: values.mobile,
            address: values.address,
            city: values.city,
            state: values.state,
            country: values.country,
            pincode: values.pincode,
            other: values.other
          },
          orderItems: cartState.map(item => ({
            product: item.productId._id, // Use the product's ObjectId
            color: item.color._id, // Use the color's ObjectId
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
          orderStatus: "Ordered"
        };

        const result = await dispatch(createAnOrder(orderData)).unwrap();

        if (result) {
          // Prepare payment data using the created order
          const paymentData = {
            amount: totalWithShipping,
            firstName: values.firstName,
            lastName: values.lastName,
            mobile: values.mobile,
            email: values.email,
            reference: result._id, // Use the order ID as reference
            additionalData: {
              orderId: result._id,
              shippingAddress: orderData.shippingInfo
            }
          };

 // Initialize payment using axiosInstance
 const response = await axiosInstance.post("user/order/checkout", paymentData);

 if (response.data.success && response.data.redirectUrl) {
   // Store order ID in session storage for verification after payment
   sessionStorage.setItem("pendingOrderId", result._id);
   
   // Redirect to payment gateway
   window.location.href = response.data.redirectUrl;
 } else {
   throw new Error(response.data.error || "Failed to initialize payment");
 }
}
} catch (err) {
setError(err.response?.data?.message || err.message || "Something went wrong. Please try again.");


// If order was created but payment failed, you might want to cancel/update the order
if (err.response?.data?.orderId) {
  try {
    await axiosInstance.post("order/cancel", { orderId: err.response.data.orderId });
  } catch (cancelError) {
    console.error("Failed to cancel order:", cancelError);
  }
}
} finally {
setLoading(false);
}
},
});

  
  // const [shippingInfo, setShippingInfo] = useState(null);
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
          const response = await axiosInstance.post("user/order/paymentVerification", {
            status,
            orderId
          });

          if (response.data.success) {
            // Payment successful - clear cart and redirect
           // dispatch(clearCart());
            navigate("/order-success");
          } else {
            // Payment failed - redirect to failure page
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
    <>
      <Container class1="checkout-wrapper py-5 home-wrapper-4">
        <div className="row">
          <div className="col-7">
            <div className="checkout-left-data">
              <h3 className="website-name">NextGen Dresses</h3>
              <nav
                style={{ "--bs-breadcrumb-divider": ">" }}
                aria-label="breadcrumb"
              >
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link className="text-dark total-price" to="/cart">
                      Cart
                    </Link>
                  </li>
                  &nbsp; /
                  <li
                    className="breadcrumb-item total-price active"
                    aria-current="page"
                  >
                    Information
                  </li>
                  &nbsp; /
                  <li className="breadcrumb-item total-price">Shipping</li>
                  &nbsp; /
                  <li className="breadcrumb-item active" aria-current="page">
                    Payment
                  </li>
                </ol>
              </nav>
              <h4 className="title total">Contact Information</h4>
              <p className="user-details total">
                Supun Ishara (supun20000207@gmail.com)
              </p>
              <h4 className="mb-3">Shipping Address</h4>
              <form
                action=""
                onSubmit={formik.handleSubmit}
                className="d-flex gap-15 flex-wrap justify-content-between"
              >
                <div className="w-100">
                  <select
                    name="country"
                    className="form-control form-select"
                    id=""
                    value={formik.values.country}
                    onChange={formik.handleChange("country")}
                    onBlur={formik.handleBlur("country")}
                  >
                    <option value="" selected disabled>
                      Select Country
                    </option>
                    <option value="Sri Lanka" >
                      Sri Lanka
                    </option>
                  </select>
                  <div className="error-message ms-2 my-1">
                    {formik.touched.country && formik.errors.country}
                  </div>
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="form-control"
                    name="firstName"
                    value={formik.values.firstName}
                    onChange={formik.handleChange("firstName")}
                    onBlur={formik.handleBlur("firstName")}
                  />
                  <div className="error-message ms-2 my-1">
                    {formik.touched.firstName && formik.errors.firstName}
                  </div>
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="form-control"
                    name="lastName"
                    value={formik.values.lastName}
                    onChange={formik.handleChange("lastName")}
                    onBlur={formik.handleBlur("lastName")}
                  />
                  <div className="error-message ms-2 my-1">
                    {formik.touched.lastName && formik.errors.lastName}
                  </div>
                </div>
                <div className="w-100">
                  <input
                    type="tel"
                    placeholder="Mobile Number"
                    className="form-control"
                    name="mobile"
                    value={formik.values.mobile}
                    onChange={formik.handleChange("mobile")}
                    onBlur={formik.handleBlur("mobile")}
                  />
                  <div className="error-message ms-2 my-1">
                    {formik.touched.mobile && formik.errors.mobile}
                  </div>
                </div>
                <div className="w-100">
                  <input
                    type="text"
                    placeholder="Address"
                    className="form-control"
                    name="address"
                    value={formik.values.address}
                    onChange={formik.handleChange("address")}
                    onBlur={formik.handleBlur("address")}
                  />
                  <div className="error-message ms-2 my-1">
                    {formik.touched.address && formik.errors.address}
                  </div>
                </div>
                <div className="w-100">
                  <input
                    type="text"
                    placeholder="Apartment, Suite, etc"
                    className="form-control"
                    name="other"
                    value={formik.values.other}
                    onChange={formik.handleChange("other")}
                    onBlur={formik.handleBlur("other")}
                  />
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="City"
                    className="form-control"
                    name="city"
                    value={formik.values.city}
                    onChange={formik.handleChange("city")}
                    onBlur={formik.handleBlur("city")}
                  />
                  <div className="error-message ms-2 my-1">
                    {formik.touched.city && formik.errors.city}
                  </div>
                </div>
                <div className="flex-grow-1">
                  <select
                    name="state"
                    value={formik.values.state}
                    onChange={formik.handleChange("state")}
                    onBlur={formik.handleBlur("state")}
                    className="form-control form-select"
                    id=""
                  >
                    <option value="" selected disabled>
                      Select State
                    </option>
                    <option value="western">
                      Western
                    </option>
                  </select>
                  <div className="error-message ms-2 my-1">
                    {formik.touched.state && formik.errors.state}
                  </div>
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="Zipcode"
                    className="form-control"
                    name="pincode"
                    value={formik.values.pincode}
                    onChange={formik.handleChange("pincode")}
                    onBlur={formik.handleBlur("pincode")}
                  />
                  <div className="error-message ms-2 my-1">
                    {formik.touched.pincode && formik.errors.pincode}
                  </div>
                </div>
                <div className="w-100">
                  <div className="d-flex justify-content-between align-items-center">
                    <Link to="/cart" className="text-dark">
                      <MdArrowBackIosNew /> Return to Cart
                    </Link>
                    <Link to="/cart" className="button1">
                      Continue to Shipping
                    </Link>
                    <button 
                      className="button1" 
                      type="submit"
                      disabled={loading || isLoading}
                    >
                      {loading || isLoading ? "Processing..." : "Place Order"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-5">
            <div className="border-bottom py-4">
              {cartState &&
                cartState?.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="d-flex gap-10 mb-2 align-items-center"
                    >
                      <div className="w-75 d-flex gap-10">
                        <div className="checkout-img w-25 position-relative">
                          <span
                            style={{ top: "-10px", right: "2px" }}
                            className="badge bg-secondary text-white rounded-circle p-2 position-absolute"
                          >
                            {item?.quantity}
                          </span>
                          <img
                            width={100}
                            height={300}
                            src={item?.productId?.images?.[0]?.url || watch}
                            className="img-fluid"
                            alt="product"
                          />
                        </div>
                        <div>
                          <h5 className="title total-price">
                            {item?.productId?.title}
                          </h5>

                          <p className="total-price d-flex">
                            {item?.size} /{" "}
                            <ul className="colors1 ps-2">
                              <li
                                style={{ backgroundColor: item?.color?.title }}
                              ></li>
                            </ul>
                          </p>
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <h5 className="total">
                          LKR {item?.price * item?.quantity}
                        </h5>
                      </div>
                    </div>
                  );
                })}
            </div>
            <div className="border-bottom py-4">
              <div className="d-flex justify-content-between align-items-center">
                <p className="total">Subtotal</p>
                <p className="total-price">
                  LKR {totalAmount ? totalAmount : "0"}
                </p>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <p className="mb-0 total">Shipping</p>
                <p className="mb-0 total-price">LKR 350.00</p>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center border-bottom py-4">
              <h4 className="total">Total</h4>
              <h5 className="total-price">
                LKR {totalAmount ? totalAmount + 350.0 : "0"}
              </h5>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Checkout;
