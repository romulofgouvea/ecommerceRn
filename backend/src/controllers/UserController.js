var mongoose = require('mongoose');
const yup = require('yup');

const User = require('../models/User');
const Address = require('../models/Address');

const AuthProvider = require('../config/services/authProvider');

async function GetUser(req, res) {
    try {
        if (!req.params.id) {
            throw "Esse Id de usuário não existe!";
        }

        var _id = mongoose.Types.ObjectId.isValid(req.params.id);

        if (!_id) {
            throw "Esse Id de usuário não é valido!";
        }
        const user = await User.User.findById(req.params.id, { _id: 0, createdAt: 0, updatedAt: 0, __v: 0, reset: 0 });

        return res.json(user)
    } catch (error) {
        console.log(error)
        res.sendStatus(403);
    }
}

async function CreateUser(req, res) {
    let data = {
        email: '',
        firstName: '',
        lastName: '',
        avatarUrl: '',
        provider: {
            uid: '',
            type: '',
        },
    };

    const { token, provider } = req.body;

    const body = yup.object().shape({
        token: yup.string().required(),
        provider: yup.string().oneOf(User.ENUM_PROVIDER).required(),
    })

    try {
        await body.validate({ token, provider });

        let info = {};
        switch (provider) {
            case 'FACEBOOK':
                info = await AuthProvider.Facebook.authAsync(token);

                data.avatarUrl = info.picture.data.url;
                data.name = info.name;
                data.email = info.email;
                data.provider.uid = info.id;
                data.provider.type = provider;
                break;
            case 'GOOGLE':
                info = await AuthProvider.Google.authAsync(token);

                data.avatarUrl = info.picture;
                data.name = info.given_name + " " + info.family_name;
                data.email = info.email;
                data.provider.uid = info.id;
                data.provider.type = provider;
                break;
        }

        const _user = await User.User.findOne({ email: data.email });

        const { provider: providerData, ...userInfo } = data;

        if (!_user) {
            const user = await User.User.create({ ...userInfo, provider: providerData });
            return res.json(user);
        }

        const providerExist = _user.provider.find(
            el =>
                el.uid === data.provider.uid &&
                el.type === data.provider.type,
        );

        if (providerExist) {
            return _user;
        }

        _user.provider.push(providerData);

        await _user.save();

        return res.json(_user);
    } catch (error) {
        res.status(400).json({ message: error.message });
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

        let user = await User.User.findById(req.params.id, { _id: 0, createdAt: 0, updatedAt: 0, __v: 0, password: 0, reset: 0 });

        if (name) {
            user.name = name;
        }

        if (password) {
            user.password = password;
        }

        await User.User.updateOne({ _id: req.params.id }, user, { new: true });

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
