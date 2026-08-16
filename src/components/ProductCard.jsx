function ProductCard({ product, setShoppingCart }) {
  function HandleChange() {}
  return (
    <div>
      <h3>{product.name}</h3>
      <img src={product.image} alt={product.name} />
      <p>Price: {product.price}</p>

      <button id={product.id} onClick={HandleChange}>
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
