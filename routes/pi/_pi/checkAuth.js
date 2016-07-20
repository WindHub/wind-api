module.exports = function(config) {
  const redis = require('./piRedis')(config);
  return function(jti, cb) {
    redis.get('auth:' + jti, function (err, reply) {
      if (err) throw err;
      if (reply !== null) cb(null, true); else cb(null, false);
    });
  };
};
