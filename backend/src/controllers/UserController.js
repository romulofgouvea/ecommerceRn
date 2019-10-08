var mongoose = require('mongoose');
const User = require('../models/User');
const Address = require('../models/Address');

async function GetUser(req, res) {
    try {
        if (!req.params.id) {
            throw "Esse Id de usuário não existe!";
        }

        var _id = mongoose.Types.ObjectId.isValid(req.params.id);

        if (!_id) {
            throw "Esse Id de usuário não é valido!";
        }
        const user = await User.findById(req.params.id, { _id: 0, createdAt: 0, updatedAt: 0, __v: 0, password: 0, reset: 0 }).populate('address', '-__v -_id -createdAt -updatedAt');
        user.password = undefined;

        return res.json(user)
    } catch (error) {
        res.sendStatus(403);
    }
}

async function CreateUser(req, res) {
    try {
        const { name, email, password, address } = req.body;

        const tempAddress = [];
        for (let ad of address) {
            const { street, number, complement, cep, neighborhood, state, city } = ad;
            let ads = await Address.create({ street, number, complement, cep, neighborhood, state, city });
            tempAddress.push(ads);
        }

        const user = await User.create({ name, email, password, address: tempAddress });

        return res.json(user);
    } catch (error) {
        console.log(error)
        res.sendStatus(403);
    }
}

async function UpdateUser(req, res) {
    try {
        if (!req.params.id) {
            throw "Esse Id de usuário não existe!";
        }

        var _id = mongoose.Types.ObjectId.isValid(req.params.id);

        if (!_id) {
            throw "Esse Id de usuário não é valido!";
        }

        const { name, password } = req.body;

        let user = await User.findById(req.params.id, { _id: 0, createdAt: 0, updatedAt: 0, __v: 0, password: 0, reset: 0 });

        if (name) {
            user.name = name;
        }

        if (password) {
            user.password = password;
        }

        await User.update({ _id: req.params.id }, user, { new: true });

        user.address = undefined;

        return res.json(user);
    } catch (error) {
        console.log(error)
        res.sendStatus(403);
    }
}

module.exports = {
    GetUser,
    CreateUser,
    UpdateUser
}
