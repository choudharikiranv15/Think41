const express = require('express');
const cors = require('cors');
const path = require('path');

// Import routers
const uploadRouter = require('./routes/upload');
const productsRouter = require('./routes/products');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API routes first
app.use('/api', uploadRouter);
app.use('/api', productsRouter);

// Serve React static files from the frontend/build folder
app.use(express.static(path.join(__dirname, 'frontend', 'build')));

// For any route not starting with /api, serve index.html from React build
app.get('*', (req, res) => {
  if (!req.originalUrl.startsWith('/api')) {
    res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
  }
  // For /api routes, let the previous handlers work!
});
const departmentsRouter = require('./routes/departments');
app.use('/api', departmentsRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
