import { Webserver } from '~/services';

async function Index() {
    const server = await Webserver.startWebServer();

    server.app.get('/', (req, res) => {
        res.json({ bem: "Vindo!" })
    })
}

Index();
