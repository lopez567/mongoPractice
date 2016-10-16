var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var StoreSchema = new Schema({
  name: {type:String, required:true},
  place_id: {type: String, required:true},
  town: {type:String,required:false},
  location: {type: [Number], required: true}, // [Long, Lat]
  url: {type: String, required: true}
});

StoreSchema.index({location: '2dsphere'});

module.exports = mongoose.model('Store', StoreSchema);
