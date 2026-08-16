import "../components/BookVisitForm.css";
import FormInput from "../components/FormInput";
import { useState } from "react";

function BookVisitForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    date: false,
    message: false,
  });

  function handleChange({ name, input }) {
    setFormData((prev) => ({ ...prev, [name]: input }));
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  function handleSubmit(e) {
    e.preventDefault();
    let newErrors = {
      name: formData.name.trim() === "",
      email: !validateEmail(formData.email),
      date: formData.date.trim() === "",
      message: formData.message.trim() === "",
    };

    setErrors(newErrors);

    if (Object.values(newErrors).every((error) => !error)) {
      // Submit the form or perform desired action
      console.log("Form submitted successfully", formData);
      alert("Thank you for booking a visit! We’ll get back to you soon.");
    }
  }

  return (
    <form className="book-visit-form" onSubmit={handleSubmit}>
      <h2>Book a Visit</h2>
      <FormInput
        lable="Name"
        name="name"
        placeholder="Enter your full name"
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
      />
      <FormInput
        lable="Email"
        name="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
      />
      <FormInput
        lable="Date"
        name="date"
        placeholder="Select a date"
        value={formData.date}
        onChange={handleChange}
        error={errors.date}
      />
      <FormInput
        lable="Description"
        name="message"
        placeholder="Tell us about your visit"
        value={formData.message}
        onChange={handleChange}
        error={errors.message}
      />
      <button type="submit" className="submit-btn">
        Submit
      </button>
    </form>
  );
}

export default BookVisitForm;
