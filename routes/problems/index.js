const express = require('express');
const _ = require('lodash');

const config = require('../../config');

var router = express.Router();

router.post('/', require('./create'));

module.exports = router;
