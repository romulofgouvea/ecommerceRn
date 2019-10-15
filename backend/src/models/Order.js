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
    },
    status: {
        type: Number,
        enum: [0, 1, 2], //0 - Em andamento 1 - Saiu para entrega  2 - Concluído
        default: 0
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('Order', OrderSchema);
