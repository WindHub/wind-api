const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Permission = require('./permission');

var contestDetailSchema = new Schema({
  description: String,
  problems: [{ type: Schema.Types.ObjectId, ref: 'Problem' }],
  contributors: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

var contestSchema = new Schema({
  name: String,
  abstract: String,
  enrollTime: Date,
  startTime: Date,
  endTime: Date,
  permissions: [Permission.Schema.permissionSchema],
  detail: { type: Schema.Types.ObjectId, ref: 'ContestDetail' }
});

var Contest = mongoose.model('Contest', contestSchema);
var ContestDetail = mongoose.model('ContestDetail', contestDetailSchema);

module.exports = {
  Schema: {
    contestSchema: contestSchema,
    contestDetailSchema: contestDetailSchema
  },
  Contest: Contest,
  ContestDetail: ContestDetail
};
