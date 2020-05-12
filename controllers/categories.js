const Category = require('../models/category');

exports.categories_get_all = async (req, res) => {
  try {
    const allCategories = await Category.find();
    res.json(allCategories);
  } catch (err) {
    res.json({
      data: {
        status: "1",
        message: err
      }
    });
  }
};

exports.categories_get_all_by_parentId = async (req, res) => {
  try {
    const categoriesByParentId = await Category.find({
      parentId: req.body.parentId
    });
    res.json({
      data: {
        status: "1",
        categoriesByParentId
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

exports.categories_add_new_one = (req, res, next) => {
  Category.find({ name: req.body.name })
    .then(category => {
      if (category.length >= 1) {
        return res.status(409).json({
          data: {
            message: "This category has already been added!"
          }
        });
      } else {
        const category = new Category({
          parentId: req.body.parentId,
          name: req.body.name
        });

        category
          .save()
          .then(result => {
            res.status(201).json({
              data: {
                message: "Category added!",
                status: "1"
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

exports.categories_delete_exist_one = async (req, res) => {
  try {
    const removeCategory = await Category.deleteOne({ name: req.params.name });
    res.json({
      data: {
        status: "1",
        message: "Category deleted!",
        removeCategory
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

exports.categories_update_exist_one = (req, res, next) => {
  Category.find({ _id: req.body._id }, async () => {
    try {
      const updateCategory = await Category.updateOne(
        { _id: req.body._id },
        { $set: { name: req.body.name } }
      );
      res.json({
        data: {
          status: "1",
          message: "Update sccuessful!",
          updateCategory
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
