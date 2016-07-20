const express = require('express');
const router = express.Router();

const config = require('../config');
const users = require('./users');
const pi = require('./pi');

router.use('/pi', pi.router);
router.use('/users', users);

module.exports = router;
