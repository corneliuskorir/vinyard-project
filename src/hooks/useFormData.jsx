import { useEffect, useState } from "react";

function useFormData({ defaultData, focusRef, errorObj }) {
  const [error, setError] = useState(errorObj);
  const [formData, setFormData] = useState(defaultData);

  function handleFormChange({ name, input }) {
    setFormData((prev) => ({ ...prev, [name]: input }));
    console.log(formData);
  }

  useEffect(() => {
    focusRef.current.focus();
  }, []);

  return { error, formData, handleFormChange };
}

export default useFormData;
