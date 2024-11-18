import React, { useState } from 'react';
import { ShoppingCart, Trash2, CheckSquare, Heart, Search, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
const WatchlistPage = () => {
  const navigate = useNavigate();
  const [selectedAll, setSelectedAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [watchlistItems, setWatchlistItems] = useState([
    {
      id: 1,
      name: 'Korean Retro Transparent Computer Glasses Women A...',
      price: 'LKR473.59',
      orders: '219 orders',
      image: '/api/placeholder/200/200'
    },
    {
      id: 2,
      name: 'Global Version POCO X6 Pro 5G Smartphone NFC Dime...',
      price: 'LKR79,194.64',
      orders: '744 orders',
      image: '/api/placeholder/200/200'
    }
  ]);

  // Handle select all
  const handleSelectAll = () => {
    setSelectedAll(!selectedAll);
    if (!selectedAll) {
      setSelectedItems(new Set(watchlistItems.map(item => item.id)));
    } else {
      setSelectedItems(new Set());
    }
  };

  // Handle single item selection
  const toggleSelectItem = (itemId) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(itemId)) {
      newSelected.delete(itemId);
    } else {
      newSelected.add(itemId);
    }
    setSelectedItems(newSelected);
    setSelectedAll(newSelected.size === watchlistItems.length);
  };

  // Add to cart function
  const handleAddToCart = (itemId) => {
    // Here you would typically dispatch to your cart context/redux
    console.log(`Added item ${itemId} to cart`);
    alert('Item added to cart successfully!');
  };

  // Add all selected to cart
  const handleAddAllSelectedToCart = () => {
    selectedItems.forEach(itemId => {
      handleAddToCart(itemId);
    });
  };

  // Delete single item
  const handleDeleteItem = (itemId) => {
    setWatchlistItems(prevItems => prevItems.filter(item => item.id !== itemId));
    setSelectedItems(prev => {
      const newSet = new Set(prev);
      newSet.delete(itemId);
      return newSet;
    });
  };

  // Delete all selected items
  const handleDeleteSelected = () => {
    setWatchlistItems(prevItems => 
      prevItems.filter(item => !selectedItems.has(item.id))
    );
    setSelectedItems(new Set());
    setSelectedAll(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-4 md:px-20 py-6">
        <NavBar />
      </div>

      {/* Watchlist Content */}
      <div className="max-w-7xl mx-auto p-4">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-4">
              <span className="font-medium">All items ({watchlistItems.length})</span>
            </div>
            <div className="flex gap-4">
              {selectedItems.size > 0 && (
                <>
                  <button 
                    onClick={handleAddAllSelectedToCart}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Add Selected to Cart
                  </button>
                  <button 
                    onClick={handleDeleteSelected}
                    className="flex items-center gap-2 text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-5 h-5" />
                    Delete Selected
                  </button>
                </>
              )}
              <button 
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
                onClick={handleSelectAll}
              >
                <CheckSquare className={`w-5 h-5 ${selectedAll ? 'text-blue-600' : ''}`} />
                Select All
              </button>
            </div>
          </div>

          {watchlistItems.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <Heart className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p className="text-lg mb-4">Your wishlist is empty</p>
              <button 
                onClick={() => navigate('/')}
                className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="divide-y">
              {watchlistItems.map((item) => (
                <div key={item.id} className="p-4 flex items-start gap-4">
                  <input
                    type="checkbox"
                    checked={selectedItems.has(item.id)}
                    onChange={() => toggleSelectItem(item.id)}
                    className="mt-2 rounded"
                  />
                  <div className="w-40 h-40">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium mb-2">{item.name}</h3>
                    <p className="text-sm text-gray-500 mb-2">{item.orders}</p>
                    <p className="text-lg font-medium">{item.price}</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button 
                      onClick={() => handleAddToCart(item.id)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                    >
                      <ShoppingCart className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => handleDeleteItem(item.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WatchlistPage;