import { createContext, useContext, useEffect, useReducer } from "react";
import { EventsProvider } from "./EventsProvider";
import { VisitsProvider } from "./VisitsProvider";

const DashboardContext = createContext(null);

function DashboardProvider({ children }) {
  // get inital events, visits and shop data.

  const value = {};
  return (
    <DashboardContext.Provider value={value}>
      <VisitsProvider>
        <EventsProvider>{children}</EventsProvider>
      </VisitsProvider>
    </DashboardContext.Provider>
  );
}

function useDasboardContext() {
  const context = useContext(DashboardContext);
  if (context === null || context === undefined) {
    throw new Error("Dashboard context cannot be used outside the dashboard");
  }
}

export { DashboardProvider, useDasboardContext };
