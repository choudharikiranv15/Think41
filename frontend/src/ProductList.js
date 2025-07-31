// src/ProductList.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Grid, Card, CardContent, Typography, CardActions, Button, CircularProgress
} from '@mui/material';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 20;

  useEffect(() => {
    setLoading(true);
    fetch(`/api/products?limit=${limit}&page=${page}`)
      .then(res => res.json())
      .then(data => {
        setProducts(data.products || []);
        setTotalPages(data.pagination ? data.pagination.totalPages : 1);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [page]);

  if (loading) return <div style={{ display:"flex", justifyContent:"center" }}><CircularProgress /></div>;
  if (products.length === 0) return <Typography>No products found.</Typography>;

  return (
    <div style={{ padding: 32, maxWidth: 1200, margin: "0 auto" }}>
      <Typography variant="h4" gutterBottom>Product List</Typography>
      <Grid container spacing={3}>
        {products.map(product => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card elevation={4} sx={{ width: 320, margin: "0 auto" }}>
              <CardContent>
                <Typography variant="h6" component="div" gutterBottom>
                  {product.name}
                </Typography>
                <Typography color="text.secondary">Brand: {product.brand}</Typography>
                <Typography>Price: ${product.retail_price}</Typography>
                <Typography>Department: {product.department_name}</Typography>
              </CardContent>
              <CardActions>
                <Button component={Link} to={`/product/${product.id}`} size="small" variant="contained" color="primary">
                  View Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <div style={{ marginTop: 32, textAlign: "center" }}>
        <Button
          variant="contained"
          onClick={() => setPage(p => Math.max(p - 1, 1))}
          disabled={page <= 1}
          sx={{ marginRight: 2 }}
        >
          Previous
        </Button>
        <Typography component="span" sx={{ marginX: 2 }}>
          Page {page} of {totalPages}
        </Typography>
        <Button
          variant="contained"
          onClick={() => setPage(p => Math.min(p + 1, totalPages))}
          disabled={page >= totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default ProductList;
