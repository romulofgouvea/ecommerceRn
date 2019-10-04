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
        const user = await User.findById(req.params.id);
        user.password = undefined;

        return res.json(user)
    } catch (error) {
        res.sendStatus(403);
    }
}

async function PostUser(req, res) {
    try {
        const { name, email, password, address } = req.body;

        const user = await User.create({ name, email, password });

        for (let ad of address) {
            const { street, number, complement, cep, neighborhood, city } = ad;
            let ads = await Address.create({ user_id: user._id, street, number, complement, cep, neighborhood, city });
            await ads.populate('user_id', '-password').execPopulate();
        }

        return res.json(user);
    } catch (error) {
        console.log(error)
        res.sendStatus(403);
    }
}


module.exports = {
    GetUser,
    PostUser
}
