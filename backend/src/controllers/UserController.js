var mongoose = require('mongoose');
const yup = require('yup');

const User = require('../models/User');
const Address = require('../models/Address');

const AuthProvider = require('../config/services/authProvider');
const AuthServices = require('../config/services/auth');

const userAuth = async (req, res, next) => {
    const token = AuthServices.getTokenFromHeaders(req);
    if (!token) {
        req.user = null;
        return res.sendStatus(401);
    }
    const _user = await User.User.findById(token.id, { createdAt: 0, updatedAt: 0, __v: 0, reset: 0 }).populate('address');
    if (!_user) {
        req.user = null;

        return res.sendStatus(401);
    }
    req.user = _user;
    return next();
};

async function GetUser(req, res) {
    try {
        const { name, email, status, address } = req.user;
        return res.json({ name, email, address, status });
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
        provider: yup.string().oneOf(User.ENUM_PROVIDER).required(),
        token: yup.string().required(),
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

        const { provider: providerData, ...userInfo } = data;

        const _user = await User.User.findOne({ email: data.email });

        if (!_user) {
            const user = await User.User.create({ ...userInfo, provider: [providerData] });
            return res.json({ token: AuthServices.createToken(user), user: { name, email, status, address } })
        }

        const { name, email, status, address } = _user;

        const providerExist = _user.provider.find(
            el =>
                el.uid === data.provider.uid &&
                el.type === data.provider.type,
        );


        if (providerExist) {
            return res.status(200).json({ token: AuthServices.createToken(_user), user: { name, email, status, address } });
        }

        _user.provider.push(providerData);

        await _user.save();

        return res.json({ token: AuthServices.createToken(_user), user: { name, email, status, address } });
    } catch (error) {

        res.status(400).json({ message: error.message });
    }
}

async function UpdateUser(req, res) {
    try {
        const userId = req.user._id;

        if (!userId) {
            throw "Esse Id de usuário não existe!";
        }

        var _id = mongoose.Types.ObjectId.isValid(userId);

        if (!_id) {
            throw "Esse Id de usuário não é valido!";
        }

        const { name } = req.body;

        let user = await User.User.findById(userId, { _id: 0, createdAt: 0, updatedAt: 0, __v: 0, reset: 0 });

        if (name) {
            user.name = name;
        }

        await User.User.updateOne({ _id: userId }, user, { new: true });

        user.address = undefined;

        return res.json(user);
    } catch (error) {
        console.log(error)
        res.sendStatus(403);
    }
}

module.exports = {
    userAuth,
    GetUser,
    CreateUser,
    UpdateUser
}
