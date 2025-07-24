// server.js

// Import necessary modules
const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Serve the static files from the React app's 'build' directory
app.use(express.static(path.join(__dirname, 'build')));

// Any API routes should go BEFORE the catch-all route.
// This server does not have any API routes.

// For any other request, send back the React app's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});