import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Components/HomePage/HomePage";
import SingleProduct from "./Pages/SingleProduct";
import Checkout from "./Pages/Checkout";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="checkout" element={<Checkout />} />

          <Route path="product/:id" element={<SingleProduct />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
