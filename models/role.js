const mongoose = require('mongoose');

const roleSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    menu: [{
        type: String
    }],
    create_time: {
        type: Number
    },
    auth_time: {
        type: Number
    },
    create_name: {
        type: String
    },
});

module.exports = mongoose.model('Role', roleSchema);