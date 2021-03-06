const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    status: {
        type: String
    },
    images: [{
        type: String
    }],
    name: {
        type: String,
        required: true,
        text: true,
    },
    description: {
        type: String,
        text: true,
    },    
    price: {
        type: Number,
    },
    detail: {
        type: String
    }
}, { collection: 'products' } );

module.exports = mongoose.model('Product', productSchema);