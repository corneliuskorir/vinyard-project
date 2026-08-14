import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

import "./App.css";

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes></Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
