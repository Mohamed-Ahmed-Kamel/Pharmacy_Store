const mongoose = require('mongoose');
const userSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
        },
        age: {
            type: Number,
            required: true,
        },
        address: {
            type: String,
            default: 'Add your address'
        },
        phone: {
            type: Number,
            required: true,
        },
        image: {
            type: String,
            default: 'Add your image',
        },
        role: {
            type: String,
            default: 'user',
        }
    }, { timestamps: true }
);
module.exports = mongoose.model('User', userSchema);