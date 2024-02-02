const express = require('express');
const { getUsers, createUsers, loginUsers, logoutUsers } = require('../controller/authentication/usersController.js');
const { verifyToken } = require('../middleware/verifyToken.js');
const { refreshToken } = require('../controller/authentication/refreshToken.js');

const router = express.Router();

// ROUTE GET ALL USERS
router.get('/users', verifyToken, getUsers);
// ROUTE CREATE USERS
router.post('/users', createUsers);
// ROUTE LOGIN USERS
router.post('/login', loginUsers);
// ROUTE TOKEN
router.get('/token', refreshToken);
// ROUTE LOGOUT
router.delete('/logout', logoutUsers);

module.exports = router;
