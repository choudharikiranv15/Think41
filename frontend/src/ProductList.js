import React, { useEffect, useState } from "react";
import {
  Tabs, Tab, Grid, Card, CardContent, Typography,
  CardActions, Button, CircularProgress, Box
} from "@mui/material";
import { Link } from "react-router-dom";

function ProductList() {
  const [departments, setDepartments] = useState([]);
  const [selectedTab, setSelectedTab] = useState("all");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 12;

  // Fetch Men/Women departments
  useEffect(() => {
    fetch("/api/departments")
      .then(res => res.json())
      .then(data => {
        const filtered = (data.departments || []).filter(
          dept => dept.name && (
            dept.name.trim().toLowerCase() === "men" ||
            dept.name.trim().toLowerCase() === "women"
          )
        );
        setDepartments(filtered);
      });
  }, []);

  // Reset to page 1 when changing tab
  useEffect(() => {
    setPage(1);
  }, [selectedTab]);

  // Fetch products for current tab/page
  useEffect(() => {
    setLoading(true);
    let url =
      selectedTab === "all"
        ? `/api/products?limit=${limit}&page=${page}`
        : `/api/departments/${selectedTab}/products?limit=${limit}&page=${page}`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        setProducts(Array.isArray(data.products) ? data.products : []);
        setTotalPages(data.pagination?.totalPages || 1);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [selectedTab, page]);

  return (
    <Box sx={{ padding: 4, maxWidth: 1200, margin: "0 auto" }}>
      <Tabs
        value={selectedTab}
        onChange={(_, val) => setSelectedTab(val)}
        indicatorColor="primary"
        textColor="primary"
        sx={{ marginBottom: 3 }}
      >
        <Tab label="All Departments" value="all" />
        {departments.map(dept => (
          <Tab key={dept.id} label={dept.name} value={String(dept.id)} />
        ))}
      </Tabs>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
          <CircularProgress />
        </Box>
      ) : products.length === 0 ? (
        <Typography variant="body1">No products found for this department.</Typography>
      ) : (
        <Grid container spacing={3}>
          {products.map(product => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card sx={{ width: 320, margin: "0 auto" }}>
                <CardContent>
                  <Typography variant="h6">{product.name}</Typography>
                  <Typography color="text.secondary">Brand: {product.brand}</Typography>
                  <Typography>Price: ${product.retail_price}</Typography>
                  <Typography>Department: {product.department_name}</Typography>
                </CardContent>
                <CardActions>
                  <Button
                    component={Link}
                    to={`/product/${product.id}`}
                    variant="contained"
                  >
                    View Details
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Pagination controls */}
      {!loading && products.length > 0 && (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: 4 }}>
          <Button
            variant="contained"
            onClick={() => setPage(p => Math.max(p - 1, 1))}
            disabled={page <= 1}
            sx={{ mx: 2 }}
          >
            Previous
          </Button>
          <Typography component="span" sx={{ mx: 2 }}>
            Page {page} of {totalPages}
          </Typography>
          <Button
            variant="contained"
            onClick={() => setPage(p => Math.min(p + 1, totalPages))}
            disabled={page >= totalPages}
            sx={{ mx: 2 }}
          >
            Next
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default ProductList;
