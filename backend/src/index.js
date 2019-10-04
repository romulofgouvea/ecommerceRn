const Webserver = require('./config/services/server');
const Database = require('./config/services/database');

async function Index() {
    try {
        await Webserver.startWebServer();
        await Database.startMongoDb();

    } catch (error) {
        console.log("Ops... ", error)
    }
}

Index();
