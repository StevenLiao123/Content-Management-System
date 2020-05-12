const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const ImageController = require('../controllers/image-upload');

/**
 * @route POST api/image-upload
 * @desc Upload post image
 * @access public
 * protected route
 */
router.post("/", checkAuth, ImageController.image_upload);

/**
 * @route POST api/image-upload/delete
 * @desc delete an image
 * @access public
 * protected route
 */
router.post("/delete", checkAuth, ImageController.image_delete);

module.exports = router;