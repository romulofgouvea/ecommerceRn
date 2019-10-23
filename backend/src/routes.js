const express = require('express');
var multer = require('multer');

const UserController = require('./controllers/UserController');
const ProductController = require('./controllers/ProductController');
const AddressController = require('./controllers/AddressController');
const OrderController = require('./controllers/OrderController');

const UploadConfig = require('./config/upload')

const routes = new express.Router();
const upload = multer(UploadConfig);

routes.get('/', (req, res) => {
    res.json({ bem: "vindoo!" })
})

//Users
routes.get('/users', UserController.userAuth, UserController.GetUser);
routes.post('/users', UserController.CreateUser);
routes.put('/users', UserController.userAuth, UserController.UpdateUser);

//Address
routes.get('/address', UserController.userAuth, AddressController.GetAddress);
routes.post('/address', UserController.userAuth, AddressController.CreateAddress);
routes.put('/address/:id', UserController.userAuth, AddressController.UpdateAddress);

//Products
routes.get('/products', ProductController.GetAll);
routes.get('/products/:id', ProductController.GetProduct);
routes.post('/products', upload.single('image'), ProductController.CreateProduct);
routes.put('/products/:id', upload.single('image'), ProductController.UpdateProduct);

//Orders
routes.get('/orders', OrderController.GetAll);
routes.get('/orders/user', UserController.userAuth, OrderController.GetAllByUser);
routes.get('/orders/:id', OrderController.GetOrder);
routes.post('/orders', UserController.userAuth, OrderController.CreateOrder);
routes.put('/orders/:id', UserController.userAuth,OrderController.UpdateOrder);

module.exports = routes;
