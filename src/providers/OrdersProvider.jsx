import { type } from "@testing-library/user-event/dist/cjs/utility/index.js";
import { createContext, useContext, useEffect, useReducer } from "react";
import { data } from "react-router-dom";

const API_URL = import.meta.env.VITE_BASE_API_URL;

const OrdersContext = createContext(null);

function handleOrders(state, action) {
  switch (action.type) {
    case "FETCH_INIT":
      return {
        ...state,
        loading: true,
        error: null,
      };

    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload,
      };

    case "FETCH_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}

function OrdersProvider({ children }) {
  const [ordersState, ordersDispatch] = useReducer(handleOrders, {
    error: null,
    loading: true,
    data: [],
  });

  useEffect(() => {
    getOrders();
  }, []);

  function getOrders() {
    fetch(`${API_URL}/orders`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch orders: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        ordersDispatch({
          type: "FETCH_SUCCESS",
          payload: data,
        });
      })
      .catch((error) => {
        ordersDispatch({
          type: "FETCH_ERROR",
          payload: error.message,
        });
      });
  }

  function addOrder(order) {
    ordersDispatch({
      type: "FETCH_INIT",
    });

    return fetch(`${API_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to add new order: ${response.status}`);
        }

        return response.json();
      })

      .then((data) => {
        ordersDispatch({
          type: "FETCH_SUCCESS",
          payload: [...ordersState.data, data],
        });

        return data;
      })

      .catch((error) => {
        ordersDispatch({
          type: "FETCH_ERROR",
          payload: error.message,
        });

        throw error;
      });
  }

  const value = {
    ordersState,
    addOrder,
  };

  return (
    <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>
  );
}

function useOrders() {
  const context = useContext(OrdersContext);

  if (context === null || context === undefined) {
    throw new Error("Cannot use Orders Context outside of Provider ");
  }

  return context;
}

export { OrdersProvider, useOrders };
