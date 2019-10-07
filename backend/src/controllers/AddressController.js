var mongoose = require('mongoose');
const User = require('../models/User');
const Address = require('../models/Address');

async function CreateAddress(req, res) {
    try {
        const { user, address } = req.body;
        const userId = user._id;
        if (!userId) {
            throw "Esse Id de usuário não existe!";
        }

        var _id = mongoose.Types.ObjectId.isValid(userId);

        if (!_id) {
            throw "Esse Id de usuário não é valido!";
        }

        const userBd = await User.findById(userId, { _id: 0, createdAt: 0, updatedAt: 0, __v: 0, password: 0, reset: 0 }).populate('address');
        if (!userBd.address)
            userBd.address = [];

        let tempAddress = [];
        for (let ad of address) {
            const { street, number, complement, cep, neighborhood, city } = ad;
            let ads = await Address.create({ street, number, complement, cep, neighborhood, city });
            tempAddress.push(ads);
        }

        tempAddress = [...userBd.address, ...tempAddress];
        await User.replaceOne({ _id: userId }, { address: tempAddress });

        return res.json({ address: tempAddress });
    } catch (error) {
        console.log(error)
        res.sendStatus(403);
    }
}

async function UpdateAddress(req, res) {
    try {
        const addressId = req.params.id;
        const { user, address } = req.body;
        const userId = user._id;
        if (!userId) {
            throw "Esse Id de usuário não existe!";
        }
        if (!addressId) {
            throw "Esse Id de endereço não existe!";
        }

        var _id = mongoose.Types.ObjectId.isValid(userId);
        var _idAddress = mongoose.Types.ObjectId.isValid(addressId);

        if (!_id) {
            throw "Esse Id de usuário não é valido!";
        }

        if (!_idAddress) {
            throw "Esse Id de endereço não é valido!";
        }

        const userBd = await User.find({
            'address._id': addressId
        });

        console.log(userBd)
        // if (!userBd.address)
        //     userBd.address = [];

        // let tempAddress = [];
        // for (let ad of address) {
        //     const { street, number, complement, cep, neighborhood, city } = ad;
        //     let ads = await Address.create({ street, number, complement, cep, neighborhood, city });
        //     tempAddress.push(ads);
        // }

        // tempAddress = [...userBd.address, ...tempAddress];
        // await User.replaceOne({ _id: userId }, { address: tempAddress });

        // return res.json({ address: tempAddress });
        res.sendStatus(200);

    } catch (error) {
        console.log(error)
        res.sendStatus(403);
    }
}

module.exports = {
    CreateAddress,
    UpdateAddress
}
