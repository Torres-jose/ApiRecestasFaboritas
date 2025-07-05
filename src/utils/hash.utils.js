const bcrypt = require('bcrypt');

//para encripta una contraseña
const hashPassword = async (plainPassword) =>{
    const salRounds = 10;
    return await bcrypt.hash(plainPassword, salRounds);
};

//compara contraseña sin encriptar con hash
const comparePassword = async (plainPassword, hashedPassword) =>{
    return await bcrypt.compare(plainPassword, hashedPassword);
};

module.exports = {
    hashPassword,
    comparePassword
};