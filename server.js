require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3333;

require('./middleware')(app);
require('./database');
require('./routes/')(app)

app.listen(PORT, function(){
    console.log(`Listening on http://localhost:${PORT}`);
});

module.exports = app;