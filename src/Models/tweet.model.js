const mongoose = require('mongoose');

const tweetsSchema = new mongoose.Schema({
  userId: {
    type: String
  },
  like: {
    type: Array
  },
  asset: {
    type: String
  },
  name: {
    type: String
  },
  commentIds: {
    type: Array
  }
});
module.exports = mongoose.model('tweets', tweetsSchema);