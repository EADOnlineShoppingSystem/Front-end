import React, { useState, useMemo } from 'react';
import { Trash2, ChevronDown, ChevronUp, MapPin, ShoppingCart } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import NavBar from '../NavBar/NavBar';
import { useNavigate } from 'react-router-dom';
import { useOrder } from '../../contexts/orderContext';
import { Spin } from 'antd'; 

const Cart = () => {
  const { 
    removeFromCart, 
    updateQuantity, 
    cartItem, 
    isLoading 
  } = useCart();
  
  const [voucherCode, setVoucherCode] = useState('');
  const [voucherApplied, setVoucherApplied] = useState(false);
  const [location] = useState('Weligama, Matara, Southern');
  const [selectedItemId, setSelectedItemId] = useState(null);
  
  const navigate = useNavigate();
  const { setOrderData } = useOrder();

  // Memoized calculations to prevent unnecessary re-renders
  const cartSummary = useMemo(() => {
    const selectedItem = cartItem.find(item => item._id === selectedItemId);
    
    const calculateSelectedSubtotal = () => {
      if (!selectedItem) return 0;
      return selectedItem.productDetails.product.lowestPrice * selectedItem.quantity;
    };

    const subtotal = calculateSelectedSubtotal();
    const shippingFee = selectedItem ? 280 : 0;
    const voucherDiscount = voucherApplied ? 500 : 0;
    const total = subtotal + shippingFee - voucherDiscount;

    return {
      subtotal,
      shippingFee,
      voucherDiscount,
      total,
      selectedItemCount: selectedItem ? 1 : 0
    };
  }, [cartItem, selectedItemId, voucherApplied]);

  const handleOrders = () => {
    const selectedItem = cartItem.find(item => item._id === selectedItemId);
    if (selectedItem) {
      const orderData = {
        productId: selectedItem._id,
        quantity: selectedItem.quantity.toString(),
        price: selectedItem.productDetails.product.lowestPrice.toString()
      };
      setOrderData(orderData);
      navigate('/checkout');
    }
  };

  const handleSelectItem = (itemId) => {
    setSelectedItemId(itemId === selectedItemId ? null : itemId);
  };

  const handleQuantityChange = (item, newQuantity) => {
    if (!item || !item._id) {
      console.error('Invalid item');
      return;
    }

    if (newQuantity < 1) {
      removeFromCart(item._id);
      return;
    }

    if (newQuantity > 10) {
      alert('Maximum quantity is 10');
      return;
    }

    updateQuantity(item._id, newQuantity);
  };

  const handleApplyVoucher = () => {
    if (voucherCode === '1000' && !voucherApplied) {
      setVoucherApplied(true);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Spin size="large" />
      </div>
    );
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
              {!cartItem || cartItem.length === 0 ? (
                <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-sm p-8">
                  <ShoppingCart className="w-20 h-20 text-gray-300 mb-4" />
                  <p className="text-gray-500 text-lg mb-6 text-center">
                    Your cart is currently empty
                  </p>
                  <button 
                    onClick={() => navigate('/')} 
                    className="px-8 py-3 bg-orange-500 text-white rounded hover:bg-orange-600 font-medium transition-colors"
                  >
                    CONTINUE SHOPPING
                  </button>
                </div>
              ) : (
                cartItem.map((item) => (
                  <div key={item._id} className="border-t py-4">
                    <div className="flex items-start gap-4">
                      <input 
                        type="radio" 
                        className="mt-2"
                        checked={selectedItemId === item._id}
                        onChange={() => handleSelectItem(item._id)}
                      />
                      <div className="w-24 h-24">
                        <img 
                          src={item.productDetails.product.images[0]?.url} 
                          alt={item.name} 
                          className="w-full h-full object-contain" 
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-medium">
                              {item.productDetails.product.categoryName}
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">
                              {item.brand}, Color Family:{item.color}, Storage Capacity:{item.storage}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-orange-500 font-medium">
                              Rs. {item.productDetails.product.lowestPrice}
                            </p>
                            {item.productDetails.product.lowestPrice && (
                              <p className="text-gray-400 line-through text-sm">
                                Rs. {item.productDetails.product.lowestPrice}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => handleQuantityChange(item, item.quantity - 1)}
                              className={`p-1 rounded ${
                                item.quantity <= 1 
                                  ? 'cursor-not-allowed opacity-50' 
                                  : 'hover:bg-gray-100'
                              }`}
                              disabled={item.quantity <= 1}
                              aria-label="Decrease quantity"
                            >
                              <ChevronDown className="w-4 h-4" />
                            </button>
                            
                            <span className="w-8 text-center">{item.quantity}</span>
                            
                            <button 
                              onClick={() => handleQuantityChange(item, item.quantity + 1)}
                              className={`p-1 rounded ${
                                item.quantity >= 10 
                                  ? 'cursor-not-allowed opacity-50' 
                                  : 'hover:bg-gray-100'
                              }`}
                              disabled={item.quantity >= 10}
                              aria-label="Increase quantity"
                            >
                              <ChevronUp className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="flex items-center gap-4">
                            <button 
                              className="text-gray-400 hover:text-gray-600"
                              onClick={() => removeFromCart(item._id)}
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
                    <span className="text-gray-600">
                      Subtotal ({cartSummary.selectedItemCount} item)
                    </span>
                    <span>Rs. {cartSummary.subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping Fee</span>
                    <span>Rs. {cartSummary.shippingFee}</span>
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
                    <p className="text-green-600 text-sm mt-2">
                      Voucher successfully applied!
                    </p>
                  )}
                </div>

                <div className="flex justify-between items-center mb-4">
                  <span className="font-medium">Total</span>
                  <span className="text-orange-500 font-medium">
                    Rs. {cartSummary.total.toLocaleString()}
                  </span>
                </div>

                <button 
                  className="w-full bg-orange-500 text-white py-3 rounded font-medium hover:bg-orange-600 disabled:bg-gray-300"
                  disabled={!selectedItemId}
                  onClick={handleOrders}
                >
                  PROCEED TO CHECKOUT
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