import { useState } from "react";
import ProductList from "../components/ProductList";
import Cart from "../components/Cart";
import { Link } from "react-router-dom";
import styles from "./Shop.module.css";
import CartIcon from "../assets/CartIcon.svg";

function Shop({ products, setShoppingCart, shoppingCart }) {
  const [category, setCategory] = useState("all");

  console.log("CATEGORY:", category);

  return (
    <>
      <div className={styles.shopHeader}>
        <h1>Suncrest Valley Store</h1>
        <p>
          Welcome, Please Browse Our Catalog and Shop to Your Heart's Desire
        </p>
      </div>

      <h2>Available Products</h2>

      <div className={styles.shopControls}>
        <div className={styles.category}>
          <label>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Wines">Wines</option>
            <option value="Cheeses">Cheeses</option>
          </select>
        </div>

        <Link to="/cart" className={styles.cartLink}>
          <img src={CartIcon} alt="shopping Cart" />
          Cart ({shoppingCart.length})
        </Link>
      </div>

      <ProductList
        products={products}
        category={category}
        setShoppingCart={setShoppingCart}
        shoppingCart={shoppingCart}
      />

      {/**<Cart shoppingCart={shoppingCart} setShoppingCart={setShoppingCart} /> */}
    </>
  );
}

export default Shop;
