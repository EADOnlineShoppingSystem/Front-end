import cartServices from '../Services/cart.services'
import { createContext, useContext, useState, useEffect } from 'react';
import {message} from 'antd'

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const[cartItem, setCartItem] = useState([]);

  const fetchcartaitems = async () => {
    try {
      const response = await cartServices.getCartDetailsByUserID();
      setCartItem(response);
      console.log("get data",response);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  useEffect(() => {
    fetchcartaitems();
  }, []);

  const addToCart = async (product) => {
    const adding ={
      
      productId:product.id,
      quantity:1
  
      }
     const data = await cartServices.addToCart(adding)
    setCartItem(prevItems => {
      const existingItem = prevItems.find(item => item._id === product.id);
      
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = async (productId) => {
    try {
        // Call the service method to remove item from cart
        const data = await cartServices.deleteFromCart(productId);
        
        // Update local state or trigger a cart refresh
        //setCartItems(prevItems => prevItems.filter(item => item._id !== productId));
        
        // Optional: Show a success notification
        message.success('Item removed from cart');
        
        // Return the response data if needed
        return data;
    } catch (error) {
        // Log the error
        console.error('Error removing item from cart:', error);
        
        // Optional: Show an error notification
        message.error('Failed to remove item from cart');
        
        // Optionally rethrow or handle the error as needed
        throw error;
    }
};

  const removeMultipleFromCart = (productIds) => {
    setCartItem(prevItems => 
      prevItems.filter(item => !productIds.includes(item.id))
    );
  };

  const updateQuantity = (productId, newQuantity) => {
    setCartItem(prevItems =>
      prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItem([]);
  };

  const getCartTotal = () => {
    return cartItem.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartCount = () => {
    return cartItem.reduce((count, item) => count + item.quantity, 0);
  };

  const value = {
    cartItem,
    addToCart,
    removeFromCart,
    removeMultipleFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount
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