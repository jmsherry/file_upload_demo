const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, process.env.UPLOAD_PATH || 'uploads/');
  },
  filename: function (req, file, callback) {
    const parts = file.originalname.split('.');
    const extension = parts.pop();
    const filePathAndName = parts.join('');
    callback(null, `${filePathAndName}-${Date.now()}.${extension}`);
  }
});

module.exports = multer({ storage });