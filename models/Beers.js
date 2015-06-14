var mongoose = require('mongoose');

var BeerSchema = new mongoose.Schema({
  name: String,
  description: String,
  photoUrl: String,
  ratings: [{type: mongoose.Schema.Types.ObjectId, ref: 'Rating'}]
});

mongoose.model('Beer', BeerSchema);
