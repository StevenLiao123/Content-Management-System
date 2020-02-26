const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    image: {
        type: String,
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },    
    price: {
        type: Number,
    },
    pCategoryId: {
        type: String
    },
    categoryId: {
        type: String
    },
    detail: {
        type: String
    },
}, { collection: 'products' });

module.exports = mongoose.model('Product', productSchema);