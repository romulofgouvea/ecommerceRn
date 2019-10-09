const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

const JWT_OPTS = { issuer: 'ecommerce' };

const createToken = user => {
    if (!user && !user.id) return null;
    const payload = { id: user.id, };
    return jwt.sign(payload, JWT_SECRET, JWT_OPTS);
};

const verifyToken = token => jwt.verify(token, JWT_SECRET, JWT_OPTS);

const getTokenFromHeaders = req => {
    const token = req.headers.authorization;

    if (token) {
        const arr = token.split(' ');

        if (arr[0] === 'Bearer' && arr[1]) {
            try {
                return verifyToken(arr[1]);
            } catch (error) {
                return null;
            }
        }
    }

    return null;
};

module.exports = {
    createToken,
    verifyToken,
    getTokenFromHeaders
};
