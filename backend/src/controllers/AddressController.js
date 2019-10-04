var mongoose = require('mongoose');

async function GetAll(req, res) {
    res.sendStatus(200);
}

async function GetAddress(req, res) {
    res.sendStatus(200);
}

async function PostAddress(req, res) {
    res.sendStatus(200);
}


module.exports = {
    GetAll,
    GetAddress,
    PostAddress
}
