import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SingleProduct from "./Pages/SingleProduct";
import Checkout from "./Pages/Checkout";
import HomePage from "./Components/HomePage/HomePage"
import ProductCategories from "./Components/ProductCategories/Categories"
import Orders from "./Components/Orders/Orders"
import Review from "./Components/Orders/Review"

import Cart from "./Components/Orders/Cart";
import Wishlist from "./Components/Orders/Wishlist";
import {CartProvider} from "./contexts/CartContext"
import Address from "./Components/Orders/Address";

function App() {
  return (
    <> 
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="product/:id" element={<SingleProduct />} />
          <Route path="/categories" element={<ProductCategories />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/review/:id" element={<Review />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/address" element={<Address />} />
        </Routes>
      </BrowserRouter>
      </CartProvider>
    </>
  );
}

export default App;
