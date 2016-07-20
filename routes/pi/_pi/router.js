const express = require('express');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const randomstring = require("randomstring");
const Step = require('step');

module.exports = function(config, cb) {

  var router = express.Router();

  router.use(require('./pi-cors-middleware')(config));

  router.post('/token',
    function(req, res, next) {
      var __exp;
      Step(
        function() {
          if (req.body.token) {
            jwt.verify(req.body.token, config.app.secret, this);
          } else {
            res
              .status(401)
              .json({
                code: 401.2,
                message: "not logged in"
              });
          }
        },
        function(err, decoded) {
          if (err) {
            if (err.name == "TokenExpiredError") {
              res
                .status(401)
                .json({
                  code: 401.5,
                  message: "token expired"
                });
            } else {
              res
                .status(401)
                .json({
                  code: 401.3,
                  message: "invaild authorization token"
                });
            }
          } else {
            if (decoded.sub != config.app.subject) {
              res
                .status(401)
                .json({
                  code: 401.4,
                  message: "invaild authorization payload"
                });
            } else {
              this(null, decoded);
            }
          }
        },
        function(err, auth) {
          if (err) throw err;
          req.pi_auth = auth;
          next();
        }
      );
    },
    cb
  );
  return router;
};
