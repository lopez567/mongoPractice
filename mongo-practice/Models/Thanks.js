

var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var ThanksSchema = new Schema({
  target_user: {type: Schema.Types.ObjectId, ref: "User"},
  from_user: {type: Schema.Types.ObjectId, ref: "User"},
  dateTime: {type: Date, required:true, default: Date.now},
  message: {type: String, required:false},
  viewed: {type: Boolean, required:true, default:false}
});

module.exports = mongoose.model('Thanks', ThanksSchema);
