const upload = require("../services/file-upload");
const singleUpload = upload.single("profileImage");
const s3 = require("../config/aws");

exports.image_upload = (req, res) => {
  singleUpload(req, res, error => {
    if (error) {
      res.json({
        data: {
          status: 0,
          error: error
        }
      });
    } else {
      // If File not found
      if (req.file === undefined) {
        res.json("Error: No File Selected");
      } else {
        // If Success
        const imageName = req.file.key;
        const imageLocation = req.file.location;
        // Response the status, name and url
        res.json({
          data: {
            status: "1",
            name: imageName,
            url: imageLocation
          }
        });
      }
    }
  });
};

exports.image_delete = (req, res) => {
  try {
    if (req.body.imageName) {
      var params = {
        Bucket: "content-management-system",
        Key: req.body.imageName
      };
      s3.deleteObject(params, (err, data) => {
        if (!err) {
          // successful response
          res.json({
            data: {
              status: "1",
              data,
              message: "delete image successed"
            }
          });
        } else {
          // response failed
          res.json({
            data: {
              message: "delete image failed"
            }
          });
        }
      });
    }
  } catch (err) {
    res.json({
      data: {
        status: "0",
        message: "no image name!"
      }
    });
  }
};
