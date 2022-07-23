const multer = require("multer");
const { S3Client } = require("@aws-sdk/client-s3");
const multerS3 = require("multer-s3");

const { S3_BUCKET_NAME = "", REGION = "" } = process.env;
console.log("🚀 ~ file: upload.js ~ line 5 ~ S3_BUCKET_NAME", S3_BUCKET_NAME);

let storage = null;

if (S3_BUCKET_NAME) {
  const s3 = new S3Client({ region: REGION });
  storage = multerS3({
    s3: s3,
    bucket: S3_BUCKET_NAME,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      const parts = file.originalname.split(".");
      const extension = parts.pop();
      const filePathAndName = parts.join("");
      cb(null, `${filePathAndName}-${Date.now()}.${extension}`);
    },
  });
} else {
  const diskStorageSettings = {
    destination: function (req, file, callback) {
      callback(null, process.env.UPLOAD_PATH || "uploads/");
    },
    filename: function (req, file, callback) {
      const parts = file.originalname.split(".");
      const extension = parts.pop();
      const filePathAndName = parts.join("");
      callback(null, `${filePathAndName}-${Date.now()}.${extension}`);
    },
  };
  storage = multer.diskStorage(diskStorageSettings);
}

module.exports = multer({ storage });
