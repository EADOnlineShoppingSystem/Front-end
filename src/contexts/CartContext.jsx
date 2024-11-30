import cartServices from '../Services/cart.services';
import { createContext, useContext, useState, useEffect } from 'react';
import { message } from 'antd';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItem, setCartItem] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalQuentity, setTotalQuentity] = useState(0);

  // Calculated values
  const [subtotal, setSubtotal] = useState(0);
  const [shippingFee, setShippingFee] = useState(0);
  const [total, setTotal] = useState(0);

  // Fetch cart items
  const fetchCartItems = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await cartServices.getCartDetailsByUserID();
      setCartItem(Array.isArray(response) ? response : []);
    } catch (error) {
      console.error('Error fetching cart items:', error);
      setError(error);
      setCartItem([]);
      message.error('Failed to load cart items');
    } finally {
      setIsLoading(false);
    }
  };

  // Recalculate totals when cart items change
  useEffect(() => {
    const calculateCartTotals = () => {
      const subtotal = cartItem.reduce(
        (sum, item) =>
          sum + item.productDetails.product.lowestPrice * item.quantity,
        0
      );
      const shippingFee = cartItem.length > 0 ? 280 : 0; // Add shipping fee conditionally
      const total = subtotal + shippingFee;

      setSubtotal(subtotal);
      setShippingFee(shippingFee);
      setTotal(total);
    };

    calculateCartTotals();
  }, [cartItem]);

  // Add item to cart
  const addToCart = async (product) => {
    try {
      await cartServices.addToCart({
        productId: product.id,
        quantity: product.quantity,
      });
      await fetchCartItems();
      await fetchupdateAllQuantity();
      message.success('Item added to cart');
    } catch (error) {
      console.error('Error adding to cart:', error);
      message.error('Failed to add item to cart');
    }
  };

  // Remove item from cart
  const removeFromCart = async (productId) => {
    try {
      await cartServices.deleteFromCart(productId);
      await fetchCartItems();
      message.success('Item removed from cart');
    } catch (error) {
      console.error('Error removing item:', error);
      message.error('Failed to remove item');
    }
  };

  // Update quantity of an item in the cart
  const updateQuantity = async (productId, quantity) => {
    try {
      console.log('Update quantity:', productId, quantity);
      await cartServices.updateCartQuantity(productId, quantity);
      await fetchCartItems();
      message.success('Quantity updated');
    } catch (error) {
      console.error('Error updating quantity:', error);
      message.error('Failed to update quantity');
    }
  };

  // Fetch total quantity
  const fetchupdateAllQuantity = async () => {
    try {
      const response = await cartServices.getAllQuantityByUsers();
      setTotalQuentity(response);
      await fetchCartItems();
    } catch (error) {
      console.error('Error fetching total quantity:', error);
      message.error('Failed to fetch total quantity');
    }
  };

  useEffect(() => {
    fetchupdateAllQuantity();
  }, []);

  const value = {
    cartItem,
    isLoading,
    error,
    totalQuentity,
    subtotal,
    shippingFee,
    total,
    fetchCartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
