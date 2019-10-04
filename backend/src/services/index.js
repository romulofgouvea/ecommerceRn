import express from 'express';

const app = express();
const port_default = 5000;

const startWebServer = (port = 0) => {
    return new Promise((resolve, reject) => {
        const server = app.listen(port, () => {
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
