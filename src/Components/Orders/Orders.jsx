import { useEffect, useState } from "react";
import {
  Package,
  Search,
  Filter,
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
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterCriteria, setFilterCriteria] = useState({
    orderNumber: "",
    dateRange: "all",
    status: "all",
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
          delevered: order.delevered,
          status: order.delevered ? "finished" : "pending",
          items: [
            {
              name: order.productDetails.product.productTitle,
              quantity: order.quantity,
              price: order.price,
              image: order.productDetails.product.images[0].url,
            },
          ],
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

  const handleFinishOrder = async (orderId) => {
    try {
      // Optimistically update the UI
      setOrders(
        orders.map((order) =>
          order.id === orderId ? { ...order, delevered: true } : order
        )
      );

      // Make API call
      const data = await orderServices.changeDeleveryStatus(orderId);
      console.log("Order finished:", data);
    } catch (error) {
      // Revert the optimistic update if the API call fails
      setOrders(
        orders.map((order) =>
          order.id === orderId ? { ...order, delevered: false } : order
        )
      );
      console.error("Error finishing order:", error);
      setError(true);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchOrders();
    }
  }, [userId]);

  const handleResetFilters = () => {
    setFilterCriteria({
      orderNumber: "",
      dateRange: "all",
      status: "all",
    });
    setSearchTerm("");
    setActiveTab("all");
  };

  const filteredOrders = orders.filter((order) => {
    // Filter based on tab selection
    if (activeTab === "finished" && !order.delevered) return false;
    if (activeTab === "pending" && order.delevered) return false;

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

  // Get counts for each status
  const orderCounts = {
    all: orders.length,
    pending: orders.filter((order) => !order.delevered).length,
    finished: orders.filter((order) => order.delevered).length,
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

      <div className="pt-8">
        <Link
          to="/"
          className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          Start Shopping Now
          <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
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
              { id: "all", label: "All Orders", count: orderCounts.all },
              { id: "pending", label: "Pending", count: orderCounts.pending },
              {
                id: "finished",
                label: "Finished",
                count: orderCounts.finished,
              },
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
                <span className="flex items-center gap-2">
                  {tab.label}
                  <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-sm">
                    {tab.count}
                  </span>
                </span>
                {tab.id === activeTab && (
                  <span className="absolute -bottom-[2px] left-0 w-full h-0.5 bg-blue-500" />
                )}
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
                        <span
                          className={`px-2 py-1 rounded-full text-sm ${
                            order.delevered
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {order.delevered ? "Delivered" : "Pending"}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                      {!order.delevered && (
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
    </div>
  );
};

export default Orders;
