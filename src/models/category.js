const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 50
    },
    description: {
        type: String,
        maxlength: 255
    }
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);
