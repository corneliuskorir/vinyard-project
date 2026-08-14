import { useState } from "react";

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import DashboardSummary from "./pages/dashboard/DashboardSummary";
import DashboardShop from "./pages/dashboard/DashboardShop";
import DashboardEvents from "./pages/dashboard/DashboardEvents";
import DashboardVisits from "./pages/dashboard/DashboardVisits";
import DashboardEventsList from "./pages/dashboard/DashboardEventsList";
import NewEvent from "./pages/dashboard/NewEvent";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardSummary />} />
            <Route path="Shop" element={<DashboardShop />}></Route>
            <Route path="visits" element={<DashboardVisits />}></Route>
            <Route path="events" element={<DashboardEvents />}>
              <Route index element={<DashboardEventsList />} />
              <Route path="new" element={<NewEvent />} />
              <Route path=":eventId" element={<NewEvent />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
