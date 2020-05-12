const aws = require("aws-sdk");

/**
 * PRODUCT IMAGE STORING STARTS
 * set up the S3
 */
const s3 = new aws.S3({
  accessKeyId: process.env.ACCESSKEY_ID,
  secretAccessKey: process.env.SECRETACCESS_KEY,
  Bucket: "content-management-system"
});

module.exports = s3;