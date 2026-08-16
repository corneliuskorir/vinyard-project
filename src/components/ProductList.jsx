import styles from "./ProductList.module.css";
import ProductCard from "./ProductCard";

function ProductList({ category, products, setShoppingCart }) {
  let ProductsToDisplay;

  if (category === "Wines") {
    ProductsToDisplay = products.wines;
  } else if (category === "Cheeses") {
    ProductsToDisplay = products.cheeses;
  } else {
    ProductsToDisplay = [...products.wines, ...products.cheeses];
  }
  console.log("PRODUCTSTODISPLAY:", ProductsToDisplay);
  return (
    <>
      <div className={styles.grid}>
        {ProductsToDisplay.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            setShoppingCart={setShoppingCart}
          />
        ))}
      </div>
    </>
  );
}

export default ProductList;
