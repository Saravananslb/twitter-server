const express = require('express');
const isAuthenticated = require('../Middleware/auth.middleware');
const { createTweet, getTweet, likeTweet, removeTweet, retweet, getUserReTweet, getUserLikedTweet } = require('../Controller/tweet.controller');

const router = express.Router();

router.post('/new', isAuthenticated, createTweet);
router.get('/get-tweet', getTweet);
router.get('/get-user-tweet', isAuthenticated, getTweet);
router.post('/like', isAuthenticated, likeTweet);
router.delete('/remove-tweet', isAuthenticated, removeTweet);
router.post('/retweet', isAuthenticated, retweet);
router.get('/get-re-tweet', isAuthenticated, getUserReTweet);
router.get('/get-like-tweet', isAuthenticated, getUserLikedTweet);

module.exports = router;