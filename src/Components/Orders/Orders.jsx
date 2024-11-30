import { useEffect, useState } from "react";
import {
  Package,
  Search,
  Filter,
  Trash2,
  ShoppingBag,
  ArrowRight,
  Loader,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../contexts/AthContext";
import NavBar from "../NavBar/NavBar";
import orderServices from "../../Services/order.services";

const Orders = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterCriteria, setFilterCriteria] = useState({
    orderNumber: "",
    dateRange: "all",
  });

  const { state } = useAuthContext();
  const { user, isLoggedIn } = state;
  const userId = user?._id;

  const fetchOrders = async () => {
    if (!isLoggedIn || !userId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await orderServices.getOrderByUserId(userId);
      console.log("Orders response:", response);

      if (response && response.data) {
        const formattedOrders = response.data.map((order) => ({
          id: order._id,
          date: new Date(order.createdAt).toLocaleDateString(),
          total: order.price * order.quantity,
          items: [
            {
              name: order.productDetails.product.productTitle,
              quantity: order.quantity,
              price: order.price,
              image: order.productDetails.product.images[0].url,
            },
          ],
          isFinished: false,
        }));
        setOrders(formattedOrders);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchOrders();
    }
  }, [userId]);

  const handleDeleteOrder = (orderId) => {
    setSelectedOrderId(orderId);
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    setOrders(orders.filter((order) => order.id !== selectedOrderId));
    setShowDeleteDialog(false);
    setSelectedOrderId(null);
  };

  const handleFinishOrder = (orderId) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, isFinished: true } : order
      )
    );
  };

  const filteredOrders = orders.filter((order) => {
    if (activeTab === "finished" && !order.isFinished) return false;

    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      !searchTerm ||
      order.id.toLowerCase().includes(searchLower) ||
      order.items.some((item) => item.name.toLowerCase().includes(searchLower));

    const matchesOrderNumber =
      !filterCriteria.orderNumber ||
      order.id.includes(filterCriteria.orderNumber);

    const orderDate = new Date(order.date);
    const today = new Date();
    const daysDifference = Math.floor(
      (today - orderDate) / (1000 * 60 * 60 * 24)
    );

    const matchesDateRange =
      filterCriteria.dateRange === "all" ||
      (filterCriteria.dateRange === "last30" && daysDifference <= 30) ||
      (filterCriteria.dateRange === "last60" && daysDifference <= 60) ||
      (filterCriteria.dateRange === "last90" && daysDifference <= 90);

    return matchesSearch && matchesOrderNumber && matchesDateRange;
  });

  const handleResetFilters = () => {
    setFilterCriteria({
      orderNumber: "",
      dateRange: "all",
    });
    setSearchTerm("");
  };

  // Loading State Component
  const LoadingState = () => (
    <div className="max-w-6xl mx-auto p-4 md:mt-20">
      <NavBar />
      <div className="flex flex-col items-center justify-center py-16">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <ShoppingBag className="w-6 h-6 text-blue-600" />
          </div>
        </div>
        <p className="mt-4 text-lg font-medium text-gray-600">
          Loading your shopping history...
        </p>
        <p className="mt-2 text-sm text-gray-500">
          Just a moment while we fetch your orders
        </p>
      </div>
    </div>
  );

  // Error State Component
  const ErrorState = () => (
    <div className="max-w-6xl mx-auto p-4 md:mt-20">
      <NavBar />
      <div className="text-center py-16 px-4">
        <div className="mb-6 relative inline-block">
          <div className="text-6xl mb-2">🛍️</div>
          <div className="absolute -top-2 -right-2 text-3xl">✨</div>
        </div>
        <h2 className="text-2xl font-bold mb-4">
          Let's Start Your Shopping Journey!
        </h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          While we're fixing things up, why not explore our amazing collection
          of the latest iPhones?
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl shadow-sm">
            <div className="text-3xl mb-2">📱</div>
            <h3 className="font-semibold mb-2">Latest Models</h3>
            <p className="text-sm text-gray-600">
              Discover the newest iPhone lineup
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl shadow-sm">
            <div className="text-3xl mb-2">💰</div>
            <h3 className="font-semibold mb-2">Best Deals</h3>
            <p className="text-sm text-gray-600">
              Unbeatable prices on all products
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl shadow-sm">
            <div className="text-3xl mb-2">🎁</div>
            <h3 className="font-semibold mb-2">Special Offers</h3>
            <p className="text-sm text-gray-600">
              Exclusive deals for new customers
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <Link
            to="/"
            className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl font-medium"
          >
            Explore Products
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>

          <div>
            <button
              onClick={fetchOrders}
              className="mt-4 text-blue-600 hover:text-blue-700 hover:underline flex items-center justify-center mx-auto"
            >
              <Loader className="w-4 h-4 mr-2" />
              Try loading orders again
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Empty Orders State
  const EmptyOrdersState = () => (
    <div className="text-center py-16 px-4">
      <div className="mb-6 relative inline-block">
        <div className="text-7xl mb-2">🛍️</div>
        <div className="absolute -top-2 -right-2 text-4xl animate-bounce">
          ✨
        </div>
      </div>
      <h2 className="text-2xl font-bold mb-4">
        Time for Your First Shopping Adventure!
      </h2>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        Discover amazing deals on the latest iPhones and accessories. Start your
        shopping journey with us today!
      </p>

      <div className="space-y-6 max-w-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 p-6 rounded-lg text-left">
            <div className="text-2xl mb-2">🌟</div>
            <h3 className="font-semibold text-lg mb-2">Exclusive Deals</h3>
            <p className="text-gray-600 text-sm">
              Get special discounts on your first purchase!
            </p>
          </div>

          <div className="bg-purple-50 p-6 rounded-lg text-left">
            <div className="text-2xl mb-2">🚚</div>
            <h3 className="font-semibold text-lg mb-2">Free Shipping</h3>
            <p className="text-gray-600 text-sm">
              Enjoy free delivery on orders above $500
            </p>
          </div>

          <div className="bg-green-50 p-6 rounded-lg text-left">
            <div className="text-2xl mb-2">⭐</div>
            <h3 className="font-semibold text-lg mb-2">Quality Guarantee</h3>
            <p className="text-gray-600 text-sm">
              100% authentic products with warranty
            </p>
          </div>

          <div className="bg-orange-50 p-6 rounded-lg text-left">
            <div className="text-2xl mb-2">🎁</div>
            <h3 className="font-semibold text-lg mb-2">Special Rewards</h3>
            <p className="text-gray-600 text-sm">
              Earn points with every purchase
            </p>
          </div>
        </div>

        <div className="pt-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Start Shopping Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>

          <div className="mt-4 text-sm text-gray-500">
            Join thousands of happy customers! 🌟
          </div>
        </div>
      </div>
    </div>
  );

  if (!isLoggedIn) {
    return (
      <div className="max-w-6xl mx-auto p-4 md:mt-20">
        <NavBar />
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔐</div>
          <h3 className="text-xl font-semibold mb-2">
            Please log in to view your orders
          </h3>
          <p className="text-gray-600 mb-6">
            Sign in to access your order history and track your purchases
          </p>
          <Link
            to="/login"
            className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Sign In Now 👋
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState />;
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:mt-20">
      <NavBar />
      {orders.length === 0 ? (
        <EmptyOrdersState />
      ) : (
        <>
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">My Orders</h1>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search orders..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center justify-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 ${
                  showFilters ? "bg-gray-50" : ""
                }`}
              >
                <Filter className="w-5 h-5" />
                <span>Filter</span>
              </button>
            </div>

            {showFilters && (
              <div className="mt-4 p-4 border rounded-lg bg-white">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Order Number
                    </label>
                    <input
                      type="text"
                      value={filterCriteria.orderNumber}
                      onChange={(e) =>
                        setFilterCriteria({
                          ...filterCriteria,
                          orderNumber: e.target.value,
                        })
                      }
                      className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="Enter order number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date Range
                    </label>
                    <select
                      value={filterCriteria.dateRange}
                      onChange={(e) =>
                        setFilterCriteria({
                          ...filterCriteria,
                          dateRange: e.target.value,
                        })
                      }
                      className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="all">All Time</option>
                      <option value="last30">Last 30 Days</option>
                      <option value="last60">Last 60 Days</option>
                      <option value="last90">Last 90 Days</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <button
                    onClick={handleResetFilters}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    Reset Filters
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-6 border-b mb-6 overflow-x-auto">
            {[
              { id: "all", label: "All Orders" },
              { id: "finished", label: "Finished" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-3 px-2 relative whitespace-nowrap ${
                  activeTab === tab.id
                    ? "text-blue-500 border-b-2 border-blue-500"
                    : "text-gray-600"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="space-y-6">
            {filteredOrders.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2">No orders found</h3>
                <p className="text-gray-600">
                  Try adjusting your filters or search terms
                </p>
              </div>
            ) : (
              filteredOrders.map((order) => (
                <div key={order.id} className="border rounded-lg p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <Package className="w-5 h-5 text-gray-600" />
                        <span className="font-medium">Order #{order.id}</span>
                        <span className="text-gray-500 hidden sm:inline">
                          |
                        </span>
                        <span className="text-gray-500">{order.date}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                      {!order.isFinished && (
                        <button
                          onClick={() => handleFinishOrder(order.id)}
                          className="flex items-center gap-1 px-3 py-1 text-sm text-green-600 border border-green-600 rounded-lg hover:bg-green-50 w-full sm:w-auto justify-center"
                        >
                          Mark as Finished
                        </button>
                      )}
                    
                    </div>
                  </div>

                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row items-start sm:items-center gap-4 py-4 border-t"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium mb-1">{item.name}</h3>
                        <p className="text-sm text-gray-500">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <div className="text-right w-full sm:w-auto">
                        <div className="font-medium">
                          ${item.price.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="flex justify-end items-center gap-2 pt-4 border-t">
                    <span className="text-gray-600">Total:</span>
                    <span className="font-medium text-lg">
                      ${order.total.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}

      {showDeleteDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Delete Order</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this order?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowDeleteDialog(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 text-red-500 hover:text-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
