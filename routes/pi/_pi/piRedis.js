const Redis = require('redis');

module.exports = function(config) {
  return Redis.createClient(config.pi.db.redis.url, {
    prefix: config.pi.db.redis.prefix
  });
};
