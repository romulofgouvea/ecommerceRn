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
    city: {
        type: String,
        require: true
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('Address', AddressSchema);
