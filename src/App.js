 import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products")
      .then(response => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError("Failed to load products. Please try again.");
        setLoading(false);
      });
  }, []);

  if (loading) return <h3>Loading products...</h3>;
  if (error) return <h3>{error}</h3>;

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Product Listing</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
        {products.map(product => (
          <div key={product.id} style={{ border: "1px solid #ddd", padding: "10px", borderRadius: "10px" }}>
            <img src={product.image} alt={product.title} width="150" height="150" />
            <h3>{product.title}</h3>
            <p><strong>Price: </strong>${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
