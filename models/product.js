const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    status: {
        type: String
    },
    images: {
        type: Array,
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
    }
}, { collection: 'products' } );

module.exports = mongoose.model('Product', productSchema);