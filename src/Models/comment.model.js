const mongoose = require('mongoose');

const commentsSchema = new mongoose.Schema({
  name: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  asset: {
    type: mongoose.Schema.Types.String
  },
  createdAt: {
      type: mongoose.Schema.Types.Date,
      default: Date.now
  },
  tweetId: {
      type: mongoose.Schema.Types.String,
      required: true
  },
  userId: {
    type: String,
    required: true
  },
  likes: {
    type: Array
  }
});

module.exports = mongoose.model('comments', commentsSchema);