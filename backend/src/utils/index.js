var mongoose = require('mongoose');

function verifyId(id) {
    try {
        if (!id) {
            throw "Esse Id não existe!";
        } else if (!mongoose.Types.ObjectId.isValid(id)) {
            throw "Esse Id é valido!";
        }
    } catch (error) {
        return;
    }
}

module.exports = {
    verifyId
}
