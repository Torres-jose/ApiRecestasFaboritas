const jwt = require('jsonwebtoken');


const generateToken = (payload) =>{
    return jwt.sign(payload, process.env.KEY,{expiresIn:'7d'});
    

};

const validartoken = (token) => {
    return jwt.verify(token, process.env.KEY);
  

};

module.exports = {
    generateToken,
    validartoken
};