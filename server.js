const express = require('express');
const app = express();
const port = 3000;

// Importing the model to generate random Pokemon names
const { getRandomPokemon, addPokemon } = require('./model/randomPokemon');

let userName = 'Guest';

// Middleware to parse JSON bodies
app.use(express.json());

// Add middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Middleware to include the user name in all pages
app.use((req, res, next) => {
  res.locals.userName = userName;
  next();
});

// Update the home page route to include a script for dynamically updating the trainer name
app.get('/', (req, res) => {
  res.send(`
    <h1>Welcome to the Home Page</h1>
    <div id="user-name">Welcome, ${res.locals.userName}!</div>
    <form id="set-name-form" action="/set-name" method="POST">
      <input type="text" name="name" placeholder="Enter your name" value="${res.locals.userName}" required />
      <button type="submit">Set Name</button>
    </form>
    <button onclick="fetch('/random-name').then(res => res.text()).then(alert)">Get Random Name</button>
    <nav>
      <a href="/about">About</a> |
      <a href="/contact">Contact</a>
    </nav>
    <script>
      document.getElementById('set-name-form').addEventListener('submit', async function(event) {
        event.preventDefault();
        const formData = new FormData(this);
        const response = await fetch('/set-name', {
          method: 'POST',
          body: formData
        });
        if (response.redirected) {
          const newName = formData.get('name');
          document.getElementById('user-name').textContent = 'Welcome ${newName}!';
        }
      });
    </script>
  `);
});

// About page route
app.get('/about', (req, res) => {
  res.send(`
    <h1>About Us</h1>
    <p>This is the about page.</p>
    <button onclick="fetch('/random-pokemon').then(res => res.text()).then(alert)">Get Random Pokemon</button>
    <form action="/add-pokemon" method="POST">
      <input type="text" name="pokemonName" placeholder="Enter Pokemon Name" required />
      <button type="submit">Add Pokemon</button>
    </form>
  `);
});

// Contact page route
app.get('/contact', (req, res) => {
  const team = Array.from({ length: 6 }, () => Math.random() > 0.5 ? getRandomPokemon() : 'None');
  res.send(`
    <h1>Pokemon Team Generator</h1>
    <p>Your randomly generated team:</p>
    <ul>
      ${team.map(pokemon => `<li>${pokemon}</li>`).join('')}
    </ul>
    <button onclick="location.reload()">Generate New Team</button>
  `);
});

// Route to handle random Pokemon generation
app.get('/random-pokemon', (req, res) => {
  res.send(getRandomPokemon());
});

// Route to handle adding new Pokemon
app.post('/add-pokemon', (req, res) => {
  const { pokemonName } = req.body;
  addPokemon(pokemonName);
  res.send(`${pokemonName} has been added to the Pokemon list!`);
});

// Update the route to set the user name to avoid redirecting
app.post('/set-name', (req, res) => {
  const { name } = req.body || {}; // Fallback to an empty object if req.body is undefined
  userName = name || 'Guest';
  res.status(200).end(); // Send a success response without redirecting
});

// Route to get a random name
app.get('/random-name', (req, res) => {
  const randomNames = ['Ash', 'Misty', 'Brock', 'Gary', 'Dawn', 'May', 'Serena', 'Cynthia', 'Red', 'Blue'];
  const randomName = randomNames[Math.floor(Math.random() * randomNames.length)];
  res.send(randomName);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});