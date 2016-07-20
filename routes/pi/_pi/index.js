const express = require('express');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const randomstring = require("randomstring");
const Step = require('step');

module.exports = function(config, onTokenValid) {
  return {
    router: require('./router')(config, onTokenValid),
    checkAuth: require('./checkAuth')(config)
  };
};
