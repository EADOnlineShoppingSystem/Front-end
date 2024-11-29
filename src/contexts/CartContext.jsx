import cartServices from '../Services/cart.services';
import { createContext, useContext, useState, useEffect } from 'react';
import { message } from 'antd';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItem, setCartItem] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch cart items
  const fetchCartItems = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await cartServices.getCartDetailsByUserID();

      // Ensure response is an array, even if null or undefined
      setCartItem(Array.isArray(response) ? response : []);
      console.log('Cart items fetched:', response);
    } catch (error) {
      console.error('Error fetching cart items:', error);
      setError(error);
      setCartItem([]); // Set to empty array if fetch fails
      message.error('Failed to load cart items');
    } finally {
      setIsLoading(false);
    }
  };

  
  useEffect(() => {
    fetchCartItems();
  }, []);

  // Add item to cart
  const addToCart = async (product) => {
    try {
      await cartServices.addToCart({
        productId: product.id, // Send the product ID and quantity
        quantity: 1, // Default quantity is 1
      });
      await fetchCartItems(); // Refresh cart
      message.success('Item added to cart');
    } catch (error) {
      console.error('Error adding to cart:', error);
      message.error('Failed to add item to cart');
    }
  };

  // Remove item from cart
  const removeFromCart = async (productId) => {
    try {
      await cartServices.deleteFromCart(productId); // Remove item by ID
      await fetchCartItems(); // Refresh cart
      message.success('Item removed from cart');
    } catch (error) {
      console.error('Error removing item:', error);
      message.error('Failed to remove item');
    }
  };

  // Update quantity of an item in the cart
  const updateQuantity = async (productId, quantity) => {
    try {
      await cartServices.updateQuantity(productId, quantity); // Update product quantity
      await fetchCartItems(); // Refresh cart
      message.success('Quantity updated');
    } catch (error) {
      console.error('Error updating quantity:', error);
      message.error('Failed to update quantity');
    }
  };

  const value = {
    cartItem,
    isLoading,
    error,
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
