var mongoose = require('mongoose');

async function GetAll(req, res) {
    res.sendStatus(200);
}

async function GetOrder(req, res) {
    res.sendStatus(200);
}

async function PostOrder(req, res) {
    res.sendStatus(200);
}


module.exports = {
    GetAll,
    GetOrder,
    PostOrder
}
