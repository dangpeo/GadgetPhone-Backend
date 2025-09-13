const express = require('express');
const app = express();
const port = 3001;

app.use(express.json());

// Example route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to GadgetPhone API!' });
});

// Add your API routes here

app.listen(port, () => {
  console.log(`API server listening at http://localhost:${port}`);
});
