import { createContext, useContext, useEffect, useReducer } from "react";
import { data } from "react-router-dom";
const API_URL = import.meta.env.VITE_BASE_API_URL;

const VisitsContext = createContext(null);

function handleVisit(state, action) {
  switch (action.type) {
    case "FETCH_INIT":
      return { ...state, loading: action.payload };
      break;

    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
      break;

    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.payload };
      break;

    default:
      break;
  }
}

function VisitsProvider({ children }) {
  const [visitsState, visitsDispatch] = useReducer(handleVisit, {
    error: null,
    loading: true,
    data: null,
  });

  useEffect(() => {
    getVisits();
  }, []);

  function getVisits() {
    fetch(`${API_URL}/visits`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch visits: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => visitsDispatch({ type: "FETCH_SUCCESS", payload: data }))
      .catch((error) =>
        visitsDispatch({ type: "FETCH_ERROR", payload: error.message }),
      );
  }

  function addVisit(visit) {
    visitsDispatch({ type: "FETCH_INIT", payload: true });
    fetch(`${API_URL}/visits`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(visit),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to add new visit: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        visitsDispatch({
          type: "FETCH_SUCCESS",
          payload: [...visitsState, data],
        });
      })
      .catch((error) =>
        visitsDispatch({ type: "FETCH_ERROR", payload: error.message }),
      );
  }

  function deleteVisit(id) {
    visitsDispatch({ type: "FETCH_INIT", payload: true });
    fetch(`${API_URL}/visits/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to delete visit: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        visitsDispatch({
          type: "FETCH_SUCCESS",
          payload: visitsState.data.filter((item) => item.id !== id),
        });
      })
      .catch((error) =>
        visitsDispatch({ type: "FETCH_ERROR", payload: error.message }),
      );
  }

  const value = { visitsState, addVisit, deleteVisit };
  return (
    <VisitsContext.Provider value={value}>{children}</VisitsContext.Provider>
  );
}

function useVisits() {
  const context = useContext(VisitsContext);
  if (context === null || context === undefined) {
    throw new Error("Cannnot use Visit context outside of provider");
  }
  return context;
}

export { VisitsProvider, useVisits };
