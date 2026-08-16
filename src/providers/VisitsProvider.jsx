import {
  Children,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";

const VisitsContext = createContext(null);

function handleVisit(state, action) {
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
    fetch("http://localhost:3001/visits")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch visits: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => visitsDispatch({ type: "FETCH_SUCCESS", payload: data }))
      .catch((error) =>
        visitsDispatch({ type: "FETCH_SUCCESS", payload: error.message }),
      );
  }

  const value = { visitsState };
  return (
    <VisitsContext.Provider value={value}>{children}</VisitsContext.Provider>
  );
}

function useVisits() {
  const context = useContext(VisitsContext);
  if (contet === null || context === undefined) {
    throw new Error("Cannnot use Visit context outside of provider");
  }
  return context;
}

export { VisitsProvider, useVisits };
