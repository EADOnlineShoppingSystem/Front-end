import { useState } from "react";
import { Star, CheckCircle, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import NavBar from "../NavBar/NavBar";

const Review = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [reviews, setReviews] = useState({});

  const orders = {
    92847362: {
      orderId: "92847362",
      orderDate: "2024-03-15",
      deliveryDate: "2024-03-30",
      seller: "Handfree.lk",
      products: [
        {
          productId: "1",
          productName: "iPhone 12",
          image: "/newProducts/Types/12/1.png",
        },
        {
          productId: "2",
          productName: "iPhone 14",
          image: "/newProducts/Types/14/1.png",
        },
      ],
    },
    92847363: {
      orderId: "92847363",
      orderDate: "2024-03-15",
      deliveryDate: "2024-03-30",
      seller: "Handfree.lk",
      products: [
        {
          productId: "3",
          productName: "iPhone 12 Pro Case",
          image: "/popular/10.png",
        },
      ],
    },
  };

  const initializeReview = (orderId, productId) => {
    const reviewKey = `${orderId}-${productId}`;
    if (!reviews[reviewKey]) {
      setReviews((prev) => ({
        ...prev,
        [reviewKey]: {
          rating: 0,
          hover: 0,
          review: "",
          shippingSpeed: 0,
          shippingSpeedHover: 0,
          itemCondition: 0,
          itemConditionHover: 0,
        },
      }));
    }
  };

  const updateReview = (orderId, productId, field, value) => {
    const reviewKey = `${orderId}-${productId}`;
    setReviews((prev) => ({
      ...prev,
      [reviewKey]: {
        ...prev[reviewKey],
        [field]: value,
      },
    }));
  };

  const handleSubmit = (e, orderId, productId) => {
    e.preventDefault();
    const reviewKey = `${orderId}-${productId}`;
    console.log("Submitting review:", {
      ...reviews[reviewKey],
      orderId,
      productId,
    });
    setShowModal(true);
  };

  const RatingStars = ({ orderId, productId, field, value, hoverField }) => (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${
            star <= (value || reviews[`${orderId}-${productId}`]?.[hoverField])
              ? "fill-yellow-400 text-yellow-400"
              : "text-gray-300"
          } cursor-pointer w-6 h-6`}
          onMouseEnter={() =>
            updateReview(orderId, productId, hoverField, star)
          }
          onMouseLeave={() => updateReview(orderId, productId, hoverField, 0)}
          onClick={() => updateReview(orderId, productId, field, star)}
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mb-10">
        <NavBar />
      </div>
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 text-center">Write Reviews</h2>

        <div className="space-y-8 max-w-4xl mx-auto">
          {Object.values(orders).map((order) => (
            <div
              key={order.orderId}
              className="bg-white shadow-md rounded-lg p-6"
            >
              <div className="border-b pb-4 mb-4">
                <h3 className="text-lg font-semibold">
                  Order #{order.orderId}
                </h3>
                <div className="flex justify-between text-sm text-gray-600 mt-2">
                  <div>
                    <p>Order Date: {order.orderDate}</p>
                    <p>Delivery Date: {order.deliveryDate}</p>
                  </div>
                  <div>
                    <p>Seller: {order.seller}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {order.products.map((product) => {
                  initializeReview(order.orderId, product.productId);
                  const reviewKey = `${order.orderId}-${product.productId}`;
                  const review = reviews[reviewKey] || {};

                  return (
                    <div
                      key={product.productId}
                      className="border-b last:border-b-0 pb-6 last:pb-0"
                    >
                      <div className="flex gap-6">
                        <div className="flex-1">
                          <div className="w-32 flex-shrink-0">
                            <img
                              src={product.image}
                              alt={product.productName}
                              className="w-32 h-32 object-cover rounded-md"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "/fallback-image.png";
                              }}
                            />
                          </div>
                          <h4 className="text-lg font-medium mb-4">
                            {product.productName}
                          </h4>

                          <form
                            onSubmit={(e) =>
                              handleSubmit(e, order.orderId, product.productId)
                            }
                            className="space-y-4"
                          >
                            <div>
                              <p className="text-gray-700 font-medium mb-2">
                                Overall Rating
                              </p>
                              <RatingStars
                                orderId={order.orderId}
                                productId={product.productId}
                                field="rating"
                                value={review.rating}
                                hoverField="hover"
                              />
                            </div>

                            <div>
                              <p className="text-gray-700 font-medium mb-2">
                                Shipping Speed
                              </p>
                              <RatingStars
                                orderId={order.orderId}
                                productId={product.productId}
                                field="shippingSpeed"
                                value={review.shippingSpeed}
                                hoverField="shippingSpeedHover"
                              />
                            </div>

                            <div>
                              <p className="text-gray-700 font-medium mb-2">
                                Item Condition
                              </p>
                              <RatingStars
                                orderId={order.orderId}
                                productId={product.productId}
                                field="itemCondition"
                                value={review.itemCondition}
                                hoverField="itemConditionHover"
                              />
                            </div>

                            <div>
                              <textarea
                                value={review.review || ""}
                                onChange={(e) =>
                                  updateReview(
                                    order.orderId,
                                    product.productId,
                                    "review",
                                    e.target.value
                                  )
                                }
                                placeholder="Share your experience with this product..."
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 min-h-[100px]"
                              />
                            </div>

                            <button
                              type="submit"
                              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                              disabled={
                                !review.rating ||
                                !review.review?.trim() ||
                                !review.shippingSpeed ||
                                !review.itemCondition
                              }
                            >
                              Submit Review
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            <div className="flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
              <p className="text-gray-600 mb-4">
                Your feedback helps other shoppers make informed decisions.
              </p>
              <button
                onClick={() => {
                  setShowModal(false);
                  navigate("/orders");
                }}
                className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Review;
