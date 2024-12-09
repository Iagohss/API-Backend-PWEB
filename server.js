const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

app.get('/', (req, res) => {
  res.send('hello World!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

app.use(express.static(path.join(__dirname, 'public')));