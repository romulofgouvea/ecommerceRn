var mongoose = require('mongoose');
const Order = require('../models/Order');

async function GetAll(req, res) {
    res.sendStatus(200);
}

async function GetOrder(req, res) {
    res.sendStatus(200);
}

async function CreateOrder(req, res) {
    res.sendStatus(200);
}

async function UpdateOrder(req, res) {
    res.sendStatus(200);
}


module.exports = {
    GetAll,
    GetOrder,
    CreateOrder,
    UpdateOrder
}
