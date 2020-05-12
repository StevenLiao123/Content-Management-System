const multerS3 = require("multer-s3");
const multer = require("multer");
const path = require("path");
const s3 = require('../config/aws');

/**
 * Check File Type
 */
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}

/**
 * Image Upload
 */
const imgUpload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "content-management-system",
    acl: "public-read",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function(req, file, cb) {
      cb(
        null,
        path.basename(file.originalname, path.extname(file.originalname)) +
          "-" +
          Date.now() +
          path.extname(file.originalname)
      );
    }
  }),
  limits: { fileSize: 2000000 }, // In bytes: 2000000 bytes = 2 MB
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
});

module.exports = imgUpload;
