const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const engines = require('consolidate');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dotenv = require('dotenv').config();

const port = process.env.PORT || 3000;

app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.render('index', {});
});

MongoClient.connect(process.env.MONGO, (err, db) => {
  assert.equal(null, err);

  app.post('/', (req, res) => {
    const name = req.body.name;
    if (name === '') {
      res.render('help.html', {});
    } else {
      db.collection('words').insertOne({
        'name': name
      },
      function (err, r) {
        assert.equal(null, err);
      });
      res.render('results.html', {name: `${name}`});
    }
  });
})

app.listen(port, () => {
  console.log(`App open and listening on port ${port}.`);
});
