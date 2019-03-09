const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const config = require("../config/index");
aws.config.update({
  secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
  accessKeyId: config.AWS_ACCESS_KEY_ID,
  region: "us-east-2"
});

console.log('Aws secret key is', config.AWS_SECRET_ACCESS_KEY)

const s3 = new aws.S3();

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === 'image/jpg') {
    cb(null, true);
  } else {
    //
    cb(new Error("Invalid file type, only JPEG, JPG and PNG is allowed!"), false);
  }
};

const upload = multer({
  fileFilter,
  storage: multerS3({
    acl: 'public-read',
    s3,
    bucket: "e-rental-01",

    metadata: function (req, file, cb) {
      cb(null, { fieldName: 'TESTING_METADATA' });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString());
    }
  })
});

module.exports = upload;
