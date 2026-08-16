function Cart({ shoppingCart }) {
  console.log("SHOPPINGCART:", shoppingCart);
  return (
    <div>
      <h2> Your Shopping Cart</h2>

      <ul>
        {shoppingCart.map((item) => (
          <li key={item.id}>
            <p>{item.name} is in your cart</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Cart;
