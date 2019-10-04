const mongoose = require('mongoose');

const Webserver = require('./config/services/server');

const options = {
    keepAlive: 1,
    useUnifiedTopology: true,
    useNewUrlParser: true,
};

async function Index() {
    try {
        const webServer = await Webserver.startWebServer();

        mongoose.connect('mongodb://localhost:27017/ecommerce', options)
            .then(() => console.log("Database ok :)"))
            .catch((err) => console.log("MONGODB ", err));

        webServer.app.use(require('./routes'));
    } catch (error) {
        console.log("Ops... ", error)
    }
}

Index();
