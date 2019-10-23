var mongoose = require('mongoose');

const Order = require('../models/Order');
const Product = require('../models/Product');
const Address = require('../models/Address');

async function GetAll(req, res) {
    try {
        const userId = req.user._id;
        if (!userId) {
            throw "Esse Id de usuário não existe!";
        } else if (!mongoose.Types.ObjectId.isValid(userId)) {
            throw "Esse Id de usuário não é valido!";
        }

        let order = await Order.find({ user: { $eq: { _id: userId } } }, { user: 0, __v: 0, createdAt: 0, updatedAt: 0 })
            .populate('address')
            .populate('products', '-_id -__v -createdAt -updatedAt')
            .sort('-createdAt');

        order = order.filter(o => o.address && o.products && o);

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

        const order = await Order.findById(orderId, { user: 0, __v: 0, createdAt: 0, updatedAt: 0 })
            .populate('address')
            .populate('products', '-_id -__v -createdAt -updatedAt');
        return res.json(order);
    } catch (error) {
        res.sendStatus(403);
    }
}

async function CreateOrder(req, res) {
    try {
        const { products, address } = req.body;

        const userId = req.user._id;
        if (!userId) {
            throw "Esse Id de usuário não existe!";
        } else if (!mongoose.Types.ObjectId.isValid(userId)) {
            throw "Esse Id de usuário não é valido!";
        }

        for (let p of products) {
            if (!mongoose.Types.ObjectId.isValid(p._id)) {
                throw "Esse produto não é valido!";
            }
            p = { _id: p._id };
        }

        const existsAddress = await Address.findById(address._id);

        if (!existsAddress) {
            res.sendStatus(403);
        }

        const productsBd = await Product.find({ _id: { "$in": products } });

        const order = await Order.create({
            user: req.user,
            products: productsBd.map(el => el._id),
            address: existsAddress
        });

        req.io.emit('order', order);

        return res.json(order);
    } catch (error) {
        console.log("Ops...", error)
        res.sendStatus(403);
    }
}

async function UpdateOrder(req, res) {
    try {
        const orderId = req.params.id;
        const { products, status } = req.body;

        if (!orderId) {
            throw "Esse pedido não existe!";
        } else if (!mongoose.Types.ObjectId.isValid(orderId)) {
            throw "Esse pedido não é valido!";
        }

        const order = await Order.findById(orderId, { user: 0, __v: 0, createdAt: 0, updatedAt: 0 });

        if (products) {
            let tempProducts = []
            for (let p of products) {
                const findProduct = await Product.findById(p._id);

                if (findProduct && findProduct.stock > 0) {
                    tempProducts.push({ _id: findProduct._id });
                }
            }
            order.products = tempProducts;
        }
        if ([0, 1, 2].includes(status))
            order.status = status;

        order.save();

        req.io.emit('order', order);

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
