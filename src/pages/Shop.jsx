import { useState } from "react";
import ProductList from "../components/ProductList";

function Shop({ products, setShoppingCart }) {
  const [category, setCategory] = useState("all");

  console.log("CATEGORY:", category);

  return (
    <div>
      <h1>Suncrest Valley Store</h1>

      <p>Welcome, Please Browse Our Catalog and Shop to Your Heart's Desire</p>

      <label>Category</label>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="All">All</option>
        <option value="Wines">Wines</option>
        <option value="Cheeses">Cheeses</option>
      </select>

      <ProductList
        products={products}
        category={category}
        setShoppingCart={setShoppingCart}
      />
    </div>
  );
}

export default Shop;
