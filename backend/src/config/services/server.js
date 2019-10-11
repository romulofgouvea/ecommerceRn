const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const port_default = 3333;

const serverHttp = require('http').Server(app);

const io = require('socket.io')(serverHttp);

app.use('/files', express.static(path.resolve(__dirname, '..', '..', '..', 'uploads', 'resized')));

app.use((req, res, next) => {
    req.io = io;
    next();
})
app.use(express.json());
app.use(cors())
app.use(require('../../routes'));

const startWebServer = (port = 0) => {
    return new Promise((resolve, reject) => {
        const server = serverHttp.listen(port | port_default, '0.0.0.0', () => {
            console.log(`> [SERVER] Listening on http://localhost:${port | port_default}`)

            resolve({
                app,
                server
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
