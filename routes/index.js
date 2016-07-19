const express = require('express');
const router = express.Router();

const pi = require('./pi');

router.use('/pi', pi);

module.exports = router;
