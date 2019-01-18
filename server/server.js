const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
const usersRoute = require('./routes/users');
const playersRoute = require('./routes/players');
const clansRoute = require('./routes/clans');
const favoritesRoute = require('./routes/favorites');
const config = require('./db');

const app = express();
const port = process.env.PORT || '3001';


mongoose.connect(config.DB, { useNewUrlParser: true })
  .then(
    () => { console.log('Database is connected'); },
    err => console.log(`Can not connect to the database: ${err}`),
  );
require('./passport')(passport);

app.use(cors());
app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/users', usersRoute);

app.use('/api/users', usersRoute);
app.use('/api/clans', clansRoute);
app.use('/api/players', playersRoute);
// app.use('/api/favorites', favoritesRoute);

// Run optimized react front-end build
app.use(express.static(path.join(__dirname, 'build')));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use((req, res) => {
  res.status(404);
  res.send('error 404');
});

app.use((err, req, res, next) => {
  res.status(500);
  console.log(`ERROR: ${err}`);
  res.send(`ERROR 500: ${err}`);
});

app.listen(port, () => {
  console.log(`Express server started on ${port}`);
});
