import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function useFormData({ defaultData, focusRef, errorObj }) {
  const [formError, setFormError] = useState(errorObj);
  const [formData, setFormData] = useState(defaultData);

  function handleFormChange({ name, input }) {
    setFormData((prev) => ({ ...prev, [name]: input }));
    /*     console.log(formData);
     */ setFormError(errorObj);
  }

  useEffect(() => {
    focusRef.current.focus();
  }, []);

  return [formError, setFormError, formData, handleFormChange, setFormData];
}

export default useFormData;
