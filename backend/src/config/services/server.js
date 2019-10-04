const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const port_default = 3333;

app.use(cors())
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));
app.use(require('../../routes'));

const startWebServer = (port = 0) => {
    return new Promise((resolve, reject) => {
        const server = app.listen(port | port_default, '0.0.0.0', () => {
            console.log(`> [SERVER] Listening on http://localhost:${port | port_default}`)

            resolve({
                app,
                server,
                express
            })
        })
    })
}

const stopWebServer = async webServer => {
    return new Promise((resolve, reject) => {
        webServer.server.close(() => {
            resolve()
        })
    })
}

module.exports = {
    startWebServer,
    stopWebServer
}
