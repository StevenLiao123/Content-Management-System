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
    role: {
        type: Object
    },
    role_id: {
        type: String
    },
    create_time: {
        type: Number
    }
});

module.exports = mongoose.model('User', userSchema);