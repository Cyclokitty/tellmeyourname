const express = require('express');
const app = express();
const engines = require('consolidate');

const port = process.env.PORT || 3000;

app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.render('index', {});
});

app.listen(port, () => {
  console.log(`App open and listening on port ${port}.`);
});
