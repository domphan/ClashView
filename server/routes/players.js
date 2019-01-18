const express = require('express');
const passport = require('passport');
const axios = require('axios');
const isEmpty = require('../validation/is_empty');

const router = express.Router();

const ROOT_URL = 'https://clashclantracker.appspot.com';

router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, auth');
  next();
});

router.get('/:tag', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  axios.get(
    `${ROOT_URL}/players/${req.params.tag}`
  )
    .then(response => res.send(response.data))
    .catch(error => next(error));
});

module.exports = router;
