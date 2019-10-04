const express = require('express');

const app = express();
const port_default = 3333;

const startWebServer = (port = 0) => {
    return new Promise((resolve, reject) => {
        const server = app.listen(port | port_default,'0.0.0.0', () => {
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
