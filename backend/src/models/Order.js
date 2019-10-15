const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address',
        require: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Order', OrderSchema);
