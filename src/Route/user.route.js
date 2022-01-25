const express = require('express');
const { getUser, followUsers, editUser } = require('../Controller/users.controller');
const isAuthenticated = require('../Middleware/auth.middleware');

const router = express.Router();

router.get('/get-users', isAuthenticated, getUser);
router.post('/follow', isAuthenticated, followUsers);
router.put('/edit-user', isAuthenticated, editUser)

module.exports = router;