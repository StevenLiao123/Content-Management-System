const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    phone: {
        type: Number
    },
    role_id: {
        type: Number
    },
    create_time: {
        type: Number
    },
});

module.exports = mongoose.model('User', userSchema);