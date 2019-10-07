const mongoose = require('mongoose');

const AddressSchema = require('./Address');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    address: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address'
    }],
    status: {
        type: Number,
        enum: [0, 1, 2], //0 - ok, 1 - recuperando senha, 2 - bloqueado
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
