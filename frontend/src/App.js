// src/App.js
import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductList from "./ProductList"; 
import ProductDetail from "./ProductDetail"; // Make sure your file is named ProductDetail.js

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
