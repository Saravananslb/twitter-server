const express = require('express');
const { AddComment, GetComment } = require('../Controller/comment.controller');
const isAuthenticated = require('../Middleware/auth.middleware');

const router = express.Router();

router.post('/add-comment', isAuthenticated, AddComment );
router.get('/get-comment', isAuthenticated, GetComment)

module.exports = router;