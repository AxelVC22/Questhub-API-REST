const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
        default: 'https://i.imgur.com/WxNkK7J.png'
    },
    role: {
        type: String,
        required: true,
        enum: ['user', 'moderator', 'admin'],
        default: 'user'
    }
});

module.exports = mongoose.model('User', userSchema);
