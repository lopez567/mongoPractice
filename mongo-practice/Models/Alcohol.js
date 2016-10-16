

var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;


var AlcoholSchema = new Schema({
  name: {type:String, required: true, index:true},
  company: {type: String, required:false},
  group: {type: String, required: true},
  ibu: {type: Number, required: false},
  description: {type: String, required:false}
});

AlcoholSchema.index({name:'text'});

module.exports = mongoose.model('Alcohol', AlcoholSchema);
