const mongoose = require('mongoose');

const ENUM_PROVIDER = ["FACEBOOK", "GOOGLE"];

const UserSchema = new mongoose.Schema({
    avatar: {
        type: String
    },
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
    provider: {
        uid: {
            type: String,
            required: true
        },
        type: {
            type: String,
            enum: ENUM_PROVIDER,
            required: true
        }
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

module.exports = {
    User: mongoose.model('User', UserSchema),
    ENUM_PROVIDER
};
