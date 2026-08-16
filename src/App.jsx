import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./pages/MainLayout";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import DashboardSummary from "./pages/dashboard/DashboardSummary";
import DashboardShop from "./pages/dashboard/DashboardShop";
import DashboardVisits from "./pages/dashboard/DashboardVisits";
import DashboardEvents from "./pages/dashboard/DashboardEvents";
import DashboardEventsList from "./pages/dashboard/DashboardEventsList";
import EventForm from "./components/EventForm";
import About from "./pages/About";
import Shop from "./pages/Shop";
import Cart from "./components/Cart";

import "./App.css";
import BookVisitForm from "./components/BookVisitForm";
import VisitsList from "./pages/dashboard/VisitsList";
import Events from "./pages/Events";
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
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="about" element={<About />} />
          <Route path="events" element={<Events />} />
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
          <Route path="/book-visit" element={<BookVisitForm />} />
        </Route>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardSummary />} />
          <Route path="Shop" element={<DashboardShop />}></Route>
          <Route path="visits" element={<DashboardVisits />}>
            <Route index element={<VisitsList />} />
          </Route>
          <Route path="events" element={<DashboardEvents />}>
            <Route index element={<DashboardEventsList />} />
            <Route path="new" element={<EventForm />} />
            <Route path=":eventId" element={<EventForm />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
