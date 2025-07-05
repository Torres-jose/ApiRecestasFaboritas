const jwt = require('jsonwebtoken');
const { token } = require('morgan');

const generateToken = (payload) =>{
    return jwt.sign(payload, process.env.KEY,{expiresIn:'7d'});
};

const verifyToken = (token) => {
    return jwt.verify(token, process.env.KEY);
};

module.exports = {
    generateToken,
    verifyToken
};