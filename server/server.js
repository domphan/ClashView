const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');

const usersRoute = require('./routes/users');
const config = require('./db');

const app = express();
const port = process.env.PORT || '3001';

mongoose.connect(config.DB, { useNewUrlParser: true }).then(
  () => { console.log('Database is connected'); },
  err => console.log(`Can not connect to the database: ${err}`)
);

app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/users', usersRoute);

app.use('/api/users', usersRoute);

app.use((req, res) => {
  res.status(404);
  res.send('error 404');
});

app.use((err, req, res, next) => {
  res.status(500);
  res.send(`ERROR 500: ${err}`);
});

app.listen(port, () => {
  console.log(`Express server started on ${port}`);
});
