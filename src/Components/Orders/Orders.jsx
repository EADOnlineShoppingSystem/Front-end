import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Package,
  Search,
  Filter,
  Trash2,
  CheckCircle,
  Star,
} from "lucide-react";
import NavBar from "../NavBar/NavBar";

const Orders = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [filterCriteria, setFilterCriteria] = useState({
    orderNumber: "",
    trackingNumber: "",
    dateRange: "all",
  });

  const [orders, setOrders] = useState([
    {
      id: "92847362",
      date: "2024-11-15",
      total: 156900.0,
      items: [
        {
          name: "iPhone 12",
          quantity: 1,
          price: 154900.0,
          image: "/newProducts/Types/12/1.png",
        },
        {
          name: "Phone Case",
          quantity: 2,
          price: 2000.0,
          image: "/cases/1.png",
        },
      ],
      tracking: "LY234567890CN",
      estimatedDelivery: "2024-11-25",
      isFinished: false,
      hasReview: false,
    },
    {
      id: "92847363",
      date: "2024-11-10",
      total: 664900.0,
      items: [
        {
          name: "iPhone 15 Pro Max",
          quantity: 1,
          price: 664900.0,
          image: "/newProducts/Types/15_Pro_Max/2.png",
        },
      ],
      tracking: "LY987654321CN",
      estimatedDelivery: "2024-11-20",
      isFinished: false,
      hasReview: false,
    },
  ]);

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

  const handleAddReview = (orderId) => {
    navigate(`/review/${orderId}`);
  };

  const filteredOrders = orders.filter((order) => {
    if (activeTab === "finished" && !order.isFinished) return false;

    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      !searchTerm ||
      order.id.toLowerCase().includes(searchLower) ||
      order.tracking.toLowerCase().includes(searchLower) ||
      order.items.some((item) => item.name.toLowerCase().includes(searchLower));

    const matchesOrderNumber =
      !filterCriteria.orderNumber ||
      order.id.includes(filterCriteria.orderNumber);

    const matchesTracking =
      !filterCriteria.trackingNumber ||
      order.tracking.includes(filterCriteria.trackingNumber);

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

    return (
      matchesSearch && matchesOrderNumber && matchesTracking && matchesDateRange
    );
  });

  const handleResetFilters = () => {
    setFilterCriteria({
      orderNumber: "",
      trackingNumber: "",
      dateRange: "all",
    });
  };

  const handleTrack = (order) => {
    if (order && order.tracking) {
      window.open(
        `https://parcelsapp.com/en/tracking/${order.tracking}`,
        "_blank"
      );
    } else {
      alert("No tracking information available for this order.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:mt-20">
      <NavBar />
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

        {/* Filter Panel */}
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
                  Tracking Number
                </label>
                <input
                  type="text"
                  value={filterCriteria.trackingNumber}
                  onChange={(e) =>
                    setFilterCriteria({
                      ...filterCriteria,
                      trackingNumber: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Enter tracking number"
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

      {/* Order Tabs */}
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
                ? "text-blue-500 border-b-1 border-blue-500"
                : "text-gray-600"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No orders found matching your criteria
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div key={order.id} className="border rounded-lg p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <Package className="w-5 h-5 text-gray-600" />
                    <span className="font-medium">Order #{order.id}</span>
                    <span className="text-gray-500 hidden sm:inline">|</span>
                    <span className="text-gray-500">{order.date}</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    Estimated Delivery: {order.estimatedDelivery}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                  {!order.isFinished && (
                    <button
                      onClick={() => handleFinishOrder(order.id)}
                      className="flex items-center gap-1 px-3 py-1 text-sm text-green-600 border border-green-600 rounded-lg hover:bg-green-50 w-full sm:w-auto justify-center"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>Mark as Finished</span>
                    </button>
                  )}
                  {order.isFinished && !order.hasReview && (
                    <button
                      onClick={() => handleAddReview(order.id)}
                      className="flex items-center gap-1 px-3 py-1 text-sm text-green-600 border border-green-600 rounded-lg hover:bg-green-50 w-full sm:w-auto justify-center"
                    >
                      <Star className="w-4 h-4" />
                      <span>Add Review</span>
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteOrder(order.id)}
                    className="flex items-center gap-1 px-3 py-1 text-sm text-red-500 border border-red-500 rounded-lg hover:bg-red-50 w-full sm:w-auto justify-center"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>

              {/* Order Items */}
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
                    <div className="font-medium">${item.price.toFixed(2)}</div>
                  </div>
                </div>
              ))}

              {/* Order Footer */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4 border-t">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
                  <span className="text-sm text-gray-600">
                    Tracking Number: {order.tracking}
                  </span>
                  <button
                    className="text-blue-500 text-sm hover:underline"
                    onClick={() => handleTrack(order)}
                  >
                    Track Package
                  </button>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <span className="text-gray-600">Total:</span>
                  <span className="font-medium text-lg">
                    ${order.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      {showDeleteDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Delete Order</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this order?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowDeleteDialog(false)}
                className="text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="text-red-500 hover:text-red-600"
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
