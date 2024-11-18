import React, { useState } from 'react';
import { Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import NavBar from '../NavBar/NavBar';
import Footer from '../HomePage/Footer';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const [voucherCode, setVoucherCode] = useState('');
  const [location, setLocation] = useState('Weligama, Matara,Southern');

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Assuming shipping is free for now
  const shippingFee = 0;

  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity >= 1) {
      updateQuantity(item.id, newQuantity);
    }
  };

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
                  <input type="checkbox" className="rounded" />
                  <span className="text-gray-600">SELECT ALL ({cartItems.length} ITEM(S))</span>
                </div>
                <button className="flex items-center gap-2 text-gray-600">
                  <Trash2 className="w-4 h-4" />
                  DELETE
                </button>
              </div>

              {/* Cart Items */}
              {cartItems.map((item) => (
                <div key={item.id} className="border-t py-4">
                  <div className="flex items-start gap-4">
                    <input type="checkbox" className="mt-2 rounded" />
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
                          <button className="text-gray-400 hover:text-gray-600">
                            <Trash2 className="w-4 h-4" onClick={() => removeFromCart(item.id)} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="lg:w-80">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="mb-4">
                <h2 className="font-medium mb-4">Location</h2>
                <p className="text-gray-600 text-sm">{location}</p>
              </div>

              <div className="border-t pt-4">
                <h2 className="font-medium mb-4">Order Summary</h2>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal ({cartItems.length} items)</span>
                    <span>Rs. {calculateSubtotal().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping Fee</span>
                    <span>Rs. {shippingFee}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter Voucher Code"
                      className="flex-1 border rounded px-3 py-2 text-sm"
                      value={voucherCode}
                      onChange={(e) => setVoucherCode(e.target.value)}
                    />
                    <button className="bg-blue-500 text-white px-4 py-2 rounded text-sm hover:bg-blue-600">
                      APPLY
                    </button>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-4">
                  <span className="font-medium">Total</span>
                  <span className="text-orange-500 font-medium">
                    Rs. {(calculateSubtotal() + shippingFee).toLocaleString()}
                  </span>
                </div>

                <button className="w-full bg-orange-500 text-white py-3 rounded font-medium hover:bg-orange-600">
                  PROCEED TO CHECKOUT({cartItems.length})
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default Cart;