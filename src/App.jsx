import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";
import Shop from "./pages/Shop";
import Cart from "./components/Cart";

import "./App.css";

function App() {
  const [products, setProducts] = useState({
    wines: [],
    cheeses: [],
  });

  const [shoppingCart, setShoppingCart] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/store/")
      .then((response) => response.json())
      .then((data) => {
        console.log("GET DATA:", data.products);

        setProducts(data.products);
      });
  }, []);
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/shop"
            element={
              <Shop
                products={products}
                setShoppingCart={setShoppingCart}
                shoppingCart={shoppingCart}
              />
            }
          />
          <Route
            path="cart"
            element={
              <Cart
                shoppingCart={shoppingCart}
                setShoppingCart={setShoppingCart}
              />
            }
          />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
