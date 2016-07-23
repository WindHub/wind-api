const jwt = require('jsonwebtoken');
const Step = require('step');

const pi = require('../pi');
const config = require('../../config');
const redis = require('../services').Redis;

function writeError(res) {
  return res.status(401).clearCookie('authorization', {
    domain: config.api_url,
    path: '/',
    secure: config.secure
  });
}

module.exports = function(req, res, next) {
  Step(
    function() {
      if (req.cookies.authorization) {
        jwt.verify(req.cookies.authorization, config.jwt.secret, this);
      } else {
        writeError(res)
          .json({
            code: 401.2,
            message: "not logged in"
          });
      }
    },
    function(err, decoded) {
      if (err) {
        if (err.name == "TokenExpiredError") {
          writeError(res)
            .json({
              code: 401.5,
              message: "token expired"
            });
        } else {
          writeError(res)
            .json({
              code: 401.3,
              message: "invaild authorization token"
            });
        }
      } else {
        if (decoded.sub != config.jwt.subject || decoded.iss != config.jwt.issuer) {
          writeError(res)
            .json({
              code: 401.4,
              message: "invaild authorization payload"
            });
        } else {
          req.auth = decoded;
          pi.checkAuth(decoded.jti, this);
        }
      }
    },
    function(err, result) {
      if (err) throw err;
      if (result) {
        next();
      } else {
        writeError(res)
          .json({
            code: 401.7,
            message: "parent token expired"
          });
      }
    }
  );
};
