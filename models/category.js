const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    parentId: {
        type: String,
    },
    name: {
        type: String,
        required: true
    },
}, { collection: 'categories' });

module.exports = mongoose.model('Category', productSchema);