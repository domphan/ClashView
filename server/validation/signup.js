const Validator = require('validator');
const isEmpty = require('./is_empty');

const validateSignupInput = (data) => {
  const errors = {};
  const input = {};
  input.email = !isEmpty(data.email) ? data.email : '';
  input.password = !isEmpty(data.password) ? data.password : '';
  input.password_confirm = !isEmpty(data.password_confirm) ? data.password_confirm : '';
  if (!Validator.isEmail(input.email)) {
    errors.email = 'Email is invalid';
  }
  if (Validator.isEmpty(input.email)) {
    errors.email = 'Email is required';
  }
  if (!Validator.isLength(input.password, { min: 7, max: 28 })) {
    errors.password = 'Password must be 7 - 28 characters';
  }
  if (Validator.isEmpty(input.password)) {
    errors.password = 'Please enter a password';
  }
  if (!Validator.isLength(input.password_confirm, { min: 7, max: 28 })) {
    errors.password_confirm = 'Password must be 7 - 28 chars';
  }
  if (!Validator.equals(input.password, input.password_confirm)) {
    errors.password_confirm = 'Passwords do not match';
  }
  if (Validator.isEmpty(input.password_confirm)) {
    errors.password_confirm = 'Please enter a password';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = validateSignupInput;
