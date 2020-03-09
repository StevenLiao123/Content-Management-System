const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// get back all products
router.get('/', async (req, res) => {
    try {
        const allProducts = await Product.find();
        res.json(allProducts);
    } catch (err) {
        res.json({ message: err });
    }
});

// get a list of products based on the name or description
// router.post('/list', async (req, res) => {
//     try {
//         let products;
//         if (req.body.searchType === "description") {
//             products = await Product.find({ description: { $regex: req.body.searchName }});
//         } else {
//             products = await Product.find({ name: { $regex: req.body.searchName }});
//         }
//         res.json(products);
//     } catch (err) {
//         res.json({ message: err });
//     }
// });

// get a list of products based on name
router.post('/list/name', async (req, res) => {
    try {
        const products = await Product.find({ name: { $regex: req.body.searchName }});
        res.json(products);
    } catch (err) {
        res.json({ message: err });
    }
});

// get a list of products based on description
router.post('/list/description', async (req, res) => {
    try {
        const products = await Product.find({ description: { $regex: req.body.searchName }});
        res.json(products);
    } catch (err) {
        res.json({ message: err });
    }
});

// Create a new product
router.post('/add', (req, res, next) => {
    Product.find({ name: req.body.name }).then(product => {
        if (product.length >= 1) {
            return res.status(409).json({
                message: 'This product has already been added!'
            });
        } else {
            const product = new Product({
                status: req.body.status,
                images: req.body.images,
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                pCategoryId: req.body.pCategoryId,
                categoryId: req.body.categoryId,
                detail: req.body.detail,
            });

            product.save()
                .then(result => {
                    console.log(result);
                    res.status(201).json({
                        message: 'Product added!'
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

// delete a product
router.delete('/:name', async (req, res) => {
    try {
        const removeProduct = await Product.deleteOne({ name: req.params.name });
        res.json({
            message: 'Product deleted!',
            removeProduct
        });
    } catch (err) {
        res.json({ message: err });
    }

});

// update a product's name
router.post('/update/name', (req, res, next) => {
    Product.find({ _id: req.body._id }, async () => {
        try {
            const updateProductName = await Product.updateOne(
                { _id: req.body._id}, 
                {"$set": { name: req.body.name }}
            );
            res.json({message:'Update name sccuessful!', updateProductName});

        } catch (err) {
            res.json({ message: err });
        }
    });
});

// update a product's status
router.post('/update/status', (req, res, next) => {
    Product.find({ _id: req.body._id }, async () => {
        try {
            const updateProductStatus = await Product.updateOne(
                { _id: req.body._id}, 
                {"$set": { status: req.body.status }}
            );
            res.json({message:'Update status sccuessful!', updateProductStatus});

        } catch (err) {
            res.json({ message: err });
        }
    });
});


module.exports = router;