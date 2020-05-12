const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const RolesController = require('../controllers/roles');

// get back all roles (protected route)
router.get("/", checkAuth, RolesController.roles_get_all);

// Create a new role (protected route)
router.post("/add", checkAuth, RolesController.roles_add_new_one);

// update a role (protected route)
router.post("/update", checkAuth, RolesController.roles_update_exist_one);

module.exports = router;
