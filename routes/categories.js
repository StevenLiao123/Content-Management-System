const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const CatgeoriesController = require('../controllers/categories');

// get back all categories (protected route)
router.get("/", checkAuth, CatgeoriesController.categories_get_all);

// get a list of categories based on the parentId (protected route)
router.post("/list", checkAuth, CatgeoriesController.categories_get_all_by_parentId);

// Create a new category (protected route)
router.post("/add", checkAuth, CatgeoriesController.categories_add_new_one);

// delete a category (protected route)
router.delete("/:name", checkAuth, CatgeoriesController.categories_delete_exist_one);

// update a category (protected route)
router.post("/update", checkAuth, CatgeoriesController.categories_update_exist_one);

module.exports = router;
