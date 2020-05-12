const express = require('express');
const router = express.Router();
const url = require('url');
const checkAuth = require('../middleware/check-auth');

const ProductsController = require('../controllers/products');

// get back all products (protected route)
router.get("/", checkAuth, ProductsController.products_get_all);

// get a list of products based on name (protected route)
router.post("/list/name", checkAuth, ProductsController.products_get_all_by_name);

// get a list of products based on description (protected route)
router.post("/list/description", checkAuth, ProductsController.products_get_all_by_description);

// Create a new product (protected route)
router.post("/add", checkAuth, ProductsController.products_add_new_one);

// delete a product (protected route)
router.post("/delete", checkAuth, ProductsController.products_delete_exist_one);

// update a product (protected route)
router.post("/update", checkAuth, ProductsController.products_update_exist_one);

// update a product's status (protected route)
router.post("/update/status", checkAuth, ProductsController.products_update_status);

module.exports = router;
