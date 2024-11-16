import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Components/HomePage/HomePage"
import ProductCategories from "./Components/ProductCategories/Categories"
import Orders from "./Components/Orders/Orders"
import Review from "./Components/Orders/Review"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/categories" element={<ProductCategories />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/review/:id" element={<Review />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
