// src/ProductList.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 20; // items per page

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:3000/api/products?limit=${limit}&page=${page}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setTotalPages(data.pagination.totalPages);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [page]);

  if (loading) return <div>Loading products...</div>;

  if (products.length === 0) return <div>No products found.</div>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Product List</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              width: "250px",
              borderRadius: "6px",
              backgroundColor: "white",
            }}
          >
            <h4>
              <Link to={`/product/${product.id}`}>{product.name}</Link>
            </h4>
            <div>
              <b>Brand:</b> {product.brand}
            </div>
            <div>
              <b>Retail Price:</b> ${product.retail_price}
            </div>
            <div>
              <b>Department:</b> {product.department}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div style={{ marginTop: 20 }}>
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page <= 1}
          style={{ marginRight: 10 }}
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page >= totalPages}
          style={{ marginLeft: 10 }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ProductList;
