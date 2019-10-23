const mongoose = require('mongoose');

const URL_DB_EXTERNAL = 'mongodb+srv://mongo:mongo@clusterecommerce-cejkv.mongodb.net/admin?retryWrites=true&w=majority';
// const URL_DB = 'mongodb://177.105.35.203:27017/ecommerce';
const URL_DB = 'mongodb://127.0.0.1:27017/ecommerce';

const options = {
    keepAlive: 1,
    useUnifiedTopology: true,
    useNewUrlParser: true,
};

function startMongoDb(enviroment = 'dev') {
    if (enviroment === 'dev') {
        mongoose.connect(URL_DB, options)
            .then(() => console.log("Database ok :)"))
            .catch((err) => console.log("MONGODB ", err));
        return;
    }
    mongoose.connect(URL_DB_EXTERNAL, {
        useNewUrlParser: true,
    });
}


module.exports = {
    startMongoDb
}
