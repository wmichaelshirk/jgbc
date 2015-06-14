var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  _id: String,
  name: String,
  photoUrl: String
});

mongoose.model('User', UserSchema);
