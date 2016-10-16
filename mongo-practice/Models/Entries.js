var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var EntriesSchema = new Schema({
  alcohol: { type: Schema.Types.ObjectId, ref: 'Alcohol' },
  dateTime: {type: Date, required:true, default:Date.now},
  store: {type: Schema.Types.ObjectId, ref: "Store"},
  qty: {type: String, required:true},
  price: {type: Number, required:true},
  user: {type: Schema.Types.ObjectId, ref:"User"}
});

EntriesSchema.pre('save', function(next){
    now = new Date();
    if(!this.date_time) {
        this.date_time = now
    }
    next();
});



module.exports = mongoose.model('Entry', EntriesSchema);
