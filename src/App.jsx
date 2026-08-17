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

import { AuthProvider } from "./providers/AuthProvider";
import Authentication from "./pages/Authentication";
import UserManagement from "./pages/dashboard/UserManagement";

import { OrdersProvider } from "./providers/OrdersProvider";
import DeliveryForm from "./components/DeliveryForm";
import DashboardOrders from "./pages/dashboard/DashboardOrders";

const API_URL = import.meta.env.VITE_BASE_API_URL;
function App() {
  const [products, setProducts] = useState({
    wines: [],
    cheeses: [],
  });

  const [shoppingCart, setShoppingCart] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/products/`)
      .then((response) => response.json())
      .then((data) => {
        console.log("GET DATA:", data);

        setProducts(data);
      });
  }, []);
  return (
    <AuthProvider>
      <BrowserRouter>
        <OrdersProvider>
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

              <Route
                path="delivery"
                element={
                  <DeliveryForm
                    shoppingCart={shoppingCart}
                    setShoppingCart={setShoppingCart}
                  />
                }
              />

              <Route path="/book-visit" element={<BookVisitForm />} />
            </Route>
            <Route path="/authenticate" element={<Authentication />} />

            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<DashboardSummary />} />
              <Route
                path="Shop"
                element={
                  <DashboardShop
                    products={products}
                    setProducts={setProducts}
                  />
                }
              />

              <Route path="orders" element={<DashboardOrders />} />

              <Route path="visits" element={<DashboardVisits />}>
                <Route index element={<VisitsList />} />
              </Route>
              <Route path="events" element={<DashboardEvents />}>
                <Route index element={<DashboardEventsList />} />
                <Route path="new" element={<EventForm />} />
                <Route path=":eventId" element={<EventForm />} />
              </Route>

              <Route path="users" element={<UserManagement />}></Route>
            </Route>
          </Routes>
        </OrdersProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
