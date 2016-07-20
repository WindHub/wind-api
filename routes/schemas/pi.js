const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');

var directMessageSchema = new Schema({
  origin: Number,
  target: Number,
  message: String,
  time: Date
});

module.exports = {
  Schema: { directMessageSchema: directMessageSchema },
};
