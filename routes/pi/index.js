const pi = require('./_pi');
const config = require('../../config');

module.exports = pi(config, require('../users/authorization'));
