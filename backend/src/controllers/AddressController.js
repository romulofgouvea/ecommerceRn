var mongoose = require('mongoose');
const User = require('../models/User');
const Address = require('../models/Address');

async function GetAddress(req, res) {
    try {
        const userId = req.user._id;
        if (!userId) {
            throw "Esse Id de usuário não existe!";
        } else if (!mongoose.Types.ObjectId.isValid(userId)) {
            throw "Esse Id de usuário não é valido!";
        }

        const userBd = await User.User
            .findById(userId, { createdAt: 0, updatedAt: 0, __v: 0, password: 0, reset: 0 })
            .populate({
                path: 'address',
                match: { status: { $eq: 0 } }
            });

        return res.json(userBd.address);

    } catch (error) {
        console.log(error)
        res.sendStatus(403);
    }
}

async function CreateAddress(req, res) {
    try {
        const { address } = req.body;
        const userId = req.user._id;
        if (!userId) {
            throw "Esse Id de usuário não existe!";
        } else if (!mongoose.Types.ObjectId.isValid(userId)) {
            throw "Esse Id de usuário não é valido!";
        }

        const userBd = await User.User.findById(userId, { createdAt: 0, updatedAt: 0, __v: 0, password: 0, reset: 0 })
            .populate('address')
            .then(async userTemp => {
                if (!userTemp.address)
                    userTemp.address = [];

                let tempAddress = [];
                for (let ad of address) {
                    const { street, number, complement, cep, neighborhood, state, city } = ad;
                    let ads = await Address.create({ street, number, complement, cep, neighborhood, state, city });
                    tempAddress.push(ads);
                }
                tempAddress = [...userTemp.address, ...tempAddress]
                userTemp.address = tempAddress;

                userTemp.save();
                return userTemp;
            });

        return res.json(userBd.address);
    } catch (error) {
        console.log(error)
        res.sendStatus(403);
    }
}

async function UpdateAddress(req, res) {
    try {
        const addressId = req.params.id;
        const userId = req.user._id;
        if (!userId) {
            throw "Esse Id de usuário não existe!";
        } else if (!mongoose.Types.ObjectId.isValid(userId)) {
            throw "Esse Id de usuário não é valido!";
        }

        var _id = mongoose.Types.ObjectId.isValid(userId);
        var _idAddress = mongoose.Types.ObjectId.isValid(addressId);

        if (!_id) {
            throw "Esse Id de usuário não é valido!";
        }

        if (!_idAddress) {
            throw "Esse Id de endereço não é valido!";
        }

        const userBd = await User.User.findOne({ address: { _id: addressId } });

        if (userBd && userBd.address.length > 0) {
            let ads = await Address.findById(addressId);

            const { street, number, complement, cep, neighborhood, state, city, status } = req.body;

            ads.street = street;
            ads.number = number;
            ads.complement = complement;
            ads.cep = cep;
            ads.neighborhood = neighborhood;
            ads.state = state;
            ads.city = city;
            ads.status = status;

            await ads.save();
            if (ads.status === 1)
                ads = {}

            return res.json(ads);
        }
        return res.status(403).send({ error: "Usuário inválido!" });
    } catch (error) {
        console.log(error)
        res.status(403).send({ error: error });
    }
}

module.exports = {
    GetAddress,
    CreateAddress,
    UpdateAddress
}
