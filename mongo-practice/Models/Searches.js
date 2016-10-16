var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var SearchSchema = new Schema({
  alcohol: { type: Schema.Types.ObjectId, ref: 'Alcohol' },
  user: {type: Schema.Types.ObjectId, ref: "User"},
  date_time: {type: Date, required:true, default: Date.now},
  store: {type: Schema.Types.ObjectId, ref: 'Store'} //[Long,Lat]
})


SearchSchema.pre('save', function(next){
    now = new Date();
    if(!this.date_time) {
        this.date_time = now
    }
    next();
});


SearchSchema.index({coord: '2dsphere'});

module.exports = mongoose.model('Search', SearchSchema);
