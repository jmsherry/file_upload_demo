const path = require('path');
const express = require('express');
const upload = require('./../upload');
const router = express.Router();
const {
  getArtists,
  addArtist,
  addPhotos,
  updateArtist,
  removeArtist
} = require('./../controllers/artist.controller');
// console.log('upload', upload);

/* GET users listing. */
router.get('/:id?', getArtists);
router.post('/', upload.array('photos', 30), addArtist);
router.get('/:id/photos/add', (req, res) => {
  const options = {
    root: path.resolve(__dirname , './../public/'),
    dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
  };

  var fileName = 'add-photos.html';
  res.sendFile(fileName, options, function (err) {
    if (err) {
      return res.status(500).send(err);
    } else {
      console.log('Sent:', fileName);
    }
  });
});
router.post('/:id/photos/add', upload.array('photos', 30), addPhotos);
router.put('/:id', updateArtist);
router.delete('/:id', removeArtist);

module.exports = router;