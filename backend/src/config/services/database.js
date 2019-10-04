const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://mongo:mongo@clusterecommerce-cejkv.mongodb.net/admin?retryWrites=true&w=majority', {
    useNewUrlParser: true,
});
