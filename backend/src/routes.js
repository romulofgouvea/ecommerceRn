const express = require('express');

const routes = new express.Router();

routes.get('/', (req, res) => {
    res.json({ bem: "vindoo!" })
})

module.exports = routes;
