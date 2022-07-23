const Artist = require("./../models/artist/artist.model");
const { errorHandler } = require("./utils");

exports.getArtists = function (req, res) {
  let query = {};
  if (req.params.id) {
    query._id = req.params.id;
  }
  Artist.find(query).exec((err, artists) => {
    if (err) return errorHandler(res, err);
    return res.status(201).json(artists);
  });
};

exports.addArtist = function (req, res) {
  const artistData = req.body;
  console.log("artistData", artistData);
  console.log("req.files", req.files);
  artistData.photos = req.files.map((file) => {
    return {
      path: file.path,
      name: file.originalname,
    };
  });
  const newArtist = new Artist(artistData);
  newArtist.save((err, artist) => {
    if (err) return errorHandler(res, err);
    return res.status(201).json(artist);
  });
};

exports.addPhotos = function (req, res) {
  const query = {
    _id: req.params.id,
  };
  Artist.find(query).exec((err, result) => {
    if (err) return errorHandler(res, err);
    if (!result.length) return res.sendStatus(404);
    const artist = result[0];
    // console.log('artist', artist);
    // console.log('photos', artist.photos);
    console.log("files", req.files);
    artist.photos = [
      ...artist.photos,
      ...req.files.map((file) => {
        return {
          path: file.path || file.location,
          name: file.originalname,
        };
      }),
    ];
    artist.save((err, artist) => {
      if (err) return errorHandler(res, err);
      if (!artist) return res.sendStatus(404);
      return res.status(201).json(artist);
    });
  });
};

exports.updateArtist = function (req, res) {
  Artist.updateOne({ _id: req.params.id }, req.body, function (err, result) {
    if (err) errorHandler(res, err);
    res.sendStatus(200);
  });
};

exports.removeArtist = function (req, res) {
  Artist.deleteOne({ _id: req.params.id }, function (err) {
    if (err) errorHandler(res, err);
    res.sendStatus(204);
  });
};
