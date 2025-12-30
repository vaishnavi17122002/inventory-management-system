const express = require('express');
const productRoutes = require('./routes/product.routes');
const alertRoutes = require('./routes/alert.routes');

const app = express();

app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api', alertRoutes);

module.exports = app;
