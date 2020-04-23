const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");
const multer = require("multer");
const path = require("path");
const url = require("url");

// get back all products
router.get("/", async (req, res) => {
  try {
    const allProducts = await Product.find();
    res.json(allProducts);
  } catch (err) {
    res.json({
      data: {
        message: err
      }
    });
  }
});

/**
 * PRODUCT IMAGE STORING STARTS
 * set up the S3
 */
const s3 = new aws.S3({
  accessKeyId: process.env.ACCESSKEY_ID,
  secretAccessKey: process.env.SECRETACCESS_KEY,
  Bucket: "content-management-system"
});

/**
 * Image Upload
 */
const profileImgUpload = multer({
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
}).single("profileImage");

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
 * @route POST api/product/profile-img-upload
 * @desc Upload post image
 * @access public
 */
router.post("/profile-img-upload", (req, res) => {
  profileImgUpload(req, res, error => {
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
            status: 1,
            name: imageName,
            url: imageLocation
          }
        });
      }
    }
  });
});

/**
 * @route POST api/product/profile-img-upload/delete
 * @desc delete an image
 * @access public
 */
router.post("/profile-img-upload/delete", (req, res) => {
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
              status: 1,
              message: "delete image successed"
            }
          });
        } else {
          // response failed
          res.json({
            data: {
              status: 0,
              message: "delete image failed"
            }
          });
        }
      });
    }
  } catch (err) {
    res.json("no image name!!");
  }
});

// get a list of products based on name
router.post("/list/name", async (req, res) => {
  try {
    const products = await Product.find({
      name: { $regex: req.body.searchName }
    });
    res.json({
      data: {
        products
      }
    });
  } catch (err) {
    res.json({
      data: {
        message: err
      }
    });
  }
});

// get a list of products based on description
router.post("/list/description", async (req, res) => {
  try {
    const products = await Product.find({
      description: { $regex: req.body.searchName }
    });
    res.json({
      data: {
        products
      }
    });
  } catch (err) {
    res.json({
      data: {
        message: err
      }
    });
  }
});

// Create a new product
router.post("/add", (req, res, next) => {
  Product.find({ name: req.body.name })
    .then(product => {
      if (product.length >= 1) {
        return res.status(409).json({
          data: {
            message: "This product has already been added!"
          }
        });
      } else {
        const product = new Product({
          status: req.body.status,
          images: req.body.images,
          name: req.body.name,
          description: req.body.description,
          price: req.body.price,
          detail: req.body.detail
        });

        product
          .save()
          .then(result => {
            res.status(201).json({
              data: {
                message: "Product added!"
              }
            });
          })
          .catch(err => {
            res.status(500).json({
              data: {
                message: err
              }
            });
          });
      }
    })
    .catch(err => {
      console.log(err);
    });
});

// delete a product
router.post("/delete", async (req, res) => {
  try {
    const removeProduct = await Product.deleteOne({ _id: req.body._id });
    res.json({
      data: {
        message: "Product deleted!",
        removeProduct
      }
    });
  } catch (err) {
    res.json({
      data: {
        message: err
      }
    });
  }
});

// update a product
router.post("/update", (req, res, next) => {
  Product.find({ _id: req.body._id }, async () => {
    try {
      const updateProduct = await Product.updateMany(
        { _id: req.body._id },
        {
          $set: {
            name: req.body.name,
            images: req.body.images,
            description: req.body.description,
            price: req.body.price,
            detail: req.body.detail
          }
        }
      );
      res.json({
        data: {
          message: "Update name sccuessful!",
          updateProduct
        }
      });
    } catch (err) {
      res.json({
        data: {
          message: err
        }
      });
    }
  });
});

// update a product's status
router.post("/update/status", (req, res, next) => {
  Product.find({ _id: req.body._id }, async () => {
    try {
      const updateProductStatus = await Product.updateOne(
        { _id: req.body._id },
        { $set: { status: req.body.status } }
      );
      res.json({
        data: {
          message: "Update status sccuessful!",
          updateProductStatus
        }
      });
    } catch (err) {
      res.json({
        data: {
          message: err
        }
      });
    }
  });
});

module.exports = router;
