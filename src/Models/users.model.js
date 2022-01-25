const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    lowercase: true,
    match: /[a-z0–9!#$%&’*+/=?^_`{|}~-]+(?:\.[a-z0–9!#$%&’*+/=?^_`{|}~-]+)*@(?:[a-z0–9](?:[a-z0–9-]*[a-z0–9])?\.)+[a-z0–9](?:[a-z0–  9-]*[a-z0–9])?/,
  },
  password: String,
  createdAt: {
      type: Date,
      default: Date.now
  },
  followers: {
    type: Array
  },
  following: {
    type: Array
  },
  name: {
    type: String
  },
  profilePic: {
    type: String
  },
  backgroundPic: {
    type: String
  },
  reTweet: {
    type: Array
  }
});
module.exports = mongoose.model('users', userSchema);