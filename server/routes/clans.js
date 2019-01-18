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

router.get('/', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  const { auth } = req.headers;
  if (isEmpty(auth)) {
    res.status(403).json({ error: 'no auth' });
  }
  axios.get(
    `${ROOT_URL}/clans`,
    {
      headers: { auth },
    },
  )
    .then(response => res.send(response.data))
    .catch(error => next(error));
});

router.post('/', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  const { auth } = req.headers;
  axios.post(
    `${ROOT_URL}/clans`,
    req.body,
    { headers: { auth } },
  )
    .then(response => res.send(response.data))
    .catch(error => next(error));
});

router.put('/:clanid', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  const { auth } = req.headers;
  const { clanid } = req.params;
  axios.put(
    `${ROOT_URL}/clans/${clanid}`,
    req.body,
    { headers: { auth } },
  )
    .then(response => res.send(response.data))
    .catch(error => next(error));
});

module.exports = router;
