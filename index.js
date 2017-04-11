const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('This was made by Laura Veee');
});

app.listen(port, () => {
  console.log(`App open and listening on port ${port}.`);
});
