var mongoose = require('mongoose');

var BeerSchema = new mongoose.Schema({
  name: String,
  description: String,
  photoUrl: String,
  date: { type: Date, default: Date.now },
  ratings: [{type: mongoose.Schema.Types.ObjectId, ref: 'Rating'}]
});

mongoose.model('Beer', BeerSchema);
