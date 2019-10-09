var mongoose = require('mongoose');

const Order = require('../models/Order');
const Product = require('../models/Product');

async function GetAll(req, res) {
    try {
        const userId = req.params.userId;
        if (!userId) {
            throw "Esse usuário não existe!";
        } else if (!mongoose.Types.ObjectId.isValid(userId)) {
            throw "Esse usuário não é valido!";
        }

        const order = await Order.find({ user: { $eq: { _id: userId } } }, { user: 0, __v: 0, createdAt: 0, updatedAt: 0 }).populate('products', '-_id -__v -createdAt -updatedAt').sort('-createdAt');
        return res.json(order);
    } catch (error) {
        res.sendStatus(403);
    }
}

async function GetOrder(req, res) {
    try {
        const orderId = req.params.id;
        if (!orderId) {
            throw "Esse pedido não existe!";
        } else if (!mongoose.Types.ObjectId.isValid(orderId)) {
            throw "Esse pedido não é valido!";
        }

        const order = await Order.findById(orderId, { user: 0, __v: 0, createdAt: 0, updatedAt: 0 }).populate('products', '-_id -__v -createdAt -updatedAt');
        return res.json(order);
    } catch (error) {
        res.sendStatus(403);
    }
}

async function CreateOrder(req, res) {
    try {
        const { user, products } = req.body;

        if (!user._id) {
            throw "Esse usuário não existe!";
        } else if (!mongoose.Types.ObjectId.isValid(user._id)) {
            throw "Esse usuário não é valido!";
        }

        for (let p of products) {
            if (!mongoose.Types.ObjectId.isValid(p._id)) {
                throw "Esse produto não é valido!";
            }
        }

        const order = await Order.create({ user, products });

        return res.json(order);
    } catch (error) {
        console.log("Ops...", error)
        res.sendStatus(403);
    }
}

async function UpdateOrder(req, res) {
    try {
        const orderId = req.params.id;
        const { products } = req.body;
        if (!orderId) {
            throw "Esse pedido não existe!";
        } else if (!mongoose.Types.ObjectId.isValid(orderId)) {
            throw "Esse pedido não é valido!";
        }

        let tempProducts = []
        for (let p of products) {
            const findProduct = await Product.findById(p._id);

            if (findProduct && findProduct.stock > 0) {
                tempProducts.push({ _id: findProduct._id });
            }
        }

        const order = await Order.findById(orderId, { user: 0, __v: 0, createdAt: 0, updatedAt: 0 });

        order.products = tempProducts;

        order.save();

        return res.json(order);
    } catch (error) {
        console.log("Ops...", error)
        res.sendStatus(403);
    }
}


module.exports = {
    GetAll,
    GetOrder,
    CreateOrder,
    UpdateOrder
}
