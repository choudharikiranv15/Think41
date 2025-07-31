// src/ProductDetail.js
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`http://localhost:3000/api/products/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setProduct(data.product);
        setLoading(false);
      })
      .catch((error) => {
        setError("Product not found or error fetching product.");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading product...</div>;
  if (error) return (
    <div>
      <p>{error}</p>
      <Link to="/">← Back to Products</Link>
    </div>
  );

  return (
    <div style={{ padding: 20 }}>
      <Link to="/">← Back to Products</Link>
      <h2>{product.name}</h2>
      <div><b>Brand:</b> {product.brand}</div>
      <div><b>Category:</b> {product.category}</div>
      <div><b>Retail Price:</b> ${product.retail_price}</div>
      <div><b>Cost:</b> ${product.cost}</div>
      <div><b>Department:</b> {product.department}</div>
      <div><b>SKU:</b> {product.sku}</div>
      <div><b>Distribution Center ID:</b> {product.distribution_center_id}</div>
    </div>
  );
}

export default ProductDetail;
