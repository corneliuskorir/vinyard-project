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
import EventForm from "./pages/dashboard/EventForm";
import About from "./pages/About";
import Shop from "./pages/Shop";

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
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="about" element={<About />} />
          <Route
            path="/shop"
            element={
              <Shop products={products} setShoppingCart={setShoppingCart} />
            }
          />
        </Route>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardSummary />} />
          <Route path="Shop" element={<DashboardShop />}></Route>
          <Route path="visits" element={<DashboardVisits />}></Route>
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
