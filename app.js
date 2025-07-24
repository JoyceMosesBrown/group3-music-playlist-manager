const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Built-in middleware
app.use(express.json());

// API routes
app.use('/api/auth', authRoutes);

// Generic error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong.' });
});

module.exports = app;