const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Permission = require('./permission');

var problemDataSchema = new Schema({
  inputPath: String,
  outputPath: String,
  type: Number,
  name: String
});

var problemLabelSchema = new Schema({
  type: String,
  name: String
});

var problemDetailSchema = new Schema({
    data: [{ type: Schema.Types.ObjectId, ref: 'ProblemData' }],
    limits: Schema.Types.Mixed,
    content: String,
    hint: String,
    contributors: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

var problemSchema = new Schema({
  name: String,
  labels: [problemLabelSchema],
  permissions: [Permission.Schema.permissionSchema],
  detail: { type: Schema.Types.ObjectId, ref: 'ProblemDetail' }
});

var Problem = mongoose.model('Problem', problemSchema);
var ProblemDetail = mongoose.model('ProblemDetail', problemDetailSchema);
var ProblemData = mongoose.model('ProblemData', problemDataSchema);

module.exports = {
  Schema: {
    problemDataSchema: problemDataSchema,
    problemLabelSchema: problemLabelSchema,
    problemSchema: problemSchema,
    problemDetailSchema: problemDetailSchema
  },
  Problem: Problem,
  ProblemData: ProblemData,
  ProblemDetail: ProblemDetail
};
