// src/ProductDetail.js
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Paper, Typography, Divider, CircularProgress, Button } from "@mui/material";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data.product);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <div style={{ display:"flex", justifyContent:"center" }}><CircularProgress /></div>;
  if (!product) return <Typography>Product not found</Typography>;

  return (
    <div style={{ maxWidth: 600, margin: "32px auto", padding: "0 16px" }}>
      <Button variant="text" component={Link} to="/">← Back to Products</Button>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h5" gutterBottom>{product.name}</Typography>
        <Divider sx={{ marginBottom: 2 }} />
        <Typography><b>Brand:</b> {product.brand}</Typography>
        <Typography><b>Category:</b> {product.category}</Typography>
        <Typography><b>Retail Price:</b> ${product.retail_price}</Typography>
        <Typography><b>Cost:</b> ${product.cost}</Typography>
        <Typography><b>Department:</b> {product.department_name}</Typography>
        <Typography><b>SKU:</b> {product.sku}</Typography>
        <Typography><b>Distribution Center ID:</b> {product.distribution_center_id}</Typography>
      </Paper>
    </div>
  );
}

export default ProductDetail;
