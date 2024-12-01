import React, { useState, useMemo } from 'react';
import { Trash2, ChevronDown, ChevronUp, ShoppingCart ,MapPin} from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import NavBar from '../NavBar/NavBar';
import { useNavigate } from 'react-router-dom';
import { useOrderContext } from '../../hooks/useOrderContext';
import { Spin } from 'antd'; 

const Cart = () => {
  const { removeFromCart, updateQuantity, cartItem, isLoading,subtotal,shippingFee,total} = useCart();
  const [voucherCode, setVoucherCode] = useState('');
  const [location, setLocation] = useState('Weligama, Matara,Southern');
  const [voucherApplied, setVoucherApplied] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = useOrderContext();



  const handleOrders = () => {

    const orders = cartItem.map(item => ({
      productId: item._id,
      quantity: item.quantity.toString(),
      price: item.productDetails.product.lowestPrice.toString(),
    }));
    dispatch({ type: "ADD_ORDER", payload: { order: orders } });
    navigate('/checkout');

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

  // if (isLoading) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center bg-gray-50">
  //       <Spin size="large" />
  //     </div>
  //   );
  // }

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
                    className="px-8 py-3 bg-blue-400 text-white rounded hover:bg-orange-600 font-medium transition-colors"
                  >
                    CONTINUE SHOPPING
                  </button>
                </div>
              ) : (
                cartItem.map((item) => (
                  <div key={item._id} className="border-t py-4">
                    <div className="flex items-start gap-4">
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
                              {item.productDetails.product.productTitle}
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">
                              Warranty: {item.productDetails.product.warranty} Years, 
                              Description: {item.productDetails.product.productDescription}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-blue-400 font-medium">
                              Rs. {item.productDetails.product.lowestPrice}
                            </p>
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
                                item.quantity >= item.productDetails.product.quantity 
                                  ? 'cursor-not-allowed opacity-50' 
                                  : 'hover:bg-gray-100'
                              }`}
                              disabled={item.quantity >= item.productDetails.product.quantity}
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
            {/* <div className="mb-4">
                <h2 className="font-medium mb-4">Location</h2>
                <div className="flex items-start gap-2">
                  <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
                  <p className="text-gray-600 text-sm flex-1">{location}</p>
                </div>
              </div> */}
              <div className="border-t pt-4">
                <h2 className="font-medium mb-4">Order Summary</h2>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span>Rs. {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping Fee</span>
                    <span>Rs. {shippingFee}</span>
                  </div>
                  
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="font-medium">Total</span>
                  <span className="text-blue-400 font-medium">
                    Rs. {total}
                  </span>
                </div>

                <button 
                  className="bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-blue-600 transition flex items-center gap-2 w-full justify-center"
                  disabled={cartItem.length === 0}
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
