const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    photos: [{
        path: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        }
    }]
});

module.exports = ArtistSchema;