const mongoose = require('mongoose');

const AddressSchema = require('./Address');

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    status: {
        type: Number,
        enum: [0, 1, 2],
        default: 0
    },
    reset: {
        type: Number,
        enum: [0, 1],
        default: 0
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('User', UserSchema);
