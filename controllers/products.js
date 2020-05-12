const Product = require("../models/product");

exports.products_get_all = async (req, res) => {
  try {
    const products = await Product.find();
    res.json({
      data: {
        status: "1",
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
};

exports.products_get_all_by_name = async (req, res) => {
  try {
    const products = await Product.find({
      name: { $regex: req.body.searchName }
    });
    res.json({
      data: {
        status: "1",
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
};

exports.products_get_all_by_description = async (req, res) => {
  try {
    const products = await Product.find({
      description: { $regex: req.body.searchName }
    });
    res.json({
      data: {
        status: "1",
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
};

exports.products_add_new_one = (req, res, next) => {
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
                status: "1",
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
};

exports.products_delete_exist_one = async (req, res) => {
  try {
    const removeProduct = await Product.deleteOne({ _id: req.body._id });
    res.json({
      data: {
        status: "1",
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
};

exports.products_update_exist_one = (req, res, next) => {
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
          status: "1",
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
};

exports.products_update_status = (req, res, next) => {
  Product.find({ _id: req.body._id }, async () => {
    try {
      const updateProductStatus = await Product.updateOne(
        { _id: req.body._id },
        { $set: { status: req.body.status } }
      );
      res.json({
        data: {
          status: "1",
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
};
