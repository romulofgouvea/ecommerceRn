var mongoose = require('mongoose');
const Product = require('../models/Product');

async function GetAll(req, res) {
    const product = await Product.find().sort('-createdAt');
    return res.json(product);
}

async function GetProduct(req, res) {
    try {
        if (!req.params.id) {
            throw "Esse Id não existe!";
        }

        var _id = mongoose.Types.ObjectId.isValid(req.params.id);

        if (!_id) {
            throw "Esse Id é valido!";
        }
        const product = await Product.findById(req.params.id);

        return res.json(product)
    } catch (error) {
        res.sendStatus(404);
    }
}

async function PostProduct(req, res) {
    const { name, measure, price, stock } = req.body;
    const { filename: image } = req.file;

    const product = await Product.create({
        image, name, measure, price, stock
    })

    return res.json(product);
}


module.exports = {
    GetAll,
    GetProduct,
    PostProduct
}
