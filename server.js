const express = require('express');
const app = express();
const port = 3000;

// Home page route
app.get('/', (req, res) => {
  res.send('<h1>Welcome to the Home Page</h1>');
});

// About page route
app.get('/about', (req, res) => {
  res.send('<h1>About Us</h1><p>This is the about page.</p>');
});

// Contact page route
app.get('/contact', (req, res) => {
  res.send('<h1>Contact Us</h1><p>This is the contact page.</p>');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});