import { useEffect, useState } from "react";

function useFetchData(request) {
  const [res, setRes] = useState({
    loading: true,
    data: null,
    error: null,
  });
  useEffect(() => {
    fetch(request.url, request.info)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to retrieve data: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setRes((prev) => ({ ...prev, loading: false, data: data }));
      })
      .then((e) => {
        console.log(e);
        setRes((prev) => ({ ...prev, loading: false, error: e.message }));
      });
  }, [request]);

  return res;
}

export default useFetchData;
