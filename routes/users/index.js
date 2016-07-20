const express = require('express');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const randomstring = require("randomstring");

const config = require('../../config');

var router = express.Router();

router.post('/me', require('../util/auth-middleware'), function(req, res, next) {
  res
    .status(200)
    .json({
      user: req.auth.user,
      exp: req.auth.exp,
      iat: req.auth.iat,
      iss: req.auth.iss,
      sub: req.auth.sub
    });
});

module.exports = router;
