const express = require('express');
const router = express.Router();
const Category = require('../models/category');

// get back the categories
router.get('/', async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        res.json({ message: err });
    }
});

// Create a new category
router.post('/add', (req, res, next) => {
    Category.find({ name: req.body.name}).then(category => {
            if(category.length >= 1) {
                return res.status(409).json({
                    message: 'This category has already been added!'
                });
            } else {
                    const category = new Category({
                        parentId: req.body.parentId,
                        name: req.body.name,
                    });
                    
                    category.save()
                        .then(result => {
                            console.log(result);
                            res.status(201).json({
                                message: 'Category added!'
                            });
                        })
                        .catch(err => {
                            res.status(500).json({
                                message: err
                            });
                        });
                }
            }
        ).catch(err => {
            console.log(err);
        });
});

// delete a category
router.delete('/:name', async (req, res) => {
    try {
        const removeCategory = await Category.deleteOne({ name: req.params.name });
        res.json({
            message: 'Category deleted!',
            removeCategory
        });
    } catch (err) {
        res.json({ message: err });
    }

});

// update a category
router.patch('/:name', async (req, res) => {
    try {
        const updateCategory = await User.updateOne(
            { name: req.params.name },
        );
        res.json(updateCategory);

    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;