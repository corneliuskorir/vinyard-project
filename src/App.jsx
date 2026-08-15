import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import DashboardSummary from "./pages/dashboard/DashboardSummary";
import DashboardShop from "./pages/dashboard/DashboardShop";
import DashboardEvents from "./pages/dashboard/DashboardEvents";
import DashboardVisits from "./pages/dashboard/DashboardVisits";
import DashboardEventsList from "./pages/dashboard/DashboardEventsList";
import EventForm from "./pages/dashboard/EventForm";

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
