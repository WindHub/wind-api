const express = require('express');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const randomstring = require("randomstring");
const Step = require('step');

const config = require('../../config');

var router = express.Router();

router.use(require('./pi-cors-middleware'));

router.post('/token',
  function(req, res, next) {
    var __exp;
    Step(
      function() {
        if (req.cookies.authorization) {
          res
            .status(200)
            .json({});
        } else {
          this();
        }
      },
      function(err) {
        if (err) throw err;
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
        var payload = {
          user: auth.pi_user,
          jti: auth.jti,
          exp: auth.exp
        };
        __exp = auth.exp;
        jwt.sign(payload, config.jwt.secret, {
          issuer: config.jwt.issuer,
          subject: config.jwt.subject
        }, this);
      },
      function(err, token) {
        if (err) throw err;
        res
          .status(200)
          .cookie('authorization', token, {
            httpOnly: true,
            domain: config.api_url,
            path: '/',
            secure: config.secure
          })
          .json({});
      }
    );
  }
);

module.exports = router;
