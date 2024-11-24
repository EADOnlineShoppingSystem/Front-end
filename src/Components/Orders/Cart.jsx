
import React, { useState } from 'react';
import { Trash2, ChevronDown, ChevronUp, MapPin } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import NavBar from '../NavBar/NavBar';
import { Navigate, useNavigate } from 'react-router-dom';
import { useOrder } from '../../contexts/orderContext';
const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, removeMultipleFromCart } = useCart();
  const [voucherCode, setVoucherCode] = useState('');
  const [voucherApplied, setVoucherApplied] = useState(false);
  const [location, setLocation] = useState('Weligama, Matara,Southern');
  const [selectedItems, setSelectedItems] = useState(new Set());
  const navigate = useNavigate();

  const toggleSelectAll = () => {
    if (selectedItems.size === cartItems.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(cartItems.map(item => item.id)));
    }
  };

  const toggleSelectItem = (itemId) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(itemId)) {
      newSelected.delete(itemId);
    } else {
      newSelected.add(itemId);
    }
    setSelectedItems(newSelected);
  };

  const calculateSelectedSubtotal = () => {
    return cartItems
      .filter(item => selectedItems.has(item.id))
      .reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleDeleteSelected = () => {
    removeMultipleFromCart(Array.from(selectedItems));
    setSelectedItems(new Set());
  };

  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity >= 1) {
      updateQuantity(item.id, newQuantity);
    }
  };

  const handleApplyVoucher = () => {
    if (voucherCode === '1000' && !voucherApplied) {
      setVoucherApplied(true);
    }
  };

  // Shipping fee is 280 when items are selected, 0 otherwise
  const shippingFee = selectedItems.size > 0 ? 280 : 0;

  // Calculate total with voucher discount
  const calculateTotal = () => {
    const subtotal = calculateSelectedSubtotal();
    const voucherDiscount = voucherApplied ? 500 : 0;
    return subtotal + shippingFee - voucherDiscount;
  };

const { setOrderData } = useOrder();
const orderData = {
     productId: "674195cbc36bd2ccee6e1205",    
    quantity: 99,
    price: 2669.99
}
const handleOrders= () => {
  console.log("Order Data", orderData);
  //setOrderData(orderData);
  Navigate('/Checkout');
}

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="px-4 md:px-20 py-6">
        <NavBar />
      </div>

      <div className="flex-1 px-4 md:px-20 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Cart Items Section */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    className="rounded"
                    checked={selectedItems.size === cartItems.length && cartItems.length > 0}
                    onChange={toggleSelectAll}
                    disabled={cartItems.length === 0}
                  />
                  <span className="text-gray-600">
                    SELECT ALL ({selectedItems.size}/{cartItems.length} ITEMS)
                  </span>
                </div>
                <button 
                  className="flex items-center gap-2 text-gray-600"
                  onClick={handleDeleteSelected}
                  disabled={selectedItems.size === 0}
                >
                  <Trash2 className="w-4 h-4" />
                  DELETE
                </button>
              </div>

              {cartItems.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 text-lg mb-6">There are no items in this cart</p>
                  <button 
                    onClick={() => navigate('/')} 
                    className="px-8 py-3 border-2 border-orange-500 text-orange-500 rounded hover:bg-orange-50 font-medium"
                  >
                    CONTINUE SHOPPING
                  </button>
                </div>
              ) : (
                /* Cart Items */
                cartItems.map((item) => (
                  <div key={item.id} className="border-t py-4">
                    <div className="flex items-start gap-4">
                      <input 
                        type="checkbox" 
                        className="mt-2 rounded"
                        checked={selectedItems.has(item.id)}
                        onChange={() => toggleSelectItem(item.id)}
                      />
                      <div className="w-24 h-24">
                        <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-medium">{item.name}</h3>
                            <p className="text-sm text-gray-500 mt-1">
                              {item.brand}, Color Family:{item.color}, Storage Capacity:{item.storage}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-orange-500 font-medium">Rs. {item.price.toLocaleString()}</p>
                            {item.originalPrice && (
                              <p className="text-gray-400 line-through text-sm">
                                Rs. {item.originalPrice.toLocaleString()}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => handleQuantityChange(item, item.quantity - 1)}
                              className="p-1 hover:bg-gray-100 rounded"
                            >
                              <ChevronDown className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <button 
                              onClick={() => handleQuantityChange(item, item.quantity + 1)}
                              className="p-1 hover:bg-gray-100 rounded"
                            >
                              <ChevronUp className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="flex items-center gap-4">
                            <button 
                              className="text-gray-400 hover:text-gray-600"
                              onClick={() => {
                                removeFromCart(item.id);
                                setSelectedItems(prev => {
                                  const newSet = new Set(prev);
                                  newSet.delete(item.id);
                                  return newSet;
                                });
                              }}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="lg:w-80">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="mb-4">
                <h2 className="font-medium mb-4">Location</h2>
                <div className="flex items-start gap-2">
                  <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
                  <p className="text-gray-600 text-sm flex-1">{location}</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <h2 className="font-medium mb-4">Order Summary</h2>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal ({selectedItems.size} items)</span>
                    <span>Rs. {calculateSelectedSubtotal().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping Fee</span>
                    <span>Rs. {shippingFee}</span>
                  </div>
                  {voucherApplied && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Voucher Discount</span>
                      <span>- Rs. 500</span>
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter Voucher Code (try: 1000)"
                      className="flex-1 border rounded px-3 py-2 text-sm"
                      value={voucherCode}
                      onChange={(e) => setVoucherCode(e.target.value)}
                    />
                    <button 
                      className={`text-white px-4 py-2 rounded text-sm ${
                        voucherApplied 
                          ? 'bg-gray-400 cursor-not-allowed' 
                          : 'bg-blue-500 hover:bg-blue-600'
                      }`}
                      onClick={handleApplyVoucher}
                      disabled={voucherApplied}
                    >
                      {voucherApplied ? 'APPLIED' : 'APPLY'}
                    </button>
                  </div>
                  {voucherApplied && (
                    <p className="text-green-600 text-sm mt-2">Voucher successfully applied!</p>
                  )}
                </div>

                <div className="flex justify-between items-center mb-4">
                  <span className="font-medium">Total</span>
                  <span className="text-orange-500 font-medium">
                    Rs. {calculateTotal().toLocaleString()}
                  </span>
                </div>

                <button onClick={handleOrders}
                  className="w-full bg-orange-500 text-white py-3 rounded font-medium hover:bg-orange-600 disabled:bg-gray-300"
                  disabled={selectedItems.size === 0}
                >
                  PROCEED TO CHECKOUT ({selectedItems.size})
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

