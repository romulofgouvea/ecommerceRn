const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
    street: {
        type: String,
        require: true
    },
    number: {
        type: String,
        require: true
    },
    complement: String,
    cep: {
        type: String,
        require: true
    },
    neighborhood: {
        type: String,
        require: true
    },
    state: {
        type: String,
        require: true
    },
    city: {
        type: String,
        require: true
    },
    status: {
        type: Number,
        enum: [0, 1], //0 - ativado 1 - desativado
        default: 0
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('Address', AddressSchema);
