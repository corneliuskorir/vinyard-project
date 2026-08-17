import { useState } from "react";
import { it } from "vitest";
import Styles from "./Cart.module.css";
const API_URL = import.meta.env.VITE_BASE_API_URL;

function Cart({ shoppingCart, setShoppingCart }) {
  console.log("SHOPPINGCART:", shoppingCart);

  const total = shoppingCart.reduce((sum, product) => sum + product.price, 0);

  const [orderConfirmed, setOrderConfirmed] = useState(false);

  function handleCheckOut() {
    const order = {
      items: shoppingCart,
      total: total,
    };

    fetch(`${API_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Server Error:, ${response.status}`);
        }

        return response.json();
      })
      .then((data) => {
        console.log("ORDER CREATED:", data);

        setShoppingCart([]);
        setOrderConfirmed(true);
      });
  }

  if (orderConfirmed) {
    return (
      <div className={Styles.cart}>
        <div className={Styles.empty}>
          <h2>Order Confirmed !!</h2>
          <p>Thank you for your Purchase</p>
          <p>Your order has been successfully placed</p>
        </div>
      </div>
    );
  }

  return (
    <div className={Styles.cart}>
      <h1 className={Styles.title}> Your Shopping Cart</h1>

      {shoppingCart.length === 0 ? (
        <p className={Styles.empty}>Your cart is empty</p>
      ) : (
        <>
          <div className={Styles.items}>
            {shoppingCart.map((item) => (
              <div className={Styles.item} key={item.id}>
                <div>
                  <h3 className={Styles.itemName}>{item.name}</h3>
                  <p className={Styles.itemPrice}>{item.price}</p>
                </div>
              </div>
            ))}
          </div>

          <div className={Styles.summary}>
            <p className={Styles.total}>Total: ${total}</p>

            <button className={Styles.checkoutButton} onClick={handleCheckOut}>
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
