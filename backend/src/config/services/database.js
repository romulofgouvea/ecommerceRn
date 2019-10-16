const mongoose = require('mongoose');

const options = {
    keepAlive: 1,
    useUnifiedTopology: true,
    useNewUrlParser: true,
};

function startMongoDb(enviroment = 'dev') {
    if (enviroment === 'dev') {
        mongoose.connect('mongodb://177.105.35.203:27017/ecommerce', options)
            .then(() => console.log("Database ok :)"))
            .catch((err) => console.log("MONGODB ", err));
        return;
    }
    mongoose.connect('mongodb+srv://mongo:mongo@clusterecommerce-cejkv.mongodb.net/admin?retryWrites=true&w=majority', {
        useNewUrlParser: true,
    });
}


module.exports = {
    startMongoDb
}
