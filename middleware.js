const express = require('express');
// const bodyParser = require('body-parser');

module.exports = function(app) {
  app.use(express.static('public'));
  app.use(express.static('uploads'));

  // parse application/x-www-form-urlencoded
  // app.use(bodyParser.urlencoded({ extended: false }));

  // // parse application/json
  // app.use(bodyParser.json());
};
