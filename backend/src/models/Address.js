const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
    user_id: {
        ref: 'User',
        type: mongoose.Schema.Types.ObjectId
    },
    street: String,
    number: String,
    complement: String,
    cep: String,
    neighborhood: String,
    city: String,
}, {
    timestamps: true
})

module.exports = mongoose.model('Address', AddressSchema);
