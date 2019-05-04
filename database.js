const mongoose = require('mongoose');

const {
    MONGODB_URI
} = process.env;

mongoose.Promise = global.Promise;
const promise = mongoose.connect(MONGODB_URI || 'mongodb://localhost/artists', { useNewUrlParser: true });

promise.then(function(db) {
    console.log('DATABASE CONNECTED!!');
}).catch(function(err){
    console.log('CONNECTION ERROR', err);
});