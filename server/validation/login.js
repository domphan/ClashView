const Validator = require('validator');
const isEmpty = require('./is_empty');

const validateLogin = (data) => {
  const errors = {};
  const input = {};
  input.email = !isEmpty(data.email) ? data.email : '';
  input.password = !isEmpty(data.password) ? data.password : '';
  if (!Validator.isEmail(input.email)) {
    errors.email = 'Invalid email';
  }
  if (Validator.isEmpty(input.email)) {
    errors.email = 'Please enter an email';
  }
  if (!Validator.isLength(input.password, { min: 7, max: 28 })) {
    errors.password = 'Password must be between 7-28 chars';
  }
  if (Validator.isEmpty(input.password)) {
    errors.password = 'Please enter a password';
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = validateLogin;
