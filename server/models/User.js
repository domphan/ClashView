// TODO: Implement starred player feature.
const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  api_key: {
    type: String,
    required: false,
  },
});

const User = mongoose.model('users', UserSchema);

module.exports = User;
