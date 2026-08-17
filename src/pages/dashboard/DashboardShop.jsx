import { da, id } from "date-fns/locale";
import { use, useState } from "react";
import styles from "./DashboardShop.module.css";
const API_URL = import.meta.env.VITE_BASE_API_URL;

function DashboardShop({ products, setProducts }) {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
  });

  const [productCategory, setProductCategory] = useState("wines");

  const [editId, setEditId] = useState(null);

  const [price, setNewPrice] = useState("");

  function handleChange(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function addProduct(e) {
    e.preventDefault();

    const newProduct = {
      id: Date.now(),
      name: formData.name,
      price: Number(formData.price),
      image: formData.image,
    };

    const updatedProducts = {
      ...products,
      [productCategory]: [...products[productCategory], newProduct],
    };

    setProducts(updatedProducts);

    fetch(`${API_URL}/products`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProducts),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("PRODUCT ADDED:", data);
      });

    setFormData({
      name: "",
      price: "",
      image: "",
    });
  }

  function handleEdit(product) {
    setEditId(product.id);
    setNewPrice(product.price);
  }

  function handlePriceChange(e) {
    setNewPrice(e.target.value);
  }

  function handleSave(id, category) {
    const updatedProducts = {
      ...products,
      [category]: products[category].map((product) =>
        product.id === id
          ? {
              ...product,
              price: Number(price),
            }
          : product,
      ),
    };

    setProducts(updatedProducts);

    fetch(`${API_URL}/products`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProducts),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("UPDATED PRODUCTS:", data);
      });

    setEditId(null);
    setNewPrice("");
  }
  return (
    <div className={styles.dashboard}>
      <div className={styles.heading}>
        <h1>Shop Management</h1>
      </div>

      <section className={styles.addSection}>
        <h2>Add New Product</h2>

        <form className={styles.form} onSubmit={addProduct}>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Product name"
          />

          <input
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
          />

          <input
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Image Link"
          />

          <select
            value={productCategory}
            onChange={(e) => setProductCategory(e.target.value)}
          >
            <option value="wines">Wines</option>
            <option value="cheeses">Cheeses</option>
          </select>

          <button className={styles.addButton} type="submit">
            Add Product
          </button>
        </form>
      </section>
      <h2>Available Products</h2>

      <section className={styles.productSection}>
        <h2>Wines</h2>

        <div className={styles.productGrid}>
          {products.wines.map((wine) => (
            <div className={styles.productCard} key={wine.id}>
              <img
                className={styles.productImage}
                src={wine.image}
                alt={wine.name}
              />

              <div className={styles.productInfo}>
                <h3>{wine.name}</h3>

                {editId === wine.id ? (
                  <div className={styles.editArea}>
                    <input
                      className={styles.priceInput}
                      type="number"
                      value={price}
                      onChange={handlePriceChange}
                    />

                    <button
                      className={styles.saveButton}
                      onClick={() => handleSave(wine.id, "wines")}
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <>
                    <p className={styles.price}>Price:${wine.price}</p>

                    <button
                      className={styles.editButton}
                      onClick={() => handleEdit(wine)}
                    >
                      Edit
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.productSection}>
        <h2>Cheeses</h2>

        <div className={styles.productGrid}>
          {products.cheeses.map((cheese) => (
            <div className={styles.productCard} key={cheese.id}>
              <img
                className={styles.productImage}
                src={cheese.image}
                alt={cheese.name}
              />

              <div className={styles.productInfo}></div>
              <h3>{cheese.name}</h3>

              {editId === cheese.id ? (
                <div className={styles.editArea}>
                  <input
                    className={styles.priceInput}
                    type="number"
                    value={price}
                    onChange={handlePriceChange}
                  />

                  <button
                    className={styles.saveButton}
                    onClick={() => handleSave(cheese.id, "cheeses")}
                  >
                    Save
                  </button>
                </div>
              ) : (
                <>
                  <p className={styles.price}>Price:${cheese.price}</p>

                  <button
                    className={styles.editButton}
                    onClick={() => handleEdit(cheese)}
                  >
                    Edit
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default DashboardShop;
