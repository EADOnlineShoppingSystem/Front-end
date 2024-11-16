import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Components/HomePage/HomePage"
import ProductCategories from "./Components/ProductCategories/Categories"
import Orders from "./Components/Orders/Orders"
import Review from "./Components/Orders/Review"
import Address from "./Components/Orders/Address";
import Wishlist from "./Components/Orders/Wishlist";
import Cart from "./Components/Orders/Cart";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/categories" element={<ProductCategories />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/review/:id" element={<Review />} />
          <Route path="/address" element={<Address />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
