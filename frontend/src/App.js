// src/App.js
import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductList from "./ProductList"; 
import ProductDetail from "./ProductDetail";
import { AppBar, Toolbar, Typography, Container } from "@mui/material";

function App() {
  return (
    <BrowserRouter>
      {/* App bar at the top */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            My Product Catalog
          </Typography>
        </Toolbar>
      </AppBar>
      {/* Main content area */}
      <Container style={{ marginTop: 32 }}>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
