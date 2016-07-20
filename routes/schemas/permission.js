const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var permissionSchema = new Schema({
  type: Number,
  data: Schema.Types.Mixed
});

module.exports = {
  Schema: {
    permissionSchema: permissionSchema,
  }
};
