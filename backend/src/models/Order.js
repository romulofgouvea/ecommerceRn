const mongoose = require('mongoose');

const Product = require('./Product');

const OrderSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    products: [Product]
}, {
    timestamps: true
})

module.exports = mongoose.model('Order', OrderSchema);
