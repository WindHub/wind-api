const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Permission = require('./permission');

var judgePointSchema = new Schema({
  name: String,
  state: Number,
  time: Number,
  memory: Number,
  score: Number,
  totalScore: Number
});

var judgeDetailSchema = new Schema({
  points: [judgePointSchema],
  code: String,
  detail: String
});

var judgeSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  problem: { type: Schema.Types.ObjectId, ref: 'Problem' },
  lang: Number,
  length: Number,
  submitTime: Date,
  detail: { type: Schema.Types.ObjectId, ref: 'JudgeDetail' },
  permissions: Permission.Schema.permissionSchema
});

var Judge = mongoose.model('Judge', judgeSchema);
var JudgeDetail = mongoose.model('JudgeDetail', judgeDetailSchema);

module.exports = {
  Schema: {
    judgeSchema: judgeSchema,
    judgePointSchema: judgePointSchema,
    judgeDetailSchema: judgeDetailSchema
  },
  Judge: Judge,
  JudgeDetail: JudgeDetail
};
