const express = require('express');
const router = express.Router();
const Category = require('../models/category');

// get back all categories
router.get('/', async (req, res) => {
    try {
        const allCategories = await Category.find();
        res.json(allCategories);
    } catch (err) {
        res.json({ message: err });
    }
});

// get a list of categories based on the parentId
router.post('/list', async (req, res) => {
    try {
        const categoriesByParentId = await Category.find({ parentId: req.body.parentId });
        res.json(categoriesByParentId);
    } catch (err) {
        res.json({ message: err });
    }
});


// Create a new category
router.post('/add', (req, res, next) => {
    Category.find({ name: req.body.name }).then(category => {
        if (category.length >= 1) {
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
router.post('/update', (req, res, next) => {
    Category.find({ _id: req.body._id }, async () => {
        try {
            const updateCategory = await Category.updateOne(
                { _id: req.body._id}, 
                {"$set": { name: req.body.name }}
            );
            res.json({message:'Update sccuessful!', updateCategory});

        } catch (err) {
            res.json({ message: err });
        }
    });
});


module.exports = router;