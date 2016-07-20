module.exports = function(config) {
  return function(req, res, next) {
    res.header("Access-Control-Allow-Origin", (config.secure ? "https://" : "http://") + config.pi.url);
    res.header("Access-Control-Allow-Headers", "Accept, Accept-Encoding, Accept-Language, Cache-Control, User-Agent, Content-Type, Origin, Host, Referer, X-Requested-With");
    res.header("Access-Control-Max-Age", config.CORSMaxAge);
    res.header("Access-Control-Max-Methods", "POST, GET, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
  };
};
