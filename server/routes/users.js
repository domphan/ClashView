const express = require('express');
const bcrpyt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const validateSignupInput = require('../validation/signup');
const validateLoginInput = require('../validation/login');
const isEmpty = require('../validation/is_empty');
const User = require('../models/User');

const router = express.Router();

router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, auth');
  next();
});

router.get('/', (req, res, next) => {
  console.log(req.headers);
  res.json([
    { id: 1, username: 'somebody' },
    { id: 2, username: 'somebody else' },
  ]);
});

router.post('/signup', (req, res) => {
  console.log(req.body);
  const { errors, isValid } = validateSignupInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({
    email: req.body.email,
  }).then((user) => {
    if (user) {
      return res.status(400).json({
        email: 'email already exists',
      });
    }
    const newUser = new User({
      email: req.body.email,
      password: req.body.password,
    });
    bcrpyt.genSalt(10, (err, salt) => {
      if (err) console.error(`ERROR: ${err}`);
      else {
        bcrpyt.hash(newUser.password, salt, (err, hash) => {
          if (err) console.error(`ERROR: ${err}`);
          else {
            newUser.password = hash;
            newUser.save().then(userRet => res.json(userRet));
          }
        });
      }
    });
  });
});

router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        errors.email = 'user not found';
        return res.status(404).json(errors);
      }
      bcrpyt.compare(password, user.password)
        .then((isMatch) => {
          if (isMatch) {
            const payload = {
              id: user.id,
              email: user.email,
              api_key: user.api_key,
            };
            jwt.sign(payload, 'secret', {
              expiresIn: 3600,
            }, (err, token) => {
              if (err) console.error(`TOKEN ERROR: ${err}`);
              else {
                res.json({
                  success: true,
                  token: `Bearer ${token}`,
                });
              }
            });
          } else {
            errors.password = 'Incorrect password';
            return res.status(400).json(errors);
          }
        });
    });
});

router.get('/me', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { id, email } = req.user;
  return res.json({
    id,
    email,
  });
});

router.post('/api_key', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { key, user_id } = req.body;
  if (isEmpty(key)) {
    res.status(400).json({ error: 'empty key' });
  }
  User.findById(user_id, (err, doc) => {
    if (err) {
      res.status(200).json(err);
    }
    doc.api_key = key;
    doc.save().then(() => {
      const payload = {
        id: doc.id,
        email: doc.email,
        api_key: doc.api_key,
      };
      jwt.sign(payload, 'secret', {
        expiresIn: 3600,
      }, (error, token) => {
        if (error) console.error(`TOKEN ERROR: ${error}`);
        else {
          res.json({
            success: true,
            token: `Bearer ${token}`,
          });
        }
      });
    });
  });
});


module.exports = router;
