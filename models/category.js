const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    parentId: {
        type: String,
    },
    name: {
        type: String,
        required: true
    },
}, { collection: 'categories' });

module.exports = mongoose.model('Category', categorySchema);