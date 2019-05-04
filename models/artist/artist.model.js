const mongoose = require('mongoose');
const ArtistSchema = require('./artist.schema');

var Artist = mongoose.model('Artist', ArtistSchema);

module.exports = Artist;