const express = require('express');
const _ = require('lodash');

var router = express.Router({
  mergeParams: true
});

router.use(require('../util/auth-middleware'));

router.post(function(req, res, next) {
});

module.exports = router;
