const express = require('express');
const { AddComment } = require('../Controller/comment.controller');
const isAuthenticated = require('../Middleware/auth.middleware');

const router = express.Router();

router.post('/add-comment', isAuthenticated, AddComment );

module.exports = router;