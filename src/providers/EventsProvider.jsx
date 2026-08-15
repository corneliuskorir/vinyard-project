import { type } from "@testing-library/user-event/dist/cjs/utility/type.js";
import { createContext, useContext, useEffect, useReducer } from "react";
import { data } from "react-router-dom";

const EventsContext = createContext(null);

function handleEventRequest(state, action) {
  switch (action.type) {
    case "FETCH_INIT":
      return { ...state, loading: action.payload };
      break;

    case "FETCH_SUCCESS":
      return { ...state, loading: false, data: action.payload };
      break;

    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.payload };
      break;

    default:
      break;
  }
}

function EventsProvider({ children }) {
  const [eventState, eventsDispatch] = useReducer(handleEventRequest, {
    error: null,
    loading: true,
    data: null,
  });
  // get inital events, visits and shop data.
  useEffect(() => {
    fetch("http://localhost:3001/events")
      .then((res) => {
        eventsDispatch({ type: "FETCH_INIT", payload: true });
        if (!res.ok) {
          throw new Error(`Failed to fetch events: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => eventsDispatch({ type: "FETCH_SUCCESS", payload: data }))
      .catch((error) =>
        eventsDispatch({ type: "FETCH_ERROR", payload: error.message }),
      );
  }, []);

  const value = { eventState };
  return (
    <EventsContext.Provider value={value}>{children}</EventsContext.Provider>
  );
}

function useEvents() {
  const context = useContext(EventsContext);
  if (context === null || context === undefined) {
    throw new Error("Dashboard context cannot be used outside the dashboard");
  }
  return context;
}

export { EventsProvider, useEvents };
