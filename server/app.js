const express = require('express');
const bodyParser = require('body-parser');
const loginRoute = require('./routes/routing');
const path = require('path');
const connectDB = require('./database/database');
require('dotenv').config();

const app = express();

// JSON parsers
app.use(express.json());
app.use(bodyParser.json());

// API routes
app.use('/', loginRoute);

// Serve static files
app.use(express.static(path.join(__dirname, '../build')));

// Handle client-side routing

const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.error('Database connection failed:', error);
  }
};

start();