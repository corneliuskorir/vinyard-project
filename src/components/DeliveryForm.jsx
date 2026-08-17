import "../components/DeliveryForm.css";
import FormInput from "../components/FormInput";
import useFormData from "../hooks/useFormData";

import { useRef, useState } from "react";

import { useOrders } from "../providers/OrdersProvider";

function DeliveryForm({ shoppingCart, setShoppingCart }) {
  const { ordersState, addOrder } = useOrders();
  const { loading } = ordersState;

  const nameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const addressRef = useRef();
  const notesRef = useRef();
  const successRef = useRef();

  const [showSuccess, setShowSuccess] = useState(false);

  const total = shoppingCart.reduce((sum, product) => sum + product.price, 0);

  const defaultData = {
    name: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
  };
  const errorObj = {
    name: false,
    email: false,
    phone: false,
    address: false,
    notes: false,
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
    if (!validateEmail(formData.email)) {
      setFormError((prev) => ({ ...prev, email: true }));
      return;
    }

    const order = {
      items: shoppingCart,
      total: total,
      customer: formData,
    };

    addOrder(order)
      .then(() => {
        setFormData(defaultData);
        setShoppingCart([]);
        setShowSuccess(true);

        successRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });

        setTimeout(() => {
          setShowSuccess(false);
        }, 5000);
      })
      .catch((error) => {
        console.error("Failed to create order", error);
      });
  }

  return loading ? (
    <div>Working on it...</div>
  ) : (
    <form className="delivery-form" onSubmit={handleSubmit}>
      <h2>Delivery Details</h2>
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
        lable="Phone"
        name="phone"
        placeholder="Enter your phone number"
        value={formData.phone}
        onChange={handleFormChange}
        error={formError.phone}
        inputRef={phoneRef}
      />
      <FormInput
        lable="Address"
        name="address"
        placeholder="Enter your delivery address"
        value={formData.address}
        onChange={handleFormChange}
        error={formError.address}
        inputRef={addressRef}
      />
      <FormInput
        lable="Notes"
        name="notes"
        placeholder="Any special delivery instructions"
        value={formData.notes}
        onChange={handleFormChange}
        error={formError.notes}
        inputRef={notesRef}
      />
      <button type="submit" className="submit-btn">
        Submit
      </button>

      {showSuccess && (
        <div className="success" ref={successRef}>
          <p>Your order has been confirmed</p>
          <p>Our team will contact you shortly to confirm your order.</p>
        </div>
      )}
    </form>
  );
}

export default DeliveryForm;
