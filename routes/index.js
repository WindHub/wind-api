const express = require('express');
const router = express.Router();

const pi = require('./pi');
const users = require('./users');

router.use('/pi', pi);
router.use('/users', users);

module.exports = router;
