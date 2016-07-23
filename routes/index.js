const express = require('express');
const router = express.Router();

const config = require('../config');
const users = require('./users');
const pi = require('./pi');
const problems = require('./problems');

router.use('/pi', pi.router);
router.use('/users', users);
router.use('/problems', problems);

module.exports = router;
