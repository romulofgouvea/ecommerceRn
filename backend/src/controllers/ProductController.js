var mongoose = require('mongoose');
const Product = require('../models/Product');

const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

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

async function CreateProduct(req, res) {
    try {
        const { name, measure, price, stock } = req.body;
        const { filename: image } = req.file;

        let imageName = `${image.replace(/\..*/g, "")}.jpg`;
        await sharp(req.file.path)
            .resize(500)
            .jpeg({ quality: 80 })
            .toFile(path.resolve(req.file.destination, 'resized', imageName));

        fs.unlinkSync(req.file.path);

        const product = await Product.create({
            image: imageName, name, measure, price, stock
        })

        req.io.emit('product', product);

        return res.json(product);
    } catch (error) {
        res.sendStatus(404);
    }
}
async function UpdateProduct(req, res) {
    try {
        const { name, measure, price, stock } = req.body;
        const { filename: image } = req.file;

        let imageName = `${image.replace(/\..*/g, "")}.jpg`;
        await sharp(req.file.path)
            .resize(500)
            .jpeg({ quality: 80 })
            .toFile(path.resolve(req.file.destination, 'resized', imageName));

        fs.unlinkSync(req.file.path);

        const product = await Product.findById(req.params.id);

        product.image = imageName;
        product.name = name;
        product.measure = measure;
        product.price = price;
        product.stock = stock;

        await product.save();

        req.io.emit('product', product);

        return res.json(product);
    } catch (error) {
        res.sendStatus(404);
    }
}


module.exports = {
    GetAll,
    GetProduct,
    CreateProduct,
    UpdateProduct,
}
