const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");

const UsersController = require('../controllers/users');

// GET BACK ALL THE USERS (protected route)
router.get("/", checkAuth, UsersController.users_get_all);

// Create a new user
router.post("/signup", UsersController.users_sign_up);

// login
router.post("/login", UsersController.users_login_in);

// Add a new role (protected route)
router.post("/add", checkAuth, UsersController.users_add_new_one);

//SPECIFIC USER (protected route)
router.get("/:userId", checkAuth, UsersController.users_find_specific_one);

//DELETE USER (protected route)
router.post("/delete", checkAuth, UsersController.users_delete_exist_one);

// update an user (protected route)
router.post("/update", checkAuth, UsersController.users_update_exist_one);

module.exports = router;
