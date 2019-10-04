const express = require('express');
var multer = require('multer');

const UserController = require('./controllers/UserController');
const ProductController = require('./controllers/ProductController');
const UploadConfig = require('./config/upload')

const routes = new express.Router();
const upload = multer(UploadConfig);

routes.get('/', (req, res) => {
    res.json({ bem: "vindoo!" })
})

//Users
routes.get('/users/:id', UserController.GetUser);
routes.post('/users', UserController.PostUser);

//Products
routes.get('/products', ProductController.GetAll);
routes.get('/products/:id', ProductController.GetProduct);
routes.post('/products', upload.single('image'), ProductController.PostProduct);

module.exports = routes;
