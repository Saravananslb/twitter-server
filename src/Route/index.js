const express = require('express');
const authRouter = require('./auth.route');
const tweetRouter = require('./tweet.route');
const userRouter = require('./user.route');
const uploadRouter = require('./upload.route');
const commentRouter = require('./comment.route');

const app = express();

app.use('/auth', authRouter);
app.use('/tweet', tweetRouter);
app.use('/user', userRouter);
app.use('/upload', uploadRouter);
app.use('/comment', commentRouter);

module.exports = app;