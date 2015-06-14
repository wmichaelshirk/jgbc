var mongoose = require('mongoose');

var RatingSchema = new mongoose.Schema({
  user: String,
  rating: {type: Number, default: 0},
  beer: { type: mongoose.Schema.Types.ObjectId, ref: 'Beer' }
});

mongoose.model('Rating', RatingSchema);
