const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    image: String,
    name: String,
    measure: String,
    price: Number,
    stock: Number,
}, {
    timestamps: true
})

module.exports = mongoose.model('Product', ProductSchema);
