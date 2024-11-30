import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SingleProduct from "./Pages/SingleProduct";
import Checkout from "./Pages/Checkout";
import ProductCategories from "./Components/ProductCategories/Categories"
import Categories from "./Components/ProductCategories/Categories"
import Orders from "./Components/Orders/Orders"
import Review from "./Components/Orders/Review"
import Cart from "./Components/Orders/Cart";
import Wishlist from "./Components/Orders/Wishlist";
import {CartProvider} from "./contexts/CartContext"
import Address from "./Components/Orders/Address";
import Profile from "./Components/Profile/Profile";
import HomePage from "./Components/HomePage/HomePage";
import { AuthContextProvider } from "./contexts/AthContext";
import { OrderContextProvider } from "./contexts/orderContext";

function App() {
  return (
    <>
    <OrderContextProvider>
    <AuthContextProvider>
        <CartProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/product/:id" element={<SingleProduct />} />
              <Route path="/categories" element={<ProductCategories />} />
              <Route path="/categories/:categoryName" element={<Categories />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/review/:id" element={<Review />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/address" element={<Address />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </AuthContextProvider>
      </OrderContextProvider>
    </>
  );
}

export default App;
