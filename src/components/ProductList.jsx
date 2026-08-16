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
      <h2>Available Products</h2>

      {ProductsToDisplay.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          setShoppingCart={setShoppingCart}
        />
      ))}
    </>
  );
}

export default ProductList;
