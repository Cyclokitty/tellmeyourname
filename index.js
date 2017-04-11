const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const engines = require('consolidate');

const port = process.env.PORT || 3000;

app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.render('index', {});
});

app.post('/', (req, res) => {
  const name = req.body.name;
  if (name === '') {
    res.render('help.html', {});
  } else {
    res.render('results.html', {name: `${name}`});
  }
})

app.listen(port, () => {
  console.log(`App open and listening on port ${port}.`);
});
