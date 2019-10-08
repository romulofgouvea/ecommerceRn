var mongoose = require('mongoose');

const Order = require('../models/Order');

async function GetAll(req, res) {
    try {
        const order = await Order.find().sort('-createdAt');
        return res.json(order);
    } catch (error) {
        res.sendStatus(403);
    }
}

async function GetOrder(req, res) {
    res.sendStatus(200);
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
    res.sendStatus(200);
}


module.exports = {
    GetAll,
    GetOrder,
    CreateOrder,
    UpdateOrder
}
