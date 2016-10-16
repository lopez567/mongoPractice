

var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var UserSchema = new Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  age: {type: Number, required: true},
  admin: {type: Boolean, required:true, default: false},
  email: {type: String, required: false},
  date_joined: {type: Date, required:true, default: Date.now},
  privacy: {type: Boolean, required:true, default: false},
  thanks_count: {type: Number, required: true, default: 0},
  points: {type: Number,required:true,default:0}
});

UserSchema.pre('save', function(next){
    now = new Date();
    if(!this.date_joined) {
        this.date_joined = now
    }
    next();
});

module.exports = mongoose.model('User', UserSchema);
