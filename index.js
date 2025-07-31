// index.js
const express = require('express');
const cors = require('cors');
const uploadRouter = require('./routes/upload');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', uploadRouter);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

const productsRouter = require('./routes/products');
app.use('/api', productsRouter);
