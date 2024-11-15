import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Components/HomePage/HomePage"
import ProductCategories from "./Components/ProductCategories/Categories"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/categories" element={<ProductCategories />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
