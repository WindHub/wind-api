const Step = require('step');
const jwt = require('jsonwebtoken');

const config = require('../../config');

const Problem = require('../schemas').Problem;

module.exports = function(req, res) {
  const auth = req.pi_auth;
  Step(
    function() {
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
          secure: config.secure,
          expires: new Date(__exp * 1000)
        })
        .json({});
    }
  );
};
