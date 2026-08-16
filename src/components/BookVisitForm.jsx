import "../components/BookVisitForm.css";
import FormInput from "../components/FormInput";
import useFormData from "../hooks/useFormData";

import { useEffect, useRef, useState } from "react";
import { useVisits } from "../providers/VisitsProvider";

function BookVisitForm() {
  const nameRef = useRef();
  const emailRef = useRef();
  const dateRef = useRef();
  const messageRef = useRef();
  const successRef = useRef();

  const [showSuccess, setShowSuccess] = useState(false);

  const { visitsState, addVisit } = useVisits();

  const { loading, error } = visitsState;

  const defaultData = {
    name: "",
    email: "",
    date: "",
    message: "",
  };
  const errorObj = {
    name: false,
    email: false,
    date: false,
    message: false,
  };

  const [formError, setFormError, formData, handleFormChange, setFormData] =
    useFormData({
      defaultData: defaultData,
      focusRef: nameRef,
      errorObj: errorObj,
    });

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  function handleSubmit(e) {
    e.preventDefault();
    for (const key in formData) {
      if (!Object.hasOwn(formData, key)) continue;
      const element = formData[key].trim();
      if (!element) {
        console.log(`${key} is empty`);
        setFormError((prev) => ({ ...prev, [key]: true }));
        return;
      }
    }
    addVisit(formData);
    if (!error || !loading) {
      setFormData(defaultData);
      setShowSuccess(true);
      successRef.current.scrollIntoView({
        behaviour: "smooth",
        block: "end",
      });
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    }
  }

  return loading ? (
    <div>Working on it...</div>
  ) : (
    <form className="book-visit-form" onSubmit={handleSubmit}>
      <h2>Book a Visit</h2>
      <FormInput
        lable="Name"
        name="name"
        placeholder="Enter your full name"
        value={formData.name}
        onChange={handleFormChange}
        error={formError.name}
        inputRef={nameRef}
      />
      <FormInput
        lable="Email"
        name="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleFormChange}
        error={formError.email}
        inputRef={emailRef}
      />
      <FormInput
        lable="Date"
        name="date"
        placeholder="Select a date"
        value={formData.date}
        onChange={handleFormChange}
        error={formError.date}
        inputRef={dateRef}
      />
      <FormInput
        lable="Message"
        name="message"
        placeholder="Tell us about your visit"
        value={formData.message}
        onChange={handleFormChange}
        error={formError.message}
        inputRef={messageRef}
      />
      <button type="submit" className="submit-btn">
        Submit
      </button>

      {showSuccess && (
        <div className="success" ref={successRef}>
          <p>Thank you for booking a visit with us.</p>
          <p>
            An agent of fine taste will contact you shorty to confirm your
            appointment
          </p>
          <p>See you soon</p>
        </div>
      )}
    </form>
  );
}

export default BookVisitForm;
