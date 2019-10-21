const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    parentId: {
        type: Number,
    },
    name: {
        type: String,
        required: true
    },
}, { collection: 'categories' });

module.exports = mongoose.model('Category', productSchema);