import styles from "./ProductCard.module.css";

function ProductCard({ product, setShoppingCart, shoppingCart }) {
  function HandleChange(e) {
    setShoppingCart((prev) => [...prev, product]);
  }

  return (
    <div className={styles.card}>
      <img className={styles.image} src={product.image} alt={product.name} />

      <div className={styles.content}>
        <h3 className={styles.name}>{product.name}</h3>
        <p className={styles.price}>Price:${product.price}</p>

        <button
          className={styles.button}
          id={product.id}
          onClick={HandleChange}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
